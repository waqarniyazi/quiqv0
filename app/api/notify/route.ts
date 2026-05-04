import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import fs from 'fs'
import path from 'path'

/* ═══════════════════════════════════════════════════════════════════
   SUBSCRIBER DATA FILE — stores emails + consent for future marketing
   ═══════════════════════════════════════════════════════════════════ */

const SUBSCRIBERS_FILE = path.join(process.cwd(), 'subscribers.json')

interface Subscriber {
  email: string
  consentGiven: boolean
  consentText: string
  subscribedAt: string
  ipAddress?: string
  userAgent?: string
}

function loadSubscribers(): Subscriber[] {
  try {
    if (fs.existsSync(SUBSCRIBERS_FILE)) {
      const raw = fs.readFileSync(SUBSCRIBERS_FILE, 'utf-8')
      return JSON.parse(raw)
    }
  } catch {
    // File doesn't exist or is corrupt — start fresh
  }
  return []
}

function saveSubscribers(subscribers: Subscriber[]): void {
  fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2), 'utf-8')
}

/* ═══════════════════════════════════════════════════════════════════
   EMAIL TEMPLATES — matching QUIQ's dark, premium design language
   ═══════════════════════════════════════════════════════════════════ */

function buildAdminEmailHTML(subscriberEmail: string, subscribedAt: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#000000;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#000000;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;">

          <!-- Logo Header -->
          <tr>
            <td align="center" style="padding:30px 40px 20px;">
              <img src="https://quiq.health/quiq-logo.png" alt="QUIQ" width="100" style="width:100px;height:auto;" />
            </td>
          </tr>

          <!-- Main Card -->
          <tr>
            <td style="background:linear-gradient(145deg,#0d0d0d 0%,#111111 100%);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:40px;">

              <!-- Badge -->
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 auto 24px;">
                <tr>
                  <td style="background:rgba(16,185,129,0.12);border:1px solid rgba(16,185,129,0.3);border-radius:50px;padding:8px 20px;">
                    <span style="color:#34d399;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">🔔 New Subscriber</span>
                  </td>
                </tr>
              </table>

              <!-- Heading -->
              <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#ffffff;text-align:center;line-height:1.3;">
                Someone Joined the Waitlist!
              </h1>
              <p style="margin:0 0 32px;color:rgba(255,255,255,0.5);font-size:14px;text-align:center;line-height:1.6;">
                A new user has signed up to be notified when QUIQ launches.
              </p>

              <!-- Email Detail Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:12px;margin-bottom:24px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 4px;font-size:11px;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:1.5px;font-weight:600;">Subscriber Email</p>
                    <p style="margin:0;font-size:18px;color:#ffffff;font-weight:600;">${subscriberEmail}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 24px;">
                    <div style="height:1px;background:rgba(255,255,255,0.06);"></div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 4px;font-size:11px;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:1.5px;font-weight:600;">Subscribed At</p>
                    <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.7);">${subscribedAt}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 24px;">
                    <div style="height:1px;background:rgba(255,255,255,0.06);"></div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 4px;font-size:11px;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:1.5px;font-weight:600;">Marketing Consent</p>
                    <p style="margin:0;font-size:14px;color:#34d399;font-weight:600;">✓ Granted</p>
                  </td>
                </tr>
              </table>

              <!-- Total Count Note -->
              <p style="margin:0;color:rgba(255,255,255,0.35);font-size:12px;text-align:center;line-height:1.6;">
                Check <strong style="color:rgba(255,255,255,0.5);">subscribers.json</strong> for the full subscriber list.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:32px 40px;text-align:center;">
              <p style="margin:0 0 4px;color:rgba(255,255,255,0.2);font-size:11px;letter-spacing:0.5px;">
                QUIQ — An Initiative by Santa Clara Wellness Pvt. Ltd.
              </p>
              <p style="margin:0;color:rgba(255,255,255,0.15);font-size:10px;">
                6C3, Gundecha Enclave, Kherani Road, Saki Naka, Mumbai 400072
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

/* ═══════════════════════════════════════════════════════════════════
   USER EMAIL TEMPLATE — preserved for future use when sending
   confirmation emails to subscribers (e.g. via Mailgun or SES)
   ═══════════════════════════════════════════════════════════════════ */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function buildUserEmailHTML(userEmail: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#000000;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#000000;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;">

          <!-- Logo Header -->
          <tr>
            <td align="center" style="padding:30px 40px 20px;">
              <img src="https://quiq.health/quiq-logo.png" alt="QUIQ" width="120" style="width:120px;height:auto;" />
            </td>
          </tr>

          <!-- Main Card -->
          <tr>
            <td style="background:linear-gradient(145deg,#0d0d0d 0%,#111111 100%);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:40px 36px;">

              <!-- Badge -->
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 auto 24px;">
                <tr>
                  <td style="background:rgba(16,185,129,0.12);border:1px solid rgba(16,185,129,0.3);border-radius:50px;padding:8px 20px;">
                    <span style="color:#34d399;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">✓ You're on the list</span>
                  </td>
                </tr>
              </table>

              <!-- Heading -->
              <h1 style="margin:0 0 8px;font-size:26px;font-weight:700;color:#ffffff;text-align:center;line-height:1.3;">
                Welcome to QUIQ!
              </h1>
              <p style="margin:0 0 32px;color:rgba(255,255,255,0.5);font-size:15px;text-align:center;line-height:1.7;">
                Thank you for joining our waitlist. You'll be among the first to know when we launch affordable, at-home self-testing kits across India.
              </p>

              <!-- Divider -->
              <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent);margin:0 0 32px;"></div>

              <!-- What's Coming Section -->
              <h2 style="margin:0 0 20px;font-size:14px;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:2px;font-weight:600;text-align:center;">
                What's Coming
              </h2>

              <!-- Feature Cards -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:12px;">
                <tr>
                  <td style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:18px 20px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="36" valign="top">
                          <span style="font-size:20px;">🩸</span>
                        </td>
                        <td style="padding-left:12px;">
                          <p style="margin:0 0 2px;font-size:14px;color:#ffffff;font-weight:600;">One Drop of Blood</p>
                          <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.45);line-height:1.5;">Lab-grade results from a single finger prick. No needles, no lab visit.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:12px;">
                <tr>
                  <td style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:18px 20px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="36" valign="top">
                          <span style="font-size:20px;">⚡</span>
                        </td>
                        <td style="padding-left:12px;">
                          <p style="margin:0 0 2px;font-size:14px;color:#ffffff;font-weight:600;">Results in 5 Minutes</p>
                          <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.45);line-height:1.5;">No waiting days for lab reports. Get clinically validated results instantly.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:12px;">
                <tr>
                  <td style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:18px 20px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="36" valign="top">
                          <span style="font-size:20px;">💰</span>
                        </td>
                        <td style="padding-left:12px;">
                          <p style="margin:0 0 2px;font-size:14px;color:#ffffff;font-weight:600;">Starting ₹99</p>
                          <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.45);line-height:1.5;">20+ tests across vitamins, hormones, metabolic, immunity & more — all affordable.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:32px;">
                <tr>
                  <td style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:18px 20px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="36" valign="top">
                          <span style="font-size:20px;">🏠</span>
                        </td>
                        <td style="padding-left:12px;">
                          <p style="margin:0 0 2px;font-size:14px;color:#ffffff;font-weight:600;">Test at Home</p>
                          <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.45);line-height:1.5;">Completely private. No appointments, no prescriptions, no sharing reports.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent);margin:0 0 28px;"></div>

              <!-- CTA -->
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 auto;">
                <tr>
                  <td align="center" style="border-radius:50px;background:linear-gradient(135deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04));border:1px solid rgba(255,255,255,0.15);">
                    <a href="https://quiq.health" target="_blank" style="display:inline-block;padding:14px 36px;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;letter-spacing:0.5px;">
                      Visit quiq.health →
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:32px 40px;text-align:center;">
              <p style="margin:0 0 6px;color:rgba(255,255,255,0.25);font-size:12px;">
                QUIQ — An Initiative by Santa Clara Wellness Pvt. Ltd.
              </p>
              <p style="margin:0 0 16px;color:rgba(255,255,255,0.15);font-size:10px;">
                6C3, Gundecha Enclave, Kherani Road, Saki Naka, Mumbai 400072
              </p>
              <p style="margin:0;color:rgba(255,255,255,0.2);font-size:10px;line-height:1.6;">
                You're receiving this because you signed up at quiq.health with <strong style="color:rgba(255,255,255,0.35);">${userEmail}</strong>.<br />
                We'll only email you about our launch — no spam, ever.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

/* ═══════════════════════════════════════════════════════════════════
   POST HANDLER
   ═══════════════════════════════════════════════════════════════════ */

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, consentGiven } = body

    // Validate
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    if (!consentGiven) {
      return NextResponse.json({ error: 'Marketing consent is required.' }, { status: 400 })
    }

    // Check for duplicates
    const subscribers = loadSubscribers()
    const alreadyExists = subscribers.some(
      (s) => s.email.toLowerCase() === email.toLowerCase()
    )

    if (alreadyExists) {
      return NextResponse.json(
        { error: 'This email is already on our waitlist!' },
        { status: 409 }
      )
    }

    // Save subscriber with consent proof
    const subscribedAt = new Date().toISOString()
    const consentText =
      'I agree to receive launch updates and promotional emails from QUIQ. I can unsubscribe at any time.'

    const newSubscriber: Subscriber = {
      email: email.trim().toLowerCase(),
      consentGiven: true,
      consentText,
      subscribedAt,
      userAgent: request.headers.get('user-agent') || undefined,
    }

    subscribers.push(newSubscriber)
    saveSubscribers(subscribers)

    // Send admin notification via Gmail SMTP (non-blocking — subscriber is already saved)
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'team.aiportalx@gmail.com',
          pass: process.env.EMAIL_PASSWORD || '',
        },
      })

      // Admin notification email to waqar@quiq.health
      await transporter.sendMail({
        from: '"QUIQ Waitlist" <team.aiportalx@gmail.com>',
        to: 'waqar@quiq.health',
        subject: `New QUIQ Waitlist Signup — ${email}`,
        html: buildAdminEmailHTML(email, subscribedAt),
        text: `New waitlist signup!\n\nEmail: ${email}\nTime: ${subscribedAt}\nConsent: Granted\n\nCheck subscribers.json for the full list.`,
      })

      // NOTE: User confirmation email is disabled for now.
      // To enable later, uncomment and configure with a proper sending domain:
      // await transporter.sendMail({
      //   from: '"QUIQ" <team.aiportalx@gmail.com>',
      //   to: email,
      //   subject: "You're on the QUIQ Waitlist! 🎉",
      //   html: buildUserEmailHTML(email),
      // })
    } catch (emailError) {
      // Log email failure but don't block the user — their data is already saved
      console.error('Gmail email send failed (subscriber still saved):', emailError)
    }

    return NextResponse.json({
      success: true,
      message: "You're on the list! Check your inbox for a confirmation.",
    })
  } catch (error: unknown) {
    console.error('Notify API error:', error)
    const message =
      error instanceof Error ? error.message : 'Something went wrong. Please try again.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

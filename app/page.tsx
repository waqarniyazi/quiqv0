import type { Metadata } from 'next'
import { ComingSoonPage } from './coming-soon'

/* ═══════════════════════════════════════════════════════════════════
   PAGE-LEVEL METADATA — overrides/extends layout defaults
   ═══════════════════════════════════════════════════════════════════ */

export const metadata: Metadata = {
  title: 'QUIQ — Affordable  Self-Test Kits India | 20+ Health Tests Starting at ₹99 | Launching Soon',
  description:
    'QUIQ is launching in India — 20+ at-home self-test kits for Vitamin D, B12, TSH, HbA1c, CRP, Ferritin & more. One drop of blood, lab-grade results in 5 minutes, starting at just ₹99. No lab visit. Completely private. Join the waitlist.',
  alternates: {
    canonical: 'https://quiq.health',
  },
}

/* ═══════════════════════════════════════════════════════════════════
   JSON-LD STRUCTURED DATA — rich results for Google
   ═══════════════════════════════════════════════════════════════════ */

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://quiq.health/#organization',
  name: 'QUIQ',
  legalName: 'QUIQ — An Initiative by Santa Clara Wellness Pvt. Ltd.',
  url: 'https://quiq.health',
  logo: 'https://quiq.health/quiq-logo.png',
  image: 'https://quiq.health/og-image.png',
  description:
    'QUIQ is an at-home self-testing diagnostics brand in India offering 20+ rapid health tests starting at ₹99. Test for vitamins, hormones, metabolic conditions, infections, heart health and blood work — all from a single drop of blood, at home, in 5 minutes.',
  foundingDate: '2024',
  parentOrganization: {
    '@type': 'Organization',
    name: 'Santa Clara Wellness Pvt. Ltd.',
  },
  areaServed: {
    '@type': 'Country',
    name: 'India',
  },
  knowsAbout: [
    'Self-testing diagnostics',
    'Rapid diagnostic test kits',
    'Lateral flow immunoassay',
    'Point-of-care testing',
    'At-home health testing',
    'Preventive healthcare',
    'Affordable diagnostics India',
  ],
  slogan: 'Affordable self-testing diagnostics for everyone in India',
  sameAs: [
    'https://quiqtest.com',
  ],
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://quiq.health/#website',
  name: 'QUIQ',
  url: 'https://quiq.health',
  description: 'Affordable at-home self-test kits for 20+ health conditions. Lab-grade results in 5 minutes, starting at ₹99.',
  publisher: {
    '@id': 'https://quiq.health/#organization',
  },
  inLanguage: 'en-IN',
}

const medicalBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  '@id': 'https://quiq.health/#business',
  name: 'QUIQ Self-Test Diagnostics',
  url: 'https://quiq.health',
  logo: 'https://quiq.health/quiq-logo.png',
  image: 'https://quiq.health/og-image.png',
  description:
    'QUIQ provides affordable, at-home self-testing diagnostic kits across India. 20+ health tests covering vitamins, hormones, metabolic markers, immunity, heart health, and blood work — all starting at ₹99 per test.',
  priceRange: '₹49 - ₹99',
  areaServed: {
    '@type': 'Country',
    name: 'India',
  },
  parentOrganization: {
    '@id': 'https://quiq.health/#organization',
  },
  medicalSpecialty: [
    'https://schema.org/Dermatology',
    'https://schema.org/Endocrine',
    'https://schema.org/Hematologic',
    'https://schema.org/InfectiousDisease',
    'https://schema.org/Cardiovascular',
  ],
  availableService: [
    {
      '@type': 'MedicalTest',
      name: 'Vitamin D Self-Test Kit',
      description: 'At-home rapid test for Vitamin D deficiency using a single drop of blood. Results in 5 minutes.',
      usesDevice: {
        '@type': 'MedicalDevice',
        name: 'QUIQ Lateral Flow Test Cassette',
      },
    },
    {
      '@type': 'MedicalTest',
      name: 'Vitamin B12 Self-Test Kit',
      description: 'At-home rapid test for Vitamin B12 levels. One drop of blood, results in 5 minutes.',
    },
    {
      '@type': 'MedicalTest',
      name: 'TSH Thyroid Self-Test Kit',
      description: 'At-home rapid thyroid function test (TSH). One drop of blood, results in 5 minutes.',
    },
    {
      '@type': 'MedicalTest',
      name: 'HbA1c Diabetes Self-Test Kit',
      description: 'At-home rapid diabetes screening test (HbA1c). One drop of blood, results in 5 minutes.',
    },
    {
      '@type': 'MedicalTest',
      name: 'CRP Inflammation Self-Test Kit',
      description: 'At-home C-Reactive Protein test to detect inflammation or infection. Results in 5 minutes.',
    },
    {
      '@type': 'MedicalTest',
      name: 'Ferritin Iron Deficiency Self-Test Kit',
      description: 'At-home rapid test for iron deficiency / anemia. One drop of blood, results in 5 minutes.',
    },
  ],
}

const productCollectionJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': 'https://quiq.health/#product-list',
  name: 'QUIQ At-Home Self-Test Kits',
  description: 'Complete range of affordable at-home diagnostic self-test kits by QUIQ, starting at ₹99.',
  numberOfItems: 6,
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'Product',
        name: 'QUIQ Vitamin D Self-Test Kit',
        description: 'Test your Vitamin D levels at home with a single drop of blood. Lab-grade results in 5 minutes.',
        brand: { '@type': 'Brand', name: 'QUIQ' },
        category: 'Health & Diagnostics > Self-Test Kits > Vitamins',
        offers: {
          '@type': 'Offer',
          priceCurrency: 'INR',
          price: '99',
          priceValidUntil: '2027-12-31',
          availability: 'https://schema.org/PreOrder',
          url: 'https://quiq.health',
        },
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'Product',
        name: 'QUIQ Vitamin B12 Self-Test Kit',
        description: 'Check your Vitamin B12 levels at home. One drop of blood, results in 5 minutes, starting at ₹99.',
        brand: { '@type': 'Brand', name: 'QUIQ' },
        category: 'Health & Diagnostics > Self-Test Kits > Vitamins',
        offers: {
          '@type': 'Offer',
          priceCurrency: 'INR',
          price: '99',
          priceValidUntil: '2027-12-31',
          availability: 'https://schema.org/PreOrder',
          url: 'https://quiq.health',
        },
      },
    },
    {
      '@type': 'ListItem',
      position: 3,
      item: {
        '@type': 'Product',
        name: 'QUIQ TSH Thyroid Self-Test Kit',
        description: 'At-home thyroid function test (TSH). Rapid results from one drop of blood, starting at ₹99.',
        brand: { '@type': 'Brand', name: 'QUIQ' },
        category: 'Health & Diagnostics > Self-Test Kits > Hormones',
        offers: {
          '@type': 'Offer',
          priceCurrency: 'INR',
          price: '99',
          priceValidUntil: '2027-12-31',
          availability: 'https://schema.org/PreOrder',
          url: 'https://quiq.health',
        },
      },
    },
    {
      '@type': 'ListItem',
      position: 4,
      item: {
        '@type': 'Product',
        name: 'QUIQ HbA1c Diabetes Self-Test Kit',
        description: 'Screen for diabetes at home with HbA1c test. One drop of blood, lab-grade results in 5 minutes.',
        brand: { '@type': 'Brand', name: 'QUIQ' },
        category: 'Health & Diagnostics > Self-Test Kits > Metabolic',
        offers: {
          '@type': 'Offer',
          priceCurrency: 'INR',
          price: '99',
          priceValidUntil: '2027-12-31',
          availability: 'https://schema.org/PreOrder',
          url: 'https://quiq.health',
        },
      },
    },
    {
      '@type': 'ListItem',
      position: 5,
      item: {
        '@type': 'Product',
        name: 'QUIQ CRP Inflammation Self-Test Kit',
        description: 'Detect inflammation with CRP self-test. Rapid at-home results in 5 minutes, starting at ₹99.',
        brand: { '@type': 'Brand', name: 'QUIQ' },
        category: 'Health & Diagnostics > Self-Test Kits > Immunity',
        offers: {
          '@type': 'Offer',
          priceCurrency: 'INR',
          price: '99',
          priceValidUntil: '2027-12-31',
          availability: 'https://schema.org/PreOrder',
          url: 'https://quiq.health',
        },
      },
    },
    {
      '@type': 'ListItem',
      position: 6,
      item: {
        '@type': 'Product',
        name: 'QUIQ Ferritin Iron Self-Test Kit',
        description: 'Check for iron deficiency / anemia at home. One drop of blood, results in 5 minutes.',
        brand: { '@type': 'Brand', name: 'QUIQ' },
        category: 'Health & Diagnostics > Self-Test Kits > Blood Work',
        offers: {
          '@type': 'Offer',
          priceCurrency: 'INR',
          price: '99',
          priceValidUntil: '2027-12-31',
          availability: 'https://schema.org/PreOrder',
          url: 'https://quiq.health',
        },
      },
    },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is QUIQ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'QUIQ is an at-home self-testing diagnostics brand launching in India. Users can test for 20+ health conditions using a single drop of blood, at home, with results in 5 minutes — all starting at ₹99 per test.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does a QUIQ self-test work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It\u0027s simple \u2014 4 steps: (1) Prick your finger to collect one drop of blood, (2) Apply the drop on the test cassette, (3) Wait approximately 5 minutes for results to develop, (4) Read results directly on the device, similar to a pregnancy test. No lab visit or training needed.',
      },
    },
    {
      '@type': 'Question',
      name: 'What health conditions can QUIQ test for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'QUIQ offers 20+ tests across 6 categories: Vitamins (Vitamin D, B12), Hormones (TSH/Thyroid), Metabolic (HbA1c/Diabetes), Immunity & Infections (CRP, H. pylori), Heart Health (Triglycerides, Cholesterol), and Blood Work (Ferritin/Iron/Anemia).',
      },
    },
    {
      '@type': 'Question',
      name: 'How much do QUIQ self-test kits cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'QUIQ self-test kits start at just ₹99, making lab-grade diagnostics affordable for everyone in India. Traditional lab tests for the same conditions typically cost ₹500–₹2000+.',
      },
    },
    {
      '@type': 'Question',
      name: 'When will QUIQ be available?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'QUIQ is currently in pre-launch phase. Sign up with your email on quiq.health to be the first to know when we launch across India.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who is behind QUIQ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'QUIQ is an initiative by Santa Clara Wellness Pvt. Ltd. Our mission is to democratize healthcare in India by making affordable, high-quality self-testing diagnostics accessible to everyone.',
      },
    },
  ],
}

/* ═══════════════════════════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

export default function Page() {
  return (
    <>
      {/* JSON-LD Structured Data — invisible to users, consumed by search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productCollectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ComingSoonPage />
    </>
  )
}

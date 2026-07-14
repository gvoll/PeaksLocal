// Each "parts" array is a sequence of { text, citation? } fragments.
// A fragment with a `citation` number renders a superscript link to that
// city's numbered entry in `sources`. Fragments render back-to-back with no
// added spacing, so citation numbers land immediately after the relevant word.

export const serveCities = [
  {
    slug: 'denver',
    name: 'Denver',
    tagline: "Colorado's largest and most competitive local search market",
    seoTitle: 'Local Digital Identity Management for Denver Businesses',
    seoDescription: "PeaksLocal manages verified local presence for Denver-area businesses across Google, Apple Maps, Bing, and AI search. Built for Denver's competitive, tech-forward search market.",
    intro: [
      { text: "Denver's rapid growth has intensified local search competition. Businesses that secure their digital identity early gain a significant advantage in a crowded market." },
    ],
    snapshot: [
      [
        { text: 'Statewide growth: Colorado saw more than 48,600 new business filings in Q1 2024 alone', citation: 1 },
        { text: '.' },
      ],
      [
        { text: 'Expanding audience: Denver metro population reached 2.99 million in 2025', citation: 2 },
        { text: '.' },
      ],
      [
        { text: 'High ad costs: Denver-area plumbers pay $59.81 per click, 137% above the national average', citation: 3 },
        { text: '.' },
      ],
    ],
    landscapeHeading: 'The Denver Local Search Landscape',
    landscape: [
      [{ text: 'Denver searchers are early adopters of AI tools like ChatGPT and Google AI Overviews. To remain visible, businesses must ensure their digital identity is structured for machine-readability. Accurate data is the difference between being featured in an AI response or being overlooked entirely.' }],
      [{ text: 'Building organic and AI-driven visibility is essential in a market where local service keywords can cost over $50 per click. PeaksLocal secures this high-value reach without the ongoing ad spend.' }],
      [{ text: "Denver's small business density varies block by block: hospitality clusters in LoDo and RiNo, boutique retail runs through the Highlands, Washington Park, and City Park, and professional and office firms concentrate downtown, in Cherry Creek, and along the Denver Tech Center corridor to the south. The University neighborhood near DU adds its own mix of local service businesses. That kind of hyperlocal variation is exactly why a one-size-fits-all profile fails, and why we help businesses across every sector stand out in map packs and AI results where even a small inconsistency can lead to invisibility." }],
    ],
    sabHeading: 'Built for Service Area Businesses',
    sab: [
      [{ text: 'Traditional SEO often fails service area businesses (SABs) that lack a physical storefront. PeaksLocal bridges this gap with geographic signals and cross-platform consistency, ensuring contractors and consultants compete effectively against location-based businesses in both traditional and AI discovery.' }],
    ],
    areas: ['Aurora', 'Lakewood', 'Westminster', 'Thornton', 'Englewood', 'Centennial', 'Littleton', 'Commerce City', 'Golden', 'Broomfield'],
    sources: [
      'Colorado Secretary of State, 2024 Q1 Business & Economic Indicators Report: new filing count (statewide figure)',
      'Denverite / U.S. Census Bureau population estimates, reported March 2025 and January 2026: metro population figures',
      'WebFX, "How Much Do Google Ads Cost in 2026?": Denver plumber CPC benchmark',
    ],
  },
  {
    slug: 'boulder',
    name: 'Boulder',
    tagline: 'A small city with an outsized, highly sophisticated search audience',
    seoTitle: 'Local Digital Identity Management for Boulder Businesses',
    seoDescription: "PeaksLocal manages verified local presence for Boulder-area businesses across Google, Apple Maps, Bing, and AI search. Built for Boulder's sophisticated, AI-savvy search audience.",
    intro: [
      { text: 'Boulder punches above its weight as a local search market. Despite a population of just over 106k', citation: 1 },
      { text: ', it generates search volume and review activity typical of cities twice its size.' },
    ],
    snapshot: null,
    landscapeHeading: "Boulder's Unique Local Search Market",
    landscape: [
      [{ text: 'This intensity is driven by a tech-forward community and a constant influx of visitors who rely heavily on AI-assisted search and cross-platform reviews before choosing local providers.' }],
      [
        { text: 'With record enrollment growth at CU Boulder, exceeding 40,500 students in 2024', citation: 2 },
        { text: ", a rolling cycle of new residents creates a high-stakes local search landscape. For Boulder businesses, accurate digital identity isn't just about being found; it's about standing up to the scrutiny of a savvy, brand-agnostic audience." },
      ],
      [{ text: "That intensity plays out differently by district: Pearl Street's boutiques and restaurants draw a tourist and downtown crowd, University Hill runs on student foot traffic along Broadway, and North Boulder's NoBo Art District has built a genuine cluster of galleries and independent retail. Each audience searches differently, and each needs a profile built for it." }],
    ],
    sabHeading: null,
    sab: null,
    areas: ['Lafayette', 'Louisville', 'Longmont', 'Broomfield', 'Erie'],
    sources: [
      'U.S. Census Bureau QuickFacts, Boulder city, Colorado (2024 estimate)',
      'CU Boulder Today, "CU Boulder enrollment driven by record retention" (September 19, 2024)',
    ],
  },
  {
    slug: 'colorado-springs',
    name: 'Colorado Springs',
    tagline: "A military, tourism, and growing tech market that's still underserved",
    seoTitle: 'Local Digital Identity Management for Colorado Springs Businesses',
    seoDescription: 'PeaksLocal manages verified local presence for Colorado Springs businesses across Google, Apple Maps, Bing, and AI search. Built for a military, tourism, and tech-driven market.',
    intro: [
      { text: "Colorado Springs is a distinct, underserved market shaped by a military presence, a booming tourism sector, and a rapidly expanding tech industry. Unlike Denver or Boulder, its local search landscape is defined by high-intent audiences with little established brand loyalty." },
    ],
    snapshot: null,
    landscapeHeading: 'The Impact of Military & Tourism',
    landscape: [
      [
        { text: 'With a combined regional military economic impact of $6.78 billion', citation: 1 },
        { text: ', including over 125,000 people associated with Fort Carson alone, the city is filled with new residents who rely exclusively on map search and AI assistants to discover local providers. Similarly, the Pikes Peak region’s 25.5 million annual visitors', citation: 2 },
        { text: ' (including 4.5 million at Garden of the Gods', citation: 3 },
        { text: ') increasingly use structured data to find breakfast spots or gear shops on the fly.' },
      ],
      [{ text: 'Locally, that plays out district by district: the historic boutiques and galleries of Old Colorado City, a downtown core with the highest restaurant and nightlife density in the city, the luxury market surrounding the Broadmoor, and a newer retail corridor along Powers Boulevard and Briargate to the north. A business in one district competes on entirely different terms than one in another.' }],
      [{ text: 'By securing your digital identity, you capture this high-value audience of newcomers and travelers who prioritize accurate search results over traditional word-of-mouth. PeaksLocal ensures your business is visible in the map packs and AI responses that drive the Springs’ unique economy.' }],
    ],
    sabHeading: null,
    sab: null,
    areas: ['Manitou Springs', 'Fountain', 'Monument', 'Castle Rock'],
    sources: [
      'Colorado Springs Gazette, "Military base employment in Colorado Springs and El Paso County" (September 2025), citing Fort Carson and Peterson-Schriever SFB public affairs data',
      'Visit Colorado Springs, 2024 Pikes Peak Region visitor press release',
      'City of Colorado Springs, "The Economic Impact of Garden of the Gods Park" report (2022 data, published August 2023)',
    ],
  },
];

export function getServeCity(slug) {
  return serveCities.find((c) => c.slug === slug);
}

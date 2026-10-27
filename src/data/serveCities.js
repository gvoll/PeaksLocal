// Each "parts" array is a sequence of { text, citation?, to? } fragments.
// A fragment with a `citation` number renders a superscript link to that
// city's numbered entry in `sources`; one with `to` renders as an internal
// link. Fragments render back-to-back with no added spacing, so citation
// numbers land immediately after the relevant word.
//
// `sections` and `faqs` are optional; `faqs` also emits FAQPage schema.

export const serveCities = [
  {
    slug: 'denver',
    name: 'Denver',
    tagline: "Colorado's largest and most competitive local search market",
    seoTitle: 'Denver Local SEO by Neighborhood: Maps + AI',
    seoDescription: 'How local search works across Denver, from LoDo to the Tech Center, and how we help Denver businesses show up on Google Maps, Apple Maps, and AI search.',
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
    sections: [
      {
        heading: 'How Denver Customers Search',
        paragraphs: [
          [{ text: "Denver doesn't have one local search market. It has dozens. Google weighs how close a business is to the person searching, so \"dentist near me\" typed in Capitol Hill returns a different map pack than the same search in Stapleton, Lowry, or along Colorado Boulevard. A business that dominates its own neighborhood can be invisible two miles away." }],
          [{ text: 'The metro makes this sharper. Aurora, Lakewood, Englewood, Littleton, and the cities along I-25 and I-70 each produce their own results, and customers rarely search across them. That means the signals you control (your category, your services, your reviews, and how consistent your details are everywhere) carry the most weight when you are competing at the edge of your area.' }],
        ],
      },
      {
        heading: 'Seasonal Demand on the Front Range',
        paragraphs: [
          [{ text: "Denver's weather moves local search. The Front Range is one of the most hail-prone parts of the country, and a single storm can send searches for roofers, auto body shops, and window repair through the roof overnight. Fall brings sprinkler blowouts and furnace checks, and winter brings snow removal and emergency plumbing." }],
          [{ text: "When demand spikes, customers call the first business that looks open, nearby, and trustworthy. Accurate hours, holiday hours, current photos, and recent reviews decide who gets that call, and AI assistants read the same details when someone asks for a recommendation. We keep those details current through the seasons instead of fixing them after the rush." }],
        ],
      },
      {
        heading: 'How We Help Denver Businesses',
        paragraphs: [
          [
            { text: 'Most Denver clients start with ' },
            { text: 'local SEO', to: '/local-seo-denver' },
            { text: ': setting up and matching their profiles on Google, Apple Maps, and Bing, adding structured data to their website, and fixing directory listings. From there, ongoing ' },
            { text: 'Google Business Profile management', to: '/google-business-profile-management-denver' },
            { text: ' keeps the listing accurate and active, and ' },
            { text: 'AI search optimization', to: '/ai-search-optimization-denver' },
            { text: ' makes sure ChatGPT, Gemini, and Google AI have consistent information to work with.' },
          ],
          [
            { text: "We're based in Denver and meet local clients in person. If you want to know where you stand first, the " },
            { text: 'free Visibility Score', to: '/audit' },
            { text: ' checks your business across seven areas and tells you what to fix first.' },
          ],
        ],
      },
    ],
    faqs: [
      {
        q: 'How competitive is local SEO in Denver?',
        a: "Very, in most service categories. Ad costs for local services in Denver run well above the national average, and most categories have dozens of businesses competing for three map spots. The good news: many of those competitors have incomplete or inconsistent listings, which is where a well-maintained profile pulls ahead.",
      },
      {
        q: 'Can a suburban business rank for Denver searches?',
        a: "Partly. Google weighs distance, so a Lakewood business will rank best for searchers near Lakewood. Service area businesses can list the Denver areas they serve, and good content helps for broader searches. What doesn't work is a virtual office or mailbox address in Denver: Google's rules don't allow it, and it can get the listing suspended.",
      },
      {
        q: 'Do you meet with Denver clients in person?',
        a: 'Yes. We are based in Denver and offer in-person appointments for local clients, plus virtual consultations for anyone who prefers them.',
      },
    ],
    areas: ['Aurora', 'Lakewood', 'Westminster', 'Thornton', 'Englewood', 'Centennial', 'Littleton', 'Commerce City', 'Golden', 'Broomfield'],
    neighborhoods: ['LoDo', 'RiNo', 'Highlands', 'Washington Park', 'City Park', 'Downtown', 'Cherry Creek', 'University'],
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
    seoTitle: 'Local SEO Boulder: Google Maps + AI Visibility',
    seoDescription: 'Local SEO for Boulder businesses: Google Maps, Apple Maps, Bing, and AI search visibility for a tech-savvy audience, from Pearl Street to Gunbarrel.',
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
    sections: [
      {
        heading: "Who's Searching in Boulder",
        paragraphs: [
          [{ text: "Boulder's search audience turns over constantly. Every August a new wave of CU students and their families arrives looking for everything from dentists to bike shops, and the city's tech and startup scene keeps bringing in new residents who search on their phones and ask AI assistants before they ask a neighbor." }],
          [{ text: 'Then there are the visitors: hikers heading to Chautauqua and the Flatirons, shoppers on the Pearl Street Mall, and parents in town for campus visits. They search on the move, filter by "open now," and pick from whatever the map shows them in that moment. A wrong hour or an unclaimed Apple Maps listing costs a Boulder business those customers without anyone noticing.' }],
          [{ text: "Boulder customers also tend to research before they buy. They read reviews across more than one platform and notice when details don't match. Consistent information everywhere is what earns their trust, and the trust of the AI tools they use." }],
        ],
      },
      {
        heading: 'Boulder County Is Its Own Market',
        paragraphs: [
          [{ text: "Searches in Longmont, Lafayette, Louisville, Erie, and Gunbarrel each return their own local results, and Denver businesses rarely show up in them because of the distance along US-36. That works both ways: a Boulder business won't show up for Denver searches just by trying harder." }],
          [{ text: "For service area businesses that cover the whole county, the setup matters. Your Google Business Profile service areas, your website's location content, and your listings on Apple Maps and Bing all need to tell the same story about where you work, so each town's search results have a reason to include you." }],
        ],
      },
      {
        heading: 'Where Boulder Profiles Usually Fall Short',
        paragraphs: [
          [{ text: "The Boulder businesses we audit tend to have the same gaps. Their Google profile is solid, but Apple Business Connect was never claimed, so iPhone users and Siri get outdated or missing details. Their Bing Places listing doesn't exist, which matters more now that AI tools draw on Bing. Their website has no structured data, so search engines have to guess at their hours and service area." }],
          [{ text: "The other common gap is reviews. Boulder customers read them closely, on Google and on Yelp, and they notice when the last one is a year old or when the owner never responds. A steady stream of recent reviews, with thoughtful replies, does more for a Boulder business than almost any technical fix. None of this is complicated, but it has to be done everywhere and kept up, which is exactly the work we take off your plate." }],
        ],
      },
      {
        heading: 'How We Help Boulder Businesses',
        paragraphs: [
          [
            { text: 'We handle the same work for Boulder that we do in Denver: ' },
            { text: 'local SEO', to: '/local-seo-denver' },
            { text: ' across Google, Apple Maps, and Bing, ongoing ' },
            { text: 'Google Business Profile management', to: '/google-business-profile-management-denver' },
            { text: ', and ' },
            { text: 'AI search optimization', to: '/ai-search-optimization-denver' },
            { text: " so the AI tools Boulder's audience relies on have accurate information about you. Start with a " },
            { text: 'free Visibility Score', to: '/audit' },
            { text: ' to see where you stand.' },
          ],
        ],
      },
    ],
    faqs: [
      {
        q: 'Can a Denver business rank in Boulder search results?',
        a: "Rarely for map results, because Google weighs the distance between the searcher and the business. A business that serves Boulder customers is better off with a Boulder location or a service area setup that clearly covers Boulder County, backed by consistent listings.",
      },
      {
        q: 'Does Apple Maps matter for Boulder businesses?',
        a: "Yes. Apple Maps powers Siri and the default maps app on every iPhone, which many students, visitors, and tech workers use without ever opening Google. An unclaimed or incomplete Apple Business Connect listing means those customers can't find accurate details about you.",
      },
      {
        q: 'How do I get my Boulder business recommended by ChatGPT?',
        a: "Make sure every source AI tools read says the same thing about you: your Google, Apple, and Bing listings, Yelp and other directories, and your website's structured data. Then keep recent reviews coming in on more than one platform. AI tools recommend the businesses they can verify most easily.",
      },
      {
        q: 'Do you work with Boulder businesses in person?',
        a: "Yes. We're based in Denver and meet Front Range clients in person, with virtual consultations available for anyone who prefers them.",
      },
    ],
    areas: ['Lafayette', 'Louisville', 'Longmont', 'Broomfield', 'Erie'],
    neighborhoods: ['Pearl Street', 'University Hill', 'North Boulder', 'Gunbarrel'],
    sources: [
      'U.S. Census Bureau QuickFacts, Boulder city, Colorado (2024 estimate)',
      'CU Boulder Today, "CU Boulder enrollment driven by record retention" (September 19, 2024)',
    ],
  },
  {
    slug: 'colorado-springs',
    name: 'Colorado Springs',
    tagline: "A military, tourism, and growing tech market that's still underserved",
    seoTitle: 'Local SEO Colorado Springs: Maps + AI Visibility',
    seoDescription: 'Local SEO for Colorado Springs businesses: get found on Google Maps, Apple Maps, and AI search by military families, visitors, and new residents.',
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
    sections: [
      {
        heading: 'Newcomers Search for Everything',
        paragraphs: [
          [{ text: 'Military families arrive in Colorado Springs on a steady cycle, assigned to Fort Carson, Peterson and Schriever Space Force Bases, or the Air Force Academy. Each move means finding a new dentist, mechanic, daycare, gym, and restaurant, usually within the first few weeks and usually by searching Google Maps or asking an AI assistant.' }],
          [{ text: "These customers don't have local word-of-mouth yet. They choose based on what they can see: reviews, photos, hours, and whether the details look trustworthy. A complete, consistent profile wins that customer early, and a family that likes you can stay a customer for their whole assignment." }],
        ],
      },
      {
        heading: 'Visitors Search on the Move',
        paragraphs: [
          [{ text: 'Visitors heading to Pikes Peak, Garden of the Gods, Manitou Springs, or the U.S. Olympic & Paralympic Museum search from their phones and cars, often on Apple Maps through CarPlay or Siri. They filter for places that are open now and close by, and they decide in seconds.' }],
          [{ text: "For restaurants, outfitters, and shops near those attractions, accurate hours (including seasonal changes), current photos, and a claimed Apple Business Connect listing matter as much as Google. If Apple Maps shows the wrong hours, that visitor goes to the next pin." }],
        ],
      },
      {
        heading: 'Growth in the North and East',
        paragraphs: [
          [{ text: "Colorado Springs keeps growing outward, from Briargate and Interquest in the north to the newer neighborhoods along Powers Boulevard and the east side. Customers in those areas search for businesses near them, not downtown. Service area businesses need their Google Business Profile service areas, website content, and listings set up to reach these neighborhoods, and storefronts need their details right so they show up for nearby searches as the city fills in around them." }],
        ],
      },
      {
        heading: 'How We Help Colorado Springs Businesses',
        paragraphs: [
          [
            { text: 'We bring the same work we do in Denver to the Springs: ' },
            { text: 'local SEO', to: '/local-seo-denver' },
            { text: ' across Google, Apple Maps, and Bing, ongoing ' },
            { text: 'Google Business Profile management', to: '/google-business-profile-management-denver' },
            { text: ', and ' },
            { text: 'AI search optimization', to: '/ai-search-optimization-denver' },
            { text: ' so newcomers and visitors asking AI for recommendations find accurate information about you. A ' },
            { text: 'free Visibility Score', to: '/audit' },
            { text: ' is the easiest place to start.' },
          ],
        ],
      },
    ],
    faqs: [
      {
        q: 'Can a Colorado Springs business show up in Monument or Fountain searches?',
        a: "Google weighs the distance between the searcher and the business, so a storefront ranks best near its own location. Service area businesses can list Monument, Fountain, and other nearby towns as service areas, and consistent listings plus location-specific website content give each town's results a reason to include you.",
      },
      {
        q: 'Can I show that my business is veteran-owned on Google?',
        a: 'Yes. Google Business Profile has an "identifies as veteran-owned" attribute you can add. In a city with a large military community, it is worth adding if it applies to you.',
      },
      {
        q: 'Do visitors really use Apple Maps instead of Google?',
        a: 'Many do. Apple Maps is the default on every iPhone and in CarPlay, and Siri answers "near me" questions from it. Visitors driving between attractions often never open Google at all, so a claimed, accurate Apple Business Connect listing is how a Colorado Springs business reaches them.',
      },
      {
        q: 'Is local SEO easier in Colorado Springs than in Denver?',
        a: 'Often, yes. Many categories have fewer well-maintained profiles competing than in Denver, so a complete, consistent identity can stand out faster. Tourist areas and popular categories like restaurants and home services are still crowded, and they need the same attention.',
      },
    ],
    areas: ['Manitou Springs', 'Fountain', 'Monument', 'Castle Rock'],
    neighborhoods: ['Old Colorado City', 'Downtown', 'The Broadmoor', 'Briargate'],
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

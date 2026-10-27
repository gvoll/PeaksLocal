// Keyword-targeted Denver service pages, rendered by ServiceLandingPage.jsx and
// prerendered from this list by scripts/prerender.mjs.
//
// Paragraphs are arrays of { text, to? } fragments. A fragment with `to`
// renders as an internal link. Fragments render back-to-back with no added
// spacing, so include any spaces in the text itself.
//
// Each page targets its own query: keep /serve/denver about the Denver market
// (neighborhoods, competition) and these about the service itself, so the two
// don't compete for the same search.

export const servicePages = [
  {
    slug: 'local-seo-denver',
    name: 'Local SEO Denver',
    seoTitle: 'Local SEO Denver | Google Maps & AI Search',
    seoDescription: 'Denver local SEO built on verified data: Google Business Profile, Apple Maps, Bing, reviews, and schema, so you show up in the map pack and AI answers.',
    serviceType: 'Local SEO',
    h1: { before: 'Denver Local SEO, ', highlight: 'Built on Verified Data' },
    subline: 'Local digital identity management for Google, Apple Maps, Bing, and AI search.',
    intro: [
      [{ text: "When someone in Denver searches for a plumber, a dentist, or a lawyer, Google shows three businesses on a map before it shows a single website. ChatGPT and Google's AI answers narrow it down even further. Local SEO is the work of getting your business into those few spots, and keeping it there." }],
      [{ text: 'PeaksLocal is a Denver local SEO firm that starts where most agencies skip: the business data every platform reads before it decides who to show. Get that right everywhere, and rankings, map visibility, and AI recommendations have something solid to stand on.' }],
    ],
    sections: [
      {
        heading: 'What Local SEO Actually Covers',
        paragraphs: [
          [{ text: 'Local SEO is everything that decides whether you show up when someone nearby searches for what you do. That means three places on the results page: the map pack (the three listings under the map), the regular organic results below it, and, more and more, the AI-written answer at the top.' }],
          [
            { text: 'Google says local results come down to three things: relevance, distance, and prominence. You can\'t move your building closer to every customer, but you can control the other two. Relevance comes from accurate categories, services, and descriptions. Prominence comes from reviews, consistent listings across the web, and a website that backs it all up. Our post on ' },
            { text: 'what determines local search visibility', to: '/blog/what-determines-local-search-visibility' },
            { text: ' goes deeper on each one.' },
          ],
        ],
      },
      {
        heading: 'Why the Denver Map Pack Is Hard to Crack',
        paragraphs: [
          [{ text: "Denver is a spread-out metro with a lot of businesses chasing the same customers. A search for \"HVAC repair\" in the Highlands shows a different map pack than the same search in the Denver Tech Center, because Google weighs distance from the searcher. Your business can rank first in Wash Park and not appear at all in Aurora." }],
          [
            { text: "That makes the signals you control matter more. When two businesses are roughly the same distance away, the one with the complete profile, the right primary category, steady reviews, and matching details across every directory wins. Most of the businesses we audit are losing on at least one of those without knowing it. See our " },
            { text: 'Denver market page', to: '/serve/denver' },
            { text: ' for how competition shifts across the city\'s neighborhoods.' },
          ],
        ],
      },
      {
        heading: 'What We Do for Denver Businesses',
        paragraphs: [
          [{ text: 'Our work runs in two phases. Identity Build sets everything up correctly once. Identity Management keeps it that way, because listings drift: data aggregators push old details back out, anyone can suggest edits to your Google listing, and platforms change their rules.' }],
        ],
        bullets: [
          'Google Business Profile, Apple Business Connect, and Bing Places setup and full optimization',
          'Primary and secondary category research against the businesses outranking you',
          'LocalBusiness schema (JSON-LD) on your website so search engines and AI read your details correctly',
          'BBB and trust directory claims, with your name, address, and phone matching everywhere',
          'Social profile NAP synchronization',
          'Monthly profile updates: photos, posts, and attributes',
          'Review monitoring, response management, and a steady review strategy',
          'Citation drift detection and correction, plus a monthly visibility report',
        ],
      },
      {
        heading: 'How It Works',
        paragraphs: [
          [
            { text: 'It starts with a ' },
            { text: 'free Visibility Score', to: '/audit' },
            { text: ': we check your business across seven areas (Google Business Profile, Apple Business Connect, Bing Places, website structured data, trust directories, reviews, and social profiles) and tell you what to fix first. No commitment.' },
          ],
          [
            { text: 'If you want us to handle it, Identity Build fixes what the score found. Identity Management then runs monthly. Want to see exactly where you rank across Denver before deciding? The ' },
            { text: 'Visibility Deep-Dive', to: '/contact?interest=deep-dive' },
            { text: ' adds a Google Maps ranking report, a competitor comparison, and a review analysis. The full process is on ' },
            { text: 'How It Works', to: '/how-it-works' },
            { text: '.' },
          ],
        ],
      },
      {
        heading: "What We Won't Do",
        paragraphs: [
          [
            { text: "We don't buy reviews, gate reviews so only happy customers post, or stuff keywords into your business name. Google prohibits all three, and the penalty is usually a suspended listing, which costs far more than the shortcut saves. We also won't promise you the number one spot. Nobody controls Google's rankings, and any agency that guarantees them is guessing. If you're weighing doing this yourself, we wrote an honest comparison of " },
            { text: 'DIY local SEO vs. hiring an agency', to: '/blog/diy-local-seo-vs-hiring-an-agency' },
            { text: '.' },
          ],
        ],
      },
      {
        heading: 'Who We Work With',
        paragraphs: [
          [
            { text: 'Law firms, medical and dental practices, real estate professionals, financial advisors and CPAs, contractors and home services, restaurants, and wellness studios. Storefronts, service area businesses with no public address, and multi-location businesses each need a different setup, and we build for whichever one you are. We\'re based in Denver and also work with businesses in ' },
            { text: 'Boulder', to: '/serve/boulder' },
            { text: ', ' },
            { text: 'Colorado Springs', to: '/serve/colorado-springs' },
            { text: ', and across the country.' },
          ],
        ],
      },
    ],
    faqs: [
      {
        q: 'How long does local SEO take in Denver?',
        a: 'Fixes to your Google Business Profile, like the right category or corrected hours, can show up within a few weeks. Competitive terms in a market the size of Denver usually take several months of steady reviews, consistent listings, and website improvements. Anyone promising page one in days is guessing.',
      },
      {
        q: 'Do I need a physical address in Denver to rank?',
        a: "No. Service area businesses, like contractors and mobile services, can rank without showing an address. Google ranks them from a central point instead of a pin, which usually gives a smaller ranking radius, so the other signals have to work harder. That's a large part of what we set up.",
      },
      {
        q: 'Is local SEO different from regular SEO?',
        a: 'Regular SEO is about ranking web pages for keywords. Local SEO adds the map pack, your business profiles on Google, Apple, and Bing, reviews, and the consistency of your details across the web. For a business that serves a local area, those local signals usually decide more than the website does.',
      },
      {
        q: 'Will local SEO help me show up in ChatGPT and Google AI answers?',
        a: 'Yes, because AI tools pull from the same sources: your Google and Bing listings, review sites, directories, and your website. When those sources agree, AI tools are more confident recommending you. See our AI search optimization page for the details.',
      },
      {
        q: 'Do you only work with Denver businesses?',
        a: "No. We're based in Denver and work with businesses across Colorado's Front Range in person, and with local businesses anywhere in the country virtually.",
      },
    ],
    related: [
      { to: '/google-business-profile-management-denver', label: 'Google Business Profile Management in Denver' },
      { to: '/ai-search-optimization-denver', label: 'AI Search Optimization in Denver' },
      { to: '/blog/why-nap-consistency-matters', label: 'Why NAP Consistency Matters for Local and AI Search' },
      { to: '/blog/service-area-business-local-seo-strategy', label: "Why Service Area Businesses Don't Rank Like Everyone Else" },
    ],
  },
  {
    slug: 'google-business-profile-management-denver',
    name: 'Google Business Profile Management Denver',
    seoTitle: 'Google Business Profile Management Denver',
    seoDescription: 'Denver Google Business Profile management: categories, photos, posts, reviews, and edit monitoring, so your listing stays accurate and keeps ranking.',
    serviceType: 'Google Business Profile management',
    h1: { before: 'Google Business Profile Management ', highlight: 'for Denver Businesses' },
    subline: 'Your Google listing is one piece of your local digital identity. We manage all of it.',
    intro: [
      [{ text: 'For most local businesses, the Google Business Profile is the first thing a customer sees, and often the only thing. They read your reviews, check your hours, tap to call, and never visit your website.' }],
      [{ text: "PeaksLocal manages Google Business Profiles for Denver businesses so that listing is complete, accurate, and working for you every month, not just the week it was set up." }],
    ],
    sections: [
      {
        heading: 'Your Profile Is Your Storefront Now',
        paragraphs: [
          [
            { text: "More customers are deciding without leaving Google. They compare businesses in Maps, call from the listing, and get directions in one tap. Google's AI answers lean on Business Profile data too, so a thin or outdated profile costs you twice. We covered the shift in " },
            { text: 'Your Customers Are Staying in Google Maps', to: '/blog/google-maps-calls-clicks-decline-local-business' },
            { text: '.' },
          ],
        ],
      },
      {
        heading: 'What Goes Wrong Without Management',
        paragraphs: [
          [{ text: 'A profile set up once and left alone usually drifts. These are the problems we see most often in Denver audits:' }],
        ],
        bullets: [
          'The wrong primary category, which quietly limits which searches you can show up for',
          'Edits from the public or from Google itself that change your hours, phone, or website without you noticing',
          'Hours that are wrong on holidays, which sends customers to a locked door',
          'A profile owned by a former employee or old agency, so nobody on your team has full control',
          'Unanswered reviews, and no steady stream of new ones',
          'Scam calls and texts claiming to be from Google that pressure owners into paying for "verification"',
        ],
        after: [
          [
            { text: 'Anyone can suggest an edit to your listing through ' },
            { text: "Google's Tell Maps feature", to: '/blog/google-tell-maps-business-listing-edits' },
            { text: ', and you have a limited window to reject it, which we explain in ' },
            { text: 'the 4-day edit review window', to: '/blog/google-business-profile-4-day-edit-review-window' },
            { text: '. If your category might be the problem, start with ' },
            { text: 'how the wrong category hurts rankings', to: '/blog/google-business-profile-category-hurting-rankings' },
            { text: '.' },
          ],
        ],
      },
      {
        heading: "What's Included",
        paragraphs: [
          [{ text: "Every profile gets a full build first, then ongoing management. Here's what that covers:" }],
        ],
        bullets: [
          'Claiming and setup, with guidance through Google\'s verification steps',
          'Primary and secondary category research against the profiles outranking you',
          'Services, products, attributes, and a description written for both customers and search',
          'Service area setup for businesses without a storefront, within Google\'s limits',
          'Monthly photo uploads, posts, and attribute updates',
          'Review monitoring and response management, plus a strategy for steady new reviews',
          'Watching for edits to your listing and correcting anything that changes without your approval',
          'A monthly visibility report so you can see what changed',
        ],
      },
      {
        heading: 'Reviews Are Part of the Profile',
        paragraphs: [
          [{ text: "Reviews are one of the strongest signals on your profile, for Google's rankings and for the customer deciding whether to call. What matters is not just the star rating but how many reviews you have, how recent they are, and whether you respond. A profile with a few dozen recent, answered reviews usually beats one with more reviews that stopped coming in a year ago." }],
          [
            { text: "We monitor new reviews, help you respond to them, and set up a simple way to ask happy customers for a review that stays within Google's rules. If you want a more complete system, our " },
            { text: 'review funnels', to: '/review-funnels' },
            { text: ' make asking for reviews part of your normal routine.' },
          ],
        ],
      },
      {
        heading: 'Secure Access, No Password Sharing',
        paragraphs: [
          [
            { text: 'You add us as a manager on your profile. You stay the primary owner, and you can remove our access at any time. We never ask for your Google password. If your profile is stuck in someone else\'s account, we can help you ' },
            { text: 'move it into your own organization account', to: '/blog/move-google-business-profile-into-organization-account' },
            { text: '.' },
          ],
        ],
      },
      {
        heading: 'Google Is Only One Listing',
        paragraphs: [
          [
            { text: "Apple Maps powers Siri and directions on every iPhone. Bing Places feeds Bing search and AI tools that draw on it. If those listings say something different from Google, platforms trust all of them less. So we manage your Apple Business Connect and Bing Places profiles alongside Google and keep the details identical everywhere. It's also your backup if Google ever has a problem, which we cover in " },
            { text: "What's Your Backup Plan If Google Business Profile Goes Down?", to: '/blog/google-business-profile-backup-plan' },
          ],
        ],
      },
    ],
    faqs: [
      {
        q: 'Can you verify a new Google Business Profile for me?',
        a: "Google controls verification and decides which method you get, often a video of your location or business. We prepare everything so the details match what Google expects, and walk you through the steps so it goes through the first time.",
      },
      {
        q: 'Do I have to give you my Google password?',
        a: 'No. You add PeaksLocal as a manager from inside your profile. You keep ownership and can remove us whenever you want.',
      },
      {
        q: 'Should I hide my address on Google?',
        a: "If customers don't come to you, Google's rules say to hide it and set a service area instead. If they do visit, keep it showing. Testing suggests hiding an address can hurt rankings, so it should be a deliberate choice, not a default.",
      },
      {
        q: 'How often should a Google Business Profile be updated?',
        a: 'At minimum, whenever anything about your business changes, and before every holiday. We add photos and posts and check for unwanted edits every month as part of Identity Management.',
      },
      {
        q: 'Can you show me where my profile ranks across Denver?',
        a: 'Yes. The Visibility Deep-Dive includes a Google Maps ranking report showing where customers across the area can and can\'t find you, plus a comparison against your top local competitors.',
      },
    ],
    related: [
      { to: '/local-seo-denver', label: 'Local SEO in Denver' },
      { to: '/ai-search-optimization-denver', label: 'AI Search Optimization in Denver' },
      { to: '/blog/hiding-address-google-business-profile-ranking-drop', label: 'Hiding Your Address Could Be Tanking Your Rankings' },
      { to: '/blog/google-business-profile-scam-calls-texts-guide', label: 'How to Spot Fake "Google" Calls About Your Listing' },
    ],
  },
  {
    slug: 'ai-search-optimization-denver',
    name: 'AI Search Optimization Denver',
    seoTitle: 'AI Search Optimization Denver (GEO + AEO)',
    seoDescription: 'Help your Denver business get recommended by ChatGPT, Gemini, and Google AI Overviews by fixing the data AI tools check: profiles, reviews, schema, citations.',
    serviceType: 'AI search optimization',
    h1: { before: 'AI Search Optimization ', highlight: 'for Denver Businesses' },
    subline: 'Getting found in ChatGPT, Gemini, and Google AI starts with one consistent digital identity.',
    intro: [
      [{ text: 'Ask ChatGPT for "the best family dentist in Denver" and you won\'t get ten blue links. You\'ll get a few names, with reasons. If your business isn\'t one of them, that customer never sees you.' }],
      [{ text: "PeaksLocal helps Denver businesses show up in those answers. Not with a secret prompt trick, but by fixing the information AI tools check before they recommend anyone." }],
    ],
    sections: [
      {
        heading: 'How AI Tools Pick Local Businesses',
        paragraphs: [
          [
            { text: "AI assistants don't keep their own list of good businesses. They build each answer from sources they trust: Google and Bing listings, review sites like Yelp, directories, news, and business websites. Then they pick only a handful of names, often " },
            { text: 'just two or three', to: '/blog/chatgpt-local-results-limit-how-to-compete' },
            { text: '.' },
          ],
          [
            { text: 'The businesses that make the cut tend to look the same everywhere. Same name, address, and phone. Same services. Steady reviews on more than one site. When those sources disagree, AI tools ' },
            { text: "can't tell which version is right", to: '/blog/ai-search-conflicting-business-information' },
            { text: ', and they recommend someone else.' },
          ],
        ],
      },
      {
        heading: 'GEO and AEO, Without the Hype',
        paragraphs: [
          [{ text: 'GEO (generative engine optimization) means getting cited or recommended by AI tools. AEO (answer engine optimization) means being the direct answer to a question. You\'ll see agencies sell both as something brand new.' }],
          [
            { text: "Google's own team says there's nothing special to do for AI answers beyond good SEO, because AI Overviews and AI Mode draw on the same index as regular search. We agree, and we wrote about it in " },
            { text: 'You Don\'t Need Special "AI SEO," Just Good SEO', to: '/blog/google-ai-seo-not-special-just-good-seo' },
            { text: '. What has changed is which parts of good SEO matter most for a local business: accurate data across every platform, and trust signals AI can verify.' },
          ],
        ],
      },
      {
        heading: 'What We Work On',
        paragraphs: [
          [{ text: 'These are the signals AI tools lean on when they decide whether to mention a local business:' }],
        ],
        bullets: [
          'Google Business Profile: complete, accurate, and active, since Google\'s AI answers draw on it directly',
          'Bing Places: often overlooked, and it feeds Bing search and the AI tools that draw on Bing',
          'Apple Business Connect: what Siri and Apple Maps use to answer "near me" questions',
          'LocalBusiness schema (JSON-LD) on your site, linking your official profiles together so AI sees one business, not several',
          'Matching name, address, and phone across directories and trust sites like BBB and Yelp',
          'Reviews on more than one platform, with responses',
          'Website pages that answer the questions customers actually ask, in plain language',
        ],
        after: [
          [
            { text: 'Our checklist of ' },
            { text: 'what AI search tools look at before recommending a business', to: '/blog/what-ai-search-tools-look-at-before-recommending-your-business' },
            { text: ' and the most common ' },
            { text: 'structured data mistakes', to: '/blog/structured-data-mistakes-hurt-local-business-ai-search' },
            { text: ' cover each of these in more detail.' },
          ],
        ],
      },
      {
        heading: 'Why Denver Businesses Should Start Now',
        paragraphs: [
          [{ text: "AI answers name only a few businesses, and once a business is a consistent, well-documented choice, it tends to keep getting named. In a market as crowded as Denver, the businesses that clean up their information early have an advantage that is hard for late movers to close." }],
          [
            { text: "The work also pays off twice. Everything that helps AI tools trust your business, from matching listings to steady reviews to clear website content, also helps you rank in the regular Google map pack. You're not choosing between " },
            { text: 'local SEO', to: '/local-seo-denver' },
            { text: ' and AI visibility. It is the same foundation.' },
          ],
        ],
      },
      {
        heading: 'Measuring AI Visibility',
        paragraphs: [
          [
            { text: "AI answers change from one run to the next, so a single screenshot doesn't tell you much. We look at the inputs that drive them, which you can measure and fix, and track AI referrals in your analytics. Google now tags some Gemini traffic so you can see it, which we explain in " },
            { text: 'how to start seeing AI visits to your website', to: '/blog/google-gemini-utm-parameters-ai-traffic-local-business' },
            { text: '. To see where you stand today, start with the ' },
            { text: 'free Visibility Score', to: '/audit' },
            { text: ', which checks all seven areas AI tools draw on.' },
          ],
        ],
      },
      {
        heading: 'Multi-Location Businesses',
        paragraphs: [
          [
            { text: "With several locations, small differences between listings multiply, and AI tools often merge, skip, or mix up locations. We keep every location's details consistent and clearly separate. More on why in " },
            { text: 'Why Multi-Location Businesses Struggle With AI Search', to: '/blog/why-multi-location-businesses-struggle-with-ai-search' },
            { text: '.' },
          ],
        ],
      },
    ],
    faqs: [
      {
        q: 'What is GEO?',
        a: 'GEO, or generative engine optimization, is the work of getting your business cited or recommended by AI tools like ChatGPT, Gemini, and Google AI Overviews. For a local business, it mostly comes down to consistent, verifiable information across the sources those tools read.',
      },
      {
        q: 'What is AEO?',
        a: 'AEO, or answer engine optimization, means structuring your information so search engines and AI assistants can use it as the direct answer to a question. Clear FAQ content and accurate structured data are the core of it.',
      },
      {
        q: 'Can you guarantee ChatGPT will recommend my business?',
        a: "No, and nobody can. AI tools decide in real time and their answers vary. What we can do is fix the information they check, so you're a strong candidate every time they look.",
      },
      {
        q: 'How do I know if AI tools are sending me customers?',
        a: 'Check the referral sources in Google Analytics for ChatGPT, Gemini, Perplexity, and Copilot, and the AI features report in Google Search Console. Many people also see a business in an AI answer and then search for it by name, so watch your branded searches too.',
      },
      {
        q: 'Should I block AI crawlers from my website?',
        a: "For most local businesses, no. If AI tools can't read your site, they rely on whatever other sources say about you. There are a few exceptions, which we walk through in our post on Google's AI opt-out.",
      },
    ],
    related: [
      { to: '/local-seo-denver', label: 'Local SEO in Denver' },
      { to: '/google-business-profile-management-denver', label: 'Google Business Profile Management in Denver' },
      { to: '/blog/ai-entity-footprint-audit-local-business', label: 'How to Audit Your AI Entity Footprint' },
      { to: '/blog/google-ai-search-opt-out-local-business', label: "Google's AI Opt-Out: Should Your Business Use It?" },
    ],
  },
];

export function getServicePage(slug) {
  return servicePages.find((p) => p.slug === slug);
}

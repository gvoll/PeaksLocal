// Single source for the founder's details: blog bylines and author box, the
// About page, and Person schema all read from here so they never disagree.
//
// `sameAs` is for profiles that are confirmed to be Greg's (e.g. his LinkedIn).
// Leave it empty rather than guessing: a wrong profile in schema tells Google
// and AI tools the wrong person wrote the content.
export const founder = {
  name: 'Greg Voll',
  jobTitle: 'Founder',
  url: 'https://www.peakslocal.com/about',
  bio: 'Greg founded PeaksLocal after 20+ years in operational systems, product lifecycle management, and complex program delivery, working with everyone from early-stage startups to Fortune 500 enterprises. He helps local businesses get found on Google, Apple Maps, Bing, and AI search from Denver, Colorado.',
  sameAs: [],
};

export function founderSchema() {
  return {
    "@type": "Person",
    "@id": `${founder.url}#founder`,
    "name": founder.name,
    "jobTitle": founder.jobTitle,
    "url": founder.url,
    "worksFor": { "@type": "Organization", "@id": "https://www.peakslocal.com", "name": "PeaksLocal" },
    ...(founder.sameAs.length ? { "sameAs": founder.sameAs } : {}),
  };
}

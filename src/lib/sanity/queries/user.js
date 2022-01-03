import groq from 'groq';

const AUTHOR_FIELDS = `
  _id,
  name,
  subheader,
  "avatar": avatar.asset->url,
  bio,
  website,
  socialMediaSites
`;

export const getOwnerQuery = (ownerID) =>
  groq`
*[_type == "author" && _id == "${ownerID}"] | order(_createdAt desc) [0] {
  ${AUTHOR_FIELDS}
}`;

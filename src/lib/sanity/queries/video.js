import groq from 'groq';

const VIDEO_FIELDS = `
    _id,
    title,
    excerpt,
    "thumbnail": thumbnail.asset->url,
    url,
    _createdAt
`;

export const listVideosOnPage = ({
  page = 1,
  limit = 3,
}) => {
  const startIndex = limit * (page - 1);

  const endIndex = limit * page - 1;

  const query = groq`
        *[_type == "video"] | order(_createdAt desc) [${startIndex}..${endIndex}] {
            ${VIDEO_FIELDS}
        }
    `;

  return query;
};

import groq from 'groq';

const ARTICLE_FIELDS = `
    _id,
    title,
    publishedAt,
    _createdAt,
    excerpt,
    keywords,
    "imageCover": imageCover.asset->url,
    "slug": slug.current,
    "author": author->{name, "avatar": avatar.asset->url},
    commentsQuantity,
    heartsQuantity,
    "categories": categories[]->{_id, title, "slug": slug.current},
`;

export const listArticlesOnPage = ({
  page = 1,
  limit = 3,
}) => {
  const startIndex = limit * (page - 1);

  const endIndex = limit * page - 1;

  const query = groq`
        *[_type == "article"] | order(_createdAt desc) [${startIndex}..${endIndex}] {
            ${ARTICLE_FIELDS}
        }
    `;

  return query;
};

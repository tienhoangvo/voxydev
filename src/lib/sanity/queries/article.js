import groq from 'groq';
import { COMMENT_PAGE_LIMIT } from './constants';

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
const COMMENT_FIELDS = `
  _id,
  content,
  user,
  article,
  _createdAt,
  createdAt,
  _updatedAt,
  repliesQuantity,
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

export const getArticlePageDataBySlug = ({ slug }) => {
  const query = groq`
    *[_type == "article" && slug.current == "${slug}"] [0] {
      ${ARTICLE_FIELDS}
      content[]{..., "asset": asset->},
      "relevantArticles": *[_type == "article" && _id != ^._id && count((categories[]->_id) [@ in ^.^.categories[]._ref]) > 0] [0..5] {
       ${ARTICLE_FIELDS}
      },

      "comments": *[_type == "comment" && article._ref == ^._id] | order(repliesQuantity desc, _createdAt desc) [0..${
        COMMENT_PAGE_LIMIT - 1
      }] {
       ${COMMENT_FIELDS}
      }

    }
  `;

  return query;
};

export const getArticleDetailsBySlug = ({ slug }) => {
  return `*[_type == "article" && slug.current == "${slug}"] [0] {
    content[]{..., "asset": asset->},
    ${ARTICLE_FIELDS}
  }`;
};

export const getArticleCommentsOnPage = ({
  articleId,
  page,
  limit,
  currentUserId,
}) => {
  const startIndex = limit * (page - 1);

  const endIndex = limit * page - 1;

  const query = groq`
    *[_type == "comment" && article._ref == "${articleId}" && user.ref._ref != "${currentUserId}"] | order(repliesQuantity desc, _createdAt desc)[${startIndex}..${endIndex}] {
      ${COMMENT_FIELDS}
    }
  `;

  return query;
};

export const getCurrentUserComments = ({
  articleId,
  currentUserId,
}) => {
  const query = groq`
  *[_type == "comment" && article._ref == "${articleId}" && user.ref._ref == "${currentUserId}"] | order(repliesQuantity desc,_createdAt desc) {
    ${COMMENT_FIELDS}
  }
  `;

  return query;
};

export const listRelevantArticlesByArticleId = ({
  articleId,
  articleCategories,
}) => {
  const query = groq`
 *[_type == "article" && _id != "${articleId}" && count((categories[] -> _id) [@ in ${JSON.stringify(
    articleCategories
  )}]) > 0] [0..5] {
     ${ARTICLE_FIELDS}
    }
  
`;

  return query;
};

export const blogSlugsQuery = `
*[_type == "article" && defined(slug.current)][].slug.current
`;

export const listUserFavoriteArticles = ({
  currentUserId,
}) =>
  groq`*[_type == "user" && _id == "${currentUserId}"] [0]{
  "favoriteArticles": favoriteArticles[]->{${ARTICLE_FIELDS}} 
}`;

const articleFields = `
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
  hearts,
  "categories": categories[]->{_id, title, "slug": slug.current},
`;

const videoFields = `
  _id,
  title,
  excerpt,
  "thumbnail": thumbnail.asset->url,
  video,
  _createdAt
`;

const commentFields = `
  _id,
  content,
  "user": user->{_id, name, avatar},
  article,
  _createdAt,
  createdAt,
  _updatedAt,
  repliesQuantity,
  userData,
`;

const replyFields = `
  _id,
  content,
  "user": user->{_id,name,avatar},
  comment,
  "repliedTo": repliedTo->{_id,name,avatar},
  _createdAt,
  createdAt,
  _updatedAt,
  userData,
  repliedToUserData,
`;

const authorFields = `
  _id,
  name,
  subheader,
  "avatar": avatar.asset->url,
  bio,
  website,
  socialMediaSites
`;

export const getOwnerQuery = (ownerID) =>
  ownerID
    ? `
*[_type == "author" && _id == "${ownerID}"] | order(_createdAt desc) [0] {
  ${authorFields}
}`
    : undefined;

export const indexQuery = `
*[_type == "article"] | order(_createdAt desc) {
  ${articleFields}
}`;

export const getBlogsQuery = ({
  start,
  end,
  orderCreatedAt = 'desc',
}) => `*[_type == "article"] | order(_createdAt ${orderCreatedAt}) [${start}..${end}] {
  ${articleFields}
}`;

export const getVideosQuery = ({
  start,
  end,
}) => `*[_type == "video"] | order(_createdAt desc) [${start}..${end}] {
  ${videoFields}
}`;

export const getBlogBySlugQuery = () => `
*[_type == "article" && slug.current == $slug] | order(_createdAt desc) [0] {
  content[]{..., "asset": asset->},
  ${articleFields}
}`;

export const getFavoriteArticles = ({ currentUserId }) =>
  currentUserId
    ? `*[_type == "article" && count((hearts[]._ref)[@ == "${currentUserId}"]) > 0]{
  ${articleFields}
}`
    : undefined;

export const getArticleBySlugQuery = (slug) => {
  if (!slug) return undefined;
  return `*[_type == "article" && slug.current == "${slug}"] [0] {
    content[]{..., "asset": asset->},
    ${articleFields}
  }`;
};

export const getHeartsByArticleSlug = (slug) => {
  console.log('getHeartsByArticleSlug', slug);
  if (!slug) return undefined;
  return `*[_type == "article" && slug.current == "${slug}"] [0] {
   hearts,
   heartsQuantity,
  }`;
};

export const getReleventArticlesByCategories = ({
  slug = '',
  categories = [],
}) => {
  if (!slug) return undefined;

  return `*[_type == "article" && slug.current != "${slug}" && count((categories[]._ref)[@ in ${JSON.stringify(
    categories
  )}]) > 0][0..5]{
    ${articleFields}
  }`;
};

export const getCurrentUserComments = ({
  articleId,
  currentUserId,
}) =>
  `
*[_type == "comment" && article._ref == "${articleId}" && user._ref == "${currentUserId}"] | order(_createdAt desc) {
  ${commentFields}
}`;

export const getCommentsByArticleId = ({ articleId }) =>
  `
*[_type == "comment" && article._ref == "${articleId}"] | order(_createdAt desc) {
  ${commentFields}
}`;

export const getOtherPeopleComments = ({
  articleId,
  currentUserId,
}) =>
  `
  *[_type == "comment" && article._ref == "${articleId}" && user._ref != "${currentUserId}"] | order(_createdAt desc) {
    ${commentFields}
  }`;

export const getPaginationCommentsByArticleId = ({
  articleId,
  startIndex,
  endIndex,
  currentUserId,
}) => `*[_type == "comment" && article._ref == "${articleId}" && user._ref != "${currentUserId}"] | order(_createdAt desc) [${startIndex}..${endIndex}] {
    ${commentFields}
  }`;

export const getPaginationRepliesByCommentId = ({
  commentId,
  startIndex,
  endIndex,
}) => `
  *[_type == "reply" && comment._ref == "${commentId}"] | order(_createdAt desc) [${startIndex}..${endIndex}] {
    ${replyFields}
  }`;

export const getRepliesByCommentId = ({ commentId }) => {
  return `
    *[_type == "reply" && comment._ref == "${commentId}"] | order(_createdAt desc){
      ${replyFields}
    }
    `;
};

export const blogQuery = `
{
  'article': *[_type == "article" && slug.current == $slug] | order(_createdAt desc) [0] {
    content[]{..., "asset": asset->},
    ${articleFields}
  },
  'moreArticles': *[_type == "article" && slug.current != $slug] | order(createdAt desc, _createdAt desc) [0...2] {
    ${articleFields}
  },
}`;

export const blogSlugsQuery = `
*[_type == "article" && defined(slug.current)][].slug.current
`;

export const blogBySlugQuery = `
*[_type == "article" && slug.current == $slug][0] {
  ${articleFields}
}
`;

const userFields = `
  _id,
  name,
  googleId,
  email,
  facebookId,
  avatar,
  _createdAt,
  _updatedAt
`;

export const userByGoogleId = `
*[_type == "user" && googleId == $googleId][0] {
  ${userFields}
}
`;

export const userById = `
*[_type == "user" && _id == $_id][0] {
  ${userFields}
}
`;

export const userByFacebookIdOrEmail = `
*[_type == "user" && (email == $email || googleId == $facebookId)][0] {
  ${userFields}
}
`;

export const userByGoogleIdOrEmail = `
*[_type == "user" && (email == $email || googleId == $googleId)][0] {
  ${userFields}
}
`;

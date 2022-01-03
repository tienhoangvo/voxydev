import groq from 'groq';

const REPLY_FIELDS = `
  _id,
  content,
  user,
  comment,
  _createdAt,
  createdAt,
  _updatedAt,
  repliedToUser,
`;

export const listRepliesByCommentId = ({ commentId }) => {
  return groq`
      *[_type == "reply" && comment._ref == "${commentId}"] | order(_createdAt desc){
        ${REPLY_FIELDS}
      }
      `;
};

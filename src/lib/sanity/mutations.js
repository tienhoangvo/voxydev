import axios from 'axios';
import groq from 'groq';

export const postRequest = axios.create({
  baseURL: `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET_NAME}`,
  headers: {
    Authorization: `Bearer ${process.env.SANITY_EDIT_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export const mutate = (mutations = [], params) => {
  return axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET_NAME}`,
    { mutations },
    {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${process.env.SANITY_EDIT_TOKEN}`,
      },
      params,
    }
  );
};

export const commentMutations = {
  createComment: ({
    userId = '',
    userName = '',
    userAvatar = '',
    userEmail = '',
    articleId = '',
    commentContent = '',
    commentCreatedAt = new Date(),
  }) => {
    const mutations = [
      {
        create: {
          _type: 'comment',
          user: {
            ref: {
              _type: 'reference',
              _ref: userId,
            },
            email: userEmail,
            name: userName,
            avatar: userAvatar,
          },
          article: {
            _type: 'reference',
            _ref: articleId,
          },
          content: commentContent,
          createdAt: commentCreatedAt,
          repliesQuantity: 0,
        },
      },

      {
        patch: {
          id: articleId,
          inc: {
            commentsQuantity: 1,
          },
        },
      },
    ];

    return mutate(mutations, { returnIds: true });
  },

  deleteComment: ({ commentId = '', articleId = '' }) => {
    const mutations = [
      {
        delete: {
          query: groq`*[_type == 'reply' && comment._ref == "${commentId}"]`,
        },
      },
      {
        delete: {
          id: commentId,
        },
      },
      {
        patch: {
          id: articleId,
          dec: {
            commentsQuantity: 1,
          },
        },
      },
    ];

    return mutate(mutations);
  },
};

export const replyMutations = {
  createReply: ({
    userId = '',
    userName = '',
    userAvatar = '',
    userEmail = '',
    repliedToUserId = '',
    repliedToUserName = '',
    repliedToUserAvatar = '',
    commentId = '',
    replyContent = '',
    replyCreatedAt = new Date(),
  }) => {
    const mutations = [
      {
        create: {
          _type: 'reply',
          user: {
            ref: {
              _type: 'reference',
              _ref: userId,
            },
            email: userEmail,
            name: userName,
            avatar: userAvatar,
          },
          comment: {
            _type: 'reference',
            _ref: commentId,
          },
          content: replyContent,
          createdAt: replyCreatedAt,
          repliedToUser: {
            ref: {
              _type: 'reference',
              _ref: repliedToUserId,
            },

            name: repliedToUserName,
            avatar: repliedToUserAvatar,
          },
        },
      },

      {
        patch: {
          id: commentId,
          inc: {
            repliesQuantity: 1,
          },
        },
      },
    ];

    return mutate(mutations, { returnDocuments: true });
  },

  deleteReply: ({
    replyId = '',
    commentId = '',
    userId = '',
  }) => {
    const mutations = [
      {
        delete: {
          query: `*[_type == 'reply' && _id == "${replyId}" && comment._ref == "${commentId}" && user.ref._ref == "${userId}"]`,
        },
      },
      {
        patch: {
          id: commentId,
          dec: {
            repliesQuantity: 1,
          },
        },
      },
    ];

    return mutate(mutations);
  },
};

import groq from 'groq';
import { HttpApiMutate } from '../clients/HttpApi';
import SanityEditClient from '../clients/SanityEditClient';

export const createNewComment = async ({
  currentUser,
  articleId,
  content,
  createdAt,
}) => {
  const newComment = {
    _type: 'comment',

    user: {
      ref: { _type: 'reference', _ref: currentUser._id },
      email: currentUser.email,
      name: currentUser.name,
      avatar: currentUser.avatar,
    },

    article: {
      _type: 'reference',
      _ref: articleId,
    },

    content,
    createdAt: createdAt,
    repliesQuantity: 0,
  };

  const articleUpdatedFields = {
    inc: {
      commentsQuantity: 1,
    },
  };

  const transactionInfo =
    await SanityEditClient.transaction()
      .create(newComment)
      .patch(articleId, articleUpdatedFields)
      .commit();

  console.log('transactionInfo', transactionInfo);

  const commentResult = transactionInfo.results.find(
    (r) => r.operation === 'create'
  );

  newComment._id = commentResult.id;

  console.log({ commentResult });

  return newComment;
};

export const deleteAComment = async ({
  commentId,
  articleId,
}) => {
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

  const { data: transactionInfo } = await HttpApiMutate(
    mutations
  );

  console.log(transactionInfo);

  return null;
};

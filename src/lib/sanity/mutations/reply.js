import { HttpApiMutate } from '../clients/HttpApi';
import SanityEditClient from './../clients/SanityEditClient';

export const createNewReply = async ({
  currentUser,
  repliedToUser,
  commentId,
  content,
  createdAt,
}) => {
  const newReply = {
    _type: 'reply',
    user: {
      ref: {
        _type: 'reference',
        _ref: currentUser._id,
      },

      email: currentUser.email,
      name: currentUser.name,
      avatar: currentUser.avatar,
    },
    comment: {
      _type: 'reference',
      _ref: commentId,
    },

    content,
    createdAt,
    repliedToUser: {
      ref: {
        _type: 'reference',
        _ref: repliedToUser._id,
      },
      name: repliedToUser.name,
      avatar: repliedToUser.avatar,
      email: repliedToUser.email,
    },
  };
  const transactionInfo =
    await SanityEditClient.transaction()
      .create(newReply)
      .patch(commentId, {
        inc: {
          repliesQuantity: 1,
        },
      })
      .commit();
  console.log('transactionInfo', transactionInfo);
  const replyResult = transactionInfo.results.find(
    (r) => r.operation === 'create'
  );

  console.log('replyResult', replyResult);
  newReply._id = replyResult.id;

  return newReply;
};

export const deleteAReply = async ({
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

  const { data: transactionInfo } = await HttpApiMutate(
    mutations
  );

  console.log('transactionInfo', transactionInfo);

  return null;
};

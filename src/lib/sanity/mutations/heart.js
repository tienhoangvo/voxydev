import SanityEditClient from '../clients/SanityEditClient';

export const heartArticle = async ({
  articleId = '',
  currentUser,
}) => {
  const articleUpdatedFields = {
    favoriteArticles: [
      ...currentUser.favoriteArticles,
      {
        _ref: articleId,
        _type: 'reference',
        _key: articleId,
        _weak: true,
      },
    ],

    favoriteArticlesQuantity:
      currentUser.favoriteArticlesQuantity + 1,
  };

  const transactionData =
    await SanityEditClient.transaction()
      .patch(currentUser._id, {
        set: articleUpdatedFields,
      })
      .patch(articleId, {
        inc: {
          heartsQuantity: 1,
        },
      })
      .commit();

  console.log('transactionData', transactionData);

  return { ...currentUser, ...articleUpdatedFields };
};

export const unheartArticle = async ({
  articleId = '',
  currentUser,
}) => {
  const articleUpdatedFields = {
    favoriteArticles: currentUser.favoriteArticles.filter(
      (article) => article._ref !== articleId
    ),

    favoriteArticlesQuantity:
      currentUser.favoriteArticlesQuantity - 1,
  };

  const transactionData =
    await SanityEditClient.transaction()
      .patch(currentUser._id, {
        set: articleUpdatedFields,
      })
      .patch(articleId, {
        dec: {
          heartsQuantity: 1,
        },
      })
      .commit();

  console.log('transactionData', transactionData);

  return { ...currentUser, ...articleUpdatedFields };
};

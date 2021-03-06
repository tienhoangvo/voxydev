// @mui/lab
import LoadingButton from '@mui/lab/LoadingButton';

// @mui/icons-material
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

// @react
import { useState, useMemo, useCallback } from 'react';

// @axios
import axios from 'axios';

// @src/hooks

import useCurrentUser from '../../hooks/useCurrentUser';

const HeartButton = ({ articleId = '' }) => {
  const { currentUser, mutate } = useCurrentUser();
  const [status, setStatus] = useState('idle');

  const hearted = useMemo(() => {
    if (!currentUser) return false;
    if (!articleId) return false;
    if (!currentUser.favoriteArticles) return false;
    if (!currentUser.favoriteArticles.length) return false;

    return currentUser.favoriteArticles.some(
      (articleRef) => articleRef._ref === articleId
    );
  }, [articleId, currentUser]);

  const title = useMemo(() => {
    if (!currentUser) return 'Login to heart';

    return hearted ? 'Unheart this' : 'Heart this';
  }, [hearted, currentUser]);

  const buttonIcon = useMemo(() => {
    return hearted ? (
      <FavoriteIcon />
    ) : (
      <FavoriteBorderIcon />
    );
  }, [hearted]);

  const heartArticle = () => {
    axios
      .post(`/api/hearts?articleId=${articleId}`)
      .then((res) => {
        const user = res.data;
        setStatus('heart success');

        mutate(user, {
          populateCache: true,
          revalidate: false,
        });
      });
  };
  const unheartArticle = () => {
    axios
      .delete(`/api/hearts?articleId=${articleId}`)
      .then((res) => {
        const user = res.data;
        setStatus('unheart success');

        mutate(user);
      });
  };

  const onButtonClick = useCallback(() => {
    if (!currentUser) return;

    setStatus('pending');
    if (hearted) {
      unheartArticle();
      return;
    }

    heartArticle();
  }, [hearted, currentUser]);

  return (
    <LoadingButton
      size="small"
      color="heart"
      variant="outlined"
      loading={status === 'pending'}
      startIcon={buttonIcon}
      onClick={onButtonClick}
    >
      {title}
    </LoadingButton>
  );
};

export default HeartButton;

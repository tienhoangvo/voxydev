// @mui/lab
import LoadingButton from '@mui/lab/LoadingButton';

// @mui/material
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

// @mui/icons-material
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

// @react
import { useState, useMemo, useCallback } from 'react';

// @axios
import axios from 'axios';

// @src/hooks
import useCurrentUser from '../../hooks/useCurrentUser';
import useArticleHearts from '../../hooks/useArticleHearts';

const HeartButton = () => {
  const {
    heartData,

    mutate: mutateHeartData,
  } = useArticleHearts();

  const [status, setStatus] = useState('idle');

  const { currentUser } = useCurrentUser();

  const hearted = useMemo(() => {
    if (!currentUser) return false;
    if (!heartData) return false;

    return heartData.hearts
      ? heartData.hearts.some(
          (heart) => heart._ref === currentUser._id
        )
      : false;
  }, [heartData, currentUser]);

  const tooltipTitle = useMemo(() => {
    if (!currentUser) return 'Login to heart this';

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
      .post(`/api/hearts?articleId=${heartData?._id}`)
      .then((res) => {
        const newHeartData = res.data;
        setStatus('heart success');

        mutateHeartData(newHeartData, false);
      });
  };
  const unheartArticle = () => {
    axios
      .delete(`/api/hearts?articleId=${heartData?._id}`)
      .then((res) => {
        const newHeartData = res.data;
        setStatus('unheart success');

        mutateHeartData(newHeartData, false);
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
  }, [hearted, heartData, currentUser]);

  return (
    <Tooltip title={tooltipTitle}>
      <LoadingButton
        size="small"
        color="heart"
        variant="outlined"
        loading={status === 'pending'}
        startIcon={buttonIcon}
        onClick={onButtonClick}
      >
        {heartData?.heartsQuantity || 0}
      </LoadingButton>
    </Tooltip>
  );
};

export default HeartButton;

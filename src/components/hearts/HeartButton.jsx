// @mui/lab
import LoadingButton from '@mui/lab/LoadingButton';

// @mui/material
import Tooltip from '@mui/material/Tooltip';

// @mui/icons-material
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

// @react
import { useState, useMemo, useCallback } from 'react';

// @axios
import axios from 'axios';

// @src/hooks

import useArticleHearts from '../../hooks/useArticleHearts';

const HeartButton = ({ defaultHeartData }) => {
  const { heartData, heartStatus, mutateHeartData } =
    useArticleHearts({ defaultHeartData });

  const [status, setStatus] = useState('idle');

  const tooltipTitle = useMemo(() => {
    if (heartStatus === 'blocking')
      return 'Login to heart this';

    if (!heartStatus === 'hearted') return 'Unheart this';

    return 'Heart this';
  }, [heartStatus]);

  console.log(heartStatus);

  const buttonIcon = useMemo(() => {
    return heartStatus === 'hearted' ? (
      <FavoriteIcon />
    ) : (
      <FavoriteBorderIcon />
    );
  }, [heartStatus]);

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
    setStatus('pending');
    if (heartStatus === 'hearted') {
      unheartArticle();
      return;
    }

    heartArticle();
  }, [heartStatus, heartData]);

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

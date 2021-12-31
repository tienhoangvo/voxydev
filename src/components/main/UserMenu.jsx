import Stack from '@mui/material/Stack';

import PalletteSwitchButton from '../PalletteSwitchButton';
import useCurrentUser from '../../hooks/useCurrentUser';
import LoginButton from './../auth/LoginButton';

import UserAvatarButton from './UserAvatarButton';

const UserMenu = () => {
  const { currentUser, mutate } = useCurrentUser();

  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      justifyContent="center"
    >
      <PalletteSwitchButton />

      {currentUser && (
        <UserAvatarButton
          userAvatar={currentUser.avatar}
          userName={currentUser.name}
          favoriteArticlesQuantity={
            currentUser.favoriteArticlesQuantity
          }
        />
      )}

      {!currentUser && <LoginButton />}
    </Stack>
  );
};

export default UserMenu;

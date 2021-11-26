// @mui/material
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';

// @mui/lab
import LoadingButton from '@mui/lab/LoadingButton';

// @mui/icons-material
import MailIcon from '@mui/icons-material/Mail';

// @mui/react-google-recaptcha
import ReCAPTCHA from 'react-google-recaptcha';

// @react
import { useRef, useMemo, useState } from 'react';

// @axios
import axios from 'axios';

// @react-hook-form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// @src/context
import { usePallete } from '../../../contexts/PalleteContext';

// @src/components/contact
import contactValidationSchema from './contactValidationSchema';

const ContactForm = () => {
  const { mode } = usePallete();
  const recaptchaRef = useRef(null);
  const [status, setStatus] = useState('idle');

  const {
    register,
    handleSubmit,
    formState,
    reset,
    getValues,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(contactValidationSchema),
  });

  const onSnackbarClose = () => {
    setStatus('idle');
  };

  const snackbarOpen = useMemo(() => {
    return status === 'success' || status === 'error';
  }, [status]);

  const snackbarMessage = useMemo(() => {
    if (status === 'success')
      return 'Your contact info has sent succesfully to the admin!';

    if (status === 'error')
      return 'Something went wrong, please try it later!';

    return 'No Message';
  }, [status]);

  const onSubmit = (data) => {
    console.log(data);

    setStatus('pending');
    // Execute the reCAPTCHA when the form is submitted
    recaptchaRef.current.execute();
  };

  const onReCAPTCHAChange = (captchaCode) => {
    if (!captchaCode) return;

    const formData = getValues();

    axios
      .post('/api/contact', {
        ...formData,
        captchaCode,
      })
      .then((res) => {
        console.log('CREATE CONTACT SUCCESFULLY');
        console.log(res.data);
        setStatus('success');
        recaptchaRef.current.reset();
        reset({
          name: '',
          email: '',
          subject: '',
          content: '',
        });
      })
      .catch((err) => {
        console.log('ERROR 💥 CREATE CONTACT');
        console.error(err);
        console.dir(err);
        setStatus('error');
        recaptchaRef.current.reset();
      });
  };
  return (
    <>
      <Card
        elevation={0}
        sx={{
          bgcolor: (theme) =>
            theme.palette.background.primary,
          borderLeft: 10,
          borderColor: 'primary.light',
          p: 1,
        }}
      >
        <CardHeader
          avatar={
            <Avatar
              sx={{
                bgcolor: 'unset',
                color: (theme) =>
                  theme.palette.primary.main,

                borderTop: 3,
                borderBottom: 3,
                borderColor: (theme) =>
                  theme.palette.primary.main,
              }}
            >
              <MailIcon />
            </Avatar>
          }
          title="I want to build..."
          sx={{
            borderBottom: 2,
            borderColor: 'divider',
            alignItems: 'flex-start',
          }}
          subheader={`Wanna build something but having problem? Have a suggestion for content? Maybe just a general question? I would love to hear from you!`}
          titleTypographyProps={{
            variant: 'h6',
            component: 'h1',
          }}
        />

        <CardContent>
          <Stack
            spacing={2}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              disabled={status === 'pending'}
              error={!!formState.errors.name}
              helperText={
                formState.errors.name?.message || ''
              }
              color="primary"
              size="small"
              label="Name"
              fullWidth
              variant="filled"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                sx: { fontSize: '.875rem' },
              }}
              inputProps={{
                ...register('name'),
              }}
            />
            <TextField
              disabled={status === 'pending'}
              error={!!formState.errors.email}
              helperText={
                formState.errors.email?.message || ''
              }
              color="primary"
              size="small"
              label="Email"
              variant="filled"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                sx: { fontSize: '.875rem' },
              }}
              inputProps={{
                ...register('email'),
              }}
            />

            <TextField
              disabled={status === 'pending'}
              error={!!formState.errors.subject}
              helperText={
                formState.errors.subject?.message || ''
              }
              color="primary"
              size="small"
              label="Subject"
              fullWidth
              variant="filled"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                sx: { fontSize: '.875rem' },
              }}
              inputProps={{
                ...register('subject'),
              }}
            />

            <TextField
              disabled={status === 'pending'}
              error={!!formState.errors.content}
              helperText={
                formState.errors.content?.message || ''
              }
              InputLabelProps={{
                shrink: true,
              }}
              color="primary"
              size="small"
              label="Content"
              variant="filled"
              fullWidth
              multiline
              minRows={5}
              placeholder="Please include any relevant details with your request. Dates, times, location, etc."
              InputProps={{
                sx: { fontSize: '.875rem' },
              }}
              inputProps={{
                ...register('content'),
              }}
            />

            <ReCAPTCHA
              size="invisible"
              theme={mode}
              ref={recaptchaRef}
              sitekey={
                process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
              }
              onChange={onReCAPTCHAChange}
            />

            <LoadingButton
              loading={status === 'pending'}
              disableElevation
              disabled={
                !formState.isDirty || !formState.isValid
              }
              variant="contained"
              color="primary"
              size="large"
              type="submit"
            >
              Submit
            </LoadingButton>
          </Stack>
        </CardContent>
      </Card>
      <Snackbar
        open={snackbarOpen}
        onClose={onSnackbarClose}
        message={snackbarMessage}
        TransitionComponent={(props) => (
          <Slide {...props} direction="up" />
        )}
        autoHideDuration={5000}
        key={new Date()}
      />
    </>
  );
};

export default ContactForm;

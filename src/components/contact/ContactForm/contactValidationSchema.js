import { object, string } from 'yup';

// name string
// email
// subject number
// content string

const contactValidationSchema = object().shape({
  name: string().required(`What's your name?`).trim(),
  email: string()
    .email('Invalid email address')
    .required(`What's your email address ?`)
    .trim(),

  subject: string().required(`What's it about?`).trim(),
  content: string()
    .required('Please include the details!')
    .trim(),
});

export default contactValidationSchema;

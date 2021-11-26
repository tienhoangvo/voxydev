import { object, string } from "yup";

// comment str
// rating number
const commentValidationSchema = object().shape({
  content: string()
    .required("What did you think about the article? 😀")
    .max(
      1000,
      "That's a lot, Please say something less than 1000 words long 💘"
    ),
});

export default commentValidationSchema;

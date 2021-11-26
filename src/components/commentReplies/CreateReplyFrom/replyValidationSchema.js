import { object, string } from "yup";

// reply str
// rating number
const replyValidationSchema = object().shape({
  content: string()
    .required("This field cannot be empty? 😀")
    .max(
      1000,
      "That's a lot, Please say something less than 1000 words long 💘"
    ),
});

export default replyValidationSchema;

import axios from 'axios';
import { writeClient } from '../../src/lib/sanity/sanity.server';

const contactHandler = (req, res) => {
  switch (req.method) {
    case 'POST': {
      return createContact(req, res);
    }
    default: {
      res.status(404).json({
        message: `Cannot find ${req.method} ${req.url}`,
      });
    }
  }
};

const createContact = async (req, res) => {
  const { name, email, subject, content, captchaCode } =
    req.body;

  // validate the captchaCode

  try {
    const { data: captchaValidationData } =
      await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaCode}`,
        null,
        {
          headers: {
            'Content-Type':
              'application/x-www-form-urlencoded; charset=utf-8',
          },
        }
      );

    console.log(captchaValidationData);

    if (captchaValidationData.success) {
      // Create New Contact Info

      const contact = await writeClient.create({
        _type: 'contact',
        name,
        email,
        subject,
        content,
      });

      return res.status(201).json(contact);
    }
  } catch (error) {
    console.error(error);
    return res.status(422).json({
      message:
        'Unproccesable request, Invalid captcha code',
    });
  }

  res.status(422).json({
    message: 'Unproccesable request, Invalid captcha code',
  });
};

export default contactHandler;

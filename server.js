import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); 

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public')); 

app.post('/send', (req, res) => {
  const { name, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_USER, 
      pass: process.env.SMTP_PASS 
    }
  });


  const mailOptions = {
    from: email,
    to: process.env.SMTP_USER, 
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };


  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Mail did not send: ' + error.message);
    }
    res.status(200).send('Mail did send: ' + info.response);
  });
});


app.listen(port, () => {
  console.log(`Server running on, http://localhost:${port}`);
});
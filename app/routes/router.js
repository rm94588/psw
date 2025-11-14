var express = require("express");
var router = express.Router();
var nodemailer = require("nodemailer");

router.get("/", (req, res) => {
  res.render("pages/dotenv");
});

router.post("/dotenv", (req, res) => {
  // NODEMAILER
  const { nome, mensagem, email, telefone, assunto } = req.body;

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `${assunto}`,
    html: `
        <h2>Novo envio do formulário</h2>
        <p><b>Nome:</b> ${nome}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Telefone:</b> ${telefone}</p>
        <p><b>Mensagem:</b> ${mensagem}</p>
      `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Erro:", error);
      return res.send("Erro ao enviar e-mail");
    }

    console.log("Email enviado:", info.response);
    res.send("E-mail enviado com sucesso!");
  });
});

module.exports = router;
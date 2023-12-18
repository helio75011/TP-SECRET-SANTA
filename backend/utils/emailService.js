const nodemailer = require('nodemailer');

async function sendInvitationEmail(email, groupName) {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'votre_email@gmail.com',
      pass: 'votre_mot_de_passe'
    }
  });

  const mailOptions = {
    from: 'votre_email@gmail.com',
    to: email,
    subject: `Invitation à rejoindre le groupe ${groupName} sur Secret Santa`,
    text: `Vous avez été invité à rejoindre le groupe ${groupName} sur Secret Santa. Cliquez sur ce lien pour accepter l'invitation: [lien d'acceptation].`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email d'invitation envoyé à " + email);
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email : ", error);
  }
}

module.exports = sendInvitationEmail;

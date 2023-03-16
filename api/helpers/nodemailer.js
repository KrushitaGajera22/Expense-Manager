const Constants = sails.config.constants;

module.exports = {


  friendlyName: 'Nodemailer',


  description: 'Nodemailer something.',


  inputs: {
    user: {
      type: 'ref',
      required: true
    },
    pass: {
      type: 'ref',
      required: true
    },
    to: {
      type: 'ref',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs, exits) {
    // TODO
    let transporter = Constants.nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: `${inputs.user}`,
        pass: `${inputs.pass}`
      },

    });

    // options for sending a mail
    const mailOptions = {
      from: Constants.userName,
      to: `${inputs.to}`,
      subject: "Welcome!",
      text: "Thank you for signing up!!",
      html: `<b>Thank you for signing up ${inputs.to.split('@')[0]}!!</b>`, // html body
    };
    
    transporter.sendMail(mailOptions, (err) => {
      if (err) { return err; }
      console.log('Mail Sent');
      console.log(mailOptions);
    })

    return exits.success();

  }


};


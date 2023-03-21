const Constants = sails.config.constants;

module.exports = {


  friendlyName: 'Nodemailer',


  description: 'Nodemailer something.',


  inputs: {
    // email from which mail is sent (sender's email)
    user: {
      type: 'ref',
      required: true
    },
    //password of above email address(sender's password)
    pass: {
      type: 'ref',
      required: true
    },
    // Receiver's email address
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
    // create transporter object using the default SMTP transport
    let transporter = Constants.nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: `${inputs.user}`, //sender's email
        pass: `${inputs.pass}` // sender's password
      },

    });

    // options for sending a mail
    const mailOptions = {
      from: Constants.userName, //sender's email
      to: `${inputs.to}`, // Receiver's email
      subject: "Welcome!",  //subject of email
      html: `<b>Thank you for signing up ${inputs.to.split('@')[0]}!!</b>`, // html body
    };
    
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (err) => {
      if (err) { return err; }
      console.log('Mail Sent');
      console.log(mailOptions);
    })

    return exits.success();

  }


};


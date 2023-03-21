const Constants = sails.config.constants;

module.exports = {


  friendlyName: 'Hash password',


  description: '',


  inputs: {
    // password of user
    password: {
      type: 'string'
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs, exits) {

    try {
      // appliying salting and hashing on password
      const hash = await Constants.bcrypt.hash(inputs.password, 10);
      return exits.success({ hash })
    } catch (e) {
      return exits.success(undefined)
    }

  }


};


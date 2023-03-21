const Constants = sails.config.constants;

module.exports = {


  friendlyName: 'Generate token',


  description: '',


  inputs: {
    // data through which jwt sign
    data: {
      type: 'json'
    },
    // expiration time of token
    expiresIn: {
      type: 'number'
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs, exits) {

    try {
      let token;
      //signing the token
        token = await Constants.jwt.sign(inputs.data, Constants.jwt_secret,
          { expiresIn : inputs.expiresIn});
          
      return exits.success({ token })
    } catch (e) {
      return exits.success(undefined)
    }

  }


};


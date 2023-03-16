/**
 * Account.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    AName: {
      type: 'string',
      required: true,
    },
    //using user model with many-to-many association
    users: {
      collection: 'user',
      via: 'accounts'
    },

    // using transaction model with one-to-many association
    transactions: {
      collection: 'transaction',
      via: 'Account'
    }

  },

};


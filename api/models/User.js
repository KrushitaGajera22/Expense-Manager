/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  dontUseObjectIds: true,
  attributes: {
    name: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      isEmail: true,
      required: true,
      unique: true,
    },
    password: {
      type: 'string',
      minLength: 8,
      required: true,
    },
    // using account model with many-to-many association
    accounts: {
      collection: 'account',
      via: 'users'
    },

  },

};


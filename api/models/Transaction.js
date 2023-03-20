/**
 * Transaction.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  dontUseObjectIds: true,
  attributes: {
    types: {
      type: 'string',
      required: true,
    },
    amount: {
      type: 'number',
      required: true,
    },
    date: {
      type: 'ref',
      columnType: 'datetime',
      required: true,
    },

    //using account model with one-to-many association
    Account: {
      model: 'account'
    }
  },

};


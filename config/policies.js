/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  //  '*': 'auth',
  UserController: {
    'addEmail': 'auth',
    'update': 'auth',
    'delete': 'auth'
  },
  AccountController: {
    'create': 'auth',
    'showAccount': 'auth',
    'edit': 'auth',
    'delete': 'auth'
  },
  TransactionController: {
    'createTransaction': true,
    'editTransaction': true,
    'deleteTransaction': true
  }
};

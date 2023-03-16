/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },
  //routes for userController
  'post /signup': 'UserController.signup',
  'post /login':'UserController.login',
  'post /addEmail/:id':'UserController.addEmail',
  'get /list': 'UserController.list',
  'get /show/:id': 'UserController.show',
  'patch /update/:id': 'UserController.update',
  'get /logout/:id': 'UserController.logout',


   //routes for accountController
  'post /create': 'AccountController.create',
  'get /lists': 'AccountController.list',
  'get /showAccount/:id': 'AccountController.showAccount',
  'patch /edit/:id': 'AccountController.edit',
  'delete /delete/:id': 'AccountController.delete',


   //routes for transactionController
   'post /createTransaction': 'TransactionController.createTransaction',
   'get /listTransaction': 'TransactionController.listTransaction',
   'patch /editTransaction/:id': 'TransactionController.editTransaction',
   'delete /deleteTransaction/:id': 'TransactionController.deleteTransaction',
 
  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};

const { Model } = require('objection');
class Users extends Model {
  static get tableName() {
    return 'users';
  }
}
var users = new Users('your-device-secret-key');


  module.exports = Users;
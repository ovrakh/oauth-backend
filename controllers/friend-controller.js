const BaseController = require('./base-controller');

var vk = require('vk-sdk');
let friends = [];

class FriendController extends BaseController {
    constructor() {
        super();
    }

    getAll(req, res, next) {

            vk.setToken(req.query.access_token);

            vk.callMethod('friends.get', {
                version: 5.87,
                uids: req.query.user_id,
                fields: 'online,photo_100',
                count: 5
            })
                .then(users => {
                    req.dataOut = users;
                    next();
                })
                .catch(err => {
                    return err;
                });


/*            vk.callMethod('users.get', {
                version: 5.52,
                uids: req.query.user_id
            })
                .then(user => {
                    friends.push(user[0]);
                    console.log('fri', friends);
                    req.dataOut =  friends;
                    next();
                })
                .catch(err => {

                });*/

    }
}

module.exports = new FriendController();
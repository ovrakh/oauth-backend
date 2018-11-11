const BaseController = require('./base-controller');

var vk = require('vk-sdk');

class FriendController extends BaseController {
    constructor() {
        super();
    }

    async getAll(req, res, next) {
        try {
            console.log('req', req.query.access_token)
            vk.setToken(req.query.access_token);

            let friends = await vk.callMethod('friends.get', {
                version: 5.87,
                uids: req.query.user_id,
                fields: 'online,photo_100',
                count: 5
            });

            let me = await vk.callMethod('users.get', {
                version: 5.52,
                uids: req.query.user_id
            });

            friends.push(me[0]);

            console.log('fri', friends);

            req.dataOut = friends;

            next();
        } catch (error) {
            next({ code: 111, message: 'xz'})
        }
    }
}

module.exports = new FriendController();
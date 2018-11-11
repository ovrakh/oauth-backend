const BaseController = require('../controllers/base-controller');

const User = require('../models/user');

class AuthService extends BaseController {
    constructor() {
        super();
    }

    async asUser(req, res, next) {
        try {

            req.checkHeaders('Authorization').notEmpty();

            await this.getValidationResult(req);

            let session = await this._getSessionByToken(req.headers.authorization);

            let user =  await User.findById(session);

            if (!user) {
                throw { code : 404, message : 'User not found' };
            }

            req.user = user;

            next();
        } catch(error) {
            next(error);
        }
    }

    async _getSessionByToken(token) {

        let session = await User.findOne({ accessToken : token});

        if (!session) {
            throw { code : 401, message : 'Session not found' };
        }

        if (session.expiresAt < Date.now()) {
            session.remove();
            throw { code : 401, message : 'Session invalid' };
        }
        return session;
    }

}

module.exports = new AuthService();
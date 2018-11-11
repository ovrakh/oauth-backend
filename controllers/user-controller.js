const BaseController = require('../controllers/base-controller');

const config = require('jconf');

const User = require('../models/user');

class UserController extends BaseController {
    constructor() {
        super();
    }

    async signIn(req, res, next) {
        try {
            req.checkBody('accessToken').notEmpty();
            req.checkBody('userId').notEmpty();
            req.checkBody('expiresAt').notEmpty();

            await this.getValidationResult(req);

            req.dataOut = await new User({
                accessToken: req.body.accessToken,
                userId: req.body.userId,
                expiresAt: +req.body.expiresAt + Date.now()
            }).save();

            next();
        } catch (error) {
            next(error);
        }
    }

    async logout(req, res, next) {
        try {
            req.checkHeaders('Authorization').notEmpty();

            console.log('AUTHORIZATION',req.headers.authorization)

            await this.getValidationResult(req);

            req.dataOut = await User.deleteOne({ accessToken: req.headers.authorization });
            next();
        } catch(error) {
            next(error);
        }
    }
}

module.exports = new UserController();
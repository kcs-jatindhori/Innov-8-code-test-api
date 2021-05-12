import jwt from 'jsonwebtoken';
import path from 'path';
import log from '../helper/logger';
import response from '../helper/response';
import TokenModel from '../modules/auth/model/TokenModel';
import constants from './constants';


/**
 * verifyToken
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const verifyToken = async (req, res, next) => {

    try {

        if (req.headers.authorization) {

            const tokenData = req.headers.authorization.split(' ');
            const token = await TokenModel.findToken(tokenData[1], res);
            const privateKey = process.env.JWT_SECRET;

            const user = await jwt.verify(
                tokenData[1],
                privateKey,
                { algorithm: 'HS256' },
            );
            if (token && user) {
                req.user = user;
                req.user.token = tokenData[1];
                next();
            } else {
                return response.res401(res, {}, constants.messages.Error401);
            }
        } else {
            return response.res401(res, {}, constants.messages.Error401);
        }
    } catch (e) {
        log.error(null, e, path.join(__dirname, path.basename(__filename)));
        return response.res401(res, {}, constants.messages.Error401);
    }
};

export default verifyToken

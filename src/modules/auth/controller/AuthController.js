import path from 'path';
import _ from 'lodash';
import jwt from 'jsonwebtoken';
import Response from '../../../helper/response';
import log from '../../../helper/logger';
import constant from '../../../config/constants';
import { validationResult } from 'express-validator'
import UserModel from '../model/UserModel';
import TokenModel from '../model/TokenModel';
const crypto = require('crypto');


class AuthController {
    /**
   * Class default constructor
   */
    constructor() {
        this.file_path = path.join(__dirname, path.basename(__filename));
    }

    /**
     * User Login
     *
     * @param {*} req
     * @param {*} res
     * @returns {object} reflection object
     */
    login = async (req, res) => {
        try {

            const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

            if (!errors.isEmpty()) {
                return Response.res422(res, errors.array(), constant.messages.Error422);
            }

            const hashingSecret = process.env.ENCRYPTION_KEY;
            req.body.password = crypto.createHmac('sha256', hashingSecret).update(req.body.password).digest('hex');
            const userDetail = await UserModel.getUserByEmailPassword(req, res);

            if (userDetail) {
                const token = await this.getToken(userDetail.id, userDetail.username);
                if (token) {
                    // Save Token for user
                    const tokenData = { user_id: userDetail.id, token: token }
                    await TokenModel.saveToken(tokenData, res);

                    Response.res200(res, { token }, '', constant.messages.loginMessage);
                } else {
                    Response.res500(res, '', 'Fail to genarate token');
                }
            } else {
                Response.res422(
                    res,
                    { message: constant.messages.userNotExiest },
                    constant.messages.userNotExiest,
                );
            }
        } catch (e) {
            log.error(res, e, this.file_path);
        }
    };

    /**
     * Logout user
     *
     * @param {*} req
     * @param {*} res
     * @returns {object} reflection object
     */
    logout = async (req, res) => {
        try {
            const tokenData = { token: req.user.token };
            const data = await TokenModel.deleteToken(tokenData, res);
            console.log(data);
            Response.res200(res, { message: constant.messages.logout });
        } catch (e) {
            log.error(res, e, this.file_path);
        }
    };

    /**
     * Get token
     *
     * @param {*} req
     * @param {*} res
     * @returns {object} reflection object
     */
    getToken = async (userId, userName) => {
        try {
            const payload = { user_id: userId, username: userName };
            const privateKey = process.env.JWT_SECRET;
            const token = await jwt.sign(payload, privateKey, { algorithm: 'HS256', expiresIn: '2h', issuer: 'inFleet' });
            return token;
        } catch (e) {
            log.error(res, e, this.file_path);
        }
    };
}
export default new AuthController();

import path from 'path';
import jwt from 'jsonwebtoken';
import Response from '../../../helper/response';
import log from '../../../helper/logger';
import constant from '../../../config/constants';
import TokenModel from '../../../database/TokenCollection';

class TokenValidation {
    /**
   * Class default constructor
   */
    constructor() {
        this.file_path = path.join(__dirname, path.basename(__filename));
    }

  /**
   * Validate token
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  verify = (req, res, next) => {
      try {
          const token = req.body.refresh_token;
          if (token) {
              const is_available = TokenModel.findOne({ refreshToken: token });
              if (is_available) {
                  const user = jwt.verify(
                      token,
                      constant.keys.refreshTokenPublicKEY,
                      constant.authConfig,
                  );
                  if (user) {
                      res.locals.user = { id: user.id, token };
                      return next();
                  }
              }
          }
          Response.res422(res, {
              refresh_token: constant.messages.invalidRefreshToken,
          });
      } catch (e) {
          log.error(res, e, this.file_path);
      }
  };
}

export default new TokenValidation();

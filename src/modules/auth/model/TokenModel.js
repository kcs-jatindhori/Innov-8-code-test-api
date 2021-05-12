import path from 'path';
import log from '../../../helper/logger';
import db from '../../../config/database'

class TokenModel {
    /**
   * Class default constructor
   */
    constructor() {
        this.file_path = path.join(__dirname, path.basename(__filename));
    }

    /**
     * Save token
     */
    saveToken = async (data, res) => {
        try {
            const tokenData = await db('tokens').insert(data);
            return tokenData;
        } catch (e) {
            log.error(res, e, this.file_path);
        }
        return false;
    };

    /**
     * Find token
     */
    findToken = async (token, res) => {
        try {
            const tokenData = await db('tokens').select('token').where({ 'token': token }).first().then((row) => row);
            return tokenData;
        } catch (e) {
            log.error(res, e, this.file_path);
        }
        return false;
    };

    /**
     * Delete token
     */
    deleteToken = async (data, res) => {
        try {
            const tokenData = await db('tokens').where(data).del()
            return tokenData;
        } catch (e) {
            log.error(res, e, this.file_path);
        }
        return false;
    };
}

export default new TokenModel();

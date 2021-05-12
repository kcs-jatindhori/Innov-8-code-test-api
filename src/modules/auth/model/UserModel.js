import path from 'path';
import log from '../../../helper/logger';
import db from '../../../config/database'

class UserModel {
    /**
   * Class default constructor
   */
    constructor() {
        this.file_path = path.join(__dirname, path.basename(__filename));
    }

    /**
     * get user by email and password
     */
    getUserByEmailPassword = async (req, res) => {
        try {
            const user = db('users').select('id', 'first_name', 'last_name', 'username').where({ 'username': req.body.username, 'password': req.body.password }).first().then((row) => row)
            return user
        } catch (e) {
            log.error(res, e, this.file_path);
        }
        return false;
    };
}

export default new UserModel();


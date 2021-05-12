import { body } from 'express-validator'

exports.validateLogin = (method) => {
    switch (method) {
        case 'loginUser': {
            return [
                body('username', 'Invalid Username').not().isEmpty().isEmail(),
                body('password', 'Invalid password').not().isEmpty(),
            ]
        }
    }
}

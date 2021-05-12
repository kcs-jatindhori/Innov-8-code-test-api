import { body } from 'express-validator'

exports.validateCreateTicket = (method) => {
    switch (method) {
        case 'createTicket': {
            return [
                body('ticket_desc', 'Please enter ticket description').not().isEmpty(),
            ]
        }
    }
}

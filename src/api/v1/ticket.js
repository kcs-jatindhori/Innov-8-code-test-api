import express from 'express';

import TicketValidation from '../../modules/ticket/validation/ticketValidation';
import TicketController from '../../modules/ticket/controller/TicketController';

const router = express.Router();

// add ticket
router.post('/add', TicketValidation.validateCreateTicket('createTicket'), TicketController.createTicket);

// get tickets
router.get('/', TicketController.getTickets);


export default router;
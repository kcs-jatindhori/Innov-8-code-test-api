import path from 'path';
import _ from 'lodash';
import Response from '../../../helper/response';
import log from '../../../helper/logger';
import constant from '../../../config/constants';
import { validationResult } from 'express-validator'
import TicketModel from '../model/TicketModel';


class TicketController {
    /**
   * Class default constructor
   */
    constructor() {
        this.file_path = path.join(__dirname, path.basename(__filename));
    }

    /**
     * Create Ticket
     *
     * @param {*} req
     * @param {*} res
     * @returns {object} reflection object
     */
    createTicket = async (req, res) => {
        try {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return Response.res422(res, errors.array(), constant.messages.Error422);
            }

            const ticketData = { user_id: req.user.user_id, ticket_desc: req.body.ticket_desc };
            const ticketDetail = await TicketModel.saveTicket(ticketData, res);

            if (ticketDetail[0]) {
                Response.res200(res, { ticket_no: ticketDetail[0] }, '', constant.messages.ticketCreatedSuccess);
            } else {
                Response.res500(
                    res,
                    constant.messages.ticketCreatedFail,
                );
            }
        } catch (e) {
            log.error(res, e, this.file_path);
        }
    };


    /**
     * Get Tickets
     *
     * @param {*} req
     * @param {*} res
     * @returns {object} reflection object
     */
    getTickets = async (req, res) => {
        try {
            const ticketDetail = await TicketModel.getTickets(req);
            if (ticketDetail) {
                Response.res200(res, ticketDetail.items, ticketDetail.pageInfo, constant.messages.ticketsFoundSuccess);
            } else {
                Response.res500(
                    res,
                    constant.messages.failToFoundtickets,
                );
            }
        } catch (e) {
            log.error(res, e, this.file_path);
        }
    };
}
export default new TicketController();

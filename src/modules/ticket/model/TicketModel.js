import path from 'path';
import log from '../../../helper/logger';
import db from '../../../config/database'
import moment from 'moment';

class TicketModel {
    /**
   * Class default constructor
   */
    constructor() {
        this.file_path = path.join(__dirname, path.basename(__filename));
    }

    /**
     * Save ticket
     */
    saveTicket = async (data, res) => {
        try {
            const ticketData = await db('tickets').insert(data).returning('id');
            return await db('tickets').where('id', '=', ticketData[0]).update({ ticket_no: `INFL-${ticketData[0]}` }).returning('ticket_no');
        } catch (e) {
            log.error(res, e, this.file_path);
        }
        return false;
    };


    /**
    * Get ticket
    */
    getTickets = async (req) => {

        try {
            const currentPage = parseInt(req.query.page);
            const pageSize = parseInt(req.query.rowsPerPage) > 0 ? parseInt(req.query.rowsPerPage) : constant.pageSize;
            let totalNumberOfPages = 0;
            let totalNumberOfResults = 0;
            const skipPage = parseInt(req.query.page) > 0 ? ((parseInt(req.query.page)) * pageSize) : 0;
            const orderBy = req.query.sortDir !== 'null' ? req.query.sortDir : 'desc';
            const orderByColumn = req.query.sortColumn !== 'null' ? req.query.sortColumn : 'id';
            const filterList = req.query.filterList ? req.query.filterList.split(' ') : ''

            let query = db('tickets as t');
            let countQuery = db('tickets as t');

            if (req.query.searchText !== 'null') {

                query = query.where('t.ticket_desc', 'like', `%${req.query.searchText}%`);
                query = query.orWhere('t.ticket_no', 'like', `%${req.query.searchText}%`);
                query = query.orWhere('u.first_name', 'like', `%${req.query.searchText}%`);
                query = query.orWhere('u.last_name', 'like', `%${req.query.searchText}%`);

                countQuery = countQuery.where('t.ticket_desc', 'like', `%${req.query.searchText}%`);
                countQuery = countQuery.orWhere('t.ticket_no', 'like', `%${req.query.searchText}%`);
                countQuery = countQuery.orWhere('u.first_name', 'like', `%${req.query.searchText}%`);
                countQuery = countQuery.orWhere('u.last_name', 'like', `%${req.query.searchText}%`);

            }

            if (filterList.length > 1) {
                query = query.where('u.first_name', filterList[0]);
                query = query.where('u.last_name', filterList[1]);

                countQuery = countQuery.where('u.first_name', filterList[0]);
                countQuery = countQuery.where('u.last_name', filterList[1]);
            }

            query.offset(skipPage).limit(pageSize);
            const items = await query.select('t.id', 't.user_id', 't.ticket_no', 't.ticket_desc', 't.created_at', 'u.first_name', 'u.last_name')
                .leftJoin('users AS u', 'u.id', 't.user_id')
                .orderBy(orderByColumn, orderBy);

            const countData = await countQuery.leftJoin('users AS u', 'u.id', 't.user_id').count('t.id');

            totalNumberOfResults = parseInt(countData[0].count);

            const nextPage = totalNumberOfResults > pageSize * currentPage;
            totalNumberOfPages = Math.ceil(totalNumberOfResults / pageSize) || 1;
            const ServerTimeUtc = moment().utc();

            const data = {
                pageInfo: {
                    currentPage,
                    pageSize,
                    nextPage,
                    totalNumberOfPages,
                    totalNumberOfResults,
                    ServerTimeUtc,
                },
                items,
            };
            return data;

        } catch (e) {
            log.error(null, e, path.join(__dirname, path.basename(__filename)));
        }

        try {
            return await db('tickets').select();
        } catch (e) {
            log.error(res, e, this.file_path);
        }
        return false;
    };
}

export default new TicketModel();

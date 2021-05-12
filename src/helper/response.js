import etag from 'etag';
import path from 'path';
import constant from '../config/constants';
import log from './logger';

class Response {
    /**
   * Class default constructor
   */
    constructor() {
        this.file_path = path.join(__dirname, path.basename(__filename));
    }

    /**
     * @returns {object} reflection object
     */
    res200 = (res, body = '', otherOptions = '', message) => {
        try {
            if (body.toJS) {
                body = body.toJS();
            }
            const json = JSON.stringify({
                success: true,
                message: message || constant.messages.defaultSuccessMessage,
                status: constant.responseCode[200],
                data: body,
                meta: otherOptions,
            });
            if (!res.headersSent) {
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('ETag', etag(json));
            }
            res.status(constant.responseCode[200]);
            return res.end(json);
        } catch (e) {
            log.error(res, e, this.file_path);
            return false;
        }
    };

    /**
     * @returns {object} reflection object
     */
    res500 = (res, body = '', message) => {
        body = body === '' ? constant.messages.internalServerError : body;

        const json = JSON.stringify({
            success: false,
            message: message || constant.messages.defaultErrorMessage,
            status: constant.responseCode[500],
            error: body,
        });
        if (!res.headersSent) {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
        }
        res.status(constant.responseCode[500]);
        return res.end(json);
    };

    /**
     * @returns {object} reflection object
     */
    res404 = (_req, res, message) => {
        try {
            const json = JSON.stringify({
                status: constant.responseCode[404],
                success: false,
                message: message || constant.messages.defaultErrorMessage,
                error: constant.messages.pageNotFound,
            });
            if (!res.headersSent) {
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Access-Control-Allow-Origin', '*');
            }
            res.status(constant.responseCode[404]);
            return res.end(json);
        } catch (e) {
            log.error(res, e, this.file_path);
            return false;
        }
    };

    /**
     * @returns {object} reflection object
     */
    res422 = (res, body, message) => {
        try {
            if (body.toJS) {
                body = body.toJS();
            }
            const json = JSON.stringify({
                success: false,
                message: message || constant.messages.defaultErrorMessage,
                status: constant.responseCode[422],
                error: body,
            });
            if (!res.headersSent) {
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Access-Control-Allow-Origin', '*');
            }
            res.status(constant.responseCode[422]);
            return res.end(json);
        } catch (e) {
            log.error(res, e, this.file_path);
            return false;
        }
    };

    /**
     * @returns {object} reflection object
     */
    res401 = (res, body = null, message) => {
        try {
            if (body && body.toJS) {
                body = body.toJS();
            } else {
                body = constant.messages.unauthorizedAccess;
            }
            const json = JSON.stringify({
                success: false,
                message: message || constant.messages.defaultErrorMessage,
                status: constant.responseCode[401],
                error: body,
            });
            if (!res.headersSent) {
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Access-Control-Allow-Origin', '*');
            }
            res.status(constant.responseCode[401]);
            return res.end(json);
        } catch (e) {
            log.error(res, e, this.file_path);
            return false;
        }
    };
}
export default new Response();

import fs from 'fs';

export default {
    responseCode: {
        200: 200, // OK
        201: 201, // Created
        204: 204, // No Content
        304: 304, // Content Not Modified
        400: 400, // Bad Request
        401: 401, // Unauthorized
        403: 403, // Forbidden
        404: 404, // Not Found
        409: 409, // Conflict
        422: 422, // Validation Errors
        500: 500, // Internal Server Error
    },
    /**
   * External messages
   */
    messages: {
        userNotExiest:'Invalid Username or Password',
        Error401:'Your session has Expired. Please login again',
        unauthorizedAccess: 'Unauthorized access to this module',
        Error422:'Validation fail',
        loginMessage: 'User successfully logged in.',
        pageNotFound:
            'The page or data you are requesting is not available on this server.',
        internalServerError: 'Internal server error please try after sometime',
        ticketCreatedSuccess: 'Ticket has been created successfully',
        ticketCreatedFail: 'Fail to create ticket',
        ticketsFoundSuccess: 'Ticket found successfully',
        failToFoundtickets: 'Fail to get tickets',
        logout: 'Logged out successfully',
        tokenExpired: 'Token is invalid or expired',
        defaultSuccessMessage: 'Response sent successfully',
        defaultErrorMessage: 'Something went wrong',
    }
};

const axios = require('axios');
const cookie = require('cookie');

/**
 * Register the nuxt module
 *
 * @param {Object} options
 */
module.exports = function({
    token_url,
    grant_type = 'client_credentials',
    client_id,
    client_secret,
}) {
    /**
     * The middleware
     *
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     */
    const middleware = async function(req, res, next) {
        try {
            const credentials = await axios.post(token_url, {
                grant_type,
                client_id,
                client_secret,
            });

            const { access_token } = credentials.data;

            res.setHeader('Set-Cookie', cookie.serialize('access_token', access_token, { path: '/' }));
        } finally {
            next();
        }
    };

    this.addServerMiddleware(middleware);
};

/**
 * Get the authorization headers
 *
 * @returns {Object}
 */
module.exports.getAuthHeaders = function() {
    if (typeof document === 'undefined') {
        return {};
    }

    const { access_token } = cookie.parse(document.cookie);

    return {
        Authorization: access_token && `Bearer ${ access_token }`,
    };
};

module.exports.meta = require('../package.json');

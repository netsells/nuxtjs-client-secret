import axios from 'axios';
import cookie from 'cookie';

export default function({
    token_url,
    grant_type = 'client_credentials',
    client_id,
    client_secret,
}) {
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
}

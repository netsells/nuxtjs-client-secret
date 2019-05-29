# nuxtjs-client-secret

Middleware for getting an access token from your API for your frontend without exposing your client ID and secret

## Installation

```sh
yarn add @netsells/nuxtjs-client-secret
```

## Usage

In your nuxtjs config:

```javascript
    modules: [
        ['@netsells/nuxtjs-client-secret', {
            token_url: process.env.TOKEN_API_URL,
            grant_type: 'client_credentials',
            client_id: process.env.API_PERSONAL_ACCESS_CLIENT_ID,
            client_secret: process.env.API_PERSONAL_ACCESS_CLIENT_SECRET,
        }],
    ],
```

You should set your client secrets in your `.env` file, not your nuxtjs config file.

This will set a cookie, `access_token`, with the access token returned by your API.

You can then add the necessary authorization headers to your front end requests, e.g. for axios:

```javascript
import axios from 'axios';
import { getAuthHeaders } from '@netsells/nuxtjs-client-secret';

axios.defaults.headers.common = getAuthHeaders();
```

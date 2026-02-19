const Cookie = require('@hapi/cookie');
const Jwt = require('@hapi/jwt');
require('dotenv').config();

module.exports = {
  register: async (server) => {
    await server.register([Cookie, Jwt]);

    // Register cookie-strategy
    server.auth.strategy('session', 'cookie', {
      cookie: {
        name: 'jwt',
        password: process.env.COOKIE_PASSWORD,
        //isSecure: false, // Detta är för utveckling, ändra till true i prod (https) eller se nedan
        isSecure: process.env.NODE_ENV === 'production',
        ttl: 24 * 60 * 60 * 1000,
        isSameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // None för prod, Lax för utveckling
        clearInvalid: true,
        isHttpOnly: true,
        path: '/',         
      },
      redirectTo: false,   
      validate: async (request, session) => {
  if (!session) return { isValid: false };

  // session är redan ett objekt {id, username, email} från loginUser
  return {
    isValid: true,
    credentials: session
  };
}
    });

    server.auth.default('session');
  }
};
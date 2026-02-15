const Joi = require('joi');
const userController = require('../controllers/user.controller');

module.exports = (server) => {
  server.route([

    // REGISTER (public)
    {
      method: 'POST',
      path: '/auth/register',
      options: {
        auth: false,  // 🔹 viktigt
        validate: {
          payload: Joi.object({
            username: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required()
          })
        }
      },
      handler: userController.registerUser
    },

    // LOGIN (public)
    {
      method: 'POST',
      path: '/auth/login',
      handler: userController.loginUser,
      options: {
        auth: false,
        validate: {
          payload: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required()
          })
        }
      }
    },

    // KOLLA VEM SOM ÄR INLOGGAD (kräver auth)
    {
      method: 'GET',
      path: '/auth/me',
      options: { auth: 'session' },
      handler: (request, h) => {
        return h.response({ user: request.auth.credentials });
      }
    },

    // LOGGA UT
    {
      method: 'POST',
      path: '/auth/logout',
      handler: (request, h) => {
        return h
          .response({ message: 'Logged out' })
          .unstate('jwt')
          .code(200);
      },
      options: {
        auth: false
      }
    },
    // UPDATE egen user
    {
      method: 'PUT',
      path: '/auth/me',
      options: {
        auth: 'session',
        validate: {
          payload: Joi.object({
            username: Joi.string(),
            email: Joi.string().email(),
            password: Joi.string().min(6)
          })
        }
      },
      handler: userController.updateUser
    },

    // DELETE egen user
    {
      method: 'DELETE',
      path: '/auth/me',
      options: {
        auth: 'session'
      },
      handler: userController.deleteUser
    }
  ]);
};
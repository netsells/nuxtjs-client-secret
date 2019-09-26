"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var axios = require('axios');

var cookie = require('cookie');
/**
 * Register the nuxt module
 *
 * @param {Object} options
 */


module.exports = function (_ref) {
  var token_url = _ref.token_url,
      _ref$grant_type = _ref.grant_type,
      grant_type = _ref$grant_type === void 0 ? 'client_credentials' : _ref$grant_type,
      client_id = _ref.client_id,
      client_secret = _ref.client_secret;

  /**
   * The middleware
   *
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  var middleware =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res, next) {
      var credentials, access_token;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return axios.post(token_url, {
                grant_type: grant_type,
                client_id: client_id,
                client_secret: client_secret
              });

            case 3:
              credentials = _context.sent;
              access_token = credentials.data.access_token;
              res.setHeader('Set-Cookie', cookie.serialize('access_token', access_token, {
                path: '/'
              }));

            case 6:
              _context.prev = 6;
              next();
              return _context.finish(6);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0,, 6, 9]]);
    }));

    return function middleware(_x, _x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }();

  this.addServerMiddleware(middleware);
};
/**
 * Get the authorization headers
 *
 * @returns {Object}
 */


module.exports.getAuthHeaders = function () {
  if (typeof document === 'undefined') {
    return {};
  }

  var _cookie$parse = cookie.parse(document.cookie),
      access_token = _cookie$parse.access_token;

  return {
    Authorization: access_token && "Bearer ".concat(access_token)
  };
};

module.exports.meta = require('../package.json');
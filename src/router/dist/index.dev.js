"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _login = _interopRequireDefault(require("@/components/login.vue"));

var _home = _interopRequireDefault(require("@/components/home.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vueRouter["default"]);

var routes = [{
  path: '/',
  redirect: '/login'
}, {
  path: '/login',
  component: _login["default"]
}, {
  path: '/home',
  component: _home["default"]
}];
var router = new _vueRouter["default"]({
  routes: routes
});
router.beforeEach(function (to, from, next) {
  if (to.path === '/login') return next();
  var tokenStr = window.sessionStorage.getItem('token');
  if (!tokenStr) next('/login');else next();
});
var _default = router;
exports["default"] = _default;
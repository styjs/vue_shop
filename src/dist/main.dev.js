"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

var _store = _interopRequireDefault(require("./store"));

var _elementUi = require("element-ui");

require("@/assets/css/global.css");

require("element-ui/lib/theme-chalk/index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_elementUi.Button);

_vue["default"].use(_elementUi.Input);

_vue["default"].use(_elementUi.Form);

_vue["default"].use(_elementUi.FormItem);

_vue["default"].use(_elementUi.Container);

_vue["default"].use(_elementUi.Header);

_vue["default"].use(_elementUi.Aside);

_vue["default"].use(_elementUi.Main);

_vue["default"].use(_elementUi.Menu);

_vue["default"].use(_elementUi.Submenu);

_vue["default"].use(_elementUi.MenuItem);

_vue["default"].component('Message', _elementUi.Message);

_vue["default"].config.productionTip = false;
_vue["default"].prototype.$message = _elementUi.Message;
new _vue["default"]({
  router: _router["default"],
  store: _store["default"],
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount('#app');
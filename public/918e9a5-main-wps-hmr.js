/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatei18n_netlify_widget"]("main",{

/***/ "./dev/index.js":
/*!**********************!*\
  !*** ./dev/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\n__webpack_require__(/*! ./bootstrap.js */ \"./dev/bootstrap.js\");\n\nvar _netlifyCms = __webpack_require__(/*! netlify-cms */ \"./node_modules/netlify-cms/dist/netlify-cms.js\");\n\nvar _netlifyCms2 = _interopRequireDefault(_netlifyCms);\n\n__webpack_require__(/*! netlify-cms/dist/cms.css */ \"./node_modules/netlify-cms/dist/cms.css\");\n\nvar _src = __webpack_require__(/*! ../src */ \"./src/index.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar config = {\n  backend: {\n    name: 'test-repo',\n    login: false\n  },\n  media_folder: 'assets',\n  collections: [{\n    name: 'test',\n    label: 'Test',\n    folder: 'content/i18n',\n    create: true\n    //  files: [{\n    //    file: 'test.json',\n    //    name: 'en_file',\n    //    label: 'English file',\n    //    fields: [\n    //      { name: 'test_widget', label: 'i18 editor', widget: 'test'},\n    //    ],\n    //  }],\n  }]\n};\n\n_netlifyCms2.default.registerWidget('test', _src.Control, _src.Preview);\n\n(0, _netlifyCms.init)({ config: config });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pMThuLW5ldGxpZnktd2lkZ2V0Ly4vZGV2L2luZGV4LmpzPzIwMGUiXSwibmFtZXMiOlsiY29uZmlnIiwiYmFja2VuZCIsIm5hbWUiLCJsb2dpbiIsIm1lZGlhX2ZvbGRlciIsImNvbGxlY3Rpb25zIiwibGFiZWwiLCJmb2xkZXIiLCJjcmVhdGUiLCJDTVMiLCJyZWdpc3RlcldpZGdldCIsIkNvbnRyb2wiLCJQcmV2aWV3Il0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxJQUFNQSxTQUFTO0FBQ2ZDLFdBQVM7QUFDUkMsVUFBTSxXQURFO0FBRVJDLFdBQU87QUFGQyxHQURNO0FBS2ZDLGdCQUFjLFFBTEM7QUFNZkMsZUFBYSxDQUFDO0FBQ2JILFVBQU0sTUFETztBQUViSSxXQUFPLE1BRk07QUFHYkMsWUFBUSxjQUhLO0FBSWJDLFlBQVE7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBWmMsR0FBRDtBQU5FLENBQWY7O0FBc0JBQyxxQkFBSUMsY0FBSixDQUFtQixNQUFuQixFQUEyQkMsWUFBM0IsRUFBb0NDLFlBQXBDOztBQUVBLHNCQUFLLEVBQUVaLGNBQUYsRUFBTCIsImZpbGUiOiIuL2Rldi9pbmRleC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi9ib290c3RyYXAuanMnXG5pbXBvcnQgQ01TLCB7IGluaXQgfSBmcm9tICduZXRsaWZ5LWNtcydcbmltcG9ydCAnbmV0bGlmeS1jbXMvZGlzdC9jbXMuY3NzJ1xuaW1wb3J0IHsgQ29udHJvbCwgUHJldmlldyB9IGZyb20gJy4uL3NyYydcblxuY29uc3QgY29uZmlnID0ge1xuYmFja2VuZDoge1xuIG5hbWU6ICd0ZXN0LXJlcG8nLFxuIGxvZ2luOiBmYWxzZSxcbn0sXG5tZWRpYV9mb2xkZXI6ICdhc3NldHMnLFxuY29sbGVjdGlvbnM6IFt7XG4gbmFtZTogJ3Rlc3QnLFxuIGxhYmVsOiAnVGVzdCcsXG4gZm9sZGVyOiAnY29udGVudC9pMThuJyxcbiBjcmVhdGU6IHRydWUsXG4vLyAgZmlsZXM6IFt7XG4vLyAgICBmaWxlOiAndGVzdC5qc29uJyxcbi8vICAgIG5hbWU6ICdlbl9maWxlJyxcbi8vICAgIGxhYmVsOiAnRW5nbGlzaCBmaWxlJyxcbi8vICAgIGZpZWxkczogW1xuLy8gICAgICB7IG5hbWU6ICd0ZXN0X3dpZGdldCcsIGxhYmVsOiAnaTE4IGVkaXRvcicsIHdpZGdldDogJ3Rlc3QnfSxcbi8vICAgIF0sXG4vLyAgfV0sXG59XSxcbn1cblxuQ01TLnJlZ2lzdGVyV2lkZ2V0KCd0ZXN0JywgQ29udHJvbCwgUHJldmlldylcblxuaW5pdCh7IGNvbmZpZyB9KSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./dev/index.js\n");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => "ab44a3f6736df4236d78"
/******/ 	})();
/******/ 	
/******/ }
);
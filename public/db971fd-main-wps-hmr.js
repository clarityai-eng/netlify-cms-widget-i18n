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
eval("\n\n__webpack_require__(/*! ./bootstrap.js */ \"./dev/bootstrap.js\");\n\nvar _netlifyCms = __webpack_require__(/*! netlify-cms */ \"./node_modules/netlify-cms/dist/netlify-cms.js\");\n\nvar _netlifyCms2 = _interopRequireDefault(_netlifyCms);\n\n__webpack_require__(/*! netlify-cms/dist/cms.css */ \"./node_modules/netlify-cms/dist/cms.css\");\n\nvar _src = __webpack_require__(/*! ../src */ \"./src/index.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar config = {\n  backend: {\n    name: 'test-repo',\n    login: false\n  },\n  media_folder: 'assets',\n  collections: [{\n    name: 'test',\n    label: 'Test',\n    folder: 'content/i18n',\n    create: true,\n    extension: 'json',\n    fields: { label: \"Title\", name: \"title\", widget: \"string\" }\n    //  files: [{\n    //    file: 'test.json',\n    //    name: 'en_file',\n    //    label: 'English file',\n    //    fields: [\n    //      { name: 'test_widget', label: 'i18 editor', widget: 'test'},\n    //    ],\n    //  }],\n  }]\n};\n\n_netlifyCms2.default.registerWidget('test', _src.Control, _src.Preview);\n\n(0, _netlifyCms.init)({ config: config });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pMThuLW5ldGxpZnktd2lkZ2V0Ly4vZGV2L2luZGV4LmpzPzIwMGUiXSwibmFtZXMiOlsiY29uZmlnIiwiYmFja2VuZCIsIm5hbWUiLCJsb2dpbiIsIm1lZGlhX2ZvbGRlciIsImNvbGxlY3Rpb25zIiwibGFiZWwiLCJmb2xkZXIiLCJjcmVhdGUiLCJleHRlbnNpb24iLCJmaWVsZHMiLCJ3aWRnZXQiLCJDTVMiLCJyZWdpc3RlcldpZGdldCIsIkNvbnRyb2wiLCJQcmV2aWV3Il0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxJQUFNQSxTQUFTO0FBQ2ZDLFdBQVM7QUFDUkMsVUFBTSxXQURFO0FBRVJDLFdBQU87QUFGQyxHQURNO0FBS2ZDLGdCQUFjLFFBTEM7QUFNZkMsZUFBYSxDQUFDO0FBQ2JILFVBQU0sTUFETztBQUViSSxXQUFPLE1BRk07QUFHYkMsWUFBUSxjQUhLO0FBSWJDLFlBQVEsSUFKSztBQUtiQyxlQUFXLE1BTEU7QUFNYkMsWUFBUSxFQUFDSixPQUFPLE9BQVIsRUFBaUJKLE1BQU0sT0FBdkIsRUFBZ0NTLFFBQVEsUUFBeEM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBZGMsR0FBRDtBQU5FLENBQWY7O0FBd0JBQyxxQkFBSUMsY0FBSixDQUFtQixNQUFuQixFQUEyQkMsWUFBM0IsRUFBb0NDLFlBQXBDOztBQUVBLHNCQUFLLEVBQUVmLGNBQUYsRUFBTCIsImZpbGUiOiIuL2Rldi9pbmRleC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi9ib290c3RyYXAuanMnXG5pbXBvcnQgQ01TLCB7IGluaXQgfSBmcm9tICduZXRsaWZ5LWNtcydcbmltcG9ydCAnbmV0bGlmeS1jbXMvZGlzdC9jbXMuY3NzJ1xuaW1wb3J0IHsgQ29udHJvbCwgUHJldmlldyB9IGZyb20gJy4uL3NyYydcblxuY29uc3QgY29uZmlnID0ge1xuYmFja2VuZDoge1xuIG5hbWU6ICd0ZXN0LXJlcG8nLFxuIGxvZ2luOiBmYWxzZSxcbn0sXG5tZWRpYV9mb2xkZXI6ICdhc3NldHMnLFxuY29sbGVjdGlvbnM6IFt7XG4gbmFtZTogJ3Rlc3QnLFxuIGxhYmVsOiAnVGVzdCcsXG4gZm9sZGVyOiAnY29udGVudC9pMThuJyxcbiBjcmVhdGU6IHRydWUsXG4gZXh0ZW5zaW9uOiAnanNvbicsXG4gZmllbGRzOiB7bGFiZWw6IFwiVGl0bGVcIiwgbmFtZTogXCJ0aXRsZVwiLCB3aWRnZXQ6IFwic3RyaW5nXCJ9LFxuLy8gIGZpbGVzOiBbe1xuLy8gICAgZmlsZTogJ3Rlc3QuanNvbicsXG4vLyAgICBuYW1lOiAnZW5fZmlsZScsXG4vLyAgICBsYWJlbDogJ0VuZ2xpc2ggZmlsZScsXG4vLyAgICBmaWVsZHM6IFtcbi8vICAgICAgeyBuYW1lOiAndGVzdF93aWRnZXQnLCBsYWJlbDogJ2kxOCBlZGl0b3InLCB3aWRnZXQ6ICd0ZXN0J30sXG4vLyAgICBdLFxuLy8gIH1dLFxufV0sXG59XG5cbkNNUy5yZWdpc3RlcldpZGdldCgndGVzdCcsIENvbnRyb2wsIFByZXZpZXcpXG5cbmluaXQoeyBjb25maWcgfSkiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./dev/index.js\n");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => "d22f596a8f16385da82f"
/******/ 	})();
/******/ 	
/******/ }
);
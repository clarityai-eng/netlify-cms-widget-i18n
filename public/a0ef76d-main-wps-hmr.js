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
eval("\n\n__webpack_require__(/*! ./bootstrap.js */ \"./dev/bootstrap.js\");\n\nvar _netlifyCms = __webpack_require__(/*! netlify-cms */ \"./node_modules/netlify-cms/dist/netlify-cms.js\");\n\nvar _netlifyCms2 = _interopRequireDefault(_netlifyCms);\n\n__webpack_require__(/*! netlify-cms/dist/cms.css */ \"./node_modules/netlify-cms/dist/cms.css\");\n\nvar _src = __webpack_require__(/*! ../src */ \"./src/index.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar config = {\n  backend: {\n    name: 'test-repo',\n    login: false\n  },\n  media_folder: 'assets',\n  collections: [{\n    name: 'test',\n    label: 'Test',\n    files: [{\n      file: 'test.yml',\n      name: 'en_file',\n      label: 'English file',\n      fields: [{ name: 'test_widget', label: 'i18 editor', widget: 'test' }]\n    }]\n  }]\n};\n\n_netlifyCms2.default.registerWidget('test', _src.Control, _src.Preview);\n\n(0, _netlifyCms.init)({ config: config });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pMThuLW5ldGxpZnktd2lkZ2V0Ly4vZGV2L2luZGV4LmpzPzIwMGUiXSwibmFtZXMiOlsiY29uZmlnIiwiYmFja2VuZCIsIm5hbWUiLCJsb2dpbiIsIm1lZGlhX2ZvbGRlciIsImNvbGxlY3Rpb25zIiwibGFiZWwiLCJmaWxlcyIsImZpbGUiLCJmaWVsZHMiLCJ3aWRnZXQiLCJDTVMiLCJyZWdpc3RlcldpZGdldCIsIkNvbnRyb2wiLCJQcmV2aWV3Il0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxJQUFNQSxTQUFTO0FBQ2ZDLFdBQVM7QUFDUkMsVUFBTSxXQURFO0FBRVJDLFdBQU87QUFGQyxHQURNO0FBS2ZDLGdCQUFjLFFBTEM7QUFNZkMsZUFBYSxDQUFDO0FBQ2JILFVBQU0sTUFETztBQUViSSxXQUFPLE1BRk07QUFHYkMsV0FBTyxDQUFDO0FBQ05DLFlBQU0sVUFEQTtBQUVOTixZQUFNLFNBRkE7QUFHTkksYUFBTyxjQUhEO0FBSU5HLGNBQVEsQ0FDTixFQUFFUCxNQUFNLGFBQVIsRUFBdUJJLE9BQU8sWUFBOUIsRUFBNENJLFFBQVEsTUFBcEQsRUFETTtBQUpGLEtBQUQ7QUFITSxHQUFEO0FBTkUsQ0FBZjs7QUFvQkFDLHFCQUFJQyxjQUFKLENBQW1CLE1BQW5CLEVBQTJCQyxZQUEzQixFQUFvQ0MsWUFBcEM7O0FBRUEsc0JBQUssRUFBRWQsY0FBRixFQUFMIiwiZmlsZSI6Ii4vZGV2L2luZGV4LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuL2Jvb3RzdHJhcC5qcydcbmltcG9ydCBDTVMsIHsgaW5pdCB9IGZyb20gJ25ldGxpZnktY21zJ1xuaW1wb3J0ICduZXRsaWZ5LWNtcy9kaXN0L2Ntcy5jc3MnXG5pbXBvcnQgeyBDb250cm9sLCBQcmV2aWV3IH0gZnJvbSAnLi4vc3JjJ1xuXG5jb25zdCBjb25maWcgPSB7XG5iYWNrZW5kOiB7XG4gbmFtZTogJ3Rlc3QtcmVwbycsXG4gbG9naW46IGZhbHNlLFxufSxcbm1lZGlhX2ZvbGRlcjogJ2Fzc2V0cycsXG5jb2xsZWN0aW9uczogW3tcbiBuYW1lOiAndGVzdCcsXG4gbGFiZWw6ICdUZXN0JyxcbiBmaWxlczogW3tcbiAgIGZpbGU6ICd0ZXN0LnltbCcsXG4gICBuYW1lOiAnZW5fZmlsZScsXG4gICBsYWJlbDogJ0VuZ2xpc2ggZmlsZScsXG4gICBmaWVsZHM6IFtcbiAgICAgeyBuYW1lOiAndGVzdF93aWRnZXQnLCBsYWJlbDogJ2kxOCBlZGl0b3InLCB3aWRnZXQ6ICd0ZXN0J30sXG4gICBdLFxuIH1dLFxufV0sXG59XG5cbkNNUy5yZWdpc3RlcldpZGdldCgndGVzdCcsIENvbnRyb2wsIFByZXZpZXcpXG5cbmluaXQoeyBjb25maWcgfSkiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./dev/index.js\n");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => "2635621dce41ce0a0566"
/******/ 	})();
/******/ 	
/******/ }
);
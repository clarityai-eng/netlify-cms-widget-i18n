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
eval("\n\n__webpack_require__(/*! ./bootstrap.js */ \"./dev/bootstrap.js\");\n\nvar _netlifyCms = __webpack_require__(/*! netlify-cms */ \"./node_modules/netlify-cms/dist/netlify-cms.js\");\n\nvar _netlifyCms2 = _interopRequireDefault(_netlifyCms);\n\n__webpack_require__(/*! netlify-cms/dist/cms.css */ \"./node_modules/netlify-cms/dist/cms.css\");\n\nvar _src = __webpack_require__(/*! ../src */ \"./src/index.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar config = {\n  backend: {\n    name: 'test-repo',\n    login: false\n  },\n  media_folder: 'assets',\n  collections: [{\n    name: 'test',\n    label: 'Test',\n    folder: 'content/i18n',\n    create: true,\n    extension: 'json',\n    fields: [{ label: \"Title\", name: \"title\", widget: \"string\" }]\n    //  files: [{\n    //    file: 'test.json',\n    //    name: 'en_file',\n    //    label: 'English file',\n    //    fields: [\n    //      { name: 'test_widget', label: 'i18 editor', widget: 'test'},\n    //    ],\n    //  }],\n  }]\n};\n\n_netlifyCms2.default.registerWidget('test', _src.Control, _src.Preview);\n\n(0, _netlifyCms.init)({ config: config });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pMThuLW5ldGxpZnktd2lkZ2V0Ly4vZGV2L2luZGV4LmpzPzIwMGUiXSwibmFtZXMiOlsiY29uZmlnIiwiYmFja2VuZCIsIm5hbWUiLCJsb2dpbiIsIm1lZGlhX2ZvbGRlciIsImNvbGxlY3Rpb25zIiwibGFiZWwiLCJmb2xkZXIiLCJjcmVhdGUiLCJleHRlbnNpb24iLCJmaWVsZHMiLCJ3aWRnZXQiLCJDTVMiLCJyZWdpc3RlcldpZGdldCIsIkNvbnRyb2wiLCJQcmV2aWV3Il0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxJQUFNQSxTQUFTO0FBQ2ZDLFdBQVM7QUFDUkMsVUFBTSxXQURFO0FBRVJDLFdBQU87QUFGQyxHQURNO0FBS2ZDLGdCQUFjLFFBTEM7QUFNZkMsZUFBYSxDQUFDO0FBQ2JILFVBQU0sTUFETztBQUViSSxXQUFPLE1BRk07QUFHYkMsWUFBUSxjQUhLO0FBSWJDLFlBQVEsSUFKSztBQUtiQyxlQUFXLE1BTEU7QUFNYkMsWUFBUSxDQUFDLEVBQUNKLE9BQU8sT0FBUixFQUFpQkosTUFBTSxPQUF2QixFQUFnQ1MsUUFBUSxRQUF4QyxFQUFEO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWRjLEdBQUQ7QUFORSxDQUFmOztBQXdCQUMscUJBQUlDLGNBQUosQ0FBbUIsTUFBbkIsRUFBMkJDLFlBQTNCLEVBQW9DQyxZQUFwQzs7QUFFQSxzQkFBSyxFQUFFZixjQUFGLEVBQUwiLCJmaWxlIjoiLi9kZXYvaW5kZXguanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4vYm9vdHN0cmFwLmpzJ1xuaW1wb3J0IENNUywgeyBpbml0IH0gZnJvbSAnbmV0bGlmeS1jbXMnXG5pbXBvcnQgJ25ldGxpZnktY21zL2Rpc3QvY21zLmNzcydcbmltcG9ydCB7IENvbnRyb2wsIFByZXZpZXcgfSBmcm9tICcuLi9zcmMnXG5cbmNvbnN0IGNvbmZpZyA9IHtcbmJhY2tlbmQ6IHtcbiBuYW1lOiAndGVzdC1yZXBvJyxcbiBsb2dpbjogZmFsc2UsXG59LFxubWVkaWFfZm9sZGVyOiAnYXNzZXRzJyxcbmNvbGxlY3Rpb25zOiBbe1xuIG5hbWU6ICd0ZXN0JyxcbiBsYWJlbDogJ1Rlc3QnLFxuIGZvbGRlcjogJ2NvbnRlbnQvaTE4bicsXG4gY3JlYXRlOiB0cnVlLFxuIGV4dGVuc2lvbjogJ2pzb24nLFxuIGZpZWxkczogW3tsYWJlbDogXCJUaXRsZVwiLCBuYW1lOiBcInRpdGxlXCIsIHdpZGdldDogXCJzdHJpbmdcIn1dLFxuLy8gIGZpbGVzOiBbe1xuLy8gICAgZmlsZTogJ3Rlc3QuanNvbicsXG4vLyAgICBuYW1lOiAnZW5fZmlsZScsXG4vLyAgICBsYWJlbDogJ0VuZ2xpc2ggZmlsZScsXG4vLyAgICBmaWVsZHM6IFtcbi8vICAgICAgeyBuYW1lOiAndGVzdF93aWRnZXQnLCBsYWJlbDogJ2kxOCBlZGl0b3InLCB3aWRnZXQ6ICd0ZXN0J30sXG4vLyAgICBdLFxuLy8gIH1dLFxufV0sXG59XG5cbkNNUy5yZWdpc3RlcldpZGdldCgndGVzdCcsIENvbnRyb2wsIFByZXZpZXcpXG5cbmluaXQoeyBjb25maWcgfSkiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./dev/index.js\n");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => "1a868b189aac4e77f4ba"
/******/ 	})();
/******/ 	
/******/ }
);
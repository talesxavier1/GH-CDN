"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadLanguage = loadLanguage;
exports.registerLanguage = registerLanguage;
exports.registerAllAvailableLanguages = registerAllAvailableLanguages;

var monaco = _interopRequireWildcard(require("monaco-editor"));

var _languages = require("./languages");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var languagePromises = {};

function loadLanguage(languageId) {
  if (languagePromises[languageId]) {
    return languagePromises[languageId];
  }

  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("./ace/definitions/".concat(languageId)));
  }).then(function (_ref) {
    var HighlightRules = _ref["default"];
    var rules = new HighlightRules();
    return (0, _languages.registerRulesForLanguage)(languageId, rules);
  });
}

function registerLanguage(languageId) {
  monaco.languages.register({
    id: languageId
  });
  monaco.languages.onLanguage(languageId, function () {
    loadLanguage(languageId);
  });
}

function registerAllAvailableLanguages() {
  _languages.AVAILABLE_LANGUAGES.forEach(function (langId) {
    return registerLanguage(langId);
  });
}
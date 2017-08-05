'use strict';

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _unifiedLintRule = require('unified-lint-rule');

var _unifiedLintRule2 = _interopRequireDefault(_unifiedLintRule);

var _unistUtilVisit = require('unist-util-visit');

var _unistUtilVisit2 = _interopRequireDefault(_unistUtilVisit);

var _object = require('object.defaults');

var _object2 = _interopRequireDefault(_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleLinkDuplicateError(file, link) {
  var message = 'Link is a duplicate: ' + link.link.href;
  var node = link.node;


  file.info(message, node);
}

function checkAndRemoveDubplicates(file, links, settings) {
  var duplicates = [];
  var valid = {};

  links.map(function (link) {
    var url = '' + link.link.host + link.link.path;
    if (!(url in valid)) {
      valid[url] = link;
    } else if (!settings.allowDuplicates && settings.whiteListDomains.indexOf(link.link.host) === -1) {
      duplicates.push(link);
    }
  });

  duplicates.map(function (item) {
    return handleLinkDuplicateError(file, item);
  });
}

function areLinksDuplicate(ast, file, options) {
  var defaultSettings = {
    // These settings allow duplicate links validation:
    allowDuplicates: false,
    whiteListDomains: []
  };
  var settings = options || {};
  (0, _object2.default)(settings, defaultSettings);

  var links = [];

  (0, _unistUtilVisit2.default)(ast, 'link', function (node) {
    var link = _url2.default.parse(node.url);
    if (link.host !== null) {
      // links without `host` are just `#hashes`
      links.push({ node: node, link: link });
    }
  });

  checkAndRemoveDubplicates(file, links, settings);
}

module.exports = (0, _unifiedLintRule2.default)('remark-lint:are-links-valid:duplicate', areLinksDuplicate);

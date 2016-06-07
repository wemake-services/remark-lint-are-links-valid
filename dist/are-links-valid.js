'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var visit = require('unist-util-visit');
var rp = require('request-promise');
var url = require('url');
var Promise = require('bluebird');
var defaults = require('object.defaults');
var start = require('mdast-util-position').start;

function handleLinkDuplicateError(file, link) {
  var _start = start(link.node);

  var line = _start.line;
  var column = _start.column;

  file.warn('Link is a duplicate: ' + link.link.href, { line: line, column: column });
}

function handleLinkError(file, link) {
  var _start2 = start(link.node);

  var line = _start2.line;
  var column = _start2.column;

  file.warn('Link is broken: ' + link.link.href, { line: line, column: column });
}

function handleResponse(response, file, link, settings) {
  var code = response.statusCode;

  // TODO: what else can be wrong?
  if (!response.complete || !/^2/.test('' + code) && settings.allowErrors.indexOf(code) === -1) {
    handleLinkError(file, link);
  }
}

function createRequest(file, link, settings) {
  var options = {
    method: 'GET',
    uri: link.link.href,
    resolveWithFullResponse: true,

    // Thinks to be overridden:
    timeout: settings.timeout,
    followRedirects: settings.allowRedirects,
    simple: false
  };

  var promise = rp(options).promise();

  promise.then(function (r) {
    return handleResponse(r, file, link, settings);
  });

  return promise;
}

function checkAndRemoveDubplicates(file, links, settings) {
  var duplicates = [];
  var valid = [];
  var uniq = links.map(function (link) {
    var obj = {
      count: 1,
      uri: '' + link.link.host + link.link.path,
      inst: link
    };
    return obj;
  }).reduce(function (a, b) {
    var current = a[b.uri] || {};
    var insts = current.insts || [];
    insts.push(b.inst);
    a[b.uri] = {
      count: (current.count || 0) + b.count,
      insts: insts
    };

    return a;
  }, {});

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.keys(uniq)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var i = _step.value;

      var item = uniq[i];
      if (item.count !== 1 && settings.whiteListDomains.indexOf(item.insts[0].link.host) === -1) {
        duplicates.push.apply(duplicates, _toConsumableArray(item.insts));
      } else {
        valid.push.apply(valid, _toConsumableArray(item.insts));
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  duplicates.map(function (item) {
    return handleLinkDuplicateError(file, item);
  });
  return valid;
}

function areLinksValidCheck(ast, file, preferred, done) {
  var defaultSettings = {
    // Basic settings:
    allowRedirects: true,
    allowErrors: [],
    timeout: 5000,

    // These settings allow duplicate links validation:
    allowDuplicates: true,
    whiteListDomains: []
  };
  var settings = preferred || {};
  defaults(settings, defaultSettings);

  var links = [];
  var promises = [];

  visit(ast, 'link', function (node) {
    var link = url.parse(node.url);
    if (link.host !== null) {
      // links without `host` are just `#hashes`
      links.push({ node: node, link: link });
    }
  });
  if (!settings.allowDuplicates) {
    links = checkAndRemoveDubplicates(file, links, settings);
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = links[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var link = _step2.value;

      promises.push(createRequest(file, link, settings));
    }

    // We should wait for all requests to finish:
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  Promise // `.reflect()` will make rejected promises valid:
  .all(promises.map(function (promise) {
    return promise.reflect();
  })).then(function () {
    return done();
  });
}

module.exports = {
  'are-links-valid': areLinksValidCheck
};
const visit = require('unist-util-visit');
const rp = require('request-promise');
const url = require('url');
const Promise = require('bluebird');
const defaults = require('object.defaults');
const start = require('unist-util-position').start;

function handleLinkDuplicateError(file, link) {
  const { line, column } = start(link.node);
  file.warn(`Link is a duplicate: ${link.link.href}`, { line, column });
}

function handleLinkError(file, link) {
  const { line, column } = start(link.node);
  file.warn(`Link is broken: ${link.link.href}`, { line, column });
}

function handleResponse(response, file, link, settings) {
  const code = response.statusCode;

  // TODO: what else can be wrong?
  if (
    !response.complete ||
    (!(/^2/.test('' + code)) && settings.allowErrors.indexOf(code) === -1)
  ) {
    handleLinkError(file, link);
  }
}

function createRequest(file, link, settings) {
  const options = {
    method: 'GET',
    uri: link.link.href,
    resolveWithFullResponse: true,

    // Thinks to be overridden:
    timeout: settings.timeout,
    followRedirects: settings.allowRedirects,
    simple: false,
  };

  const promise = rp(options).promise();

  promise
    .then(r => handleResponse(r, file, link, settings))
    .catch(() => handleLinkError(file, link));

  return promise;
}

function checkAndRemoveDubplicates(file, links, settings) {
  const duplicates = [];
  const valid = [];
  const uniq = links
    .map(link => {
      const obj = {
        count: 1,
        uri: `${link.link.host}${link.link.path}`,
        inst: link,
      };
      return obj;
    })
    .reduce((a, b) => {
      const current = a[b.uri] || {};
      const insts = current.insts || [];
      insts.push(b.inst);
      a[b.uri] = {
        count: (current.count || 0) + b.count,
        insts,
      };

      return a;
    }, {});

  for (const i of Object.keys(uniq)) {
    const item = uniq[i];
    if (
      item.count !== 1 &&
      settings.whiteListDomains.indexOf(item.insts[0].link.host) === -1
    ) {
      duplicates.push(...item.insts);
    } else {
      valid.push(...item.insts);
    }
  }

  duplicates.map(item => handleLinkDuplicateError(file, item));
  return valid;
}

function areLinksValidCheck(ast, file, preferred, done) {
  const defaultSettings = {
    // Basic settings:
    allowRedirects: true,
    allowErrors: [],
    timeout: 5000,

    // These settings allow duplicate links validation:
    allowDuplicates: true,
    whiteListDomains: [],
  };
  const settings = preferred || {};
  defaults(settings, defaultSettings);

  let links = [];
  const promises = [];

  visit(ast, 'link', (node) => {
    const link = url.parse(node.url);
    if (link.host !== null) {  // links without `host` are just `#hashes`
      links.push({ node, link });
    }
  });
  if (!settings.allowDuplicates) {
    links = checkAndRemoveDubplicates(file, links, settings);
  }

  for (const link of links) {
    promises.push(createRequest(file, link, settings));
  }

  // We should wait for all requests to finish:
  Promise  // `.reflect()` will make rejected promises valid:
    .all(promises.map(promise => promise.reflect()))
    .then(() => done());
}

module.exports = {
  'are-links-valid': areLinksValidCheck,
};

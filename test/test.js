/* global describe it */

const utils = require('./utils');

// Test cases:

describe('No links situation', () => {
  const warnings = utils.loadWarnings('no_links');

  it(`Expect ${warnings.length} warning(s) from are-links-valid`, done => {
    utils.assertWarningsLength('no_links', warnings, done);
  });
});

describe('Testing plugin with wrong link', () => {
  const warnings = utils.loadWarnings('wrong_link');

  it(`Expect ${warnings.default.length} warning(s) from are-links-valid with default settings`, done => {
    utils.assertWarningsLength('wrong_link', warnings.default, done);
  });

  it(`Expect ${warnings.allow_404.length} warning(s) from are-links-valid with allow 404 code setting`, done => {
    utils.assertWarningsLength('wrong_link', warnings.allow_404, done, { allowErrors: [404] });
  });
});

describe('Testing plugin with duplicated links', () => {
  const warnings = utils.loadWarnings('duplicate_links');

  it(`Expect ${warnings.default.length} warning(s) from are-links-valid with default settings`, done => {
    utils.assertWarningsLength('duplicate_links', warnings.default, done);
  });

  it(`Expect ${warnings.no_duplicates.length} warning(s) from are-links-valid with not allowed duplicates`, done => {
    utils.assertWarningsLength('duplicate_links', warnings.no_duplicates, done, { allowDuplicates: false });
  });

  it(`Expect ${warnings.no_duplicates.length} warning(s) from are-links-valid with not allowed duplicates, but with whitelist`, done => {
    utils.assertWarningsLength('duplicate_links', warnings.whitelist, done, { allowDuplicates: false, whiteListDomains: ['github.com'] });
  });
});

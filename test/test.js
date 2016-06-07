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

  it(`Expect warnings with default settings`, done => {
    utils.assertWarningsLength('wrong_link', warnings.default, done);
  });

  it(`Expect warnings with 'allow 404' setting`, done => {
    utils.assertWarningsLength(
      'wrong_link', warnings.allow_404, done, {
        allowErrors: [404],
      }
    );
  });
});

describe('Testing plugin with duplicated links', () => {
  const warnings = utils.loadWarnings('duplicate_links');

  it(`Expect warnings with default settings`, done => {
    utils.assertWarningsLength('duplicate_links', warnings.default, done);
  });

  it(`Expect warnings with 'no duplicates' setting`, done => {
    utils.assertWarningsLength(
      'duplicate_links', warnings.no_duplicates, done, {
        allowDuplicates: false,
      }
    );
  });

  it(`Expect warnings with 'no duplicates' setting and whitelist`, done => {
    utils.assertWarningsLength(
      'duplicate_links', warnings.whitelist, done, {
        allowDuplicates: false,
        whiteListDomains: ['github.com'],
      }
    );
  });
});

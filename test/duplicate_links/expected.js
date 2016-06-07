const message = require('../utils').createMessage;

module.exports = {
  default: [],
  no_duplicates: [
    message(1, 1,
      'https://github.com/wemake-services/remark-lint-are-links-valid', true),
    message(2, 1,
      'https://github.com/wemake-services/remark-lint-are-links-valid', true),
  ],
  whitelist: [],
};

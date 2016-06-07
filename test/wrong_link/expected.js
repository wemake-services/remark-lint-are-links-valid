const message = require('../utils').createMessage;

module.exports = {
  default: [
    message(1, 1,
      'https://github.com/wemake-services/remark-lint-are-links-valid/notfound'
    ),
  ],
  allow_404: [],
};

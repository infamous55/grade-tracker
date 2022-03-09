const user = require('../services/users.service');

(async function () {
  const data = {
    email: 'admin@admin.com',
    name: 'admin',
    password: 'password',
    role: 'ADMIN',
  };
  await user.createOne({ data });
})();

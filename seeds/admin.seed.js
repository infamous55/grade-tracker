const auth = require('../services/auth.service');

(async function () {
  await auth.register({
    email: 'admin@admin.com',
    name: 'admin',
    password: 'password',
    role: 'ADMIN',
  });
})();

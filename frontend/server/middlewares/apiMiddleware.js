const express = require('express');

const router = express.Router();

router.use('/employee/:id', (req, res, next) => {
  const user = {
    id: 12345,
    fkRole: 1,
    name: 'Janet Johnson',
    sin: '32454344',
    email: 'jane@example.com',
    password: '12345',
    status: 'ONBOARDING',
    adminLevel: 'STAFF',
    fte: 'Yes',
    salary: 0,
    address: 0,
    birthdate: '2019-03-01',
    dateJoined: '2019-03-01',
    vacationDays: 0,
    remainingVacationDays: 2,
    role: {
      id: 1,
      name: 'Developer',
    },
  };
  return res.send(user);
});

router.use('*', (req, res, next) => {
  return res.send(req.path);
});

module.exports = router;

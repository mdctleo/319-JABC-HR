const express = require('express');

const router = express.Router();

router.use('/employee/:id', (req, res, next) => {
  const user = {
    firstname: 'firstname',
    fkRole: 1,
    address: 'address',
    birthdate: 5,
    role: {
      name: 'name',
      description: 'description',
      id: 1,
    },
    adminLevel: 1,
    dateJoined: 2,
    salary: 5.962133916683182,
    lastname: 'lastname',
    password: 'password',
    remainingVacationDays: 9,
    fte: 0,
    sin: 'sin',
    vacationDays: 7,
    id: 1,
    email: 'email',
    status: 6,
  };
  return res.send(user);
});

router.use('*', (req, res, next) => res.send(req.path));

module.exports = router;

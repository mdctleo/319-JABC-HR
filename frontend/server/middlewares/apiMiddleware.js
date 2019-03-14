const express = require('express');

const router = express.Router();

router.post('/employee/token', (req, res, next) => {
  if (req.body.email === 'admin') {
    if (req.body.password === 'admin') {
      const body = {
        message: 'Welcome Reed Esler',
        type: 'SUCCESS',
        responseCode: 210,
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NTI2MjAwODIsImVtcGxveWVlIjp7ImlkIjoxMjM0NSwic2luIjoiMzI0MzU0IiwiZW1haWwiOiJhZG1pbiIsInBhc3N3b3JkIjoiYWRtaW4iLCJmaXJzdG5hbWUiOiJSZWVkIiwibGFzdG5hbWUiOiJFc2xlciIsImZ0ZSI6MSwic3RhdHVzIjoyLCJhZG1pbkxldmVsIjoyLCJzYWxhcnkiOm51bGwsImFkZHJlc3MiOm51bGwsImJpcnRoZGF0ZSI6bnVsbCwiZGF0ZUpvaW5lZCI6bnVsbCwidmFjYXRpb25EYXlzIjpudWxsLCJyZW1haW5pbmdWYWNhdGlvbkRheXMiOm51bGwsImZrUm9sZSI6bnVsbCwicGhvbmVOdW1iZXIiOm51bGx9LCJpYXQiOjE1NTI1OTEyODJ9.MIyOUe7hHidLNhGr4ALobdf-b-5W01MVVD0JWO_PGNU',
        employee: {
          id: 12345,
          sin: '324354',
          email: 'admin',
          password: 'admin',
          firstname: 'Jane',
          lastname: 'Smithers',
          fte: 1,
          status: 2,
          adminLevel: 2,
          salary: null,
          address: null,
          birthdate: null,
          dateJoined: null,
          vacationDays: null,
          remainingVacationDays: null,
          fkRole: null,
          phoneNumber: null,
        },
      };
      res.send(body);
    } else {
      res.send({
        type: 'ERROR',
        message: 'Wrong password',
      });
    }
  } else {
    res.send({
      type: 'ERROR',
      message: "Email doesn't exist",
    });
  }
});

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

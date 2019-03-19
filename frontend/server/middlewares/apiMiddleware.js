const express = require('express');

const router = express.Router();

let Jane = {
  id: 12345,
  sin: '324354',
  email: 'admin',
  password: 'admin',
  firstname: 'Jane',
  lastname: 'Smithers',
  fte: 1,
  status: 2,
  adminLevel: 2,
  salary: 42000,
  address: '1234 Ave',
  birthdate: null,
  dateJoined: null,
  vacationDays: 4,
  remainingVacationDays: 3,
  fkRole: 1,
  phoneNumber: '(604) 840-2539',
};

router.post('/employee/token', (req, res, next) => {
  if (req.body.email === 'admin') {
    if (req.body.password === 'admin') {
      const body = {
        message: 'Welcome Jane Smithers',
        type: 'SUCCESS',
        responseCode: 210,
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NTI2MjAwODIsImVtcGxveWVlIjp7ImlkIjoxMjM0NSwic2luIjoiMzI0MzU0IiwiZW1haWwiOiJhZG1pbiIsInBhc3N3b3JkIjoiYWRtaW4iLCJmaXJzdG5hbWUiOiJSZWVkIiwibGFzdG5hbWUiOiJFc2xlciIsImZ0ZSI6MSwic3RhdHVzIjoyLCJhZG1pbkxldmVsIjoyLCJzYWxhcnkiOm51bGwsImFkZHJlc3MiOm51bGwsImJpcnRoZGF0ZSI6bnVsbCwiZGF0ZUpvaW5lZCI6bnVsbCwidmFjYXRpb25EYXlzIjpudWxsLCJyZW1haW5pbmdWYWNhdGlvbkRheXMiOm51bGwsImZrUm9sZSI6bnVsbCwicGhvbmVOdW1iZXIiOm51bGx9LCJpYXQiOjE1NTI1OTEyODJ9.MIyOUe7hHidLNhGr4ALobdf-b-5W01MVVD0JWO_PGNU',
        employee: Jane,
      };
      res.send(body);
    } else {
      res.status(410);
      res.send({
        type: 'ERROR',
        message: 'Wrong password',
      });
    }
  } else {
    res.status(410);
    res.send({
      type: 'ERROR',
      message: "Email doesn't exist",
    });
  }
});

router.put('/employee/:id', (req, res) => {
  Jane = req.body;
  res.send({
    message: 'The employee was updated successfully',
    responseCode: 200,
    type: 'SUCCESS',
  });
});

router.get('/employee/12345', (req, res, next) => res.send(Jane));

router.get('/role/1', (req, res, next) =>
  res.send({
    id: 1,
    name: 'Developer',
    description: 'Make a funky fresh website',
    competencies: [
      {
        id: 1,
        fkRole: 1,
        name: 'React',
        description: 'You should know React',
      },
      {
        id: 2,
        fkRole: 1,
        name: 'Fun',
        description: 'You should have fun',
      },
      {
        id: 3,
        fkRole: 1,
        name: 'Memes',
        description: 'Know your memes',
      },
    ],
  }),
);

router.use('*', (req, res, next) => res.send());

module.exports = router;

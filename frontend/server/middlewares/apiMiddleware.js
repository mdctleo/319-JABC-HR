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

router.get('/employee', (req, res) =>
  res.send([
    {
      id: 1,
      sin: 11111111,
      email: 'tflenderson@jabc.com',
      password: 'hrtest',
      firstname: 'Toby',
      lastname: 'Flenderson',
      fte: 1,
      status: 1,
      adminLevel: 2,
      salary: 200,
      address: 'hr_test_road',
      birthdate: '1969-11-30',
      dateJoined: '1989-12-01',
      vacationDays: 20,
      remainingVacationDays: 10,
      fkRole: 0,
      phoneNumber: '6041111111',
    },
    {
      id: 2,
      sin: 22222222,
      email: 'mscott@jabc.com',
      password: 'managertest',
      firstname: 'Michael',
      lastname: 'Scott',
      fte: 1,
      status: 1,
      adminLevel: 2,
      salary: 5000,
      address: '3333 Maple road',
      birthdate: '1964-12-08',
      dateJoined: '1989-12-01',
      vacationDays: 20,
      remainingVacationDays: 0,
      fkRole: 0,
      phoneNumber: '6042222222',
    },
    {
      id: 3,
      sin: 33333333,
      email: 'jhalpert@jabc.com',
      password: 'employeetest',
      firstname: 'Jim',
      lastname: 'Halpert',
      fte: 1,
      status: 1,
      adminLevel: 2,
      salary: 3000,
      address: '8888 Halpert road',
      birthdate: '1979-09-03',
      dateJoined: '2002-04-01',
      vacationDays: 10,
      remainingVacationDays: 10,
      fkRole: 0,
      phoneNumber: '6043333333',
    },
    {
      id: 4,
      sin: 44444444,
      email: 'dschrute@jabc.com',
      password: 'employeetest',
      firstname: 'Dwight',
      lastname: 'Schrute',
      fte: 1,
      status: 1,
      adminLevel: 2,
      salary: 3000,
      address: 'Schrute Farm',
      birthdate: '1978-10-30',
      dateJoined: '2000-03-01',
      vacationDays: 10,
      remainingVacationDays: 8,
      fkRole: 0,
      phoneNumber: '6044444444',
    },
    {
      id: 5,
      sin: 55555555,
      email: 'kfilippelli@jabc.com',
      password: 'employeetest',
      firstname: 'Karen',
      lastname: 'Filippelli',
      fte: 1,
      status: 1,
      adminLevel: 2,
      salary: 3000,
      address: 'Exotic Land',
      birthdate: '1980-01-30',
      dateJoined: '2004-02-01',
      vacationDays: 10,
      remainingVacationDays: 8,
      fkRole: 0,
      phoneNumber: '6045555555',
    },
    Jane,
  ]),
);

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

router.get('/role/2', (req, res) =>
  res.send({
    id: 2,
    name: 'Singer',
    description: 'Make the pretty sounds',
    competencies: [],
  }),
);

router.get('/role/3', (req, res) =>
  res.send({
    id: 3,
    name: 'CEO',
    description: 'The head honcho',
    competencies: [
      {
        id: 4,
        fkRole: 3,
        name: 'Power Stance',
        description: "You gotta show em who's boss",
      },
      {
        id: 5,
        fkRole: 3,
        name: 'Leadership',
        description: null,
      },
    ],
  }),
);

router.get('/role/4', (req, res) =>
  res.send({
    id: 4,
    name: 'Janitor',
    description: null,
    competencies: [
      {
        id: 6,
        fkRole: 4,
        name: 'Mop Prowess',
        description: 'You must be quick with a broom and zany with a mop',
      },
    ],
  }),
);

router.get('/role', (req, res) => {
  res.send([
    {
      id: 1,
      name: 'Developer',
      description: 'Make a funky fresh website',
      competencies: [],
    },
    {
      id: 2,
      name: 'Singer',
      description: 'Make the pretty sounds',
      competencies: [],
    },
    {
      id: 3,
      name: 'CEO',
      description: 'The head honcho',
      competencies: [],
    },
    {
      id: 4,
      name: 'Janitor',
      description: null,
      competencies: [],
    },
  ]);
});

router.put('/role/:id', (req, res) => {
  res.send({
    message: 'The role was updated successfully',
    responseCode: 200,
    type: 'SUCCESS',
  });
});

router.use('*', (req, res, next) => res.send('NO ENDPOINT'));

module.exports = router;

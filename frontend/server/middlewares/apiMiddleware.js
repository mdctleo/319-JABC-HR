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
      sin: 111111111,
      email: 'hradmin@jabc.com',
      firstname: 'Toby',
      lastname: 'Flenderson',
      fte: 1,
      status: 1,
      adminLevel: 2,
      salary: 200,
      address: 'hr_test_road\nCanada\nV5Y 2H1',
      birthdate: '1969-11-30',
      dateJoined: '1989-12-01',
      vacationDays: 20,
      remainingVacationDays: 10,
      fkRole: 1,
      phoneNumber: '6041111111',
      role: {
        id: 1,
        name: 'Developer',
        description: 'A Test Developer Role',
      },
    },
    {
      id: 2,
      sin: 222222222,
      email: 'manager@jabc.com',
      firstname: 'Michael',
      lastname: 'Scott',
      fte: 1,
      status: 1,
      adminLevel: 1,
      salary: 5000,
      address: '3333 Maple road\nCanada',
      birthdate: '1964-12-08',
      dateJoined: '1989-12-01',
      vacationDays: 20,
      remainingVacationDays: 0,
      fkRole: 1,
      phoneNumber: '6042222222',
      role: {
        id: 1,
        name: 'Developer',
        description: 'A Test Developer Role',
      },
    },
    {
      id: 3,
      sin: 333333333,
      email: 'employee1@jabc.com',
      firstname: 'Jim',
      lastname: 'Halpert',
      fte: 1,
      status: 1,
      adminLevel: 0,
      salary: 3000,
      address: 'f,awf,,df,as,df,s,ad,f,sad,f,sd,f,sa,df,s,df,,sdf,ds,',
      birthdate: '1979-09-03',
      dateJoined: '2002-04-01',
      vacationDays: 10,
      remainingVacationDays: 10,
      fkRole: 2,
      phoneNumber: '6043333333',
      role: {
        id: 2,
        name: 'Sales',
        description: 'A Test Sales Role',
      },
    },
    {
      id: 4,
      sin: 444444444,
      email: 'employee2@jabc.com',
      firstname: 'Dwight',
      lastname: 'Schrute',
      fte: 1,
      status: 1,
      adminLevel: 0,
      salary: 3000,
      address: 'Schrute Farm',
      birthdate: '1978-10-30',
      dateJoined: '2000-03-01',
      vacationDays: 10,
      remainingVacationDays: 8,
      fkRole: 2,
      phoneNumber: '6044444444',
      role: {
        id: 2,
        name: 'Sales',
        description: 'A Test Sales Role',
      },
    },
    {
      id: 5,
      sin: 555555555,
      email: 'employee3@jabc.com',
      firstname: 'Karen',
      lastname: 'Filippelli',
      fte: 1,
      status: 1,
      adminLevel: 1,
      salary: 3000,
      address: 'Exotic Land',
      birthdate: '1980-01-30',
      dateJoined: '2004-02-01',
      vacationDays: 10,
      remainingVacationDays: 8,
      fkRole: 3,
      phoneNumber: '6045555555',
      role: {
        id: 3,
        name: 'Marketing',
        description: 'A Test Marketing Role',
      },
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

router.get('/employee/12345/performance/plan', (req, res) =>
  res.send([
    {
      id: 1,
      fkEmployee: 12345,
      startYear: 2018,
      endYear: 2019,
      status: 0,
      sections: [
        {
          id: 1,
          data: {
            columns: ['Column 1', 'Column 2', 'Column 3'],
            rows: [
              {
                id: 1,
                'Column 1': 'Data for column 1',
                'Column 2': 'Data for column 2',
                'Column 3': 'Data for column 3',
              },
              {
                id: 2,
                'Column 1': '2 Data for column 1',
                'Column 2': '2 Data for column 2',
                'Column 3': '2 Data for column 3',
              },
              {
                id: 3,
                'Column 1': '3 Data for column 1',
                'Column 2': '3 Data for column 2',
                'Column 3': '3 Data for column 3',
              },
            ],
          },
          sectionName: 'First Section',
          fkPerformancePlan: 1,
        },
        {
          id: 2,
          data: {
            columns: ['Column 1', 'Column 2'],
            rows: [
              {
                id: 4,
                'Column 1': 'Data for column 1',
                'Column 2': 'Data for column 2',
              },
              {
                id: 5,
                'Column 1': '2 Data for column 1',
                'Column 2': '2 Data for column 2',
              },
              {
                id: 6,
                'Column 1': '3 Data for column 1',
                'Column 2': '3 Data for column 2',
              },
            ],
          },
          sectionName: 'Second Section',
          fkPerformancePlan: 1,
        },
      ],
      comments: [],
    },
    {
      id: 2,
      fkEmployee: 12345,
      startYear: 2019,
      endYear: 2019,
      status: 0,
    },
  ]),
);

router.get('/employee/12345/performance/review', (req, res) =>
  res.send([
    {
      id: 4,
      fkEmployee: 12345,
      fkPerformancePlan: 1,
      createDate: '2019-03-25',
      status: 0,
      sections: [],
    },
  ]),
);

router.get('/employee/:id/history', (req, res) =>
  res.send([
    {
      id: 1,
      sin: 111111111,
      email: 'hradmin@jabc.com',
      firstname: 'Tobias',
      lastname: 'Flenderson',
      fte: 1,
      status: 1,
      adminLevel: 2,
      version: 4,
      fkCreator: 1,
      createdDate: '2019-03-28',
      salary: 5000,
      address: 'hr_test_road',
      birthdate: '1969-11-30',
      dateJoined: '1989-12-01',
      vacationDays: 10,
      remainingVacationDays: 2,
      fkRole: 2,
      phoneNumber: '+16041111111',
    },
    {
      id: 1,
      sin: 111111111,
      email: 'hradmin@jabc.com',
      firstname: 'Tobias',
      lastname: 'Flenderson',
      fte: 1,
      status: 1,
      adminLevel: 2,
      version: 3,
      fkCreator: 1,
      createdDate: '2019-03-28',
      salary: 5000,
      address: 'hr_test_road',
      birthdate: '1969-11-30',
      dateJoined: '1989-12-01',
      vacationDays: 20,
      remainingVacationDays: 10,
      fkRole: 2,
      phoneNumber: '6041111111',
    },
    {
      id: 1,
      sin: 111111111,
      email: 'hradmin@jabc.com',
      firstname: 'Tobias',
      lastname: 'Flenderson',
      fte: 1,
      status: 1,
      adminLevel: 2,
      version: 2,
      fkCreator: 1,
      createdDate: '2019-03-28',
      salary: 200,
      address: 'hr_test_road',
      birthdate: '1969-11-30',
      dateJoined: '1989-12-01',
      vacationDays: 20,
      remainingVacationDays: 10,
      fkRole: 1,
      phoneNumber: '6041111111',
    },
    {
      id: 1,
      sin: 111111111,
      email: 'hradmin@jabc.com',
      firstname: 'Toby',
      lastname: 'Flenderson',
      fte: 1,
      status: 1,
      adminLevel: 2,
      version: 1,
      fkCreator: 1,
      createdDate: '1989-12-01',
      salary: 200,
      address: 'hr_test_road',
      birthdate: '1969-11-30',
      dateJoined: '1989-12-01',
      vacationDays: 20,
      remainingVacationDays: 10,
      fkRole: 1,
      phoneNumber: '6041111111',
    },
  ]),
);

router.get('/employee/:id/manager', (req, res) => res.send([]));

router.get('/employee/manager/:id', (req, res) => res.send([]));

router.get('/employee/:id/task', (req, res) =>
  res.send([
    {
      id: 1,
      fkDocumentType: 1,
      fkEmployee: 12345,
      createdDate: '2019-03-28',
      requireDoc: 1,
      status: 0,
      file: 'http://localhost:8080/JABC/1.0.0/onboarding/task/1/file',
      description: "Don't forget",
    },
    {
      id: 5,
      fkDocumentType: 1,
      fkEmployee: 12345,
      createdDate: '2019-03-28',
      requireDoc: 1,
      status: 0,
      file: 'http://localhost:8080/JABC/1.0.0/onboarding/task/1/file',
      description: "Don't forget",
    },
    {
      id: 2,
      fkEmployee: 12345,
      createdDate: '2019-03-06',
      dueDate: '2019-03-14',
      requireDoc: 0,
      status: 0,
      expiryDate: '2019-03-31',
      file: 'http://localhost:8080/JABC/1.0.0/onboarding/task/2/file',
      description: 'Breakfast',
    },
    {
      id: 3,
      fkEmployee: 12345,
      fkDocumentType: 1,
      createdDate: '2019-03-06',
      dueDate: '2019-03-14',
      requireDoc: 1,
      status: 1,
      expiryDate: '2019-03-31',
      file: 'http://localhost:8080/JABC/1.0.0/onboarding/task/3/file',
      description: 'This is very important',
    },
    {
      id: 4,
      fkEmployee: 2,
      fkDocumentType: 1,
      createdDate: '2019-03-06',
      dueDate: '2019-03-14',
      requireDoc: 1,
      status: 1,
      expiryDate: '2019-03-31',
      file: 'http://localhost:8080/JABC/1.0.0/onboarding/task/3/file',
      description: 'This shouldnt show up',
    },
  ]),
);

router.get('/onboarding/documentType/:id', (req, res) =>
  res.send({
    id: 1,
    name: 'Criminal Record Check',
    file: 'http://localhost:8080/JABC/1.0.0/onboarding/documentType/1/file',
    description: 'Please submit a criminal record check',
  }),
);

router.use('*', (req, res, next) => res.send('NO ENDPOINT'));

module.exports = router;

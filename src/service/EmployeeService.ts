'use strict';
import {IDocument, IEmployee, IPerformance, IVacation } from '../model/models'

/**
 * creates a new Document for the employee with [id]
 * Will create a new Document with the provided data in body
 *
 * @param {Number} id of the searched Employee
 * @param {IDocument} document Document data
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<IApiResponse>}
 **/
exports.createDocument = function(id : Number, document : IDocument, xAuthToken : String) {
  return new Promise(function(resolve, reject) {
    var examples = {
  "debugMessage" : "This is a debug message",
  "type" : "ERROR",
  "message" : "Unauthorized access to the API",
  "responseCode" : 0
};
    resolve(examples);
  });
}


/**
 * creates a new Employee
 * Will create a new Employee with the provided data in body
 *
 * @param {IEmployee} employee Employee data
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<IApiResponse>}
 **/
exports.createEmployee = function(employee : IEmployee, xAuthToken : String) {
  return new Promise(function(resolve, reject) {
    var examples = {
  "debugMessage" : "This is a debug message",
  "type" : "ERROR",
  "message" : "Unauthorized access to the API",
  "responseCode" : 0
};
    resolve(examples);
  });
}


/**
 * creates a new Performance for the employee with [id]
 * Will create a new Performance with the provided data in body
 *
 * @param {Number} id of the searched Employee
 * @param {IPerformance} performance Performance data
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<IApiResponse>}
 **/
exports.createPerformance = function(id : Number, performance : IPerformance, xAuthToken : String) {
  return new Promise(function(resolve, reject) {
    var examples = {
  "debugMessage" : "This is a debug message",
  "type" : "ERROR",
  "message" : "Unauthorized access to the API",
  "responseCode" : 0
};
    resolve(examples);
  });
}


/**
 * creates a new Vacation for the employee with [id]
 * Will create a new Vacation with the provided data in body
 *
 * @param {Number} id of the searched Employee
 * @param {IVacation} vacation Vacation data
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<IApiResponse>}
 **/
exports.createVacation = function(id : Number, vacation : IVacation, xAuthToken : String) {
  return new Promise(function(resolve, reject) {
    var examples = {
  "debugMessage" : "This is a debug message",
  "type" : "ERROR",
  "message" : "Unauthorized access to the API",
  "responseCode" : 0
};
    resolve(examples);
  });
}


/**
 * deletes Employee
 * Will delete (deactivate) an Employee if the Employee matches the [id]
 *
 * @param {Number} id of the Employee to be deleted
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @param {Number} idAdmin Who is deleting the employee (optional)
 * @returns {Promise<IApiResponse>}
 **/
exports.deleteEmployee = function(id : Number,  xAuthToken : String, idAdmin : Number) {
  return new Promise(function(resolve, reject) {
    var examples = {
  "debugMessage" : "This is a debug message",
  "type" : "ERROR",
  "message" : "Unauthorized access to the API",
  "responseCode" : 0
};
    resolve(examples);
  });
}


/**
 * get all the Documents of the employee with [id]
 * This returns all the Documents of the system.  If [term] is provided this returns the Documents of the Employee that match with the [term].  
 *
 * @param {Number} id of the searched Employee
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @param {String} term Search term for filter the data (optional)
 * @returns {Promise<[]>}
 **/
exports.getDocuments = function(id : Number,  xAuthToken : String, term : String) {
  return new Promise(function(resolve, reject) {
    var examples = [ {
  "expiryDate" : 1,
  "path" : "path",
  "createdDate" : 0,
  "fkDocumentType" : 1,
  "dueDate" : 6,
  "fkEmployee" : 1,
  "id" : 1,
  "type" : {
    "path" : "path",
    "name" : "name",
    "description" : "description",
    "id" : 1
  }
}, {
  "expiryDate" : 1,
  "path" : "path",
  "createdDate" : 0,
  "fkDocumentType" : 1,
  "dueDate" : 6,
  "fkEmployee" : 1,
  "id" : 1,
  "type" : {
    "path" : "path",
    "name" : "name",
    "description" : "description",
    "id" : 1
  }
} ];
    resolve(examples);
  });
}


/**
 * gets an specific Employee
 * Will return the Employee that matches with the provided [id]
 *
 * @param {Number} id of the searched Employee
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<IEmployee>}
 **/
exports.getEmployee = function(id : Number,  xAuthToken : String) {
  return new Promise(function(resolve, reject) {
    var examples = {
  "firstname" : "firstname",
  "fkRole" : 1,
  "address" : "address",
  "birthdate" : 5,
  "role" : {
    "name" : "name",
    "description" : "description",
    "id" : 1
  },
  "adminLevel" : 1,
  "dateJoined" : 2,
  "salary" : 5.962133916683182377482808078639209270477294921875,
  "lastname" : "lastname",
  "password" : "password",
  "remainingVacationDays" : 9,
  "fte" : 0,
  "sin" : "sin",
  "vacationDays" : 7,
  "id" : 1,
  "email" : "email",
  "status" : 6
};
    resolve(examples);
  });
}


/**
 * get all the history of the employee with [id]
 * This returns all the history data of the employee with [id].  
 *
 * @param {Number} id of the searched Employee
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<[]>}
 **/
exports.getEmployeeHistory = function(id : Number,  xAuthToken : String) {
  return new Promise(function(resolve, reject) {
    var examples = [ {
  "firstname" : "firstname",
  "fkRole" : 1,
  "address" : "address",
  "birthdate" : 2,
  "role" : {
    "name" : "name",
    "description" : "description",
    "id" : 1
  },
  "adminLevel" : 1,
  "dateJoined" : 7,
  "salary" : 5.63737665663332876420099637471139430999755859375,
  "version" : 1,
  "fkCreator" : 1,
  "lastname" : "lastname",
  "password" : "password",
  "createdDate" : 5,
  "remainingVacationDays" : 3,
  "fte" : 0,
  "sin" : "sin",
  "vacationDays" : 9,
  "id" : 1,
  "email" : "email",
  "status" : 6
}, {
  "firstname" : "firstname",
  "fkRole" : 1,
  "address" : "address",
  "birthdate" : 2,
  "role" : {
    "name" : "name",
    "description" : "description",
    "id" : 1
  },
  "adminLevel" : 1,
  "dateJoined" : 7,
  "salary" : 5.63737665663332876420099637471139430999755859375,
  "version" : 1,
  "fkCreator" : 1,
  "lastname" : "lastname",
  "password" : "password",
  "createdDate" : 5,
  "remainingVacationDays" : 3,
  "fte" : 0,
  "sin" : "sin",
  "vacationDays" : 9,
  "id" : 1,
  "email" : "email",
  "status" : 6
} ];
    resolve(examples);
  });
}


/**
 * get all the Employees
 * This returns all the Employees of the system.  If [term] is provided this returns the Employees of the system that match with the [term]. 
 *
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @param {String} term Search term for filter the data (optional)
 * @returns {Promise<[]>}
 **/
exports.getEmployees = function(xAuthToken : String, term : String) {
  return new Promise(function(resolve, reject) {
    var examples = [ {
  "firstname" : "firstname",
  "fkRole" : 1,
  "address" : "address",
  "birthdate" : 5,
  "role" : {
    "name" : "name",
    "description" : "description",
    "id" : 1
  },
  "adminLevel" : 1,
  "dateJoined" : 2,
  "salary" : 5.962133916683182377482808078639209270477294921875,
  "lastname" : "lastname",
  "password" : "password",
  "remainingVacationDays" : 9,
  "fte" : 0,
  "sin" : "sin",
  "vacationDays" : 7,
  "id" : 1,
  "email" : "email",
  "status" : 6
}, {
  "firstname" : "firstname",
  "fkRole" : 1,
  "address" : "address",
  "birthdate" : 5,
  "role" : {
    "name" : "name",
    "description" : "description",
    "id" : 1
  },
  "adminLevel" : 1,
  "dateJoined" : 2,
  "salary" : 5.962133916683182377482808078639209270477294921875,
  "lastname" : "lastname",
  "password" : "password",
  "remainingVacationDays" : 9,
  "fte" : 0,
  "sin" : "sin",
  "vacationDays" : 7,
  "id" : 1,
  "email" : "email",
  "status" : 6
} ];
    resolve(examples);
  });
}


/**
 * get all the Employees that are managed by employee with [idManager]
 * This returns all the Employees that are managed by employee with [idManager]. 
 *
 * @param {Number} idManager Employee that will manage the employee with [id]
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<[]>}
 **/
exports.getEmployeesByManager = function(idManager : Number, xAuthToken : String) {
  return new Promise(function(resolve, reject) {
    var examples = [ {
  "firstname" : "firstname",
  "fkRole" : 1,
  "address" : "address",
  "birthdate" : 5,
  "role" : {
    "name" : "name",
    "description" : "description",
    "id" : 1
  },
  "adminLevel" : 1,
  "dateJoined" : 2,
  "salary" : 5.962133916683182377482808078639209270477294921875,
  "lastname" : "lastname",
  "password" : "password",
  "remainingVacationDays" : 9,
  "fte" : 0,
  "sin" : "sin",
  "vacationDays" : 7,
  "id" : 1,
  "email" : "email",
  "status" : 6
}, {
  "firstname" : "firstname",
  "fkRole" : 1,
  "address" : "address",
  "birthdate" : 5,
  "role" : {
    "name" : "name",
    "description" : "description",
    "id" : 1
  },
  "adminLevel" : 1,
  "dateJoined" : 2,
  "salary" : 5.962133916683182377482808078639209270477294921875,
  "lastname" : "lastname",
  "password" : "password",
  "remainingVacationDays" : 9,
  "fte" : 0,
  "sin" : "sin",
  "vacationDays" : 7,
  "id" : 1,
  "email" : "email",
  "status" : 6
} ];
    resolve(examples);
  });
}


/**
 * get all the Performances of the employee with [id]
 * This returns all the Performances of the system. If [term] is provided this returns the Performances of the Employee that match with the [term].  
 *
 * @param {Number} id of the searched Employee
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @param {String} term Search term for filter the data (optional)
 * @returns {Promise<[]>}
 **/
exports.getPerformances = function(id : Number,  xAuthToken : String, term : String) {
  return new Promise(function(resolve, reject) {
    var examples = [ {
  "date" : 0.80082819046101150206595775671303272247314453125,
  "personalTargets" : [ {
    "rating" : "rating",
    "description" : "description",
    "fkPerformance" : 1,
    "id" : 1
  }, {
    "rating" : "rating",
    "description" : "description",
    "fkPerformance" : 1,
    "id" : 1
  } ],
  "comments" : [ {
    "fkCommenter" : 1,
    "date" : 1,
    "fkPerformance" : 1,
    "comment" : "comment",
    "id" : 1
  }, {
    "fkCommenter" : 1,
    "date" : 1,
    "fkPerformance" : 1,
    "comment" : "comment",
    "id" : 1
  } ],
  "fkEmployee" : 1,
  "objectives" : [ {
    "q1" : "q1",
    "innovative" : "innovative",
    "q2" : "q2",
    "q3" : "q3",
    "q4" : "q4",
    "impact" : "impact",
    "fkPerformance" : 1,
    "id" : 1,
    "foundation" : "foundation",
    "volAlum" : "volAlum",
    "relevance" : "relevance"
  }, {
    "q1" : "q1",
    "innovative" : "innovative",
    "q2" : "q2",
    "q3" : "q3",
    "q4" : "q4",
    "impact" : "impact",
    "fkPerformance" : 1,
    "id" : 1,
    "foundation" : "foundation",
    "volAlum" : "volAlum",
    "relevance" : "relevance"
  } ],
  "id" : 1,
  "jabcGoals" : [ {
    "goal" : "goal",
    "name" : "name",
    "fkPerformance" : 1,
    "id" : 1,
    "previousYear" : "previousYear"
  }, {
    "goal" : "goal",
    "name" : "name",
    "fkPerformance" : 1,
    "id" : 1,
    "previousYear" : "previousYear"
  } ],
  "status" : 6,
  "developmentGoals" : [ {
    "goal" : "goal",
    "keyActivities" : "keyActivities",
    "rating" : "rating",
    "fkPerformance" : 1,
    "id" : 1
  }, {
    "goal" : "goal",
    "keyActivities" : "keyActivities",
    "rating" : "rating",
    "fkPerformance" : 1,
    "id" : 1
  } ]
}, {
  "date" : 0.80082819046101150206595775671303272247314453125,
  "personalTargets" : [ {
    "rating" : "rating",
    "description" : "description",
    "fkPerformance" : 1,
    "id" : 1
  }, {
    "rating" : "rating",
    "description" : "description",
    "fkPerformance" : 1,
    "id" : 1
  } ],
  "comments" : [ {
    "fkCommenter" : 1,
    "date" : 1,
    "fkPerformance" : 1,
    "comment" : "comment",
    "id" : 1
  }, {
    "fkCommenter" : 1,
    "date" : 1,
    "fkPerformance" : 1,
    "comment" : "comment",
    "id" : 1
  } ],
  "fkEmployee" : 1,
  "objectives" : [ {
    "q1" : "q1",
    "innovative" : "innovative",
    "q2" : "q2",
    "q3" : "q3",
    "q4" : "q4",
    "impact" : "impact",
    "fkPerformance" : 1,
    "id" : 1,
    "foundation" : "foundation",
    "volAlum" : "volAlum",
    "relevance" : "relevance"
  }, {
    "q1" : "q1",
    "innovative" : "innovative",
    "q2" : "q2",
    "q3" : "q3",
    "q4" : "q4",
    "impact" : "impact",
    "fkPerformance" : 1,
    "id" : 1,
    "foundation" : "foundation",
    "volAlum" : "volAlum",
    "relevance" : "relevance"
  } ],
  "id" : 1,
  "jabcGoals" : [ {
    "goal" : "goal",
    "name" : "name",
    "fkPerformance" : 1,
    "id" : 1,
    "previousYear" : "previousYear"
  }, {
    "goal" : "goal",
    "name" : "name",
    "fkPerformance" : 1,
    "id" : 1,
    "previousYear" : "previousYear"
  } ],
  "status" : 6,
  "developmentGoals" : [ {
    "goal" : "goal",
    "keyActivities" : "keyActivities",
    "rating" : "rating",
    "fkPerformance" : 1,
    "id" : 1
  }, {
    "goal" : "goal",
    "keyActivities" : "keyActivities",
    "rating" : "rating",
    "fkPerformance" : 1,
    "id" : 1
  } ]
} ];
    resolve(examples);
  });
}


/**
 * get all the Vacations of the employee with [id]
 * This returns all the Vacations of the system.  If [term] is provided this returns the Vacations of the Employee that match with the [term].  
 *
 * @param {Number} id of the searched Employee
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @param {String} term Search term for filter the data (optional)
 * @returns {Promise<[]>}
 **/
exports.getVacations = function(id : Number,  xAuthToken : String, term : String) {
  return new Promise(function(resolve, reject) {
    var examples = [ {
  "date" : 1,
  "requestedDays" : 0,
  "fkApprover" : 1,
  "fkEmployee" : 1,
  "id" : 1,
  "requestedStatus" : 6
}, {
  "date" : 1,
  "requestedDays" : 0,
  "fkApprover" : 1,
  "fkEmployee" : 1,
  "id" : 1,
  "requestedStatus" : 6
} ];
    resolve(examples);
  });
}


/**
 * Links employee to his manager
 * Sets the employee with [id] to be managed by the employee with [idManager]
 *
 * @param {Number} id Employee to be managed by another
 * @param {Number} idManager Employee that will manage the employee with [id]
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<IApiResponse>}
 **/
exports.linkEmployeeManager = function(id : Number, idManager : Number, xAuthToken : String) {
  return new Promise(function(resolve, reject) {
    var examples = {
  "debugMessage" : "This is a debug message",
  "type" : "ERROR",
  "message" : "Unauthorized access to the API",
  "responseCode" : 0
};
    resolve(examples);
  });
}


/**
 * Unlinks employee from his manager
 * Deletes the relation between employee with [id] and the employee with [idManager]
 *
 * @param {Number} id Employee to be unmanaged by another
 * @param {Number} idManager Employee that will stop managing the employee with [id]
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<IApiResponse>}
 **/
exports.unlinkEmployeeManager = function(id : Number, idManager : Number, xAuthToken : String) {
  return new Promise(function(resolve, reject) {
    var examples = {
  "debugMessage" : "This is a debug message",
  "type" : "ERROR",
  "message" : "Unauthorized access to the API",
  "responseCode" : 0
};
    resolve(examples);
  });
}


/**
 * updates the Employee
 * Will update an Employee with the provided data in body if the Employee matches the [id]
 *
 * @param {Number} id of the Employee to be updated
 * @param {IEmployee} employee Employee data
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @param {Number} idAdmin Who is updating the employee (optional)
 * @returns {Promise<IApiResponse>}
 **/
exports.updateEmployee = function(id : Number, employee : IEmployee, xAuthToken : String, idAdmin : Number) {
  return new Promise(function(resolve, reject) {
    var examples = {
  "debugMessage" : "This is a debug message",
  "type" : "ERROR",
  "message" : "Unauthorized access to the API",
  "responseCode" : 0
};
    resolve(examples);
  });
}


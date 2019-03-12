-- STORED PROCEDURES FOR EmployeeService


-- -----------------------------------------------------
-- procedure create_support_doc
--    - create a support doc for the given employee,
--    - only if the employee and type exist
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS create_support_doc;

DELIMITER //

CREATE PROCEDURE `create_support_doc` (IN employee_id INT
, IN type_id INT
, IN created_date BIGINT
, IN due_date BIGINT
, IN expiry_date BIGINT
, IN path VARCHAR(512)
, IN description VARCHAR(512)
)
BEGIN
    DECLARE typeChecker INT;
    DECLARE emplChecker INT;
    SET typeChecker = 0;
    SET emplChecker = 0;
    SELECT COUNT(TYPE_ID) INTO typeChecker FROM `TYPE` WHERE `TYPE`.TYPE_ID = type_id;
    SELECT COUNT(EMPLOYEE_ID) INTO emplChecker FROM `HR_RECORD` WHERE `HR_RECORD`.EMPLOYEE_ID = employee_id;

    IF typeChecker = 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Document type does not exist.';
    ELSEIF emplChecker = 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Employee does not exist.';
    ELSE
      INSERT INTO SUPPORT_DOC (EMPLOYEE_ID, TYPE_ID, CREATED_DATE, DUE_DATE, EXPIRY_DATE, PATH, DESCRIPTION)
      VALUES (employee_id, type_id, created_date, due_date, expiry_date, path, description);
    END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure create_employee
--    - create an employee, provided SIN and email are
--    - not already in use
--    - Version = 0 to indicate a new employee
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS create_employee;

DELIMITER //

CREATE PROCEDURE `create_employee`(IN created_by_id INT
, IN role INT
, IN SIN INT
, IN email VARCHAR(320)
, IN first_name VARCHAR(100)
, IN last_name VARCHAR(100)
, IN address VARCHAR(255)
, IN birthdate BIGINT
, IN vacation_days INT
, IN remaining_vacation_days INT
, IN FTE TINYINT
, IN status TINYINT
, IN password VARCHAR(64)
, IN salary DECIMAL(10, 2)
, IN date_joined BIGINT
, IN admin_level TINYINT
, IN phone_number VARCHAR(45)
)
BEGIN
    DECLARE sinChecker INT;
    DECLARE emailChecker INT;
    DECLARE employeeID INT;
    DECLARE created_date BIGINT;

    SET sinChecker = 0;
    SET emailChecker = 0;

    SELECT UNIX_TIMESTAMP() INTO created_date;

    SELECT COUNT(SIN) INTO sinChecker
    FROM `HR_RECORD`
    WHERE `HR_RECORD`.SIN = SIN;

    SELECT COUNT(EMAIL) INTO emailChecker
    FROM `HR_RECORD`
    WHERE `HR_RECORD`.EMAIL = email;

    IF sinChecker > 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'SIN already in use.';
    ELSEIF emailChecker > 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Email already in use.';
    ELSE
      INSERT INTO EMPLOYEE VALUES();
      SELECT LAST_INSERT_ID() INTO employeeID;
      INSERT INTO HR_RECORD (
      EMPLOYEE_ID, VERSION, CREATED_BY, ROLE, SIN, EMAIL, FIRST_NAME, LAST_NAME, ADDRESS, BIRTHDATE, VACATION_DAYS,
      REMAINING_VACATION_DAYS, FTE, STATUS, PASSWORD, SALARY, DATE_JOINED, ADMIN_LEVEL, CREATED_DATE, PHONE_NUMBER)
      VALUES (
      employeeID, 1, created_by_id, role, SIN, email, first_name, last_name, address, birthdate, vacation_days,
      remaining_vacation_days, FTE, status, password, salary, date_joined, admin_level, created_date, phone_number);
    END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure create_employee_performance
--    - create a performance record for an employee,
--    - provided that the employee exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS create_employee_performance;

DELIMITER //

CREATE PROCEDURE `create_employee_performance` (IN employee_id INT
, IN created_date BIGINT
, IN status TINYINT
)
BEGIN
    DECLARE checker INT;

    SET checker = 0;

    SELECT COUNT(EMPLOYEE_ID) INTO checker
    FROM `HR_RECORD`
    WHERE `HR_RECORD`.EMPLOYEE_ID = employee_id;

    IF checker = 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Employee does not exist.';
    ELSE
      INSERT INTO `PERFORMANCE` (`DATE`, STATUS, EMPLOYEE_ID)
      VALUES (created_date, status, employee_id);
    END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure create_employee_vacation
--    - create a vacation request for an employee,
--    - assigned to another employee to aprove, provided
--    - they both exist
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS create_employee_vacation;

DELIMITER //

CREATE PROCEDURE `create_employee_vacation` (IN employee_id INT
, IN approver_id INT
, IN requested_days INT
, IN request_status TINYINT
, IN created_date BIGINT
)
BEGIN
    DECLARE emplChecker INT;
    DECLARE approvChecker INT;

    SET emplChecker = 0;
    SET approvChecker = 0;

    SELECT COUNT(EMPLOYEE_ID) INTO emplChecker
    FROM `HR_RECORD`
    WHERE `HR_RECORD`.EMPLOYEE_ID = employee_id;

    SELECT COUNT(EMPLOYEE_ID) INTO approvChecker
    FROM `HR_RECORD`
    WHERE `HR_RECORD`.EMPLOYEE_ID = approver_id;

    IF emplChecker = 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Employee does not exist.';
    ELSEIF approvChecker = 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Approver employee does not exist.';
    ELSE
      INSERT INTO `VACATION_REQUEST` (EMPLOYEE_ID, APPROVER_ID, REQUESTED_DAYS, REQUEST_STATUS, `DATE`)
      VALUES (employee_id, approver_id, requested_days, request_status, created_date);
    END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure update_employee
--    - update an employee, provided that employee exists
--    - also validate that the new SIN and EMAIL are not
--    - used by other employees
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS update_employee;

DELIMITER //

CREATE PROCEDURE `update_employee`(IN employee_id INT
, IN created_by_id INT
, IN role INT
, IN SIN INT
, IN email VARCHAR(320)
, IN first_name VARCHAR(100)
, IN last_name VARCHAR(100)
, IN address VARCHAR(255)
, IN birthdate BIGINT
, IN vacation_days INT
, IN remaining_vacation_days INT
, IN FTE TINYINT
, IN status TINYINT
, IN password VARCHAR(64)
, IN salary DECIMAL(10, 2)
, IN date_joined BIGINT
, IN admin_level TINYINT
, IN phone_number VARCHAR(45)
)
BEGIN
    DECLARE sinChecker INT;
    DECLARE emailChecker INT;
    DECLARE emplChecker INT;
    DECLARE version INT;
    DECLARE created_date BIGINT;
    
    SET sinChecker = 0;
    SET emailChecker = 0;
    SET emplChecker = 0;

    SELECT UNIX_TIMESTAMP() INTO created_date;
    SELECT COUNT(SIN) INTO sinChecker
    FROM `HR_RECORD`
    WHERE `HR_RECORD`.SIN = SIN AND `HR_RECORD`.employee_id <> employee_id;

    SELECT COUNT(EMAIL) INTO emailChecker
    FROM `HR_RECORD`
    WHERE `HR_RECORD`.EMAIL = email AND `HR_RECORD`.employee_id <> employee_id;

    SELECT COUNT(EMPLOYEE_ID) INTO emplChecker
    FROM `HR_RECORD`
    WHERE `HR_RECORD`.EMPLOYEE_ID = employee_id;

    IF sinChecker > 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'SIN already in use.';
    ELSEIF emailChecker > 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Email already in use.';
    ELSEIF emplChecker = 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Employee does not exist';
    ELSE
      SELECT (HR_RECORD.VERSION + 1) INTO version FROM HR_RECORD WHERE HR_RECORD.EMPLOYEE_ID = employee_id ORDER BY HR_RECORD.VERSION DESC LIMIT 1; 
      INSERT INTO HR_RECORD (
      EMPLOYEE_ID, VERSION, CREATED_BY, ROLE, SIN, EMAIL, FIRST_NAME, LAST_NAME, ADDRESS, BIRTHDATE, VACATION_DAYS,
      REMAINING_VACATION_DAYS, FTE, STATUS, PASSWORD, SALARY, DATE_JOINED, ADMIN_LEVEL, CREATED_DATE, PHONE_NUMBER)
      VALUES (
      employee_id, version, created_by_id, role, SIN, email, first_name, last_name, address, birthdate, vacation_days,
      remaining_vacation_days, FTE, status, password, salary, date_joined, admin_level, created_date, phone_number);
    END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure get_employee_docs
--    - get the documents of an employee, provided
--    - the employee exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS get_employee_docs;

DELIMITER //

CREATE PROCEDURE `get_employee_docs`(IN employee_id INT)
BEGIN
  DECLARE checker INT;

  SET checker = 0;

  SELECT COUNT(EMPLOYEE_ID) INTO checker
  FROM `HR_RECORD`
  WHERE `HR_RECORD`.EMPLOYEE_ID = employee_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Employee does not exist.';
  ELSE
    SELECT *
    FROM SUPPORT_DOC
    WHERE SUPPORT_DOC.EMPLOYEE_ID = employee_id;
  END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure get_employee
--    - get the latest version of the employee,
--    - provided the employee exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS get_employee;

DELIMITER //

CREATE PROCEDURE `get_employee`(IN employee_id INT)
BEGIN
  DECLARE checker INT;

  SET checker = 0;

  SELECT COUNT(EMPLOYEE_ID) INTO checker
  FROM `HR_RECORD`
  WHERE `HR_RECORD`.EMPLOYEE_ID = employee_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Employee does not exist.';
  ELSE
    SELECT *
    FROM HR_RECORD hr1
    INNER JOIN (
      SELECT EMPLOYEE_ID, MAX(VERSION) AS VERSION
      FROM HR_RECORD
      GROUP BY EMPLOYEE_ID
    ) hr2 ON hr1.EMPLOYEE_ID = hr2.EMPLOYEE_ID AND hr1.VERSION = hr2.VERSION
    WHERE hr1.EMPLOYEE_ID = employee_id;
  END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure get_employee_history
--    - get the history of the employee,
--    - provided the employee exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS get_employee_history;

DELIMITER //

CREATE PROCEDURE `get_employee_history`(IN employee_id INT)
BEGIN
  DECLARE checker INT;

  SET checker = 0;

  SELECT COUNT(EMPLOYEE_ID) INTO checker
  FROM `HR_RECORD`
  WHERE `HR_RECORD`.EMPLOYEE_ID = employee_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Employee does not exist.';
  ELSE
    SELECT *
    FROM HR_RECORD
    WHERE HR_RECORD.EMPLOYEE_ID = employee_id
    ORDER BY VERSION DESC;
  END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure get_all_employees
--    - get the latest version of all employees
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS get_all_employees;

DELIMITER //

CREATE PROCEDURE `get_all_employees` ()
BEGIN
    SELECT *
    FROM HR_RECORD hr1
    INNER JOIN (
      SELECT EMPLOYEE_ID, MAX(VERSION) AS VERSION
      FROM HR_RECORD
      GROUP BY EMPLOYEE_ID
    ) hr2 ON hr1.EMPLOYEE_ID = hr2.EMPLOYEE_ID AND hr1.VERSION = hr2.VERSION;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure get_manager_employees
--    - get the employees reporting under the given
--    - manager, provided the manager exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS get_manager_employees;

DELIMITER //

CREATE PROCEDURE `get_manager_employees` (IN manager_id INT)
BEGIN
  DECLARE checker INT;

  SET checker = 0;

  SELECT COUNT(EMPLOYEE_ID) INTO checker
  FROM `HR_RECORD`
  WHERE `HR_RECORD`.EMPLOYEE_ID = manager_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Manager does not exist.';
  ELSE
    SELECT *
    FROM HR_RECORD hr1
    INNER JOIN (
      SELECT EMPLOYEE_ID, MAX(VERSION) AS VERSION
      FROM HR_RECORD
      GROUP BY EMPLOYEE_ID
    ) hr2 ON hr1.EMPLOYEE_ID = hr2.EMPLOYEE_ID AND hr1.VERSION = hr2.VERSION
    WHERE hr1.EMPLOYEE_ID in (
      SELECT m.EMPLOYEE_ID
      FROM MANAGER_EMPLOYEE m
      WHERE m.MANAGER_ID = manager_id
    );
  END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure get_employee_performance_reviews
--    - get the performance reviews for a given employee,
--    - provided the employee exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS get_employee_performance_reviews;

DELIMITER //

CREATE PROCEDURE `get_employee_performance_reviews` (IN employee_id INT)
BEGIN
  DECLARE checker INT;

  SET checker = 0;

  SELECT COUNT(EMPLOYEE_ID) INTO checker
  FROM `HR_RECORD`
  WHERE `HR_RECORD`.EMPLOYEE_ID = employee_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Employee does not exist.';
  ELSE
    SELECT *, p.PERFORMANCE_ID as PERFORMANCE_ID, p.DATE as DATE
    FROM PERFORMANCE p
    LEFT JOIN JABC_GOAL jg ON p.PERFORMANCE_ID = jg.PERFORMANCE_ID
    LEFT JOIN PERSONAL_TARGET pt ON p.PERFORMANCE_ID = pt.PERFORMANCE_ID
    LEFT JOIN OBJECTIVE o ON p.PERFORMANCE_ID = o.PERFORMANCE_ID
    LEFT JOIN DEVELOPMENT_GOAL dg ON p.PERFORMANCE_ID = dg.PERFORMANCE_ID
    LEFT JOIN COMMENT c ON p.PERFORMANCE_ID = c.PERFORMANCE_ID
    WHERE p.EMPLOYEE_ID = employee_id;
  END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure get_employee_vacation
--    - get the vacation requests for a given employee,
--    - provided the employee exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS get_employee_vacation;

DELIMITER //

CREATE PROCEDURE `get_employee_vacation` (IN id INT)
BEGIN
  DECLARE checker INT;

  SET checker = 0;

  SELECT COUNT(EMPLOYEE_ID) INTO checker
  FROM `HR_RECORD`
  WHERE `HR_RECORD`.EMPLOYEE_ID = employee_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Employee does not exist.';
  ELSE
    SELECT *
    FROM VACATION_REQUEST
    WHERE EMPLOYEE_ID = id;
  END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure link_employee_manager
--    - link the employee to a manager,
--    - provided both employee and manager exist
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS link_employee_manager;

DELIMITER //
-- TODO: Manage duplicate entry
CREATE PROCEDURE `link_employee_manager` (IN e_id INT
, IN m_id INT)
BEGIN
  DECLARE emplChecker INT;
  DECLARE managChecker INT;

  SET emplChecker = 0;
  SET managChecker = 0;

  SELECT COUNT(EMPLOYEE_ID) INTO emplChecker
  FROM `HR_RECORD`
  WHERE `HR_RECORD`.EMPLOYEE_ID = e_id;

  SELECT COUNT(EMPLOYEE_ID) INTO managChecker
  FROM `HR_RECORD`
  WHERE `HR_RECORD`.EMPLOYEE_ID = m_id;

  IF emplChecker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Employee does not exist.';
  ELSEIF managChecker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Manager employee does not exist.';
  ELSE
    INSERT INTO MANAGER_EMPLOYEE (MANAGER_ID, EMPLOYEE_ID)
    VALUES (m_id, e_id);
  END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure unlink_employee_manager
--    - unlink the employee to a manager,
--    - provided both employee and manager exist
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS unlink_employee_manager;

DELIMITER //

CREATE PROCEDURE `unlink_employee_manager` (IN e_id INT
, IN m_id INT)
BEGIN
  DECLARE emplChecker INT;
  DECLARE managChecker INT;

  SET emplChecker = 0;
  SET managChecker = 0;

  SELECT COUNT(EMPLOYEE_ID) INTO emplChecker
  FROM `HR_RECORD`
  WHERE `HR_RECORD`.EMPLOYEE_ID = e_id;

  SELECT COUNT(EMPLOYEE_ID) INTO managChecker
  FROM `HR_RECORD`
  WHERE `HR_RECORD`.EMPLOYEE_ID = m_id;

  IF emplChecker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Employee does not exist.';
  ELSEIF managChecker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Manager employee does not exist.';
  ELSE
    DELETE FROM MANAGER_EMPLOYEE
    WHERE MANAGER_ID = m_id AND EMPLOYEE_ID = e_id;
  END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure login
--    - Login the the provided credentials,
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS login;
DELIMITER $$
CREATE PROCEDURE `login`(IN `EMAIL` VARCHAR(100), IN `PASSWORD` VARCHAR(500))
BEGIN
    DECLARE checker INT;
    DECLARE checker2 INT;

    SET checker = 0;
    SET checker2 = 0;

    SELECT EMPLOYEE_ID INTO checker FROM HR_RECORD where HR_RECORD.EMAIL = EMAIL AND HR_RECORD.STATUS != 0;
    IF checker = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'The email is not registered.';
    END IF;

    SELECT EMPLOYEE_ID INTO checker2 FROM HR_RECORD WHERE HR_RECORD.EMAIL = EMAIL AND HR_RECORD.PASSWORD = PASSWORD AND HR_RECORD.STATUS != 0 ORDER BY HR_RECORD.VERSION DESC LIMIT 1;
    IF checker2 = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'The password is incorrect';
    END IF;

    SELECT * FROM HR_RECORD WHERE EMPLOYEE_ID = checker2 LIMIT 1;
END$$
DELIMITER ;
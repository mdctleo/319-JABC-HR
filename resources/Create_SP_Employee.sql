-- STORED PROCEDURES FOR EmployeeService


-- Create new support doc
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
    INSERT INTO `SUPPORT_DOC` (EMPLOYEE_ID, TYPE_ID, CREATED_DATE, DUE_DATE, EXPIRY_DATE, PATH, DESCRIPTION)
    VALUES (employee_id, type_id, created_date, due_date, expiry_date, path, description);
END //

DELIMITER ;


-- Create an employee in the database
-- It will be automatically assigned an employee_id
-- Version = 0 indicating its a new employee
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
, IN date_joined TIMESTAMP,
, IN admin_level TINYINT,
, IN created_date BIGINT,
, IN phone_number VARCHAR(45)
)
BEGIN
    INSERT INTO HR_RECORD (
      VERSION, CREATED_BY, ROLE, SIN, EMAIL, FIRST_NAME, LAST_NAME, ADDRESS, BIRTHDATE, VACATION_DAYS,
      REMAINING_VACATION_DAYS, FTE, STATUS, PASSWORD, SALARY, DATE_JOINED, ADMIN_LEVEL, CREATED_DATE, PHONE_NUMBER)
    VALUES (
      0, created_by_id, role, SIN, email, first_name, last_name, address, birthdate, vacation_days,
      remaining_vacation_days, FTE, status, password, salary, date_joined, admin_level, created_date, phone_number);
END //

DELIMITER ;


-- Create performance for given employee
DROP PROCEDURE IF EXISTS create_employee_performance;

DELIMITER //

CREATE PROCEDURE `create_employee_performance` (IN employee_id INT
, IN created_date BIGINT
, IN status TINYINT
)
BEGIN
    INSERT INTO `PERFORMANCE` (`DATE`, STATUS, EMPLOYEE_ID)
    VALUES (created_date, status, employee_id);
END //

DELIMITER ;


-- Create vacation for given employee
DROP PROCEDURE IF EXISTS create_employee_vacation;

DELIMITER //

CREATE PROCEDURE `create_employee_vacation` (IN employee_id INT
, IN approver_id INT
, IN requested_days INT
, IN request_status TINYINT
, IN created_date BIGINT
)
BEGIN
    INSERT INTO `VACATION_REQUEST` (EMPLOYEE_ID, APPROVER_ID, REQUESTED_DAYS, REQUEST_STATUS, `DATE`)
    VALUES (employee_id, approver_id, requested_days, request_status, created_date);
END //

DELIMITER ;


-- Update an employee in the database
-- Essentially a new row with incremented version and updated values
--
-- Deleting an employee can also use this by setting the status
-- to "0 = Inactive"
DROP PROCEDURE IF EXISTS update_employee;

DELIMITER //

CREATE PROCEDURE `update_employee`(IN employee_id INT
, IN version INT
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
, IN date_joined TIMESTAMP,
, IN admin_level TINYINT,
, IN created_date BIGINT,
, IN phone_number VARCHAR(45)
)
BEGIN
    INSERT INTO HR_RECORD (
      EMPLOYEE_ID, VERSION, CREATED_BY, ROLE, SIN, EMAIL, FIRST_NAME, LAST_NAME, ADDRESS, BIRTHDATE, VACATION_DAYS,
      REMAINING_VACATION_DAYS, FTE, STATUS, PASSWORD, SALARY, DATE_JOINED, ADMIN_LEVEL, CREATED_DATE, PHONE_NUMBER)
    VALUES (
      employee_id, version, created_by_id, role, SIN, email, first_name, last_name, address, birthdate, vacation_days,
      remaining_vacation_days, FTE, status, password, salary, date_joined, admin_level, created_date, phone_number);
END //

DELIMITER ;


-- Get documents of an employee, given employee id
DROP PROCEDURE IF EXISTS get_employee_docs;

DELIMITER //

CREATE PROCEDURE `get_employee_docs`(IN id INT)
BEGIN
  SELECT *
  FROM SUPPORT_DOC
  WHERE EMPLOYEE_ID = id;
END //

DELIMITER ;


-- Get latest version of an employee, given an employee ID
DROP PROCEDURE IF EXISTS get_employee;

DELIMITER //

CREATE PROCEDURE `get_employee`(IN id INT)
BEGIN
  SELECT *
  FROM HR_RECORD hr1
  INNER JOIN (
    SELECT EMPLOYEE_ID, MAX(VERSION)
    FROM HR_RECORD
    GROUP BY EMPLOYEE_ID
  ) hr2 ON hr1.EMPLOYEE_ID = hr2.EMPLOYEE_ID AND hr1.VERSION = hr2.VERSION
  WHERE hr1.EMPLOYEE_ID = id;
END //

DELIMITER ;


-- Get history of an employee, given an employee ID
DROP PROCEDURE IF EXISTS get_employee_history;

DELIMITER //

CREATE PROCEDURE `get_employee_history`(IN id INT)
BEGIN
  SELECT *
  FROM HR_RECORD
  WHERE hr1.EMPLOYEE_ID = id
  ORDER BY VERSION DESC;
END //

DELIMITER ;


-- Get latest versions of all employees
DROP PROCEDURE IF EXISTS get_all_employees;

DELIMITER //

CREATE PROCEDURE `get_all_employees` ()
BEGIN
    SELECT *
    FROM HR_RECORD hr1
    INNER JOIN (
      SELECT EMPLOYEE_ID, MAX(VERSION)
      FROM HR_RECORD
      GROUP BY EMPLOYEE_ID
    ) hr2 ON hr1.EMPLOYEE_ID = hr2.EMPLOYEE_ID AND hr1.VERSION = hr2.VERSION;
END //

DELIMITER ;


-- Get latest versions of all employees under the given
-- manager ID
DROP PROCEDURE IF EXISTS get_manager_employees;

DELIMITER //

CREATE PROCEDURE `get_manager_employees` (IN id INT)
BEGIN
    SELECT *
    FROM HR_RECORD hr1
    INNER JOIN (
      SELECT EMPLOYEE_ID, MAX(VERSION)
      FROM HR_RECORD
      GROUP BY EMPLOYEE_ID
    ) hr2 ON hr1.EMPLOYEE_ID = hr2.EMPLOYEE_ID AND hr1.VERSION = hr2.VERSION
    WHERE hr1.EMPLOYEE_ID in (
      SELECT m.EMPLOYEE_ID
      FROM MANAGER_EMPLOYEE m
      WHERE m.MANAGER_ID = id;
    );
END //

DELIMITER ;


-- Get performance reviews and its respective sections for a given employee ID
DROP PROCEDURE IF EXISTS get_performance_reviews;

DELIMITER //

CREATE PROCEDURE `get_performance_reviews` (IN id INT)
BEGIN
    SELECT *
    FROM PERFORMANCE p
    LEFT JOIN JABC_GOAL jg ON p.PERFORMANCE_ID = jg.PERFORMANCE_ID
    LEFT JOIN PERSONAL_TARGET pt ON p.PERFORMANCE_ID = pt.PERFORMANCE_ID
    LEFT JOIN JABC_GOAL jg ON p.PERFORMANCE_ID = jg.PERFORMANCE_ID
    LEFT JOIN OBJECTIVE o ON p.PERFORMANCE_ID = o.PERFORMANCE_ID
    LEFT JOIN DEVELOPMENT_GOAL dg ON p.PERFORMANCE_ID = dg.PERFORMANCE_ID
    LEFT JOIN COMMENT c ON p.PERFORMANCE_ID = c.PERFORMANCE_ID
    WHERE p.EMPLOYEE_ID = id;
END //

DELIMITER ;


-- Get all vacation requests for a given employee ID
DROP PROCEDURE IF EXISTS get_employee_vacation;

DELIMITER //

CREATE PROCEDURE `get_employee_vacation` (IN id INT)
BEGIN
    SELECT *
    FROM VACATION_REQUEST
    WHERE EMPLOYEE_ID = id;
END //

DELIMITER ;


-- Link employee with manager
DROP PROCEDURE IF EXISTS link_employee_manager;

DELIMITER //

CREATE PROCEDURE `link_employee_manager` (IN e_id INT
, IN m_id INT)
BEGIN
    INSERT INTO MANAGER_EMPLOYEE (MANAGER_ID, EMPLOYEE_ID)
    VALUES (e_id, m_id);
END //

DELIMITER ;


-- Link employee with manager
DROP PROCEDURE IF EXISTS unlink_employee_manager;

DELIMITER //

CREATE PROCEDURE `unlink_employee_manager` (IN e_id INT
, IN m_id INT)
BEGIN
    DELETE FROM MANAGER_EMPLOYEE
    WHERE MANAGER_ID = m_id AND EMPLOYEE_ID = e_id;
END //

DELIMITER ;


DROP VIEW IF EXISTS LATEST_HR_RECORDS;
CREATE VIEW LATEST_HR_RECORDS AS SELECT HR_RECORD.* FROM HR_RECORD WHERE (EMPLOYEE_ID, HR_RECORD.VERSION) IN (SELECT EMPLOYEE_ID, MAX(HR_RECORD.VERSION) AS LATEST_VERSION FROM `HR_RECORD` GROUP BY EMPLOYEE_ID);
-- STORED PROCEDURES FOR EmployeeService


-- -----------------------------------------------------
-- procedure create_onboarding_task
--    - create a onboarding task for the given employee,
--    - only if the employee and type exist
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS create_onboarding_task;

DELIMITER //

CREATE PROCEDURE `create_onboarding_task` (IN employee_id INT
, IN type_id INT
, IN created_date DATE
, IN due_date DATE
, IN expiry_date DATE
, IN description VARCHAR(2512)
, IN require_doc TINYINT
)
BEGIN
    DECLARE typeChecker INT;
    DECLARE emplChecker INT;
    SET typeChecker = 0;
    SET emplChecker = 0;
    SELECT COUNT(DOC_TYPE_ID) INTO typeChecker FROM `DOC_TYPE` WHERE `DOC_TYPE`.DOC_TYPE_ID = type_id;
    SELECT COUNT(EMPLOYEE_ID) INTO emplChecker FROM `HR_RECORD` WHERE `HR_RECORD`.EMPLOYEE_ID = employee_id;

    IF typeChecker = 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Document type does not exist.';
    ELSEIF emplChecker = 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Employee does not exist.';
    ELSE
      INSERT INTO ONBOARDING_TASK (EMPLOYEE_ID, DOC_TYPE_ID, CREATED_DATE, DUE_DATE, EXPIRY_DATE, DESCRIPTION, REQUIRE_DOC)
      VALUES (employee_id, type_id, created_date, due_date, expiry_date, description, require_doc);
    END IF;
END //

DELIMITER ;

-- -----------------------------------------------------
-- procedure complete_onboarding_task
--    - create a onboarding task for the given employee,
--    - only if the employee and type exist
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS complete_onboarding_task;

DELIMITER //

CREATE PROCEDURE `complete_onboarding_task` (IN onboarding_task_id INT
, IN actual_file BLOB(25000000)
, IN mime_type VARCHAR(100)
)
BEGIN
    DECLARE taskChecker INT;
    DECLARE requireChecker INT;
    SET taskChecker = 0;
    SET requireChecker = 0;

    SELECT COUNT(EMPLOYEE_ID) INTO taskChecker FROM `ONBOARDING_TASK` WHERE `ONBOARDING_TASK`.ONBOARDING_TASK_ID = onboarding_task_id;

    IF taskChecker = 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'The onboarding task does not exist.';
    ELSE
      SELECT REQUIRE_DOC INTO requireChecker FROM `ONBOARDING_TASK` WHERE `ONBOARDING_TASK`.ONBOARDING_TASK_ID = onboarding_task_id;
      IF requireChecker = 0 THEN
        UPDATE ONBOARDING_TASK SET
        ONBOARDING_TASK.STATUS = 1 WHERE ONBOARDING_TASK_ID = onboarding_task_id;
      ELSE
        UPDATE ONBOARDING_TASK SET
        ONBOARDING_TASK.STATUS = 1, ONBOARDING_TASK.ACTUAL_FILE = actual_file, ONBOARDING_TASK.MIME_TYPE = mime_type  WHERE ONBOARDING_TASK_ID = onboarding_task_id;
      END IF;
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
, IN email VARCHAR(100)
, IN first_name VARCHAR(100)
, IN last_name VARCHAR(100)
, IN address VARCHAR(512)
, IN birthdate DATE
, IN vacation_days INT
, IN remaining_vacation_days INT
, IN FTE TINYINT
, IN status TINYINT
, IN password VARCHAR(200)
, IN salary DECIMAL(10, 2)
, IN date_joined DATE
, IN admin_level TINYINT
, IN phone_number VARCHAR(45)
)
BEGIN
    DECLARE sinChecker INT;
    DECLARE emailChecker INT;
    DECLARE employeeID INT;
    DECLARE created_date DATE;

    SET sinChecker = 0;
    SET emailChecker = 0;

    SELECT NOW() INTO created_date;

    SELECT COUNT(SIN) INTO sinChecker
    FROM `LATEST_HR_RECORDS`
    WHERE `LATEST_HR_RECORDS`.SIN = SIN;

    SELECT COUNT(EMAIL) INTO emailChecker
    FROM `LATEST_HR_RECORDS`
    WHERE `LATEST_HR_RECORDS`.EMAIL = email;

    IF sinChecker > 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'SIN already in use.';
    ELSEIF emailChecker > 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Email already in use.';
    ELSEIF salary < 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Salary cannot be negative.';
    ELSEIF remaining_vacation_days < 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Remaining vacation days cannot be negative.';
    ELSEIF vacation_days < 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Vacation days cannot be negative.';
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
-- procedure create_employee_performance_plan
--    - create a performance record for an employee,
--    - provided that the employee exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS create_employee_performance_plan;

DELIMITER //

CREATE PROCEDURE `create_employee_performance_plan` (IN employee_id INT
, IN start_year SMALLINT
, IN end_year SMALLINT
, IN create_date DATE
, IN status TINYINT
)
BEGIN
    DECLARE checker INT;

    SET checker = 0;

    SELECT COUNT(EMPLOYEE_ID) INTO checker
    FROM `EMPLOYEE`
    WHERE `EMPLOYEE`.EMPLOYEE_ID = employee_id;

    IF checker = 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Employee does not exist.';
    ELSE
      INSERT INTO `PERFORMANCE_PLAN` (START_YEAR, END_YEAR, CREATE_DATE, STATUS, EMPLOYEE_ID)
      VALUES (start_year, end_year, create_date, status, employee_id);
      SELECT LAST_INSERT_ID() AS PERFORMANCE_PLAN_ID;
    END IF;
END //

DELIMITER ;

-- -----------------------------------------------------
-- procedure create_employee_performance_plan_section
--    - create a performance record for an employee,
--    - provided that the employee exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS create_employee_performance_plan_section;

DELIMITER //

CREATE PROCEDURE `create_employee_performance_plan_section` (IN performance_plan_id INT
, IN section_data JSON
, IN section_name VARCHAR(100)
)
BEGIN
    DECLARE checker INT;

    SET checker = 0;

    SELECT COUNT(PERFORMANCE_PLAN_ID) INTO checker
    FROM `PERFORMANCE_PLAN`
    WHERE `PERFORMANCE_PLAN`.PERFORMANCE_PLAN_ID = performance_plan_id;

    IF checker = 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Performance plan does not exist.';
    ELSE
      INSERT INTO `PERFORMANCE_SECTION` (`DATA`, SECTION_NAME, PERFORMANCE_PLAN_ID)
      VALUES (section_data, section_name, performance_plan_id);
    END IF;
END //

DELIMITER ;

-- -----------------------------------------------------
-- procedure create_employee_performance_review
--    - create a performance record for an employee,
--    - provided that the employee exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS create_employee_performance_review;

DELIMITER //

CREATE PROCEDURE `create_employee_performance_review` (IN employee_id INT
, IN create_date DATE
, IN work_plan INT
, IN status TINYINT
)
BEGIN
    DECLARE checker INT;
    DECLARE work_plan_checker INT;

    SET checker = 0;
    SET work_plan_checker = 0;

    SELECT COUNT(EMPLOYEE_ID) INTO checker
    FROM `EMPLOYEE`
    WHERE `EMPLOYEE`.EMPLOYEE_ID = employee_id;

    SELECT COUNT(PERFORMANCE_PLAN_ID) INTO work_plan_checker
    FROM `PERFORMANCE_PLAN`
    WHERE `PERFORMANCE_PLAN`.PERFORMANCE_PLAN_ID = work_plan;

    IF checker = 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Employee does not exist.';
    ELSEIF work_plan_checker = 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Work plan does not exist.';
    ELSE
      INSERT INTO `PERFORMANCE_REVIEW` (CREATE_DATE, STATUS, EMPLOYEE_ID, WORK_PLAN_ID)
      VALUES (create_date, status, employee_id, work_plan);
      SELECT LAST_INSERT_ID() AS PERFORMANCE_REVIEW_ID;
    END IF;
END //

DELIMITER ;

-- -----------------------------------------------------
-- procedure create_employee_performance_review_section
--    - create a performance record for an employee,
--    - provided that the employee exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS create_employee_performance_review_section;

DELIMITER //

CREATE PROCEDURE `create_employee_performance_review_section` (IN performance_review_id INT
, IN section_data JSON
, IN section_name VARCHAR(100)
)
BEGIN
    DECLARE checker INT;

    SET checker = 0;

    SELECT COUNT(PERFORMANCE_REVIEW_ID) INTO checker
    FROM `PERFORMANCE_REVIEW`
    WHERE `PERFORMANCE_REVIEW`.PERFORMANCE_REVIEW_ID = performance_review_id;

    IF checker = 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Performance review does not exist.';
    ELSE
      INSERT INTO `PERFORMANCE_SECTION` (`DATA`, SECTION_NAME, PERFORMANCE_REVIEW_ID)
      VALUES (section_data, section_name, performance_review_id);
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
, IN requested_days INT
, IN request_status TINYINT
, IN created_date DATE
)
BEGIN
    DECLARE emplChecker INT;

    SET emplChecker = 0;

    SELECT COUNT(EMPLOYEE_ID) INTO emplChecker
    FROM `EMPLOYEE`
    WHERE `EMPLOYEE`.EMPLOYEE_ID = employee_id;

    IF emplChecker = 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Employee does not exist.';
    ELSE
      INSERT INTO `VACATION_REQUEST` (EMPLOYEE_ID, REQUESTED_DAYS, REQUEST_STATUS, `DATE`)
      VALUES (employee_id, requested_days, request_status, created_date);
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
, IN email VARCHAR(100)
, IN first_name VARCHAR(100)
, IN last_name VARCHAR(100)
, IN address VARCHAR(512)
, IN birthdate DATE
, IN vacation_days INT
, IN remaining_vacation_days INT
, IN FTE TINYINT
, IN status TINYINT
, IN salary DECIMAL(10, 2)
, IN date_joined DATE
, IN admin_level TINYINT
, IN phone_number VARCHAR(45)
)
BEGIN
    DECLARE sinChecker INT;
    DECLARE emailChecker INT;
    DECLARE emplChecker INT;
    DECLARE adminChecker INT;
    DECLARE version INT;
    DECLARE created_date DATE;
    DECLARE password VARCHAR(200);
    
    SET sinChecker = 0;
    SET emailChecker = 0;
    SET emplChecker = 0;
    SET adminChecker = 0;

    SELECT NOW() INTO created_date;
    SELECT COUNT(SIN) INTO sinChecker
    FROM `LATEST_HR_RECORDS`
    WHERE `LATEST_HR_RECORDS`.SIN = SIN AND `LATEST_HR_RECORDS`.employee_id <> employee_id;

    SELECT COUNT(EMAIL) INTO emailChecker
    FROM `LATEST_HR_RECORDS`
    WHERE `LATEST_HR_RECORDS`.EMAIL = email AND `LATEST_HR_RECORDS`.employee_id <> employee_id;

    SELECT COUNT(EMPLOYEE_ID) INTO emplChecker
    FROM `EMPLOYEE`
    WHERE `EMPLOYEE`.EMPLOYEE_ID = employee_id;

    IF IFNULL(created_by_id, -1) = -1 THEN
      SET adminChecker = 1;
    ELSE 
      SELECT COUNT(EMPLOYEE_ID) INTO adminChecker
      FROM `EMPLOYEE`
      WHERE `EMPLOYEE`.EMPLOYEE_ID = created_by_id;
    END IF;

    IF adminChecker = 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'The creator of the employee does not exist.';
    ELSEIF sinChecker > 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'SIN already in use.';
    ELSEIF emailChecker > 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Email already in use.';
    ELSEIF emplChecker = 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Employee does not exist';
    ELSE
      SELECT (`LATEST_HR_RECORDS`.VERSION + 1) INTO version FROM `LATEST_HR_RECORDS` WHERE `LATEST_HR_RECORDS`.EMPLOYEE_ID = employee_id LIMIT 1;
      SELECT `LATEST_HR_RECORDS`.PASSWORD INTO password FROM `LATEST_HR_RECORDS` WHERE `LATEST_HR_RECORDS`.EMPLOYEE_ID = employee_id LIMIT 1;
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
-- procedure update_employee_password
--    - update an employee, provided that employee exists
--    - also validate that the new SIN and EMAIL are not
--    - used by other employees
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS update_employee_password;

DELIMITER //

CREATE PROCEDURE `update_employee_password`(IN employee_id INT
, IN password VARCHAR(200)
)
BEGIN
    DECLARE emplChecker INT;
    DECLARE version INT;
    
    SET version = 0;
    SET emplChecker = 0;

    SELECT COUNT(EMPLOYEE_ID) INTO emplChecker
    FROM `EMPLOYEE`
    WHERE `EMPLOYEE`.EMPLOYEE_ID = employee_id;

    IF emplChecker = 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Employee does not exist';
    ELSE
      SELECT `LATEST_HR_RECORDS`.VERSION INTO version FROM `LATEST_HR_RECORDS` WHERE `LATEST_HR_RECORDS`.EMPLOYEE_ID = employee_id LIMIT 1;
      UPDATE HR_RECORD
      SET HR_RECORD.PASSWORD = password
      WHERE HR_RECORD.EMPLOYEE_ID = employee_id AND HR_RECORD.VERSION = version;
    END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure get_employee_tasks
--    - get the documents of an employee, provided
--    - the employee exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS get_employee_tasks;

DELIMITER //

CREATE PROCEDURE `get_employee_tasks`(IN employee_id INT)
BEGIN
  DECLARE checker INT;

  SET checker = 0;

  SELECT COUNT(EMPLOYEE_ID) INTO checker
  FROM `EMPLOYEE`
  WHERE `EMPLOYEE`.EMPLOYEE_ID = employee_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Employee does not exist.';
  ELSE
    SELECT *
    FROM ONBOARDING_TASK
    WHERE ONBOARDING_TASK.EMPLOYEE_ID = employee_id;
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
  FROM `EMPLOYEE`
  WHERE `EMPLOYEE`.EMPLOYEE_ID = employee_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Employee does not exist.';
  ELSE
    SELECT *
    FROM LATEST_HR_RECORDS
    WHERE LATEST_HR_RECORDS.EMPLOYEE_ID = employee_id;
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
  FROM `EMPLOYEE`
  WHERE `EMPLOYEE`.EMPLOYEE_ID = employee_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Employee does not exist.';
  ELSE
    SELECT history.*, ROLE.ROLE_NAME AS ROLE_NAME FROM (SELECT HR_RECORD.*, creator.FIRST_NAME AS CREATOR_FIRST_NAME, creator.LAST_NAME AS CREATOR_LAST_NAME
    FROM HR_RECORD LEFT JOIN LATEST_HR_RECORDS AS creator
    ON HR_RECORD.CREATED_BY = creator.EMPLOYEE_ID
    WHERE HR_RECORD.EMPLOYEE_ID = employee_id
    ORDER BY VERSION DESC) history LEFT JOIN ROLE 
    ON history.ROLE = ROLE.ROLE_ID;
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
    FROM LATEST_HR_RECORDS;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure get_all_active_employees
--    - get the latest version of all employees
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS get_all_active_employees;

DELIMITER //

CREATE PROCEDURE `get_all_active_employees` ()
BEGIN
    SELECT *
    FROM LATEST_HR_RECORDS
    WHERE LATEST_HR_RECORDS.STATUS != 0;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure get_all_employees_with_birthday
--    - get the latest version of all employees that matches the birthday with start - end
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS get_all_employees_with_birthday;

DELIMITER //

CREATE PROCEDURE `get_all_employees_with_birthday` (IN start_period DATE
, IN end_period DATE)
BEGIN
    SELECT * 
    FROM `LATEST_HR_RECORDS`
    WHERE DATE_FORMAT(BIRTHDATE, '%m-%d') >= DATE_FORMAT(start_period, '%m-%d') and DATE_FORMAT(BIRTHDATE, '%m-%d') <= DATE_FORMAT(end_period, '%m-%d');
END //

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_all_active_employees_with_birthday
--    - get the latest version of all employees that matches the birthday with start - end
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS get_all_active_employees_with_birthday;

DELIMITER //

CREATE PROCEDURE `get_all_active_employees_with_birthday` (IN start_period DATE
, IN end_period DATE)
BEGIN
    SELECT * 
    FROM `LATEST_HR_RECORDS`
    WHERE DATE_FORMAT(BIRTHDATE, '%m-%d') >= DATE_FORMAT(start_period, '%m-%d') and DATE_FORMAT(BIRTHDATE, '%m-%d') <= DATE_FORMAT(end_period, '%m-%d') AND LATEST_HR_RECORDS.STATUS != 0;
END //

DELIMITER ;

-- -----------------------------------------------------
-- function createDate
-- -----------------------------------------------------
DROP FUNCTION IF EXISTS createDate;
DELIMITER $$
CREATE FUNCTION `createDate`(YEAR_ INT, MONTH_ INT, DAY_ INT) RETURNS DATE
BEGIN
    RETURN DATE(CONCAT(YEAR_,'-',MONTH_,'-', DAY_));
END $$
DELIMITER ;

-- -----------------------------------------------------
-- function dateWithYear
-- -----------------------------------------------------
DROP FUNCTION IF EXISTS dateWithYear;
DELIMITER $$
CREATE FUNCTION `dateWithYear`(ORIGINAL_DATE DATE, YEAR_ INT) RETURNS DATE
BEGIN
    RETURN createDate(YEAR_, MONTH(ORIGINAL_DATE), DAY(ORIGINAL_DATE));
END $$
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
  FROM `EMPLOYEE`
  WHERE `EMPLOYEE`.EMPLOYEE_ID = manager_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Manager does not exist.';
  ELSE
    SELECT *
    FROM LATEST_HR_RECORDS hr1
    WHERE hr1.EMPLOYEE_ID in (
      SELECT m.EMPLOYEE_ID
      FROM MANAGER_EMPLOYEE m
      WHERE m.MANAGER_ID = manager_id
    );
  END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure get_employees_of_manager
--    - get the employees reporting under the given
--    - manager, provided the manager exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS get_employees_of_manager;

DELIMITER //

CREATE PROCEDURE `get_employees_of_manager` (IN manager_id INT)
BEGIN
  DECLARE checker INT;

  SET checker = 0;

  SELECT COUNT(EMPLOYEE_ID) INTO checker
  FROM `EMPLOYEE`
  WHERE `EMPLOYEE`.EMPLOYEE_ID = manager_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Manager does not exist.';
  ELSE
    SET checker = 0;
    SELECT ADMIN_LEVEL INTO checker
    FROM `LATEST_HR_RECORDS`
    WHERE `LATEST_HR_RECORDS`.EMPLOYEE_ID = manager_id;
    IF checker = 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'An employee with STAFF admin level does not manage other employees.';
    ELSE
      SELECT *
      FROM LATEST_HR_RECORDS hr1
      WHERE hr1.EMPLOYEE_ID in (
      SELECT m.EMPLOYEE_ID
      FROM MANAGER_EMPLOYEE m
      WHERE m.MANAGER_ID = manager_id
      );
    END IF;
  END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure get_managers_of_employee
--    - get the managers this employee reports to
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS get_managers_of_employee;

DELIMITER //

CREATE PROCEDURE `get_managers_of_employee` (IN employee_id INT)
BEGIN
  DECLARE checker INT;

  SET checker = 0;

  SELECT COUNT(EMPLOYEE_ID) INTO checker
  FROM `EMPLOYEE`
  WHERE `EMPLOYEE`.EMPLOYEE_ID = employee_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Employee does not exist.';
  ELSE
    SELECT *
    FROM LATEST_HR_RECORDS hr1
    WHERE hr1.EMPLOYEE_ID in (
      SELECT m.MANAGER_ID
      FROM MANAGER_EMPLOYEE m
      WHERE m.EMPLOYEE_ID = employee_id
    );
  END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure get_employee_managers
--    - get the employees reporting under the given
--    - manager, provided the manager exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS get_employee_managers;

DELIMITER //

CREATE PROCEDURE `get_employee_managers` (IN employee_id INT)
BEGIN
  DECLARE checker INT;

  SET checker = 0;

  SELECT COUNT(EMPLOYEE_ID) INTO checker
  FROM `EMPLOYEE`
  WHERE `EMPLOYEE`.EMPLOYEE_ID = employee_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Employee does not exist.';
  ELSE
    SELECT * 
    FROM LATEST_HR_RECORDS hr1
    WHERE hr1.EMPLOYEE_ID in (
      SELECT m.EMPLOYEE_ID
      FROM MANAGER_EMPLOYEE m
      WHERE m.EMPLOYEE_ID = employee_id
    );
  END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure check_employee_manager
--    - checks if the employe-manager link exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS check_employee_manager;

DELIMITER //

CREATE PROCEDURE `check_employee_manager` (IN e_id INT, IN m_id INT)
BEGIN
  DECLARE emplChecker INT;
  DECLARE managChecker INT;
  DECLARE linkChecker INT;

  SET emplChecker = 0;
  SET managChecker = 0;
  SET linkChecker = 0;

  SELECT COUNT(EMPLOYEE_ID) INTO emplChecker
  FROM `EMPLOYEE`
  WHERE `EMPLOYEE`.EMPLOYEE_ID = e_id;

  SELECT COUNT(EMPLOYEE_ID) INTO managChecker
  FROM `EMPLOYEE`
  WHERE `EMPLOYEE`.EMPLOYEE_ID = m_id;

  SELECT COUNT(MANAGER_ID) INTO linkChecker
  FROM `MANAGER_EMPLOYEE`
  WHERE `MANAGER_EMPLOYEE`.MANAGER_ID = m_id AND `MANAGER_EMPLOYEE`.EMPLOYEE_ID = e_id;

  IF emplChecker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Employee does not exist.';
  ELSEIF managChecker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Manager employee does not exist.';
  ELSEIF linkChecker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'The employee is not under the managed employees of the manager.';
  END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure get_employee_performance_plans
--    - get the work plans for a given employee,
--    - provided the employee exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS get_employee_performance_plans;

DELIMITER //

CREATE PROCEDURE `get_employee_performance_plans` (IN employee_id INT)
BEGIN
  DECLARE checker INT;
  DECLARE checker2 INT;

  SET checker = 0;
  SET checker2 = 0;

  SELECT COUNT(EMPLOYEE_ID) INTO checker
  FROM `EMPLOYEE`
  WHERE `EMPLOYEE`.EMPLOYEE_ID = employee_id;

  SELECT COUNT(EMPLOYEE_ID) INTO checker2
  FROM `PERFORMANCE_PLAN`
  WHERE `PERFORMANCE_PLAN`.EMPLOYEE_ID = employee_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Employee does not exist.';
  ELSEIF checker2 = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'The employee does not have any work plan.';
  ELSE
    SELECT *
    FROM `PERFORMANCE_PLAN` 
    WHERE `PERFORMANCE_PLAN`.EMPLOYEE_ID = employee_id;
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
  DECLARE checker2 INT;

  SET checker = 0;
  SET checker2 = 0;

  SELECT COUNT(EMPLOYEE_ID) INTO checker
  FROM `EMPLOYEE`
  WHERE `EMPLOYEE`.EMPLOYEE_ID = employee_id;

  SELECT COUNT(EMPLOYEE_ID) INTO checker2
  FROM `PERFORMANCE_REVIEW`
  WHERE `PERFORMANCE_REVIEW`.EMPLOYEE_ID = employee_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Employee does not exist.';
  ELSEIF checker2 = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'The employee does not have any performance review.';
  ELSE
    SELECT *
    FROM `PERFORMANCE_REVIEW` 
    WHERE `PERFORMANCE_REVIEW`.EMPLOYEE_ID = employee_id;
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
  FROM `EMPLOYEE`
  WHERE `EMPLOYEE`.EMPLOYEE_ID = employee_id;

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

CREATE PROCEDURE `link_employee_manager` (IN e_id INT
, IN m_id INT)
BEGIN
  DECLARE emplChecker INT;
  DECLARE managChecker INT;
  DECLARE linkChecker INT;
  DECLARE managerLevel INT;

  SET emplChecker = 0;
  SET managChecker = 0;
  SET linkChecker = 0;
  SET managerLevel = 0;

  SELECT COUNT(EMPLOYEE_ID) INTO managerLevel
  FROM `LATEST_HR_RECORDS`
  WHERE `LATEST_HR_RECORDS`.EMPLOYEE_ID = m_id AND `LATEST_HR_RECORDS`.ADMIN_LEVEL = 0;

  SELECT COUNT(EMPLOYEE_ID) INTO emplChecker
  FROM `EMPLOYEE`
  WHERE `EMPLOYEE`.EMPLOYEE_ID = e_id;

  SELECT COUNT(EMPLOYEE_ID) INTO managChecker
  FROM `EMPLOYEE`
  WHERE `EMPLOYEE`.EMPLOYEE_ID = m_id;

  SELECT COUNT(MANAGER_ID) INTO linkChecker
  FROM `MANAGER_EMPLOYEE`
  WHERE `MANAGER_EMPLOYEE`.MANAGER_ID = m_id AND `MANAGER_EMPLOYEE`.EMPLOYEE_ID = e_id;

  IF emplChecker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Employee does not exist.';
  ELSEIF managChecker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Manager employee does not exist.';
  ELSEIF linkChecker > 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Employee is already managed by this Manager.';
  ELSEIF managerLevel > 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'An employee with STAFF admin level, can not manage any employee.';
  ELSEIF e_id = m_id THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'An employee can not be managed by himself.';
  ELSE
    SET managChecker = 0;
    SELECT ADMIN_LEVEL INTO managChecker
    FROM `LATEST_HR_RECORDS`
    WHERE `LATEST_HR_RECORDS`.EMPLOYEE_ID = m_id;
    IF managChecker = 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'An employee with STAFF admin level can not manage any other employee.';
    ELSE 
      INSERT INTO MANAGER_EMPLOYEE (MANAGER_ID, EMPLOYEE_ID)
      VALUES (m_id, e_id);
    END IF;
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
  DECLARE linkChecker INT;

  SET emplChecker = 0;
  SET managChecker = 0;
  SET linkChecker = 0;

  SELECT COUNT(EMPLOYEE_ID) INTO emplChecker
  FROM `EMPLOYEE`
  WHERE `EMPLOYEE`.EMPLOYEE_ID = e_id;

  SELECT COUNT(EMPLOYEE_ID) INTO managChecker
  FROM `EMPLOYEE`
  WHERE `EMPLOYEE`.EMPLOYEE_ID = m_id;

  SELECT COUNT(*) INTO linkChecker
  FROM `MANAGER_EMPLOYEE`
  WHERE `MANAGER_EMPLOYEE`.EMPLOYEE_ID = e_id
  AND `MANAGER_EMPLOYEE`.MANAGER_ID = m_id;

  IF emplChecker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Employee does not exist.';
  ELSEIF managChecker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Manager employee does not exist.';
  ELSEIF linkChecker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Employee-Manager link does not exist.';
  ELSE
    DELETE FROM MANAGER_EMPLOYEE
    WHERE MANAGER_ID = m_id AND EMPLOYEE_ID = e_id;
  END IF;
END //

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_managers
--    - unlink the managers of an employee
--    - provided employee exist
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS delete_managers;

DELIMITER //

CREATE PROCEDURE `delete_managers` (IN e_id INT)
BEGIN
  DECLARE emplChecker INT;

  SET emplChecker = 0;

  SELECT COUNT(EMPLOYEE_ID) INTO emplChecker
  FROM `EMPLOYEE`
  WHERE `EMPLOYEE`.EMPLOYEE_ID = e_id;

  IF emplChecker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Employee does not exist.';
  ELSE
    DELETE FROM MANAGER_EMPLOYEE
    WHERE EMPLOYEE_ID = e_id;
  END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure delete_employees
--    - unlink the managers of a manager
--    - provided manager exist
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS delete_employees;

DELIMITER //

CREATE PROCEDURE `delete_employees` (IN m_id INT)
BEGIN
  DECLARE managChecker INT;

  SET managChecker = 0;

  SELECT COUNT(EMPLOYEE_ID) INTO managChecker
  FROM `EMPLOYEE`
  WHERE `EMPLOYEE`.EMPLOYEE_ID = m_id;

  IF managChecker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Manager does not exist.';
  ELSE
    DELETE FROM MANAGER_EMPLOYEE
    WHERE MANAGER_ID = m_id;
  END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure login
--    - Login the the provided credentials,
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS login;
DELIMITER $$
CREATE PROCEDURE `login`(IN `EMAIL` VARCHAR(100), IN `PASSWORD` VARCHAR(200))
BEGIN
    DECLARE checker INT;
    DECLARE checker2 INT;
    DECLARE versionID INT;

    SET checker = 0;
    SET checker2 = 0;
    SET versionID = 0;

    SELECT COUNT(EMPLOYEE_ID) INTO checker FROM LATEST_HR_RECORDS where LATEST_HR_RECORDS.EMAIL = EMAIL AND LATEST_HR_RECORDS.STATUS != 0;
    IF checker = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'The email is not registered.';
    END IF;

    SELECT COUNT(EMPLOYEE_ID) INTO checker2 FROM LATEST_HR_RECORDS WHERE LATEST_HR_RECORDS.EMAIL = EMAIL AND LATEST_HR_RECORDS.PASSWORD = PASSWORD AND LATEST_HR_RECORDS.STATUS != 0;
    IF checker2 = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'The password is incorrect';
    END IF;

    SELECT * FROM LATEST_HR_RECORDS WHERE LATEST_HR_RECORDS.EMAIL = EMAIL AND LATEST_HR_RECORDS.PASSWORD = PASSWORD;
END$$
DELIMITER ;

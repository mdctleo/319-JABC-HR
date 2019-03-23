-- STORED PROCEDURES FOR VacationService


-- -----------------------------------------------------
-- procedure delete_vacation_request
--    - delete vacation request with given id
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS delete_vacation_request;

DELIMITER //

CREATE PROCEDURE `delete_vacation_request` (IN vacation_req_id INT)
BEGIN
  DECLARE checker INT;

  SET checker = 0;

  SELECT COUNT(`VACATION_REQUEST_ID`) INTO checker
  FROM VACATION_REQUEST
  WHERE `VACATION_REQUEST_ID` = vacation_req_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Vacation request does not exist.';
  ELSE
    DELETE FROM VACATION_REQUEST
    WHERE VACATION_REQUEST_ID = vacation_req_id;
  END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure get_vacation_request
--    - get vacation request with given id, if it exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS get_vacation_request;

DELIMITER //

CREATE PROCEDURE `get_vacation_request` (IN vacation_req_id INT)
BEGIN
  DECLARE checker INT;

  SET checker = 0;

  SELECT COUNT(`VACATION_REQUEST_ID`) INTO checker
  FROM VACATION_REQUEST
  WHERE `VACATION_REQUEST_ID` = vacation_req_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Vacation request does not exist.';
  ELSE
    SELECT *
    FROM VACATION_REQUEST
    WHERE VACATION_REQUEST_ID = vacation_req_id;
  END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure update_vacation_request
--    - update given vacation request, if it exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS update_vacation_request;

DELIMITER //

CREATE PROCEDURE `update_vacation_request` (IN id INT
, IN approver_id INT
, IN requested_days INT
, IN request_status TINYINT
, IN request_date DATE
)
BEGIN
  DECLARE employee_id INT;
  DECLARE version INT;
  DECLARE checker INT;
  DECLARE remainingVacationDays INT;
  DECLARE approvChecker INT;

  SET checker = 0;
  SET employee_id = 0;
  SET version = 0;
  SET remainingVacationDays = 0;
  SET approvChecker = 0;

  SELECT COUNT(`VACATION_REQUEST_ID`) INTO checker
  FROM VACATION_REQUEST
  WHERE `VACATION_REQUEST_ID` = id;

  SELECT VACATION_REQUEST.EMPLOYEE_ID INTO employee_id
  FROM VACATION_REQUEST
  WHERE VACATION_REQUEST.`VACATION_REQUEST_ID` = id;

  SELECT COUNT(EMPLOYEE_ID) INTO approvChecker
    FROM `EMPLOYEE`
    WHERE `EMPLOYEE`.EMPLOYEE_ID = approver_id;

  SELECT `LATEST_HR_RECORDS`.REMAINING_VACATION_DAYS INTO remainingVacationDays 
    FROM `LATEST_HR_RECORDS` 
    WHERE `LATEST_HR_RECORDS`.EMPLOYEE_ID = employee_id LIMIT 1;

  SELECT `LATEST_HR_RECORDS`.VERSION INTO version 
  FROM `LATEST_HR_RECORDS` 
  WHERE `LATEST_HR_RECORDS`.EMPLOYEE_ID = employee_id LIMIT 1;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Vacation request does not exist.';
  ELSEIF approvChecker = 0 AND IFNULL(approver_id,-1) != -1 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'The approver employee does not exists.';
  ELSEIF (remainingVacationDays - requested_days) <= -1 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'The remaining vacation days are not enough.';
  ELSE
    UPDATE VACATION_REQUEST
    SET APPROVER_ID = approver_id, REQUESTED_DAYS = requested_days, REQUEST_STATUS = request_status,
    `DATE` = request_date
    WHERE vacation_request_id = id;
    UPDATE HR_RECORD SET HR_RECORD.REMAINING_VACATION_DAYS = remainingVacationDays - requested_days WHERE HR_RECORD.EMPLOYEE_ID = employee_id AND HR_RECORD.VERSION = version;
  END IF;
END //

DELIMITER ;

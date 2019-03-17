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
  DECLARE checker INT;

  SET checker = 0;

  SELECT COUNT(`VACATION_REQUEST_ID`) INTO checker
  FROM VACATION_REQUEST
  WHERE `VACATION_REQUEST_ID` = id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Vacation request does not exist.';
  ELSE
    UPDATE VACATION_REQUEST
    SET APPROVER_ID = approver_id, REQUESTED_DAYS = requested_days, REQUEST_STATUS = request_status,
    `DATE` = request_date
    WHERE vacation_request_id = id;
  END IF;
END //

DELIMITER ;

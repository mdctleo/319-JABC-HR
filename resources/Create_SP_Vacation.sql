-- STORED PROCEDURES FOR VacationService


-- Delete vacation request
DROP PROCEDURE IF EXISTS delete_vacation_request;

DELIMITER //

CREATE PROCEDURE `delete_vacation_request` (IN id INT)
)
BEGIN
    DELETE FROM VACATION_REQUEST
    WHERE VACATION_REQUEST_ID = id;
END //

DELIMITER ;


-- Get specific vacation request
DROP PROCEDURE IF EXISTS get_vacation_request;

DELIMITER //

CREATE PROCEDURE `get_vacation_request` (IN id INT)
)
BEGIN
    SELECT *
    FROM VACATION_REQUEST
    WHERE VACATION_REQUEST_ID = id;
END //

DELIMITER ;


-- Update specific vacation request
DROP PROCEDURE IF EXISTS update_vacation_request;

DELIMITER //

CREATE PROCEDURE `update_vacation_request` (IN id INT
, IN approver_id INT
, IN requested_days INT
, IN request_status TINYINT
, IN request_date BIGINT
)
BEGIN
    UPDATE VACATION_REQUEST
    SET APPROVER_ID = approver_id, REQUESTED_DAYS = requested_days, REQUEST_STATUS = request_status,
    `DATE` = request_date
    WHERE vacation_request_id = id;
END //

DELIMITER ;

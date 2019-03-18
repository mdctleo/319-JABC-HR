-- STORED PROCEDURES FOR DocumentService


-- -----------------------------------------------------
-- procedure create_doc_type
--    - create a doc type, only if its type name isn't
--    - in use
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS create_doc_type;

DELIMITER //

CREATE PROCEDURE `create_doc_type` (IN type_name VARCHAR(48)
, IN description VARCHAR(512)
)
BEGIN
    DECLARE checker INT;

    SET checker = 0;

    SELECT COUNT(DOC_NAME) INTO checker FROM `DOC_TYPE` WHERE `DOC_TYPE`.DOC_NAME = type_name;

    IF checker = 1 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Document type name is already in use.';
    ELSE
      INSERT INTO `DOC_TYPE` (DOC_NAME, DESCRIPTION)
      VALUES (type_name, description);
    END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure delete onboarding task
--    - delete a onboarding task, only if it exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS delete_onboarding_task;

DELIMITER //

CREATE PROCEDURE `delete_onboarding_task` (IN onboarding_task_id INT)
BEGIN
    DECLARE checker INT;

    SET checker = 0;

    SELECT COUNT(ONBOARDING_TASK_ID) INTO checker
    FROM `ONBOARDING_TASK`
    WHERE `ONBOARDING_TASK`.ONBOARDING_TASK_ID = onboarding_task_id;

    IF checker = 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'The onboarding task does not exist.';
    ELSE
      DELETE FROM `ONBOARDING_TASK`
      WHERE `ONBOARDING_TASK`.ONBOARDING_TASK_ID = onboarding_task_id;
    END IF;
END //

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete doc type 
--    - delete a doc type, only if it exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS delete_doc_type;

DELIMITER //

CREATE PROCEDURE `delete_doc_type` (IN type_id INT)
BEGIN
    DECLARE checker INT;
    DECLARE checkerUsage INT;

    SET checker = 0;
    SET checkerUsage = 0;

    SELECT COUNT(DOC_TYPE_ID) INTO checker
    FROM `DOC_TYPE`
    WHERE `DOC_TYPE`.DOC_TYPE_ID = type_id;

    SELECT COUNT(ONBOARDING_TASK_ID) INTO checkerUsage
    FROM `ONBOARDING_TASK`
    WHERE `ONBOARDING_TASK`.DOC_TYPE_ID = type_id;

    IF checker = 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'The document template does not exist.';
    ELSEIF checkerUsage > 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'The document template is in usage, so we can not delete it';
    ELSE
      DELETE FROM `DOC_TYPE`
      WHERE `DOC_TYPE`.DOC_TYPE_ID = type_id;
    END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure get_onboarding_tasks
--    - get onboarding tasks for an employee, if that
--    - employee exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS get_onboarding_tasks;

DELIMITER //

CREATE PROCEDURE `get_onboarding_tasks` (IN employee_id INT)
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
      FROM ONBOARDING_TASK
      WHERE EMPLOYEE_ID = employee_id;
    END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure get_onboarding_task
--    - get onboarding task with an id if that
--    - onboarding task exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS get_onboarding_task;

DELIMITER //

CREATE PROCEDURE `get_onboarding_task` (IN doc_id INT)
BEGIN
    DECLARE checker INT;

    SET checker = 0;

    SELECT COUNT(ONBOARDING_TASK_ID) INTO checker
    FROM `ONBOARDING_TASK`
    WHERE `ONBOARDING_TASK`.ONBOARDING_TASK_ID = doc_id;

    IF checker = 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Document does not exist.';
    ELSE
      SELECT *
      FROM ONBOARDING_TASK
      WHERE ONBOARDING_TASK_ID = doc_id;
    END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure get_doc_type
--    - get the doc type given its id, if it exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS get_doc_type;

DELIMITER //

CREATE PROCEDURE `get_doc_type` (IN type_id INT)
BEGIN
    DECLARE checker INT;

    SET checker = 0;

    SELECT COUNT(DOC_TYPE_ID) INTO checker
    FROM `DOC_TYPE`
    WHERE `DOC_TYPE`.DOC_TYPE_ID = type_id;

    IF checker = 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Document type does not exist.';
    ELSE
      SELECT *
      FROM `DOC_TYPE`
      WHERE DOC_TYPE_ID = type_id;
    END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure get_all_doc_types
--    - get all the document types
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS get_all_doc_types;

DELIMITER //

CREATE PROCEDURE `get_all_doc_types` ()
BEGIN
    SELECT *
    FROM `DOC_TYPE`;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure update_onboarding_task
--    - update the given onboarding task, if it exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS update_onboarding_task;

DELIMITER //

CREATE PROCEDURE `update_onboarding_task` (IN onboarding_task_id INT
, IN employee_id INT
, IN type_id INT
, IN created_date DATE
, IN due_date DATE
, IN expiry_date DATE
, IN description VARCHAR(512)
, IN require_doc TINYINT
)
BEGIN
    DECLARE checker INT;

    SET checker = 0;

    SELECT COUNT(ONBOARDING_TASK_ID) INTO checker
    FROM `ONBOARDING_TASK`
    WHERE `ONBOARDING_TASK`.ONBOARDING_TASK_ID = onboarding_task_id;

    IF checker = 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'The onboarding task does not exist.';
    ELSE
      UPDATE ONBOARDING_TASK
      SET EMPLOYEE_ID = employee_id, DOC_TYPE_ID = type_id, CREATED_DATE = created_date, DUE_DATE = due_date,
      EXPIRY_DATE = expiry_date, DESCRIPTION = description, REQUIRE_DOC = require_doc
      WHERE `ONBOARDING_TASK`.ONBOARDING_TASK_ID = onboarding_task_id;
    END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure update_doc_type
--    - update the given doc type, if it exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS update_doc_type;

DELIMITER //

CREATE PROCEDURE `update_doc_type` (IN type_id INT
, IN type_name VARCHAR(48)
, IN description VARCHAR(512)
)
BEGIN
    DECLARE checker INT;

    SET checker = 0;

    SELECT COUNT(DOC_TYPE_ID) INTO checker
    FROM `DOC_TYPE`
    WHERE `DOC_TYPE`.DOC_TYPE_ID = type_id;

    IF checker = 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Document type does not exist.';
    ELSE
      UPDATE `DOC_TYPE`
      SET DOC_NAME = type_name, DESCRIPTION = description
      WHERE `DOC_TYPE`.DOC_TYPE_ID = type_id;
    END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure upload_doc_type
--    - upload the given doc type, if it exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS upload_doc_type;

DELIMITER //

CREATE PROCEDURE `upload_doc_type` (IN type_id INT
, IN template_file MEDIUMBLOB
, IN mime_type VARCHAR(100)
)
BEGIN
    DECLARE checker INT;

    SET checker = 0;

    SELECT COUNT(DOC_TYPE_ID) INTO checker
    FROM `DOC_TYPE`
    WHERE `DOC_TYPE`.DOC_TYPE_ID = type_id;

    IF checker = 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Document type does not exist.';
    ELSE
      UPDATE `DOC_TYPE`
      SET TEMPLATE_FILE = template_file, MIME_TYPE = mime_type
      WHERE `DOC_TYPE`.DOC_TYPE_ID = type_id;
    END IF;
END //

DELIMITER ;

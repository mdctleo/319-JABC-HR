-- STORED PROCEDURES FOR DocumentService


-- -----------------------------------------------------
-- procedure create_doc_type
--    - create a doc type, only if its type name isn't
--    - in use
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS create_doc_type;

DELIMITER //

CREATE PROCEDURE `create_doc_type` (IN type_name VARCHAR(48)
, IN path VARCHAR(512)
, IN description VARCHAR(512)
)
BEGIN
    DECLARE checker INT;

    SET checker = 0;

    SELECT COUNT(TYPE_NAME) INTO checker FROM `TYPE` WHERE `TYPE`.TYPE_NAME = type_name;

    IF checker = 1 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Document type name is already in use.';
    ELSE
      INSERT INTO `TYPE` (TYPE_NAME, PATH, DESCRIPTION)
      VALUES (type_name, path, description);
    END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure delete support doc
--    - delete a support doc, only if it exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS delete_support_doc;

DELIMITER //

CREATE PROCEDURE `delete_support_doc` (IN support_doc_id INT)
BEGIN
    DECLARE checker INT;

    SET checker = 0;

    SELECT COUNT(SUPPORT_DOC_ID) INTO checker
    FROM `SUPPORT_DOC`
    WHERE `SUPPORT_DOC`.SUPPORT_DOC_ID = support_doc_id;

    IF checker = 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Support document does not exist.';
    ELSE
      DELETE FROM `SUPPORT_DOC`
      WHERE `SUPPORT_DOC`.SUPPORT_DOC_ID = support_doc_id;
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

    SELECT COUNT(TYPE_ID) INTO checker
    FROM `TYPE`
    WHERE `TYPE`.TYPE_ID = type_id;

    SELECT COUNT(SUPPORT_DOC_ID) INTO checkerUsage
    FROM `SUPPORT_DOC`
    WHERE `SUPPORT_DOC`.TYPE_ID = type_id;

    IF checker = 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'The document template does not exist.';
    ELSEIF checkerUsage > 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'The document template is in usage, so we can not delete it';
    ELSE
      DELETE FROM `TYPE`
      WHERE `TYPE`.TYPE_ID = type_id;
    END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure get_support_docs
--    - get support docs for an employee, if that
--    - employee exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS get_support_docs;

DELIMITER //

CREATE PROCEDURE `get_support_docs` (IN employee_id INT)
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
      WHERE EMPLOYEE_ID = employee_id;
    END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure get_support_doc
--    - get support doc with an id if that
--    - support doc exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS get_support_doc;

DELIMITER //

CREATE PROCEDURE `get_support_doc` (IN doc_id INT)
BEGIN
    DECLARE checker INT;

    SET checker = 0;

    SELECT COUNT(SUPPORT_DOC_ID) INTO checker
    FROM `SUPPORT_DOC`
    WHERE `SUPPORT_DOC`.SUPPORT_DOC_ID = doc_id;

    IF checker = 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Document does not exist.';
    ELSE
      SELECT *
      FROM SUPPORT_DOC
      WHERE SUPPORT_DOC_ID = doc_id;
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

    SELECT COUNT(TYPE_ID) INTO checker
    FROM `TYPE`
    WHERE `TYPE`.TYPE_ID = type_id;

    IF checker = 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Document type does not exist.';
    ELSE
      SELECT *
      FROM `TYPE`
      WHERE TYPE_ID = type_id;
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
    FROM `TYPE`;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure update_support_doc
--    - update the given support doc, if it exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS update_support_doc;

DELIMITER //

CREATE PROCEDURE `update_support_doc` (IN support_doc_id INT
, IN employee_id INT
, IN type_id INT
, IN created_date BIGINT
, IN due_date BIGINT
, IN expiry_date BIGINT
, IN path VARCHAR(512)
, IN description VARCHAR(512)
)
BEGIN
    DECLARE checker INT;

    SET checker = 0;

    SELECT COUNT(SUPPORT_DOC_ID) INTO checker
    FROM `SUPPORT_DOC`
    WHERE `SUPPORT_DOC`.SUPPORT_DOC_ID = support_doc_id;

    IF checker = 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Support document does not exist.';
    ELSE
      UPDATE SUPPORT_DOC
      SET EMPLOYEE_ID = employee_id, TYPE_ID = type_id, CREATED_DATE = created_date, DUE_DATE = due_date,
      EXPIRY_DATE = expiry_date, PATH = path, DESCRIPTION = description
      WHERE `SUPPORT_DOC`.SUPPORT_DOC_ID = support_doc_id;
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
, IN path VARCHAR(512)
, IN description VARCHAR(512)
)
BEGIN
    DECLARE checker INT;

    SET checker = 0;

    SELECT COUNT(TYPE_ID) INTO checker
    FROM `TYPE`
    WHERE `TYPE`.TYPE_ID = type_id;

    IF checker = 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Document type does not exist.';
    ELSE
      UPDATE `TYPE`
      SET TYPE_NAME = type_name, PATH = path, DESCRIPTION = description
      WHERE `TYPE`.type_id = type_id;
    END IF;
END //

DELIMITER ;

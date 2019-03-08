-- STORED PROCEDURES FOR DocumentService


-- Create new support doc type
DROP PROCEDURE IF EXISTS create_doc_type;

DELIMITER //

CREATE PROCEDURE `create_doc_type` (IN type_name VARCHAR(48)
, IN path VARCHAR(512)
)
BEGIN
    INSERT INTO `TYPE` (TYPE_NAME, PATH)
    VALUES (type_name, path);
END //

DELIMITER ;


-- delete support doc
DROP PROCEDURE IF EXISTS delete_support_doc;

DELIMITER //

CREATE PROCEDURE `delete_support_doc` (IN support_doc_id INT)
)
BEGIN
    DELETE FROM `SUPPORT_DOC`
    WHERE `SUPPORT_DOC`.SUPPORT_DOC_ID = support_doc_id;
END //

DELIMITER ;


-- get_support_docs(IN id INT)
DROP PROCEDURE IF EXISTS get_support_docs;

DELIMITER //

CREATE PROCEDURE `get_support_docs` (IN id INT)
BEGIN
    SELECT *
    FROM SUPPORT_DOC
    WHERE EMPLOYEE_ID = id;
END //

DELIMITER ;


-- Get support doc type
DROP PROCEDURE IF EXISTS get_doc_type;

DELIMITER //

CREATE PROCEDURE `get_doc_type` (IN id INT)
BEGIN
    SELECT *
    FROM `TYPE`
    WHERE TYPE_ID = id;
END //

DELIMITER ;


-- Get support doc types
DROP PROCEDURE IF EXISTS get_all_doc_types;

DELIMITER //

CREATE PROCEDURE `get_all_doc_types` ()
BEGIN
    SELECT *
    FROM `TYPE`;
END //

DELIMITER ;


-- Update given support doc
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
    UPDATE SUPPORT_DOC
    SET EMPLOYEE_ID = employee_id, TYPE_ID = type_id, CREATED_DATE = created_date, DUE_DATE = due_date,
    EXPIRY_DATE = expiry_date, PATH = path, DESCRIPTION = description
    WHERE `SUPPORT_DOC`.SUPPORT_DOC_ID = support_doc_id;
END //

DELIMITER ;


-- Update given support doc type
DROP PROCEDURE IF EXISTS update_doc_type;

DELIMITER //

CREATE PROCEDURE `update_doc_type` (IN type_id INT
, IN type_name VARCHAR(48)
, IN path VARCHAR(512)
)
BEGIN
    UPDATE `TYPE`
    SET TYPE_NAME = type_name, PATH = path
    WHERE `TYPE`.type_id = type_id;
END //

DELIMITER ;

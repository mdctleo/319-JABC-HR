-- STORED PROCEDURES FOR RolesService


-- -----------------------------------------------------
-- procedure create_role
--    - create role with given name, if name not in use
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS create_role;

DELIMITER //

CREATE PROCEDURE `create_role` (IN role_name VARCHAR(48)
, IN description VARCHAR(45)
)
BEGIN
  DECLARE checker INT;

  SET checker = 0;

  SELECT COUNT(`ROLE_NAME`) INTO checker
  FROM ROLE
  WHERE ROLE.`ROLE_NAME` = role_name;

  IF checker > 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Role name already in use.';
  ELSE
    INSERT INTO ROLE (`ROLE`.ROLE_NAME, DESCRIPTION)
    VALUES (role_name, description);
  END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure delete_role
--    - delete role with given id, if it exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS delete_role;

DELIMITER //

CREATE PROCEDURE `delete_role` (IN role_id INT)

BEGIN
  DECLARE checker INT;

  SET checker = 0;

  SELECT COUNT(`ROLE_ID`) INTO checker
  FROM ROLE
  WHERE ROLE.`ROLE_ID` = role_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Role does not exist.';
  ELSE
    UPDATE `HR_RECORD` 
    SET `HR_RECORD`.ROLE = NULL 
    WHERE `HR_RECORD`.ROLE = role_id;
    DELETE FROM ROLE
    WHERE ROLE.role_id = role_id;
  END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure get_role
--    - get role with given id, if it exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS get_role;

DELIMITER //

CREATE PROCEDURE `get_role` (IN role_id INT)
BEGIN
  DECLARE checker INT;

  SET checker = 0;

  SELECT COUNT(`ROLE_ID`) INTO checker
  FROM ROLE
  WHERE ROLE.`ROLE_ID` = role_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Role does not exist.';
  ELSE
    SELECT *
    FROM ROLE
    WHERE ROLE.ROLE_ID = role_id;
  END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure get_role_with_name
--    - get role with the name, if it exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS get_role_with_name;

DELIMITER //

CREATE PROCEDURE `get_role_with_name` (IN role_name VARCHAR(48))
BEGIN
  DECLARE checker INT;

  SET checker = 0;

  SELECT COUNT(`ROLE_ID`) INTO checker
  FROM ROLE
  WHERE ROLE.`ROLE_NAME` LIKE role_name;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Role does not exist.';
  ELSE
    SELECT *
    FROM ROLE
    WHERE ROLE.`ROLE_NAME` LIKE role_name;
  END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure get_roles
--    - get all roles
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS get_roles;

DELIMITER //

CREATE PROCEDURE `get_roles` ()
BEGIN
    SELECT *
    FROM ROLE;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure update_role
--    - update role with given id, if it exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS update_role;

DELIMITER //

CREATE PROCEDURE `update_role` (IN role_id INT
, IN role_name VARCHAR(100)
, IN description VARCHAR(2512)
)
BEGIN
  DECLARE checker INT;

  SET checker = 0;

  SELECT COUNT(`ROLE_ID`) INTO checker
  FROM ROLE
  WHERE ROLE.`ROLE_ID` = role_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Role does not exist.';
  ELSE
    UPDATE ROLE
    SET ROLE.ROLE_NAME = role_name, DESCRIPTION = description
    WHERE ROLE.role_id = role_id;
  END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure create_competency
--    - create competency and attach it to the given role,
--    - provided the competency name is not in use for the role
--    - and the role exists.
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS create_competency;

DELIMITER //

CREATE PROCEDURE `create_competency` (IN role_id INT
, IN competency_name VARCHAR(100)
, IN description VARCHAR(2512)
)
BEGIN
  DECLARE checker INT;
  DECLARE nameChecker INT;

  SET checker = 0;
  SET nameChecker = 0;

  SELECT COUNT(*) INTO checker
  FROM ROLE
  WHERE ROLE.`ROLE_ID` = role_id;

  SELECT COUNT(*) INTO nameChecker
  FROM COMPETENCY
  WHERE COMPETENCY.`ROLE_ID` = role_id AND COMPETENCY.COMPETENCY_NAME LIKE competency_name;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Role not found.';
  ELSEIF competency_name IS NULL THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Competency name cannot be null.';
  ELSEIF nameChecker > 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Competency name already in use.';
  ELSE
    INSERT INTO COMPETENCY (ROLE_ID, COMPETENCY_NAME, DESCRIPTION)
    VALUES (role_id, competency_name, description);
  END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure delete_competency
--    - delete competency with given id, if it exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS delete_competency;

DELIMITER //

CREATE PROCEDURE `delete_competency` (IN competency_id INT)

BEGIN
  DECLARE checker INT;

  SET checker = 0;

  SELECT COUNT(*) INTO checker
  FROM COMPETENCY
  WHERE COMPETENCY.`COMPETENCY_ID` = competency_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Competency does not exist.';
  ELSE
    DELETE FROM COMPETENCY
    WHERE COMPETENCY.`COMPETENCY_ID` = competency_id;
  END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure delete_competencies
--    - delete competencies for a role
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS delete_competencies;

DELIMITER //

CREATE PROCEDURE `delete_competencies` (IN role_id INT)

BEGIN
  DECLARE checker INT;

  SET checker = 0;

  SELECT COUNT(*) INTO checker
  FROM ROLE
  WHERE ROLE.`ROLE_ID` = role_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Role does not exist.';
  ELSE
    DELETE FROM COMPETENCY
    WHERE COMPETENCY.`ROLE_ID` = role_id;
  END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure get_competency
--    - get competency with given id, if it exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS get_competency;

DELIMITER //

CREATE PROCEDURE `get_competency` (IN competency_id INT)
BEGIN
  DECLARE checker INT;

  SET checker = 0;

  SELECT COUNT(*) INTO checker
  FROM COMPETENCY
  WHERE COMPETENCY.`COMPETENCY_ID` = competency_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Competency does not exist.';
  ELSE
    SELECT *
    FROM COMPETENCY
    WHERE COMPETENCY.COMPETENCY_ID = competency_id;
  END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure get_competencies
--    - get all competencies for a given role
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS get_competencies;

DELIMITER //

CREATE PROCEDURE `get_competencies` (IN role_id INT)
BEGIN
    SELECT *
    FROM COMPETENCY
    WHERE COMPETENCY.ROLE_ID = role_id;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure update_competency
--    - update competency with given id, if it exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS update_competency;

DELIMITER //

CREATE PROCEDURE `update_competency` (IN competency_id INT
, IN competency_name VARCHAR(100)
, IN description VARCHAR(2512)
)
BEGIN
  DECLARE checker INT;

  SET checker = 0;

  SELECT COUNT(*) INTO checker
  FROM COMPETENCY
  WHERE COMPETENCY.`COMPETENCY_ID` = competency_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Competency does not exist.';
  ELSEIF competency_name IS NULL THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Competency name cannot be null.';
  ELSE
    UPDATE COMPETENCY
    SET COMPETENCY.COMPETENCY_NAME = competency_name, COMPETENCY.DESCRIPTION = description
    WHERE COMPETENCY.COMPETENCY_ID = competency_id;
  END IF;
END //

DELIMITER ;

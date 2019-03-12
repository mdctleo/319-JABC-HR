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
  WHERE `ROLE_NAME` = role_name;

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
  WHERE `ROLE_ID` = role_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Role does not exist.';
  ELSE
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
  WHERE `ROLE_ID` = role_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Role does not exist.';
  ELSE
    SELECT *
    FROM ROLE
    WHERE ROLE_ID = role_id;
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
, IN role_name VARCHAR(48)
, IN description VARCHAR(45)
)
BEGIN
  DECLARE checker INT;

  SET checker = 0;

  SELECT COUNT(`ROLE_ID`) INTO checker
  FROM ROLE
  WHERE `ROLE_ID` = role_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Role does not exist.';
  ELSE
    UPDATE ROLE
    SET ROLE.ROLE_NAME = role_name, DESCRIPTION = description
    WHERE ROLE.role_id = role_id;
  END IF;
END //

DELIMITER ;

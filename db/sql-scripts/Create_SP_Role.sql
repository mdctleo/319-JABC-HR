-- STORED PROCEDURES FOR RolesService


-- Create new role
DROP PROCEDURE IF EXISTS create_role;

DELIMITER //

CREATE PROCEDURE `create_role` (IN role_name VARCHAR(48)
, IN description VARCHAR(45)
)
BEGIN
    INSERT INTO ROLE (`ROLE`.NAME, DESCRIPTION)
    VALUES (role_name, description);
END //

DELIMITER ;


-- delete given role id
DROP PROCEDURE IF EXISTS delete_role;

DELIMITER //

CREATE PROCEDURE `delete_role` (IN role_id INT)

BEGIN
    DELETE FROM ROLE
    WHERE ROLE.role_id = role_id;
END //

DELIMITER ;


-- Get specific role
DROP PROCEDURE IF EXISTS get_role;

DELIMITER //

CREATE PROCEDURE `get_role` (IN id INT)
BEGIN
    SELECT *
    FROM ROLE
    WHERE role_id = id;
END //

DELIMITER ;


-- Get all roles
DROP PROCEDURE IF EXISTS get_roles;

DELIMITER //

CREATE PROCEDURE `get_roles` ()
BEGIN
    SELECT *
    FROM ROLE;
END //

DELIMITER ;


-- Update given role id
DROP PROCEDURE IF EXISTS update_role;

DELIMITER //

CREATE PROCEDURE `update_role` (IN role_id INT
, IN role_name VARCHAR(48)
, IN description VARCHAR(45)
)
BEGIN
    UPDATE ROLE
    SET ROLE.NAME = role_name, DESCRIPTION = description
    WHERE ROLE.role_id = role_id;
END //

DELIMITER ;

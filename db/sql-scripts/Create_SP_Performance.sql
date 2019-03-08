-- STORED PROCEDURES FOR PerformanceService


-- Create new comment given performance id
DROP PROCEDURE IF EXISTS create_performance_comment;

DELIMITER //

CREATE PROCEDURE `create_performance_comment` (IN id INT
, IN comment TEXT(4096)
, IN comment_date TIMESTAMP
, IN commenter_employee_id INT
)
BEGIN
    INSERT INTO COMMENT (COMMENT, `DATE`, PERFORMANCE_ID, COMMENTER_EMPLOYEE_ID)
    VALUES (comment, comment_date, id, commenter_employee_id);
END //

DELIMITER ;


-- Delete performance comment
DROP PROCEDURE IF EXISTS create_performance_comment;

DELIMITER //

CREATE PROCEDURE `create_performance_comment` (IN id INT
, IN comment_id INT
)
BEGIN
    DELETE FROM COMMENT
    WHERE PERFORMANCE_ID = id AND COMMENT_ID = comment_id;
END //

DELIMITER ;


-- Delete performance comment, since child tables
-- have cascading delete, they will also be deleted
DROP PROCEDURE IF EXISTS delete_performance;

DELIMITER //

CREATE PROCEDURE `delete_performance` (IN id INT)
BEGIN
    DELETE FROM PERFORMANCE
    WHERE PERFORMANCE_ID = id;
END //

DELIMITER ;


-- Get specific comment in performance
DROP PROCEDURE IF EXISTS get_comment;

DELIMITER //

CREATE PROCEDURE `get_comment` (IN c_id INT
, IN p_id INT)
BEGIN
    SELECT *
    FROM COMMENT
    WHERE COMMENT_ID = c_id AND PERFORMANCE_ID = p_id;
END //

DELIMITER ;


-- Get all comments in a performance
DROP PROCEDURE IF EXISTS get_performance_comments;

DELIMITER //

CREATE PROCEDURE `get_performance_comments` (IN p_id INT)
BEGIN
    SELECT *
    FROM COMMENT
    WHERE PERFORMANCE_ID = p_id;
END //

DELIMITER ;


-- Get specific performance review given a performance id
DROP PROCEDURE IF EXISTS get_performance_reviews;

DELIMITER //

CREATE PROCEDURE `get_performance_reviews` (IN id INT)
BEGIN
    SELECT *
    FROM PERFORMANCE p
    LEFT JOIN JABC_GOAL jg ON p.PERFORMANCE_ID = jg.PERFORMANCE_ID
    LEFT JOIN PERSONAL_TARGET pt ON p.PERFORMANCE_ID = pt.PERFORMANCE_ID
    LEFT JOIN OBJECTIVE o ON p.PERFORMANCE_ID = o.PERFORMANCE_ID
    LEFT JOIN DEVELOPMENT_GOAL dg ON p.PERFORMANCE_ID = dg.PERFORMANCE_ID
    LEFT JOIN COMMENT c ON p.PERFORMANCE_ID = c.PERFORMANCE_ID
    WHERE p.PERFORMANCE_ID = id;
END //

DELIMITER ;


-- Update comment in a performance
DROP PROCEDURE IF EXISTS update_performance_comment;

DELIMITER //

CREATE PROCEDURE `update_performance_comment` (IN c_id INT
, IN p_id INT
, IN comment TEXT(4096)
, IN comment_date TIMESTAMP
, IN commenter_employee_id INT
)
BEGIN
    UPDATE COMMENT
    SET COMMENT = comment, `DATE` = comment_date, COMMENTER_EMPLOYEE_ID = commenter_employee_id
    WHERE PERFORMANCE_ID = p_id AND COMMENT_ID = c_id;
END //

DELIMITER ;


-- Update performance attribtes, given a performance id
DROP PROCEDURE IF EXISTS update_performance;

DELIMITER //

CREATE PROCEDURE `update_performance` (IN p_id INT
, IN performance_date BIGINT
, IN status TINYINT
)
BEGIN
    UPDATE PERFORMANCE
    SET `DATE` = performance_date, STATUS = status
    WHERE PERFORMANCE_ID = p_id;
END //

DELIMITER ;


-- Update performance jabc goals, given a performance id
DROP PROCEDURE IF EXISTS update_performance_jabc_goals;

DELIMITER //

CREATE PROCEDURE `update_performance_jabc_goals` (IN p_id INT
, IN g_id INT
, IN g_name VARCHAR(500)
, IN goal VARCHAR(100)
, IN previous_year VARCHAR(100)
)
BEGIN
    UPDATE JABC_GOAL
    SET `NAME` = g_name, GOAL = goal, PREVIOUS_YEAR = previous_year
    WHERE PERFORMANCE_ID = p_id AND JABC_GOAL_ID = g_id;
END //

DELIMITER ;


-- Update performance personal targets, given a performance id
DROP PROCEDURE IF EXISTS update_performance_targets;

DELIMITER //

CREATE PROCEDURE `update_performance_targets` (IN p_id INT
, IN t_id INT
, IN description VARCHAR(200)
, IN rating VARCHAR(200)
)
BEGIN
    UPDATE PERSONAL_TARGET
    SET DESCRIPTION = description, RATING = rating
    WHERE PERFORMANCE_ID = p_id AND PERSONAL_TARGET_ID = t_id;
END //

DELIMITER ;


-- Update performance objectives, given a performance id
DROP PROCEDURE IF EXISTS update_performance_objectives;

DELIMITER //

CREATE PROCEDURE `update_performance_objectives` (IN p_id INT
, IN o_id INT
, IN q1 DECIMAL(12, 2)
, IN q2 DECIMAL(12, 2)
, IN q3 DECIMAL(12, 2)
, IN q4 DECIMAL(12, 2)
, IN impact VARCHAR(45)
, IN relevance VARCHAR(45)
, IN vol_alum VARCHAR(45)
, IN innovative VARCHAR(45)
, IN foundation VARCHAR(45)
)
BEGIN
    UPDATE OBJECTIVE
    SET Q1 = q1, Q2 = q2, Q3 = q3, Q4 = q4, IMPACT = impact, RELEVANCE = relevance, VOL_ALUM = vol_alum,
    INNOVATIVE = innovative, FOUNDATION = foundation
    WHERE PERFORMANCE_ID = p_id AND OBJECTIVE_ID = o_id;
END //

DELIMITER ;


-- Update performance development goal, given a performance id
DROP PROCEDURE IF EXISTS update_performance_dev_goal;

DELIMITER //

CREATE PROCEDURE `update_performance_dev_goal` (IN p_id INT
, IN g_id INT
, IN goal VARCHAR(200)
, IN key_activities VARCHAR(200)
, IN rating VARCHAR(45)
)
BEGIN
    UPDATE DEVELOPMENT_GOAL
    SET GOAL = goal, KEY_ACTIVITIES = key_activities, RATING = rating
    WHERE PERFORMANCE_ID = p_id AND DEVELOPMENT_GOAL_ID = g_id;
END //

DELIMITER ;

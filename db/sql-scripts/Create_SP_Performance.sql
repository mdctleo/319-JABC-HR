-- STORED PROCEDURES FOR PerformanceService


-- -----------------------------------------------------
-- procedure create_performance_comment
--    - create a performance review comment for the given employee,
--    - only if the performance review exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS create_performance_comment;

DELIMITER //

CREATE PROCEDURE `create_performance_comment` (IN performance_id INT
, IN comment TEXT(4096)
, IN comment_date TIMESTAMP
, IN commenter_employee_id INT
)
BEGIN
  DECLARE checker INT;

  SET checker = 0;

  SELECT COUNT(PERFORMANCE_ID) INTO checker
  FROM `PERFORMANCE`
  WHERE `PERFORMANCE`.PERFORMANCE_ID = performance_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Performance review does not exist.';
  ELSE
    INSERT INTO COMMENT (COMMENT, `DATE`, PERFORMANCE_ID, COMMENTER_EMPLOYEE_ID)
    VALUES (comment, comment_date, performance_id, commenter_employee_id);
  END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure delete_performance_comment
--    - delete a performance review comment for the given employee,
--    - only if the performance review exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS delete_performance_comment;

DELIMITER //

CREATE PROCEDURE `delete_performance_comment` (IN performance_id INT
, IN comment_id INT
)
BEGIN
  DECLARE checker INT;

  SET checker = 0;

  SELECT COUNT(PERFORMANCE_ID) INTO checker
  FROM `PERFORMANCE`
  WHERE `PERFORMANCE`.PERFORMANCE_ID = performance_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Performance review does not exist.';
  ELSE
    DELETE FROM COMMENT
    WHERE PERFORMANCE_ID = performance_id AND COMMENT_ID = comment_id;
  END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure delete_performance
--    - delete a performance review
--    - only if the performance review exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS delete_performance;

DELIMITER //

CREATE PROCEDURE `delete_performance` (IN id INT)
BEGIN
  DECLARE checker INT;

  SET checker = 0;

  SELECT COUNT(PERFORMANCE_ID) INTO checker
  FROM `PERFORMANCE`
  WHERE `PERFORMANCE`.PERFORMANCE_ID = performance_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Performance review does not exist.';
  ELSE
    DELETE FROM PERFORMANCE
    WHERE PERFORMANCE_ID = id;
  END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure get_comment
--    - get a comment, only if the comment exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS get_comment;

DELIMITER //

CREATE PROCEDURE `get_comment` (IN c_id INT
, IN p_id INT)
BEGIN
  DECLARE checker INT;

  SET checker = 0;

  SELECT COUNT(PERFORMANCE_ID) INTO checker
  FROM `COMMENT`
  WHERE `COMMENT`.PERFORMANCE_ID = p_id AND `COMMENT`.COMMENT_ID = c_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Performance review - Comment does not exist.';
  ELSE
    SELECT *
    FROM COMMENT
    WHERE COMMENT_ID = c_id AND PERFORMANCE_ID = p_id;
  END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure get_performance_comments
--    - get all comments attached to the performance id,
--    - only if the performance review exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS get_performance_comments;

DELIMITER //

CREATE PROCEDURE `get_performance_comments` (IN p_id INT)
BEGIN
  DECLARE checker INT;

  SET checker = 0;

  SELECT COUNT(PERFORMANCE_ID) INTO checker
  FROM `PERFORMANCE`
  WHERE `PERFORMANCE`.PERFORMANCE_ID = p_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Performance review does not exist.';
  ELSE
    SELECT *
    FROM COMMENT
    WHERE PERFORMANCE_ID = p_id;
  END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure get_performance_reviews
--    - get the specific performance review
--    - and its details, if it exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS get_performance_reviews;

DELIMITER //

CREATE PROCEDURE `get_performance_reviews` (IN performance_id INT)
BEGIN
  DECLARE checker INT;

  SET checker = 0;

  SELECT COUNT(PERFORMANCE_ID) INTO checker
  FROM `PERFORMANCE`
  WHERE `PERFORMANCE`.PERFORMANCE_ID = performance_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Performance review does not exist.';
  ELSE
    SELECT *
    FROM PERFORMANCE p
    LEFT JOIN JABC_GOAL jg ON p.PERFORMANCE_ID = jg.PERFORMANCE_ID
    LEFT JOIN PERSONAL_TARGET pt ON p.PERFORMANCE_ID = pt.PERFORMANCE_ID
    LEFT JOIN OBJECTIVE o ON p.PERFORMANCE_ID = o.PERFORMANCE_ID
    LEFT JOIN DEVELOPMENT_GOAL dg ON p.PERFORMANCE_ID = dg.PERFORMANCE_ID
    LEFT JOIN COMMENT c ON p.PERFORMANCE_ID = c.PERFORMANCE_ID
    WHERE p.PERFORMANCE_ID = performance_id;
  END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure update_performance_comment
--    - update a specific comment attached to a specific
--    - performance review, if both exist
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS update_performance_comment;

DELIMITER //

CREATE PROCEDURE `update_performance_comment` (IN c_id INT
, IN p_id INT
, IN comment TEXT(4096)
, IN comment_date TIMESTAMP
, IN commenter_employee_id INT
)
BEGIN
  DECLARE checker INT;

  SET checker = 0;

  SELECT COUNT(PERFORMANCE_ID) INTO checker
  FROM `COMMENT`
  WHERE `COMMENT`.PERFORMANCE_ID = p_id AND `COMMENT`.COMMENT_ID = c_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Performance review - Comment does not exist.';
  ELSE
    UPDATE COMMENT
    SET COMMENT = comment, `DATE` = comment_date, COMMENTER_EMPLOYEE_ID = commenter_employee_id
    WHERE PERFORMANCE_ID = p_id AND COMMENT_ID = c_id;
  END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure update_performance
--    - update a specific performance review, provided
--    - it exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS update_performance;

DELIMITER //

CREATE PROCEDURE `update_performance` (IN p_id INT
, IN performance_date BIGINT
, IN status TINYINT
)
BEGIN
  DECLARE checker INT;

  SET checker = 0;

  SELECT COUNT(PERFORMANCE_ID) INTO checker
  FROM `PERFORMANCE`
  WHERE `PERFORMANCE`.PERFORMANCE_ID = p_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Performance review does not exist.';
  ELSE
    UPDATE PERFORMANCE
    SET `DATE` = performance_date, STATUS = status
    WHERE PERFORMANCE_ID = p_id;
  END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure update_performance_jabc_goals
--    - update a JABC goals for a performance review,
--    - if it exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS update_performance_jabc_goals;

DELIMITER //

CREATE PROCEDURE `update_performance_jabc_goals` (IN p_id INT
, IN g_id INT
, IN g_name VARCHAR(500)
, IN goal VARCHAR(100)
, IN previous_year VARCHAR(100)
)
BEGIN
  DECLARE checker INT;

  SET checker = 0;

  SELECT JABC_GOAL(JABC_GOAL_ID) INTO checker
  FROM `JABC_GOAL`
  WHERE `JABC_GOAL`.PERFORMANCE_ID = p_id AND `JABC_GOAL`.JABC_GOAL_ID = g_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Performance review - JABC goal does not exist.';
  ELSE
    UPDATE JABC_GOAL
    SET `NAME` = g_name, GOAL = goal, PREVIOUS_YEAR = previous_year
    WHERE PERFORMANCE_ID = p_id AND JABC_GOAL_ID = g_id;
  END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure update_performance_targets
--    - update performance targets for a performance review,
--    - if it exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS update_performance_targets;

DELIMITER //

CREATE PROCEDURE `update_performance_targets` (IN p_id INT
, IN t_id INT
, IN description VARCHAR(200)
, IN rating VARCHAR(200)
)
BEGIN
  DECLARE checker INT;

  SET checker = 0;

  SELECT PERSONAL_TARGET(PERSONAL_TARGET_ID) INTO checker
  FROM `PERSONAL_TARGET`
  WHERE `PERSONAL_TARGET`.PERFORMANCE_ID = p_id AND `PERSONAL_TARGET`.PERSONAL_TARGET_ID = t_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Performance review - Personal Target does not exist.';
  ELSE
    UPDATE PERSONAL_TARGET
    SET DESCRIPTION = description, RATING = rating
    WHERE PERFORMANCE_ID = p_id AND PERSONAL_TARGET_ID = t_id;
  END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure update_performance_targets
--    - update performance objectives for a performance review,
--    - if it exists
-- -----------------------------------------------------
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
  DECLARE checker INT;

  SET checker = 0;

  SELECT OBJECTIVE(OBJECTIVE_ID) INTO checker
  FROM `OBJECTIVE`
  WHERE `OBJECTIVE`.PERFORMANCE_ID = p_id AND `OBJECTIVE`.OBJECTIVE_ID = o_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Performance review - Objective does not exist.';
  ELSE
    UPDATE OBJECTIVE
    SET Q1 = q1, Q2 = q2, Q3 = q3, Q4 = q4, IMPACT = impact, RELEVANCE = relevance, VOL_ALUM = vol_alum,
    INNOVATIVE = innovative, FOUNDATION = foundation
    WHERE PERFORMANCE_ID = p_id AND OBJECTIVE_ID = o_id;
  END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure update_performance_targets
--    - update performance development goals for a performance
--    - review, if it exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS update_performance_dev_goal;

DELIMITER //

CREATE PROCEDURE `update_performance_dev_goal` (IN p_id INT
, IN g_id INT
, IN goal VARCHAR(200)
, IN key_activities VARCHAR(200)
, IN rating VARCHAR(45)
)
BEGIN
  DECLARE checker INT;

  SET checker = 0;

  SELECT DEVELOPMENT_GOAL(DEVELOPMENT_GOAL_ID) INTO checker
  FROM `DEVELOPMENT_GOAL`
  WHERE `DEVELOPMENT_GOAL`.PERFORMANCE_ID = p_id AND `DEVELOPMENT_GOAL`.DEVELOPMENT_GOAL_ID = g_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Performance review - Development Goal does not exist.';
  ELSE
    UPDATE DEVELOPMENT_GOAL
    SET GOAL = goal, KEY_ACTIVITIES = key_activities, RATING = rating
    WHERE PERFORMANCE_ID = p_id AND DEVELOPMENT_GOAL_ID = g_id;
  END IF;
END //

DELIMITER ;

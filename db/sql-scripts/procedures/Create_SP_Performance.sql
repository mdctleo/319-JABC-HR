-- STORED PROCEDURES FOR PerformanceService

-- -----------------------------------------------------
-- procedure create_performance_review_comment
--    - create a performance review comment for the given employee,
--    - only if the performance review exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS create_performance_review_comment;

DELIMITER //

CREATE PROCEDURE `create_performance_review_comment` (IN performance_id INT
, IN comment VARCHAR(1000)
, IN comment_date DATE
, IN commenter_employee_id INT
)
BEGIN
  DECLARE checker INT;
  DECLARE checker2 INT;

  SET checker = 0;
  SET checker2 = 0;

  SELECT COUNT(PERFORMANCE_REVIEW_ID) INTO checker
  FROM `PERFORMANCE_REVIEW`
  WHERE `PERFORMANCE_REVIEW`.PERFORMANCE_REVIEW_ID = performance_id;

  SELECT COUNT(EMPLOYEE_ID) INTO checker2
  FROM `EMPLOYEE`
  WHERE `EMPLOYEE`.EMPLOYEE_ID = commenter_employee_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Performance review does not exist.';
  ELSEIF checker2 = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Employee does not exist.';
  ELSE
    INSERT INTO COMMENT (COMMENT, `DATE`, PERFORMANCE_REVIEW_ID, COMMENTER_ID)
    VALUES (comment, comment_date, performance_id, commenter_employee_id);
  END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure create_performance_plan_comment
--    - create a performance plan comment for the given employee,
--    - only if the performance plan exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS create_performance_plan_comment;

DELIMITER //

CREATE PROCEDURE `create_performance_plan_comment` (IN performance_id INT
, IN comment VARCHAR(1000)
, IN comment_date DATE
, IN commenter_employee_id INT
)
BEGIN
  DECLARE checker INT;

  SET checker = 0;

  SELECT COUNT(PERFORMANCE_REVIEW_ID) INTO checker
  FROM `PERFORMANCE_REVIEW`
  WHERE `PERFORMANCE_REVIEW`.PERFORMANCE_REVIEW_ID = performance_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Performance plan does not exist.';
  ELSE
    INSERT INTO COMMENT (COMMENT, `DATE`, PERFORMANCE_REVIEW_ID, COMMENTER_ID)
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

CREATE PROCEDURE `delete_performance_comment` (IN comment_id INT)
BEGIN
  DECLARE checker INT;

  SET checker = 0;

  SELECT COUNT(COMMENT_ID) INTO checker
  FROM `COMMENT`
  WHERE `COMMENT`.COMMENT_ID = comment_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Comment does not exist.';
  ELSE
    DELETE FROM COMMENT
    WHERE COMMENT.COMMENT_ID = comment_id;
  END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure delete_performance_plan
--    - delete a performance plan
--    - only if the performance plan exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS delete_performance_plan;

DELIMITER //

CREATE PROCEDURE `delete_performance_plan` (IN id INT)
BEGIN
  DECLARE checker INT;

  SET checker = 0;

  SELECT COUNT(PERFORMANCE_PLAN_ID) INTO checker
  FROM `PERFORMANCE_PLAN`
  WHERE `PERFORMANCE_PLAN`.PERFORMANCE_PLAN_ID = id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Performance plan does not exist.';
  ELSE
    DELETE FROM PERFORMANCE_PLAN
    WHERE PERFORMANCE_PLAN.PERFORMANCE_PLAN_ID = id;
  END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure delete_performance_review
--    - delete a performance review
--    - only if the performance review exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS delete_performance_review;

DELIMITER //

CREATE PROCEDURE `delete_performance_review` (IN id INT)
BEGIN
  DECLARE checker INT;

  SET checker = 0;

  SELECT COUNT(PERFORMANCE_REVIEW_ID) INTO checker
  FROM `PERFORMANCE_REVIEW`
  WHERE `PERFORMANCE_REVIEW`.PERFORMANCE_REVIEW_ID = id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Performance review does not exist.';
  ELSE
    DELETE FROM PERFORMANCE_REVIEW
    WHERE PERFORMANCE_REVIEW.PERFORMANCE_REVIEW_ID = id;
  END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure get_comment
--    - get a comment, only if the comment exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS get_comment;

DELIMITER //

CREATE PROCEDURE `get_comment` (IN c_id INT)
BEGIN
  DECLARE checker INT;

  SET checker = 0;

  SELECT COUNT(COMMENT_ID) INTO checker
  FROM `COMMENT`
  WHERE `COMMENT`.COMMENT_ID = c_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Comment does not exist.';
  ELSE
    SELECT * FROM `COMMENT`
    WHERE `COMMENT`.COMMENT_ID = c_id;
  END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure get_performance_review_comments
--    - get all comments attached to the performance id,
--    - only if the performance review exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS get_performance_review_comments;

DELIMITER //

CREATE PROCEDURE `get_performance_review_comments` (IN p_id INT)
BEGIN
  DECLARE checker INT;

  SET checker = 0;

  SELECT COUNT(PERFORMANCE_REVIEW_ID) INTO checker
  FROM `PERFORMANCE_REVIEW`
  WHERE `PERFORMANCE_REVIEW`.PERFORMANCE_REVIEW_ID = p_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Performance review does not exist.';
  ELSE
    SELECT *
    FROM COMMENT
    WHERE PERFORMANCE_REVIEW_ID = p_id;
  END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure get_performance_plan
--    - get performance_plan with performance id,
--    - only if the performance review exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS get_performance_plan;

DELIMITER //

CREATE PROCEDURE `get_performance_plan` (IN p_id INT)
BEGIN
  DECLARE checker INT;

  SET checker = 0;

  SELECT COUNT(PERFORMANCE_PLAN_ID) INTO checker
  FROM `PERFORMANCE_PLAN`
  WHERE `PERFORMANCE_PLAN`.PERFORMANCE_PLAN_ID = p_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Performance plan does not exist.';
  ELSE
    SELECT *
    FROM PERFORMANCE_PLAN
    WHERE PERFORMANCE_PLAN.PERFORMANCE_PLAN_ID = p_id;
    SELECT *
    FROM PERFORMANCE_SECTION
    WHERE PERFORMANCE_SECTION.PERFORMANCE_PLAN_ID = p_id;
    SELECT *
    FROM COMMENT
    WHERE COMMENT.PERFORMANCE_PLAN_ID = p_id;
  END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure get_performance_review
--    - get performance_review with performance id,
--    - only if the performance review exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS get_performance_review;

DELIMITER //

CREATE PROCEDURE `get_performance_review` (IN p_id INT)
BEGIN
  DECLARE checker INT;

  SET checker = 0;

  SELECT COUNT(PERFORMANCE_REVIEW_ID) INTO checker
  FROM `PERFORMANCE_REVIEW`
  WHERE `PERFORMANCE_REVIEW`.PERFORMANCE_REVIEW_ID = p_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Performance review does not exist.';
  ELSE
    SELECT *
    FROM PERFORMANCE_REVIEW
    WHERE PERFORMANCE_REVIEW.PERFORMANCE_REVIEW_ID = p_id;
    SELECT *
    FROM PERFORMANCE_SECTION
    WHERE PERFORMANCE_SECTION.PERFORMANCE_REVIEW_ID = p_id;
    SELECT *
    FROM COMMENT
    WHERE COMMENT.PERFORMANCE_REVIEW_ID = p_id;
  END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure update_comment
--    - update a specific comment attached to a specific
--    - performance review, if both exist
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS update_comment;

DELIMITER //

CREATE PROCEDURE `update_comment` (IN c_id INT
, IN comment TEXT(4096)
, IN comment_date DATE
, IN commenter_employee_id INT
)
BEGIN
  DECLARE checker INT;

  SET checker = 0;

  SELECT COUNT(COMMENT_ID) INTO checker
  FROM `COMMENT`
  WHERE `COMMENT`.COMMENT_ID = c_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Comment does not exist.';
  ELSE
    UPDATE COMMENT
    SET COMMENT = comment, `DATE` = comment_date, COMMENTER_ID = commenter_employee_id
    WHERE COMMENT_ID = c_id;
  END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure update_performance_plan
--    - update a specific performance review, provided
--    - it exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS update_performance_plan;

DELIMITER //

CREATE PROCEDURE `update_performance_plan` (IN p_id INT
, IN start_year SMALLINT
, IN end_year SMALLINT
, IN status TINYINT
)
BEGIN
  DECLARE checker INT;

  SET checker = 0;

  SELECT COUNT(PERFORMANCE_PLAN_ID) INTO checker
  FROM `PERFORMANCE_PLAN`
  WHERE `PERFORMANCE_PLAN`.PERFORMANCE_PLAN_ID = p_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Performance plan does not exist.';
  ELSE
    UPDATE PERFORMANCE_PLAN
    SET START_YEAR = start_year, END_YEAR = end_year, STATUS = status
    WHERE PERFORMANCE_PLAN.PERFORMANCE_PLAN_ID = p_id;
  END IF;
END //

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_performance_review
--    - update a specific performance review, provided
--    - it exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS update_performance_review;

DELIMITER //

CREATE PROCEDURE `update_performance_review` (IN p_id INT
, IN status TINYINT
)
BEGIN
  DECLARE checker INT;

  SET checker = 0;

  SELECT COUNT(PERFORMANCE_REVIEW_ID) INTO checker
  FROM `PERFORMANCE_REVIEW`
  WHERE `PERFORMANCE_REVIEW`.PERFORMANCE_REVIEW_ID = p_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Performance review does not exist.';
  ELSE
    UPDATE PERFORMANCE_REVIEW
    SET STATUS = status
    WHERE PERFORMANCE_REVIEW.PERFORMANCE_REVIEW_ID = p_id;
  END IF;
END //

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_performance_section
--    - update a performance record for an employee,
--    - provided that the performance section exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS update_performance_section;

DELIMITER //

CREATE PROCEDURE `update_performance_section` (IN performance_section_id INT
, IN section_data JSON
, IN section_name VARCHAR(45)
)
BEGIN
    DECLARE checker INT;

    SET checker = 0;

    SELECT COUNT(SECTION_ID) INTO checker
    FROM `PERFORMANCE_SECTION`
    WHERE `PERFORMANCE_SECTION`.SECTION_ID = performance_section_id;

    IF checker = 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Performance plan does not exist.';
    ELSE
      UPDATE PERFORMANCE_SECTION
      SET PERFORMANCE_SECTION.DATA = section_data, PERFORMANCE_SECTION.SECTION_NAME = section_name
      WHERE PERFORMANCE_SECTION.SECTION_ID = performance_section_id;
    END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure delete_plan_sections
--    - delete sections for a given performance plan
--    - only if the performance plan exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS delete_plan_sections;

DELIMITER //

CREATE PROCEDURE `delete_plan_sections` (IN performance_plan_id INT)
BEGIN
  DECLARE checker INT;

  SET checker = 0;

  SELECT COUNT(*) INTO checker
  FROM `PERFORMANCE_PLAN`
  WHERE `PERFORMANCE_PLAN`.PERFORMANCE_PLAN_ID = performance_plan_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Performance plan does not exist.';
  ELSE
    DELETE FROM PERFORMANCE_SECTION
    WHERE PERFORMANCE_SECTION.PERFORMANCE_PLAN_ID = performance_plan_id;
  END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure delete_review_sections
--    - delete sections for a given performance review
--    - only if the performance review exists
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS delete_review_sections;

DELIMITER //

CREATE PROCEDURE `delete_review_sections` (IN performance_review_id INT)
BEGIN
  DECLARE checker INT;

  SET checker = 0;

  SELECT COUNT(*) INTO checker
  FROM `PERFORMANCE_REVIEW`
  WHERE `PERFORMANCE_REVIEW`.PERFORMANCE_REVIEW_ID = performance_review_id;

  IF checker = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Performance review does not exist.';
  ELSE
    DELETE FROM PERFORMANCE_SECTION
    WHERE PERFORMANCE_SECTION.PERFORMANCE_REVIEW_ID = performance_review_id;
  END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure get_performance_plan_sections
--    - get performance plan's sections
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS get_performance_plan_sections;

DELIMITER //

CREATE PROCEDURE `get_performance_plan_sections` (IN performance_plan_id INT)
BEGIN
    DECLARE checker INT;

    SET checker = 0;

    SELECT COUNT(*) INTO checker
    FROM `PERFORMANCE_PLAN`
    WHERE `PERFORMANCE_PLAN`.PERFORMANCE_PLAN_ID = performance_plan_id;

    IF checker = 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Performance plan does not exist.';
    ELSE
      SELECT *
      FROM PERFORMANCE_SECTION
      WHERE PERFORMANCE_SECTION.PERFORMANCE_PLAN_ID = performance_plan_id;
    END IF;
END //

DELIMITER ;


-- -----------------------------------------------------
-- procedure get_performance_review_sections
--    - get performance review's sections
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS get_performance_review_sections;

DELIMITER //

CREATE PROCEDURE `get_performance_review_sections` (IN performance_review_id INT)
BEGIN
    DECLARE checker INT;

    SET checker = 0;

    SELECT COUNT(*) INTO checker
    FROM `PERFORMANCE_REVIEW`
    WHERE `PERFORMANCE_REVIEW`.PERFORMANCE_REVIEW_ID = performance_review_id;

    IF checker = 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Performance review does not exist.';
    ELSE
      SELECT *
      FROM PERFORMANCE_SECTION
      WHERE PERFORMANCE_SECTION.PERFORMANCE_REVIEW_ID = performance_review_id;
    END IF;
END //

DELIMITER ;

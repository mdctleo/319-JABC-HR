-- MySQL Script generated by MySQL Workbench
-- Mon Mar 25 17:53:43 2019
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema jabc_db
-- -----------------------------------------------------
-- 
-- 
DROP SCHEMA IF EXISTS `jabc_db` ;

-- -----------------------------------------------------
-- Schema jabc_db
--
-- 
-- 
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `jabc_db` DEFAULT CHARACTER SET utf8 ;
USE `jabc_db` ;

-- -----------------------------------------------------
-- Table `jabc_db`.`ROLE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jabc_db`.`ROLE` ;

CREATE TABLE IF NOT EXISTS `jabc_db`.`ROLE` (
  `ROLE_ID` INT NOT NULL AUTO_INCREMENT,
  `ROLE_NAME` VARCHAR(100) NULL,
  `DESCRIPTION` VARCHAR(2512) NULL,
  PRIMARY KEY (`ROLE_ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jabc_db`.`EMPLOYEE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jabc_db`.`EMPLOYEE` ;

CREATE TABLE IF NOT EXISTS `jabc_db`.`EMPLOYEE` (
  `EMPLOYEE_ID` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`EMPLOYEE_ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jabc_db`.`HR_RECORD`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jabc_db`.`HR_RECORD` ;

CREATE TABLE IF NOT EXISTS `jabc_db`.`HR_RECORD` (
  `EMPLOYEE_ID` INT NOT NULL,
  `VERSION` INT NOT NULL,
  `CREATED_BY` INT NULL,
  `ROLE` INT NULL,
  `SIN` INT NOT NULL,
  `EMAIL` VARCHAR(100) NOT NULL,
  `FIRST_NAME` VARCHAR(100) NOT NULL,
  `LAST_NAME` VARCHAR(100) NOT NULL,
  `ADDRESS` VARCHAR(512) NULL,
  `BIRTHDATE` DATE NULL,
  `VACATION_DAYS` INT NULL,
  `REMAINING_VACATION_DAYS` INT NULL,
  `FTE` TINYINT NOT NULL DEFAULT 1 COMMENT '0=PART_TIME, 1=FULL_TIME',
  `STATUS` TINYINT NOT NULL DEFAULT 2 COMMENT 'One of: 3 = PROBATION, 2 = ONBOARDING, 1 = ACTIVE, 0 = INACTIVE',
  `PASSWORD` VARCHAR(200) NOT NULL,
  `SALARY` DECIMAL(10,2) NULL DEFAULT 0,
  `DATE_JOINED` DATE NULL,
  `ADMIN_LEVEL` TINYINT NOT NULL COMMENT 'One of: 0 = STAFF, 1 = MANAGER, 2 = HR ADMIN',
  `CREATED_DATE` DATE NULL,
  `PHONE_NUMBER` VARCHAR(45) NULL,
  INDEX `ROLE_idx` (`ROLE` ASC),
  PRIMARY KEY (`EMPLOYEE_ID`, `VERSION`),
  CONSTRAINT `FK_ROLE`
    FOREIGN KEY (`ROLE`)
    REFERENCES `jabc_db`.`ROLE` (`ROLE_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_HR_RECORD_EMPLOYEE1`
    FOREIGN KEY (`EMPLOYEE_ID`)
    REFERENCES `jabc_db`.`EMPLOYEE` (`EMPLOYEE_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jabc_db`.`DOC_TYPE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jabc_db`.`DOC_TYPE` ;

CREATE TABLE IF NOT EXISTS `jabc_db`.`DOC_TYPE` (
  `DOC_TYPE_ID` INT NOT NULL AUTO_INCREMENT,
  `DOC_NAME` VARCHAR(100) NOT NULL,
  `TEMPLATE_FILE` BLOB(25000000) NULL COMMENT 'Path to empty support document of this type (if applicable)',
  `DESCRIPTION` VARCHAR(2512) NULL,
  `MIME_TYPE` VARCHAR(100) NULL,
  PRIMARY KEY (`DOC_TYPE_ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jabc_db`.`ONBOARDING_TASK`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jabc_db`.`ONBOARDING_TASK` ;

CREATE TABLE IF NOT EXISTS `jabc_db`.`ONBOARDING_TASK` (
  `ONBOARDING_TASK_ID` INT NOT NULL AUTO_INCREMENT,
  `EMPLOYEE_ID` INT NOT NULL,
  `CREATED_DATE` DATE NOT NULL,
  `DUE_DATE` DATE NULL,
  `EXPIRY_DATE` DATE NULL,
  `DESCRIPTION` VARCHAR(2512) NULL,
  `DOC_TYPE_ID` INT NULL,
  `ACTUAL_FILE` BLOB(25000000) NULL COMMENT 'Path to this support document',
  `REQUIRE_DOC` TINYINT(1) NOT NULL COMMENT '0 = Just a reminder, 1 = Requires the upload of a document',
  `STATUS` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '0=ACTIVE,1=DONE',
  `MIME_TYPE` VARCHAR(100) NULL,
  PRIMARY KEY (`ONBOARDING_TASK_ID`),
  INDEX `TYPE_ID_idx` (`DOC_TYPE_ID` ASC),
  INDEX `FK_SUPPORT_DOC_EMPLOYEE_idx` (`EMPLOYEE_ID` ASC),
  CONSTRAINT `FK_TYPE_ID`
    FOREIGN KEY (`DOC_TYPE_ID`)
    REFERENCES `jabc_db`.`DOC_TYPE` (`DOC_TYPE_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_SUPPORT_DOC_EMPLOYEE`
    FOREIGN KEY (`EMPLOYEE_ID`)
    REFERENCES `jabc_db`.`EMPLOYEE` (`EMPLOYEE_ID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jabc_db`.`VACATION_REQUEST`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jabc_db`.`VACATION_REQUEST` ;

CREATE TABLE IF NOT EXISTS `jabc_db`.`VACATION_REQUEST` (
  `VACATION_REQUEST_ID` INT NOT NULL AUTO_INCREMENT,
  `EMPLOYEE_ID` INT NOT NULL,
  `APPROVER_ID` INT NULL,
  `REQUESTED_DAYS` INT NOT NULL,
  `REQUEST_STATUS` TINYINT NOT NULL COMMENT 'One of: 0 = REQUESTED, 1 = APPROVED, 2 = DENIED',
  `DATE` DATE NULL,
  PRIMARY KEY (`VACATION_REQUEST_ID`),
  INDEX `FK_VACATION_REQUEST_EMPLOYEE_idx` (`EMPLOYEE_ID` ASC),
  CONSTRAINT `FK_VACATION_REQUEST_EMPLOYEE`
    FOREIGN KEY (`EMPLOYEE_ID`)
    REFERENCES `jabc_db`.`EMPLOYEE` (`EMPLOYEE_ID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jabc_db`.`PERFORMANCE_PLAN`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jabc_db`.`PERFORMANCE_PLAN` ;

CREATE TABLE IF NOT EXISTS `jabc_db`.`PERFORMANCE_PLAN` (
  `PERFORMANCE_PLAN_ID` INT NOT NULL AUTO_INCREMENT,
  `START_YEAR` SMALLINT NOT NULL,
  `STATUS` TINYINT NOT NULL DEFAULT 0 COMMENT '1=PUBLISHED, 0=UNPUBLISHED',
  `EMPLOYEE_ID` INT NOT NULL DEFAULT 0,
  `END_YEAR` SMALLINT NOT NULL,
  `CREATE_DATE` DATE NULL,
  PRIMARY KEY (`PERFORMANCE_PLAN_ID`, `EMPLOYEE_ID`),
  INDEX `FK_PERFORMANCE_EMPLOYEE_idx` (`EMPLOYEE_ID` ASC),
  CONSTRAINT `FK_PLAN_EMPLOYEE`
    FOREIGN KEY (`EMPLOYEE_ID`)
    REFERENCES `jabc_db`.`EMPLOYEE` (`EMPLOYEE_ID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jabc_db`.`PROBATION`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jabc_db`.`PROBATION` ;

CREATE TABLE IF NOT EXISTS `jabc_db`.`PROBATION` (
  `PROBATION_ID` INT NOT NULL AUTO_INCREMENT,
  `START_DATE` DATE NOT NULL,
  `REVIEW_DATE` DATE NOT NULL,
  `STATUS` TINYINT NULL COMMENT '1=PUBLISHED, 0=UNPUBLISHED',
  `EMPLOYEE_ID` INT NOT NULL,
  PRIMARY KEY (`PROBATION_ID`, `EMPLOYEE_ID`),
  INDEX `FK_PROBATION_EMPLOYEE_idx` (`EMPLOYEE_ID` ASC),
  CONSTRAINT `FK_PROBATION_EMPLOYEE`
    FOREIGN KEY (`EMPLOYEE_ID`)
    REFERENCES `jabc_db`.`EMPLOYEE` (`EMPLOYEE_ID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jabc_db`.`QUESTION`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jabc_db`.`QUESTION` ;

CREATE TABLE IF NOT EXISTS `jabc_db`.`QUESTION` (
  `QUESTION_ID` INT NOT NULL AUTO_INCREMENT,
  `QUESTION` VARCHAR(200) NOT NULL,
  `ANSWER` VARCHAR(200) NULL,
  `PROBATION_ID` INT NOT NULL,
  PRIMARY KEY (`QUESTION_ID`, `PROBATION_ID`),
  INDEX `fk_QUESTION_PROBATION1_idx` (`PROBATION_ID` ASC),
  CONSTRAINT `FK_QUESTION_PROBATION`
    FOREIGN KEY (`PROBATION_ID`)
    REFERENCES `jabc_db`.`PROBATION` (`PROBATION_ID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jabc_db`.`MANAGER_EMPLOYEE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jabc_db`.`MANAGER_EMPLOYEE` ;

CREATE TABLE IF NOT EXISTS `jabc_db`.`MANAGER_EMPLOYEE` (
  `MANAGER_ID` INT NOT NULL,
  `EMPLOYEE_ID` INT NOT NULL,
  PRIMARY KEY (`MANAGER_ID`, `EMPLOYEE_ID`),
  INDEX `fk_EMPLOYEE_has_EMPLOYEE_EMPLOYEE2_idx` (`EMPLOYEE_ID` ASC),
  INDEX `fk_EMPLOYEE_has_EMPLOYEE_EMPLOYEE1_idx` (`MANAGER_ID` ASC),
  CONSTRAINT `fk_EMPLOYEE_has_EMPLOYEE_EMPLOYEE1`
    FOREIGN KEY (`MANAGER_ID`)
    REFERENCES `jabc_db`.`EMPLOYEE` (`EMPLOYEE_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_EMPLOYEE_has_EMPLOYEE_EMPLOYEE2`
    FOREIGN KEY (`EMPLOYEE_ID`)
    REFERENCES `jabc_db`.`EMPLOYEE` (`EMPLOYEE_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jabc_db`.`PERFORMANCE_REVIEW`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jabc_db`.`PERFORMANCE_REVIEW` ;

CREATE TABLE IF NOT EXISTS `jabc_db`.`PERFORMANCE_REVIEW` (
  `PERFORMANCE_REVIEW_ID` INT NOT NULL AUTO_INCREMENT,
  `WORK_PLAN_ID` INT NOT NULL,
  `STATUS` TINYINT NOT NULL,
  `EMPLOYEE_ID` INT NOT NULL,
  `CREATE_DATE` DATE NULL,
  PRIMARY KEY (`PERFORMANCE_REVIEW_ID`, `EMPLOYEE_ID`),
  INDEX `FK_PERFORMANCE_WORK_PLAN_idx` (`WORK_PLAN_ID` ASC),
  INDEX `fk_PERFORMANCE_REVIEW_EMPLOYEE1_idx` (`EMPLOYEE_ID` ASC),
  CONSTRAINT `FK_PERFORMANCE_WORK_PLAN`
    FOREIGN KEY (`WORK_PLAN_ID`)
    REFERENCES `jabc_db`.`PERFORMANCE_PLAN` (`PERFORMANCE_PLAN_ID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PERFORMANCE_REVIEW_EMPLOYEE1`
    FOREIGN KEY (`EMPLOYEE_ID`)
    REFERENCES `jabc_db`.`EMPLOYEE` (`EMPLOYEE_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jabc_db`.`PERFORMANCE_SECTION`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jabc_db`.`PERFORMANCE_SECTION` ;

CREATE TABLE IF NOT EXISTS `jabc_db`.`PERFORMANCE_SECTION` (
  `SECTION_ID` INT NOT NULL AUTO_INCREMENT,
  `DATA` JSON NOT NULL,
  `PERFORMANCE_REVIEW_ID` INT NULL,
  `PERFORMANCE_PLAN_ID` INT NULL,
  `SECTION_NAME` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`SECTION_ID`),
  INDEX `FK_SECTION_REVIEW_idx` (`PERFORMANCE_REVIEW_ID` ASC),
  INDEX `FK_SECTION_PLAN_idx` (`PERFORMANCE_PLAN_ID` ASC),
  CONSTRAINT `FK_SECTION_REVIEW`
    FOREIGN KEY (`PERFORMANCE_REVIEW_ID`)
    REFERENCES `jabc_db`.`PERFORMANCE_REVIEW` (`PERFORMANCE_REVIEW_ID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_SECTION_PLAN`
    FOREIGN KEY (`PERFORMANCE_PLAN_ID`)
    REFERENCES `jabc_db`.`PERFORMANCE_PLAN` (`PERFORMANCE_PLAN_ID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jabc_db`.`COMPETENCY`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jabc_db`.`COMPETENCY` ;

CREATE TABLE IF NOT EXISTS `jabc_db`.`COMPETENCY` (
  `COMPETENCY_ID` INT NOT NULL AUTO_INCREMENT,
  `ROLE_ID` INT NOT NULL,
  `COMPETENCY_NAME` VARCHAR(100) NULL,
  `DESCRIPTION` VARCHAR(2512) NULL,
  PRIMARY KEY (`COMPETENCY_ID`),
  INDEX `FK_COMPETENCY_ROLE_idx` (`ROLE_ID` ASC),
  CONSTRAINT `FK_COMPETENCY_ROLE`
    FOREIGN KEY (`ROLE_ID`)
    REFERENCES `jabc_db`.`ROLE` (`ROLE_ID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jabc_db`.`COMMENT`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jabc_db`.`COMMENT` ;

CREATE TABLE IF NOT EXISTS `jabc_db`.`COMMENT` (
  `COMMENT_ID` INT NOT NULL AUTO_INCREMENT,
  `DATE` DATE NOT NULL,
  `PERFORMANCE_PLAN_ID` INT NULL,
  `COMMENTER_ID` INT NULL,
  `PERFORMANCE_REVIEW_ID` INT NULL,
  `COMMENT` VARCHAR(5000) NOT NULL,
  PRIMARY KEY (`COMMENT_ID`),
  INDEX `fk_COMMENT_PERFORMANCE_PLAN1_idx` (`PERFORMANCE_PLAN_ID` ASC),
  INDEX `fk_COMMENT_EMPLOYEE1_idx` (`COMMENTER_ID` ASC),
  INDEX `fk_COMMENT_PERFORMANCE_REVIEW1_idx` (`PERFORMANCE_REVIEW_ID` ASC),
  CONSTRAINT `fk_COMMENT_PERFORMANCE_PLAN1`
    FOREIGN KEY (`PERFORMANCE_PLAN_ID`)
    REFERENCES `jabc_db`.`PERFORMANCE_PLAN` (`PERFORMANCE_PLAN_ID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_COMMENT_EMPLOYEE1`
    FOREIGN KEY (`COMMENTER_ID`)
    REFERENCES `jabc_db`.`EMPLOYEE` (`EMPLOYEE_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_COMMENT_PERFORMANCE_REVIEW1`
    FOREIGN KEY (`PERFORMANCE_REVIEW_ID`)
    REFERENCES `jabc_db`.`PERFORMANCE_REVIEW` (`PERFORMANCE_REVIEW_ID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jabc_db`.`FAQ`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jabc_db`.`FAQ` ;

CREATE TABLE IF NOT EXISTS `jabc_db`.`FAQ` (
  `FAQ_ID` INT NOT NULL AUTO_INCREMENT,
  `QUESTION` VARCHAR(512) NOT NULL,
  `ANSWER` VARCHAR(2512) NOT NULL,
  PRIMARY KEY (`FAQ_ID`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Insert a test some test roles
-- -----------------------------------------------------

INSERT INTO jabc_db.ROLE (ROLE_ID, ROLE_NAME, DESCRIPTION)
VALUES
(NULL, "Developer", "A Test Developer Role"),
(NULL, "Sales", "A Test Sales Role"),
(NULL, "Marketing", "A Test Marketing Role");

COMMIT;
-- -----------------------------------------------------
-- Insert a some test hr records
-- -----------------------------------------------------

SET GLOBAL FOREIGN_KEY_CHECKS = 0;

COMMIT;

INSERT INTO `HR_RECORD` (`EMPLOYEE_ID`, `VERSION`, `CREATED_BY`, `ROLE`, `SIN`, `EMAIL`, `FIRST_NAME`, `LAST_NAME`, `ADDRESS`, `BIRTHDATE`, `VACATION_DAYS`, `REMAINING_VACATION_DAYS`, `FTE`, `STATUS`, `PASSWORD`, `SALARY`, `DATE_JOINED`, `ADMIN_LEVEL`, `CREATED_DATE`, `PHONE_NUMBER`) VALUES
(1, 1, 1, 1, 111111111, 'hradmin@jabc.com', 'Toby', 'Flenderson', 'hr_test_road', '1969-11-30', 20, 10, 1, 1, 'nwa7YhtRIeV8T/FNweFqag==', '200.00', '1989-12-01', 2, '1989-12-01', '6041111111');

INSERT INTO `HR_RECORD` (`EMPLOYEE_ID`, `VERSION`, `CREATED_BY`, `ROLE`, `SIN`, `EMAIL`, `FIRST_NAME`, `LAST_NAME`, `ADDRESS`, `BIRTHDATE`, `VACATION_DAYS`, `REMAINING_VACATION_DAYS`, `FTE`, `STATUS`, `PASSWORD`, `SALARY`, `DATE_JOINED`, `ADMIN_LEVEL`, `CREATED_DATE`, `PHONE_NUMBER`) VALUES
(2, 1, 1, 1, 222222222, 'manager@jabc.com', 'Michael', 'Scott', '3333 Maple road', '1964-12-08', 20, 0, 1, 1, 'sYzMmy1bSlYQLCKMLT9ljQ==', '5000.00', '1989-12-01', 1, '1989-01-01', '6042222222');

INSERT INTO `HR_RECORD` (`EMPLOYEE_ID`, `VERSION`, `CREATED_BY`, `ROLE`, `SIN`, `EMAIL`, `FIRST_NAME`, `LAST_NAME`, `ADDRESS`, `BIRTHDATE`, `VACATION_DAYS`, `REMAINING_VACATION_DAYS`, `FTE`, `STATUS`, `PASSWORD`, `SALARY`, `DATE_JOINED`, `ADMIN_LEVEL`, `CREATED_DATE`, `PHONE_NUMBER`) VALUES
(3, 1, 1, 2, 333333333, 'employee1@jabc.com', 'Jim', 'Halpert', '8888 Halpert road', '1979-09-03', 10, 10, 1, 1, 'pMuAndRnqrN9IFUAlPos9Q==', '3000.00', '2002-04-01', 0, '2002-04-01', '6043333333');

INSERT INTO `HR_RECORD` (`EMPLOYEE_ID`, `VERSION`, `CREATED_BY`, `ROLE`, `SIN`, `EMAIL`, `FIRST_NAME`, `LAST_NAME`, `ADDRESS`, `BIRTHDATE`, `VACATION_DAYS`, `REMAINING_VACATION_DAYS`, `FTE`, `STATUS`, `PASSWORD`, `SALARY`, `DATE_JOINED`, `ADMIN_LEVEL`, `CREATED_DATE`, `PHONE_NUMBER`) VALUES
(4, 1, 1, 2, 444444444, 'employee2@jabc.com', 'Dwight', 'Schrute', 'Schrute Farm', '1978-10-30', 10, 8, 1, 1, 'KIm7SGWeKrNq1kx6Y9mErQ==', '3000.0', '2000-03-01', 0, '2000-04-01', '6044444444');

INSERT INTO `HR_RECORD` (`EMPLOYEE_ID`, `VERSION`, `CREATED_BY`, `ROLE`, `SIN`, `EMAIL`, `FIRST_NAME`, `LAST_NAME`, `ADDRESS`, `BIRTHDATE`, `VACATION_DAYS`, `REMAINING_VACATION_DAYS`, `FTE`, `STATUS`, `PASSWORD`, `SALARY`, `DATE_JOINED`, `ADMIN_LEVEL`, `CREATED_DATE`, `PHONE_NUMBER`) VALUES
(5, 1, 1, 3, 555555555, 'employee3@jabc.com', 'Karen', 'Filippelli', 'Exotic Land', '1980-01-30', 10, 8, 1, 1, 'SynvvSN0WcItPBbEfbxI2Q==', '3000.0', '2004-02-01', 1, '2004-02-03', '6045555555');

INSERT INTO `EMPLOYEE` (`EMPLOYEE_ID`) VALUES
(1),
(2),
(3),
(4),
(5);

INSERT INTO `DOC_TYPE`(`DOC_TYPE_ID`, `DOC_NAME`, `TEMPLATE_FILE`, `DESCRIPTION`, `MIME_TYPE`) VALUES
(NULL, 'young_obi_wan', NULL, 'An image of young obi wan', 'image/jpeg');

INSERT INTO `DOC_TYPE`(`DOC_TYPE_ID`, `DOC_NAME`, `TEMPLATE_FILE`, `DESCRIPTION`, `MIME_TYPE`) VALUES
(NULL, 'adult_obi_wan', NULL, 'An image of adult obi wan', 'image/jpeg');

INSERT INTO `DOC_TYPE`(`DOC_TYPE_ID`, `DOC_NAME`, `TEMPLATE_FILE`, `DESCRIPTION`, `MIME_TYPE`) VALUES
(NULL, 'old_obi_wan', NULL, 'An image of old obi wan', 'image/jpeg');

INSERT INTO `PERFORMANCE_PLAN`(`PERFORMANCE_PLAN_ID`, `START_YEAR`, `END_YEAR`, `CREATE_DATE`, `STATUS`, `EMPLOYEE_ID`) VALUES
(NULL, 2018, 2019, '2018-12-31', 1, 3);

INSERT INTO `PERFORMANCE_REVIEW`(`PERFORMANCE_REVIEW_ID`, `WORK_PLAN_ID`, `CREATE_DATE`, `STATUS`, `EMPLOYEE_ID`) VALUES
(NULL, 1, '2018-12-31', 1, 3);

INSERT INTO `PERFORMANCE_SECTION`(`SECTION_ID`, `DATA`, `PERFORMANCE_REVIEW_ID`, `PERFORMANCE_PLAN_ID`, `SECTION_NAME`) VALUES
(NULL,
    '{"pid": 101, "name": "name1"}',
    1,
    1,
    'section_1');

INSERT INTO `PERFORMANCE_SECTION`(`SECTION_ID`, `DATA`, `PERFORMANCE_REVIEW_ID`, `PERFORMANCE_PLAN_ID`, `SECTION_NAME`) VALUES
(NULL,
    '{"pid": 101, "name": "name1"}',
    1,
    1,
    'section_2');

INSERT INTO `PERFORMANCE_SECTION`(`SECTION_ID`, `DATA`, `PERFORMANCE_REVIEW_ID`, `PERFORMANCE_PLAN_ID`, `SECTION_NAME`) VALUES
(NULL,
    '{"pid": 101, "name": "name1"}',
    1,
    1,
    'section_3');

INSERT INTO `PERFORMANCE_PLAN`(`PERFORMANCE_PLAN_ID`, `START_YEAR`, `END_YEAR`, `CREATE_DATE`, `STATUS`, `EMPLOYEE_ID`) VALUES
(NULL, 2019, 2020, '2018-12-31', 1, 3);

INSERT INTO `PERFORMANCE_REVIEW`(`PERFORMANCE_REVIEW_ID`, `WORK_PLAN_ID`, `CREATE_DATE`, `STATUS`, `EMPLOYEE_ID`) VALUES
(NULL, 2, '2018-12-31', 0, 3);

INSERT INTO `PERFORMANCE_SECTION`(`SECTION_ID`, `DATA`, `PERFORMANCE_REVIEW_ID`, `PERFORMANCE_PLAN_ID`, `SECTION_NAME`) VALUES
(NULL,
    '{"pid": 101, "name": "name1"}',
    2,
    2,
    'section_1');

INSERT INTO `PERFORMANCE_SECTION`(`SECTION_ID`, `DATA`, `PERFORMANCE_REVIEW_ID`, `PERFORMANCE_PLAN_ID`, `SECTION_NAME`) VALUES
(NULL,
    '{"pid": 101, "name": "name1"}',
    2,
    2,
    'section_2');

INSERT INTO `PERFORMANCE_SECTION`(`SECTION_ID`, `DATA`, `PERFORMANCE_REVIEW_ID`, `PERFORMANCE_PLAN_ID`, `SECTION_NAME`) VALUES
(NULL,'{"pid": 101, "name": "name1"}',2,2,'section_3');

INSERT INTO `PERFORMANCE_PLAN`(`PERFORMANCE_PLAN_ID`, `START_YEAR`, `END_YEAR`, `CREATE_DATE`, `STATUS`, `EMPLOYEE_ID`) VALUES
(NULL, 2018, 2019, '2018-12-31', 1, 4);

INSERT INTO `PERFORMANCE_REVIEW`(`PERFORMANCE_REVIEW_ID`, `WORK_PLAN_ID`, `CREATE_DATE`, `STATUS`, `EMPLOYEE_ID`) VALUES
(NULL, 3, '2018-12-31', 1, 4);

INSERT INTO `PERFORMANCE_SECTION`(`SECTION_ID`, `DATA`, `PERFORMANCE_REVIEW_ID`, `PERFORMANCE_PLAN_ID`, `SECTION_NAME`) VALUES
(NULL,
    '{"pid": 101, "name": "name1"}',
    3,
    3,
    'section_1');

INSERT INTO `PERFORMANCE_SECTION`(`SECTION_ID`, `DATA`, `PERFORMANCE_REVIEW_ID`, `PERFORMANCE_PLAN_ID`, `SECTION_NAME`) VALUES
(NULL,
    '{"pid": 101, "name": "name1"}',
    3,
    3,
    'section_2');

INSERT INTO `PERFORMANCE_SECTION`(`SECTION_ID`, `DATA`, `PERFORMANCE_REVIEW_ID`, `PERFORMANCE_PLAN_ID`, `SECTION_NAME`) VALUES
(NULL,
    '{"pid": 101, "name": "name1"}',
    3,
    3,
    'section_3');



COMMIT;

SET GLOBAL  FOREIGN_KEY_CHECKS=1;
COMMIT;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
-- MySQL Script generated by MySQL Workbench
-- Wed Mar 13 10:03:02 2019
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
  `ROLE_NAME` VARCHAR(48) NULL,
  `DESCRIPTION` VARCHAR(45) NULL,
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
  `EMAIL` VARCHAR(320) NOT NULL,
  `FIRST_NAME` VARCHAR(100) NOT NULL,
  `LAST_NAME` VARCHAR(100) NOT NULL,
  `ADDRESS` VARCHAR(255) NULL,
  `BIRTHDATE` DATE NULL,
  `VACATION_DAYS` INT NULL,
  `REMAINING_VACATION_DAYS` INT NULL,
  `FTE` TINYINT NOT NULL DEFAULT 1 COMMENT '0=PART_TIME, 1=FULL_TIME',
  `STATUS` TINYINT NOT NULL DEFAULT 2 COMMENT 'One of: 3 = PROBATION, 2 = ONBOARDING, 1 = ACTIVE, 0 = INACTIVE',
  `PASSWORD` VARCHAR(64) NOT NULL,
  `SALARY` DECIMAL(10,2) NULL DEFAULT 0,
  `DATE_JOINED` DATE NULL,
  `ADMIN_LEVEL` TINYINT NOT NULL COMMENT 'One of: 0 = STAFF, 1 = MANAGER, 2 = HR ADMIN',
  `CREATED_DATE` DATE NULL,
  `PHONE_NUMBER` VARCHAR(45) NULL,
  INDEX `ROLE_idx` (`ROLE` ASC),
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
-- Table `jabc_db`.`TYPE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jabc_db`.`TYPE` ;

CREATE TABLE IF NOT EXISTS `jabc_db`.`TYPE` (
  `TYPE_ID` INT NOT NULL AUTO_INCREMENT,
  `TYPE_NAME` VARCHAR(48) NOT NULL,
  `TEMPLATE_FILE` BLOB NULL COMMENT 'Path to empty support document of this type (if applicable)',
  `DESCRIPTION` VARCHAR(512) NULL,
  PRIMARY KEY (`TYPE_ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jabc_db`.`SUPPORT_DOC`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jabc_db`.`SUPPORT_DOC` ;

CREATE TABLE IF NOT EXISTS `jabc_db`.`SUPPORT_DOC` (
  `SUPPORT_DOC_ID` INT NOT NULL AUTO_INCREMENT,
  `EMPLOYEE_ID` INT NOT NULL,
  `TYPE_ID` INT NOT NULL,
  `CREATED_DATE` DATE NOT NULL,
  `DUE_DATE` DATE NULL,
  `EXPIRY_DATE` BIGINT NULL,
  `ACTUAL_FILE` BLOB NOT NULL COMMENT 'Path to this support document',
  `DESCRIPTION` VARCHAR(512) NULL,
  PRIMARY KEY (`SUPPORT_DOC_ID`),
  INDEX `TYPE_ID_idx` (`TYPE_ID` ASC),
  INDEX `FK_SUPPORT_DOC_EMPLOYEE_idx` (`EMPLOYEE_ID` ASC),
  CONSTRAINT `FK_TYPE_ID`
    FOREIGN KEY (`TYPE_ID`)
    REFERENCES `jabc_db`.`TYPE` (`TYPE_ID`)
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
  `CREATED_DATE` DATE NOT NULL,
  `STATUS` TINYINT NOT NULL DEFAULT 0 COMMENT '1=PUBLISHED, 0=UNPUBLISHED',
  `EMPLOYEE_ID` INT NOT NULL DEFAULT 0,
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
  `CREATED_DATE` DATE NOT NULL COMMENT '1=PUBLISHED, 0=UNPUBLISHED',
  `STATUS` TINYINT NOT NULL,
  PRIMARY KEY (`PERFORMANCE_REVIEW_ID`),
  INDEX `FK_PERFORMANCE_WORK_PLAN_idx` (`WORK_PLAN_ID` ASC),
  CONSTRAINT `FK_PERFORMANCE_WORK_PLAN`
    FOREIGN KEY (`WORK_PLAN_ID`)
    REFERENCES `jabc_db`.`PERFORMANCE_PLAN` (`PERFORMANCE_PLAN_ID`)
    ON DELETE CASCADE
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
  `SECTION_NAME` VARCHAR(45) NOT NULL,
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
  `DESCRIPTION` VARCHAR(512) NULL,
  PRIMARY KEY (`COMPETENCY_ID`),
  INDEX `FK_COMPETENCY_ROLE_idx` (`ROLE_ID` ASC),
  CONSTRAINT `FK_COMPETENCY_ROLE`
    FOREIGN KEY (`ROLE_ID`)
    REFERENCES `jabc_db`.`ROLE` (`ROLE_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

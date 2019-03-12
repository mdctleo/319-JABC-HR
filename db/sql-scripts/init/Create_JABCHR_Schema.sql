-- MySQL Script generated by MySQL Workbench
-- Mon Mar 11 23:21:44 2019
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

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
  `BIRTHDATE` BIGINT NULL,
  `VACATION_DAYS` INT NULL,
  `REMAINING_VACATION_DAYS` INT NULL,
  `FTE` TINYINT NOT NULL DEFAULT 1 COMMENT '0=PART_TIME, 1=FULL_TIME',
  `STATUS` TINYINT NOT NULL DEFAULT 2 COMMENT 'One of: 3 = PROBATION, 2 = ONBOARDING, 1 = ACTIVE, 0 = INACTIVE',
  `PASSWORD` VARCHAR(64) NOT NULL,
  `SALARY` DECIMAL(10,2) NULL DEFAULT 0,
  `DATE_JOINED` BIGINT NULL,
  `ADMIN_LEVEL` TINYINT NOT NULL COMMENT 'One of: 0 = STAFF, 1 = MANAGER, 2 = HR ADMIN',
  `CREATED_DATE` BIGINT NULL,
  `PHONE_NUMBER` VARCHAR(45) NULL,
  INDEX `ROLE_idx` (`ROLE` ASC) VISIBLE,
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
  `PATH` VARCHAR(512) NULL COMMENT 'Path to empty support document of this type (if applicable)',
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
  `CREATED_DATE` BIGINT NOT NULL,
  `DUE_DATE` BIGINT NULL,
  `EXPIRY_DATE` BIGINT NULL,
  `PATH` VARCHAR(512) NOT NULL COMMENT 'Path to this support document',
  `DESCRIPTION` VARCHAR(512) NULL,
  PRIMARY KEY (`SUPPORT_DOC_ID`),
  INDEX `TYPE_ID_idx` (`TYPE_ID` ASC) VISIBLE,
  INDEX `FK_SUPPORT_DOC_EMPLOYEE_idx` (`EMPLOYEE_ID` ASC) VISIBLE,
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
  `DATE` BIGINT NULL,
  PRIMARY KEY (`VACATION_REQUEST_ID`),
  INDEX `FK_VACATION_REQUEST_EMPLOYEE_idx` (`EMPLOYEE_ID` ASC) VISIBLE,
  CONSTRAINT `FK_VACATION_REQUEST_EMPLOYEE`
    FOREIGN KEY (`EMPLOYEE_ID`)
    REFERENCES `jabc_db`.`EMPLOYEE` (`EMPLOYEE_ID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jabc_db`.`PERFORMANCE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jabc_db`.`PERFORMANCE` ;

CREATE TABLE IF NOT EXISTS `jabc_db`.`PERFORMANCE` (
  `PERFORMANCE_ID` INT NOT NULL AUTO_INCREMENT,
  `DATE` BIGINT NOT NULL,
  `STATUS` TINYINT NOT NULL DEFAULT 0 COMMENT '1=PUBLISHED, 0=UNPUBLISHED',
  `EMPLOYEE_ID` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`PERFORMANCE_ID`, `EMPLOYEE_ID`),
  INDEX `FK_PERFORMANCE_EMPLOYEE_idx` (`EMPLOYEE_ID` ASC) VISIBLE,
  CONSTRAINT `FK_PERFORMANCE_EMPLOYEE`
    FOREIGN KEY (`EMPLOYEE_ID`)
    REFERENCES `jabc_db`.`EMPLOYEE` (`EMPLOYEE_ID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jabc_db`.`PERSONAL_TARGET`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jabc_db`.`PERSONAL_TARGET` ;

CREATE TABLE IF NOT EXISTS `jabc_db`.`PERSONAL_TARGET` (
  `PERSONAL_TARGET_ID` INT NOT NULL AUTO_INCREMENT,
  `DESCRIPTION` VARCHAR(200) NULL,
  `RATING` VARCHAR(200) NULL,
  `PERFORMANCE_ID` INT NOT NULL,
  PRIMARY KEY (`PERSONAL_TARGET_ID`, `PERFORMANCE_ID`),
  INDEX `fk_PERSONAL_TARGET_PERFORMANCE1_idx` (`PERFORMANCE_ID` ASC) VISIBLE,
  CONSTRAINT `fk_PERSONAL_TARGET_PERFORMANCE1`
    FOREIGN KEY (`PERFORMANCE_ID`)
    REFERENCES `jabc_db`.`PERFORMANCE` (`PERFORMANCE_ID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jabc_db`.`OBJECTIVE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jabc_db`.`OBJECTIVE` ;

CREATE TABLE IF NOT EXISTS `jabc_db`.`OBJECTIVE` (
  `OBJECTIVE_ID` INT NOT NULL AUTO_INCREMENT,
  `PERFORMANCE_ID` INT NOT NULL,
  `Q1` DECIMAL(12,2) NULL DEFAULT 0,
  `Q2` DECIMAL(12,2) NULL DEFAULT 0,
  `Q3` DECIMAL(12,2) NULL DEFAULT 0,
  `Q4` DECIMAL(12,2) NULL DEFAULT 0,
  `IMPACT` VARCHAR(45) NULL,
  `RELEVANCE` VARCHAR(45) NULL,
  `VOL_ALUM` VARCHAR(45) NULL,
  `INNOVATIVE` VARCHAR(45) NULL,
  `FOUNDATION` VARCHAR(45) NULL,
  PRIMARY KEY (`OBJECTIVE_ID`, `PERFORMANCE_ID`),
  INDEX `fk_OBJECTIVE_has_PERFORMANCE_PERFORMANCE1_idx` (`PERFORMANCE_ID` ASC) VISIBLE,
  CONSTRAINT `fk_OBJECTIVE_has_PERFORMANCE_PERFORMANCE1`
    FOREIGN KEY (`PERFORMANCE_ID`)
    REFERENCES `jabc_db`.`PERFORMANCE` (`PERFORMANCE_ID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jabc_db`.`DEVELOPMENT_GOAL`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jabc_db`.`DEVELOPMENT_GOAL` ;

CREATE TABLE IF NOT EXISTS `jabc_db`.`DEVELOPMENT_GOAL` (
  `DEVELOPMENT_GOAL_ID` INT NOT NULL AUTO_INCREMENT,
  `GOAL` VARCHAR(200) NULL,
  `KEY_ACTIVITIES` VARCHAR(200) NULL,
  `RATING` VARCHAR(45) NULL,
  `PERFORMANCE_ID` INT NOT NULL,
  PRIMARY KEY (`DEVELOPMENT_GOAL_ID`, `PERFORMANCE_ID`),
  INDEX `fk_DEVELOPMENT_GOAL_PERFORMANCE1_idx` (`PERFORMANCE_ID` ASC) VISIBLE,
  CONSTRAINT `fk_DEVELOPMENT_GOAL_PERFORMANCE1`
    FOREIGN KEY (`PERFORMANCE_ID`)
    REFERENCES `jabc_db`.`PERFORMANCE` (`PERFORMANCE_ID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jabc_db`.`PROBATION`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jabc_db`.`PROBATION` ;

CREATE TABLE IF NOT EXISTS `jabc_db`.`PROBATION` (
  `PROBATION_ID` INT NOT NULL AUTO_INCREMENT,
  `START_DATE` BIGINT NOT NULL,
  `REVIEW_DATE` BIGINT NOT NULL,
  `STATUS` TINYINT NULL COMMENT '1=PUBLISHED, 0=UNPUBLISHED',
  `EMPLOYEE_ID` INT NOT NULL,
  PRIMARY KEY (`PROBATION_ID`, `EMPLOYEE_ID`),
  INDEX `FK_PROBATION_EMPLOYEE_idx` (`EMPLOYEE_ID` ASC) VISIBLE,
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
  INDEX `fk_QUESTION_PROBATION1_idx` (`PROBATION_ID` ASC) VISIBLE,
  CONSTRAINT `fk_QUESTION_PROBATION1`
    FOREIGN KEY (`PROBATION_ID`)
    REFERENCES `jabc_db`.`PROBATION` (`PROBATION_ID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jabc_db`.`JABC_GOAL`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jabc_db`.`JABC_GOAL` ;

CREATE TABLE IF NOT EXISTS `jabc_db`.`JABC_GOAL` (
  `JABC_GOAL_ID` INT NOT NULL AUTO_INCREMENT,
  `NAME` VARCHAR(500) NULL,
  `GOAL` VARCHAR(100) NULL,
  `PREVIOUS_YEAR` VARCHAR(100) NULL,
  `PERFORMANCE_ID` INT NOT NULL,
  PRIMARY KEY (`JABC_GOAL_ID`, `PERFORMANCE_ID`),
  INDEX `fk_JABC_GOAL_PERFORMANCE1_idx` (`PERFORMANCE_ID` ASC) VISIBLE,
  CONSTRAINT `fk_JABC_GOAL_PERFORMANCE1`
    FOREIGN KEY (`PERFORMANCE_ID`)
    REFERENCES `jabc_db`.`PERFORMANCE` (`PERFORMANCE_ID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jabc_db`.`COMMENT`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jabc_db`.`COMMENT` ;

CREATE TABLE IF NOT EXISTS `jabc_db`.`COMMENT` (
  `COMMENT_ID` INT NOT NULL AUTO_INCREMENT,
  `COMMENT` TEXT(4096) NOT NULL,
  `DATE` BIGINT NULL,
  `PERFORMANCE_ID` INT NOT NULL,
  `COMMENTER_EMPLOYEE_ID` INT NOT NULL,
  PRIMARY KEY (`COMMENT_ID`, `PERFORMANCE_ID`, `COMMENTER_EMPLOYEE_ID`),
  INDEX `fk_COMMENT_PERFORMANCE1_idx` (`PERFORMANCE_ID` ASC) VISIBLE,
  CONSTRAINT `fk_COMMENT_PERFORMANCE1`
    FOREIGN KEY (`PERFORMANCE_ID`)
    REFERENCES `jabc_db`.`PERFORMANCE` (`PERFORMANCE_ID`)
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
  INDEX `fk_EMPLOYEE_has_EMPLOYEE_EMPLOYEE2_idx` (`EMPLOYEE_ID` ASC) VISIBLE,
  INDEX `fk_EMPLOYEE_has_EMPLOYEE_EMPLOYEE1_idx` (`MANAGER_ID` ASC) VISIBLE,
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


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- MySQL Script generated by MySQL Workbench
-- Sat Feb  2 23:07:26 2019
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
  `ROLE_ID` INT NOT NULL,
  `NAME` VARCHAR(48) NULL,
  PRIMARY KEY (`ROLE_ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jabc_db`.`HR_RECORD`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jabc_db`.`HR_RECORD` ;

CREATE TABLE IF NOT EXISTS `jabc_db`.`HR_RECORD` (
  `EMPLOYEE_ID` INT NOT NULL AUTO_INCREMENT,
  `VERSION` INT NOT NULL,
  `CREATED_BY` INT NULL,
  `ROLE` INT NULL,
  `SIN` INT NOT NULL,
  `EMAIL` VARCHAR(320) NOT NULL,
  `FIRST_NAME` VARCHAR(48) NOT NULL,
  `LAST_NAME` VARCHAR(48) NOT NULL,
  `ADDRESS` VARCHAR(255) NOT NULL,
  `BIRTHDATE` DATETIME NOT NULL,
  `VACATION_DAYS` INT NOT NULL,
  `REMAINING_VACATION_DAYS` INT NOT NULL,
  `FTE` TINYINT NOT NULL,
  `STATUS` INT NOT NULL COMMENT 'One of: 0 = ONBOARDING, 1 = ACTIVE, 2 = INACTIVE',
  `PASSWORD` CHAR(64) NOT NULL,
  `SALARY` DECIMAL(10,2) NOT NULL,
  `DATE_JOINED` DATETIME NOT NULL,
  `ADMIN_LEVEL` INT NOT NULL COMMENT 'One of: 0 = STAFF, 1 = MANAGER, 2 = HR ADMIN',
  `CREATED_DATE` DATETIME NOT NULL,
  PRIMARY KEY (`EMPLOYEE_ID`, `VERSION`),
  UNIQUE INDEX `SIN_UNIQUE` (`SIN` ASC),
  UNIQUE INDEX `EMAIL_UNIQUE` (`EMAIL` ASC),
  INDEX `CREATED_BY_idx` (`CREATED_BY` ASC),
  INDEX `ROLE_idx` (`ROLE` ASC),
  CONSTRAINT `FK_CREATED_BY`
    FOREIGN KEY (`CREATED_BY`)
    REFERENCES `jabc_db`.`HR_RECORD` (`EMPLOYEE_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_ROLE`
    FOREIGN KEY (`ROLE`)
    REFERENCES `jabc_db`.`ROLE` (`ROLE_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jabc_db`.`TYPE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jabc_db`.`TYPE` ;

CREATE TABLE IF NOT EXISTS `jabc_db`.`TYPE` (
  `TYPE_ID` INT NOT NULL,
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
  `CREATED_DATE` DATETIME NOT NULL,
  `DUE_DATE` DATETIME NULL,
  `EXPIRY_DATE` DATETIME NULL,
  `PATH` VARCHAR(512) NOT NULL COMMENT 'Path to this support document',
  PRIMARY KEY (`SUPPORT_DOC_ID`),
  INDEX `TYPE_ID_idx` (`TYPE_ID` ASC),
  INDEX `EMPLOYEE_ID_idx` (`EMPLOYEE_ID` ASC),
  CONSTRAINT `FK_TYPE_ID`
    FOREIGN KEY (`TYPE_ID`)
    REFERENCES `jabc_db`.`TYPE` (`TYPE_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_EMPLOYEE_ID`
    FOREIGN KEY (`EMPLOYEE_ID`)
    REFERENCES `jabc_db`.`HR_RECORD` (`EMPLOYEE_ID`)
    ON DELETE NO ACTION
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
  INDEX `EMPLOYEE_ID_idx` (`EMPLOYEE_ID` ASC),
  CONSTRAINT `FK_MANAGER_ID`
    FOREIGN KEY (`MANAGER_ID`)
    REFERENCES `jabc_db`.`HR_RECORD` (`EMPLOYEE_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_EMPLOYEE_ID`
    FOREIGN KEY (`EMPLOYEE_ID`)
    REFERENCES `jabc_db`.`HR_RECORD` (`EMPLOYEE_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jabc_db`.`COMPETENCY_OBJECTIVE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jabc_db`.`COMPETENCY_OBJECTIVE` ;

CREATE TABLE IF NOT EXISTS `jabc_db`.`COMPETENCY_OBJECTIVE` (
  `COMPETENCY_OBJECTIVE_ID` INT NOT NULL AUTO_INCREMENT,
  `ROLE_ID` INT NOT NULL,
  `NAME` VARCHAR(48) NOT NULL,
  `DESCRIPTION` VARCHAR(255) NULL,
  `MIN_RATING` INT NOT NULL,
  `MAX_RATING` INT NOT NULL,
  `STATUS` INT NOT NULL COMMENT 'One of: 0 = COMPETENCY, 1 = OBJECTIVE',
  PRIMARY KEY (`COMPETENCY_OBJECTIVE_ID`),
  INDEX `ROLE_ID_idx` (`ROLE_ID` ASC),
  CONSTRAINT `FK_ROLE_ID`
    FOREIGN KEY (`ROLE_ID`)
    REFERENCES `jabc_db`.`ROLE` (`ROLE_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jabc_db`.`PERFORMANCE_RECORD`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jabc_db`.`PERFORMANCE_RECORD` ;

CREATE TABLE IF NOT EXISTS `jabc_db`.`PERFORMANCE_RECORD` (
  `PERFORMANCE_RECORD_ID` INT NOT NULL,
  `EMPLOYEE_ID` INT NOT NULL,
  `CREATED_DATE` DATETIME NOT NULL,
  `DESCRIPTION` VARCHAR(255) NULL,
  `UPDATED_DATE` DATETIME NULL,
  PRIMARY KEY (`PERFORMANCE_RECORD_ID`),
  INDEX `FK_EMPLOYEE_ID_idx` (`EMPLOYEE_ID` ASC),
  CONSTRAINT `FK_EMPLOYEE_ID`
    FOREIGN KEY (`EMPLOYEE_ID`)
    REFERENCES `jabc_db`.`HR_RECORD` (`EMPLOYEE_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jabc_db`.`PERF_REC_COMP_OBJ`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jabc_db`.`PERF_REC_COMP_OBJ` ;

CREATE TABLE IF NOT EXISTS `jabc_db`.`PERF_REC_COMP_OBJ` (
  `PERF_REC_COMP_OBJ_ID` INT NOT NULL AUTO_INCREMENT,
  `PERFORMANCE_RECORD_ID` INT NOT NULL,
  `COMPETENCY_OBJECTIVE_ID` INT NOT NULL,
  `RATING` INT NULL,
  `COMMENT` VARCHAR(500) NULL,
  PRIMARY KEY (`PERF_REC_COMP_OBJ_ID`),
  INDEX `FK_PERFORMANCE_RECORD_ID_idx` (`PERFORMANCE_RECORD_ID` ASC),
  INDEX `FK_COMPETENCY_OBJECTIVE_ID_idx` (`COMPETENCY_OBJECTIVE_ID` ASC),
  CONSTRAINT `FK_PERFORMANCE_RECORD_ID`
    FOREIGN KEY (`PERFORMANCE_RECORD_ID`)
    REFERENCES `jabc_db`.`PERFORMANCE_RECORD` (`PERFORMANCE_RECORD_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_COMPETENCY_OBJECTIVE_ID`
    FOREIGN KEY (`COMPETENCY_OBJECTIVE_ID`)
    REFERENCES `jabc_db`.`COMPETENCY_OBJECTIVE` (`COMPETENCY_OBJECTIVE_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jabc_db`.`COMMENT`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jabc_db`.`COMMENT` ;

CREATE TABLE IF NOT EXISTS `jabc_db`.`COMMENT` (
  `COMMENT_ID` INT NOT NULL AUTO_INCREMENT,
  `PERFORMANCE_RECORD_ID` INT NOT NULL,
  `COMMENT` VARCHAR(500) NOT NULL,
  `DATE` DATETIME NULL,
  `COMMENTER` VARCHAR(48) NULL,
  PRIMARY KEY (`COMMENT_ID`),
  INDEX `FK_PERFORMANCE_RECORD_ID_idx` (`PERFORMANCE_RECORD_ID` ASC),
  CONSTRAINT `FK_PERFORMANCE_RECORD_ID`
    FOREIGN KEY (`PERFORMANCE_RECORD_ID`)
    REFERENCES `jabc_db`.`PERFORMANCE_RECORD` (`PERFORMANCE_RECORD_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jabc_db`.`VACATION_REQUEST`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jabc_db`.`VACATION_REQUEST` ;

CREATE TABLE IF NOT EXISTS `jabc_db`.`VACATION_REQUEST` (
  `VACATION_REQUEST_ID` INT NOT NULL AUTO_INCREMENT,
  `EMPLOYEE_ID` INT NOT NULL,
  `APPROVER_ID` INT NOT NULL,
  `REQUESTED_DAYS` INT NOT NULL,
  `REQUEST_STATUS` INT NOT NULL COMMENT 'One of: 0 = REQUESTED, 1 = APPROVED, 2 = DENIED',
  `DATE` DATETIME NULL,
  PRIMARY KEY (`VACATION_REQUEST_ID`),
  INDEX `FK_EMPLOYEE_ID_idx` (`EMPLOYEE_ID` ASC),
  INDEX `FK_APPROVER_ID_idx` (`APPROVER_ID` ASC),
  CONSTRAINT `FK_EMPLOYEE_ID`
    FOREIGN KEY (`EMPLOYEE_ID`)
    REFERENCES `jabc_db`.`HR_RECORD` (`EMPLOYEE_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_APPROVER_ID`
    FOREIGN KEY (`APPROVER_ID`)
    REFERENCES `jabc_db`.`HR_RECORD` (`EMPLOYEE_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

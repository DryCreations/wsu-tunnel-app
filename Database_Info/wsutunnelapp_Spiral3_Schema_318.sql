-- --------------------------------------------------------
-- Host:                         wsutunnel.csjmi9luacji.us-east-1.rds.amazonaws.com
-- Server version:               8.0.13 - Source distribution
-- Server OS:                    Linux
-- HeidiSQL Version:             9.3.0.4984
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping database structure for wsutunnelapp
CREATE DATABASE IF NOT EXISTS `wsutunnelapp` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;
USE `wsutunnelapp`;


-- Dumping structure for table wsutunnelapp.buildings
CREATE TABLE IF NOT EXISTS `buildings` (
  `buildingID` int(11) NOT NULL AUTO_INCREMENT,
  `name` tinytext NOT NULL,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `tunnelLevel` int(11) DEFAULT NULL,
  PRIMARY KEY (`buildingID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.


-- Dumping structure for table wsutunnelapp.connections
CREATE TABLE IF NOT EXISTS `connections` (
  `connectionID` int(11) NOT NULL AUTO_INCREMENT,
  `nodeA_ID` int(11) DEFAULT NULL,
  `nodeB_ID` int(11) DEFAULT NULL,
  `length` float DEFAULT NULL,
  `isIndoors` varchar(1) DEFAULT 'T',
  `hasStairs` varchar(1) DEFAULT 'F',
  `hasElevator` varchar(1) DEFAULT 'F',
  `width` tinyint(4) DEFAULT NULL,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`connectionID`),
  KEY `NID` (`nodeA_ID`),
  KEY `ConnectedNID` (`nodeB_ID`),
  CONSTRAINT `ConnectedNID` FOREIGN KEY (`nodeB_ID`) REFERENCES `nodes` (`nodeid`),
  CONSTRAINT `NID` FOREIGN KEY (`nodeA_ID`) REFERENCES `nodes` (`nodeid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.


-- Dumping structure for table wsutunnelapp.nodes
CREATE TABLE IF NOT EXISTS `nodes` (
  `nodeID` int(11) NOT NULL AUTO_INCREMENT,
  `lat` double NOT NULL DEFAULT '0',
  `long` double NOT NULL DEFAULT '0',
  `GID` int(11) NOT NULL DEFAULT '0',
  `isIndoors` char(50) DEFAULT 'T',
  `buildingID` int(11) DEFAULT '0',
  `floor` int(11) DEFAULT '0',
  `nodeTypeID` int(11) NOT NULL DEFAULT '1',
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`nodeID`),
  KEY `Building` (`buildingID`),
  KEY `Type` (`nodeTypeID`),
  CONSTRAINT `Building` FOREIGN KEY (`buildingID`) REFERENCES `buildings` (`buildingid`),
  CONSTRAINT `Type` FOREIGN KEY (`nodeTypeID`) REFERENCES `types` (`nodetypeid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.


-- Dumping structure for table wsutunnelapp.rooms
CREATE TABLE IF NOT EXISTS `rooms` (
  `RID` int(11) NOT NULL AUTO_INCREMENT,
  `BID` int(11) DEFAULT '0',
  ` roomName` mediumtext,
  `GID` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`RID`),
  KEY `BID` (`BID`),
  CONSTRAINT `BID` FOREIGN KEY (`BID`) REFERENCES `buildings` (`buildingid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.


-- Dumping structure for table wsutunnelapp.routes
CREATE TABLE IF NOT EXISTS `routes` (
  `routeID` int(11) NOT NULL AUTO_INCREMENT,
  `routeNodeA_ID` int(11) DEFAULT NULL,
  `routeNodeB_ID` int(11) DEFAULT NULL,
  `buildingA_ID` int(11) DEFAULT NULL,
  `buildingB_ID` int(11) DEFAULT NULL,
  `connectionIDs` text,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`routeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.


-- Dumping structure for table wsutunnelapp.types
CREATE TABLE IF NOT EXISTS `types` (
  `nodeTypeID` int(11) NOT NULL AUTO_INCREMENT,
  `name` tinytext NOT NULL,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`nodeTypeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

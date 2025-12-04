-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 04, 2025 at 06:00 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `santa_game_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `assignment`
--

CREATE TABLE `assignment` (
  `assignment_id` int(11) NOT NULL,
  `assignment_code` varchar(10) NOT NULL,
  `assignment` text NOT NULL,
  `assignment_status` enum('A','I') NOT NULL DEFAULT 'A',
  `current_year` year(4) NOT NULL,
  `created_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `committed_assignment`
--

CREATE TABLE `committed_assignment` (
  `committed_assignment_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `assignment_id` int(11) NOT NULL,
  `created_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `employee_code` varchar(10) NOT NULL,
  `employee_name` varchar(100) NOT NULL,
  `employee_emailId` varchar(100) NOT NULL,
  `employee_status` enum('A','I') NOT NULL DEFAULT 'A',
  `created_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `santa_child_matchup`
--

CREATE TABLE `santa_child_matchup` (
  `matchup_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `child_employee_emailId` varchar(100) NOT NULL,
  `current_year` year(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assignment`
--
ALTER TABLE `assignment`
  ADD PRIMARY KEY (`assignment_id`);

--
-- Indexes for table `committed_assignment`
--
ALTER TABLE `committed_assignment`
  ADD PRIMARY KEY (`committed_assignment_id`),
  ADD KEY `fk_commit_employee` (`employee_id`),
  ADD KEY `fk_commit_assignment` (`assignment_id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `employee_code` (`employee_code`),
  ADD UNIQUE KEY `employee_emailId` (`employee_emailId`);

--
-- Indexes for table `santa_child_matchup`
--
ALTER TABLE `santa_child_matchup`
  ADD PRIMARY KEY (`matchup_id`),
  ADD KEY `fk_matchup_employee` (`employee_id`),
  ADD KEY `fk_matchup_child` (`child_employee_emailId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assignment`
--
ALTER TABLE `assignment`
  MODIFY `assignment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `committed_assignment`
--
ALTER TABLE `committed_assignment`
  MODIFY `committed_assignment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `santa_child_matchup`
--
ALTER TABLE `santa_child_matchup`
  MODIFY `matchup_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `committed_assignment`
--
ALTER TABLE `committed_assignment`
  ADD CONSTRAINT `fk_commit_assignment` FOREIGN KEY (`assignment_id`) REFERENCES `assignment` (`assignment_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_commit_employee` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `santa_child_matchup`
--
ALTER TABLE `santa_child_matchup`
  ADD CONSTRAINT `fk_matchup_child` FOREIGN KEY (`child_employee_emailId`) REFERENCES `employee` (`employee_emailId`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_matchup_employee` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

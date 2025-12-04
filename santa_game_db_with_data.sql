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

--
-- Dumping data for table `assignment`
--

INSERT INTO `assignment` (`assignment_id`, `assignment_code`, `assignment`, `assignment_status`, `current_year`, `created_date`) VALUES
(1, 'ASS0001', 'Bring your Santa a small snack they would enjoy.', 'A', '2025', '2025-12-04'),
(2, 'ASS0002', 'Leave a handwritten note of appreciation for your Santa child.', 'A', '2025', '2025-12-04'),
(3, 'ASS0003', 'Give your Santa child a funny meme that matches their personality.', 'A', '2025', '2025-12-04'),
(4, 'ASS0004', 'Surprise your Santa child with a motivational quote.', 'A', '2025', '2025-12-04'),
(5, 'ASS0005', 'Compliment your Santa child about something they did recently.', 'A', '2025', '2025-12-04'),
(6, 'ASS0006', 'Give your Santa child a tiny desk decoration (?20�?50 item).', 'A', '2025', '2025-12-04'),
(7, 'ASS0007', 'Send your Santa child an anonymous �Have a great day!� message.', 'A', '2025', '2025-12-04'),
(8, 'ASS0008', 'Secretly observe and write one positive trait about your Santa child.', 'A', '2025', '2025-12-04'),
(9, 'ASS0009', 'Give your Santa child a chocolate or sweet treat.', 'A', '2025', '2025-12-04'),
(10, 'ASS0010', 'Send your Santa child a humorous riddle or joke.', 'A', '2025', '2025-12-04'),
(11, 'ASS0011', 'Give your Santa child a handmade paper craft (card, origami, etc.).', 'A', '2025', '2025-12-04'),
(12, 'ASS0012', 'Write your Santa child a small poem or two-line rhyme.', 'A', '2025', '2025-12-04'),
(13, 'ASS0013', 'Surprise them with a cute emoji-only message.', 'A', '2025', '2025-12-04'),
(14, 'ASS0014', 'Give your Santa child a warm wish for the new year.', 'A', '2025', '2025-12-04'),
(15, 'ASS0015', 'Draw a small doodle based on their hobby and leave it anonymously.', 'A', '2025', '2025-12-04'),
(16, 'ASS0016', 'Give your Santa child a positive affirmation for the day.', 'A', '2025', '2025-12-04'),
(17, 'ASS0017', 'Write a secret tip that can make their day easier.', 'A', '2025', '2025-12-04'),
(18, 'ASS0018', 'Gift a tiny useful item (pen, sticky notes, bookmarks).', 'A', '2025', '2025-12-04'),
(19, 'ASS0019', 'Leave a small �mystery clue� about yourself (without revealing identity).', 'A', '2025', '2025-12-04'),
(20, 'ASS0020', 'Give your Santa child a gratitude message for being part of the team.', 'A', '2025', '2025-12-04');

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

--
-- Dumping data for table `committed_assignment`
--

INSERT INTO `committed_assignment` (`committed_assignment_id`, `employee_id`, `assignment_id`, `created_date`) VALUES
(1, 1, 17, '2025-12-04'),
(2, 1, 1, '2025-12-04'),
(3, 1, 18, '2025-12-04'),
(4, 2, 1, '2025-12-04'),
(5, 2, 15, '2025-12-04'),
(6, 2, 2, '2025-12-04'),
(7, 3, 1, '2025-12-04'),
(8, 3, 3, '2025-12-04'),
(9, 3, 15, '2025-12-04'),
(10, 4, 6, '2025-12-04'),
(11, 4, 19, '2025-12-04'),
(12, 4, 1, '2025-12-04'),
(13, 5, 13, '2025-12-04'),
(14, 5, 3, '2025-12-04'),
(15, 5, 7, '2025-12-04'),
(16, 6, 1, '2025-12-04'),
(17, 6, 2, '2025-12-04'),
(18, 6, 15, '2025-12-04'),
(19, 7, 1, '2025-12-04'),
(20, 7, 9, '2025-12-04'),
(21, 7, 18, '2025-12-04'),
(22, 8, 19, '2025-12-04'),
(23, 8, 4, '2025-12-04'),
(24, 8, 3, '2025-12-04'),
(25, 9, 4, '2025-12-04'),
(26, 9, 15, '2025-12-04'),
(27, 9, 7, '2025-12-04'),
(28, 10, 18, '2025-12-04'),
(29, 10, 1, '2025-12-04'),
(30, 10, 12, '2025-12-04'),
(31, 11, 15, '2025-12-04'),
(32, 11, 4, '2025-12-04'),
(33, 11, 14, '2025-12-04'),
(34, 12, 16, '2025-12-04'),
(35, 12, 2, '2025-12-04'),
(36, 12, 18, '2025-12-04'),
(37, 13, 1, '2025-12-04'),
(38, 13, 4, '2025-12-04'),
(39, 13, 12, '2025-12-04'),
(40, 14, 13, '2025-12-04'),
(41, 14, 3, '2025-12-04'),
(42, 14, 2, '2025-12-04'),
(43, 15, 1, '2025-12-04'),
(44, 15, 11, '2025-12-04'),
(45, 15, 3, '2025-12-04');

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

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `employee_code`, `employee_name`, `employee_emailId`, `employee_status`, `created_date`) VALUES
(1, 'EMP0001', 'Hamish Murray', 'hamish.murray@acme.com', 'A', '2025-12-04'),
(2, 'EMP0002', 'Layla Graham', 'layla.graham@acme.com', 'A', '2025-12-04'),
(3, 'EMP0003', 'Matthew King', 'matthew.king@acme.com', 'A', '2025-12-04'),
(4, 'EMP0004', 'Benjamin Collins', 'benjamin.collins@acme.com', 'A', '2025-12-04'),
(5, 'EMP0005', 'Isabella Scott', 'isabella.scott@acme.com', 'A', '2025-12-04'),
(6, 'EMP0006', 'Charlie Ross', 'charlie.ross@acme.com', 'A', '2025-12-04'),
(7, 'EMP0007', 'Hamish Murray', 'hamish.murray.sr@acme.com', 'A', '2025-12-04'),
(8, 'EMP0008', 'Piper Stewart', 'piper.stewart@acme.com', 'A', '2025-12-04'),
(9, 'EMP0009', 'Spencer Allen', 'spencer.allen@acme.com', 'A', '2025-12-04'),
(10, 'EMP0010', 'Charlie Wright', 'charlie.wright@acme.com', 'A', '2025-12-04'),
(11, 'EMP0011', 'Hamish Murray', 'hamish.murray.jr@acme.com', 'A', '2025-12-04'),
(12, 'EMP0012', 'Charlie Ross', 'charlie.ross.jr@acme.com', 'A', '2025-12-04'),
(13, 'EMP0013', 'Ethan Murray', 'ethan.murray@acme.com', 'A', '2025-12-04'),
(14, 'EMP0014', 'Matthew King', 'matthew.king.jr@acme.com', 'A', '2025-12-04'),
(15, 'EMP0015', 'Mark Lawrence', 'mark.lawrence@acme.com', 'A', '2025-12-04');

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
-- Dumping data for table `santa_child_matchup`
--

INSERT INTO `santa_child_matchup` (`matchup_id`, `employee_id`, `child_employee_emailId`, `current_year`) VALUES
(1, 1, 'matthew.king@acme.com', '2025'),
(2, 2, 'piper.stewart@acme.com', '2025'),
(3, 3, 'spencer.allen@acme.com', '2025'),
(4, 4, 'spencer.allen@acme.com', '2025'),
(5, 5, 'hamish.murray@acme.com', '2025'),
(6, 6, 'charlie.ross.jr@acme.com', '2025'),
(7, 7, 'mark.lawrence@acme.com', '2025'),
(8, 8, 'charlie.ross.jr@acme.com', '2025'),
(9, 9, 'charlie.wright@acme.com', '2025'),
(10, 10, 'layla.graham@acme.com', '2025'),
(11, 11, 'ethan.murray@acme.com', '2025'),
(12, 12, 'piper.stewart@acme.com', '2025'),
(13, 13, 'charlie.ross@acme.com', '2025'),
(14, 14, 'isabella.scott@acme.com', '2025'),
(15, 15, 'matthew.king.jr@acme.com', '2025');

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
  MODIFY `assignment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `committed_assignment`
--
ALTER TABLE `committed_assignment`
  MODIFY `committed_assignment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `santa_child_matchup`
--
ALTER TABLE `santa_child_matchup`
  MODIFY `matchup_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

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

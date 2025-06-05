--
-- Database: `test-db-app`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` varchar(50) NOT NULL,
  `token` text DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
);

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `token`, `first_name`, `last_name`, `email`, `password`) VALUES
('8613d163-c48f-4808-804f-ba945fdcf8a8', NULL, 'Neel', 'Rana', 'neel@yopmail.com', 'U2FsdGVkX18wZijXvdj9V+JGpjz/Uw9PFnmM14KGg74=');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);
COMMIT;

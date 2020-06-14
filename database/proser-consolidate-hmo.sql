-- phpMyAdmin SQL Dump
-- version 4.4.15.10
-- https://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 11-06-2020 a las 19:13:16
-- Versión del servidor: 10.3.14-MariaDB
-- Versión de PHP: 7.2.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proser-consolidate-hmo`
--
CREATE DATABASE IF NOT EXISTS `proser-consolidate-hmo` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `proser-consolidate-hmo`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `AccessToken`
--

DROP TABLE IF EXISTS `AccessToken`;
CREATE TABLE IF NOT EXISTS `AccessToken` (
  `id` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `ttl` int(11) DEFAULT NULL,
  `scopes` text COLLATE utf8_spanish_ci DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `AccessToken`
--

INSERT INTO `AccessToken` (`id`, `ttl`, `scopes`, `created`, `userId`) VALUES
('3ockhOR1GarYd3EWQdEdGEbTZV62fHFicborPWEexwhKhT1YOao04oHASIZpdjst', 1209600, NULL, '2020-06-09 18:54:05', 27),
('iT0HpOFgb4OWW422eTkCBvHAjqrioI8JBMn5E0WWGNyzJHXB7nYHZMBN99fCG1Cs', 1209600, NULL, '2020-06-10 13:04:47', 28),
('JRBy8pApnGP4tLrWIDQxEctkNHXNBUsCP0mZmVnXaTNBEBbHQKh1XVhwScZabbgr', 1209600, NULL, '2020-06-09 13:43:12', 29),
('qq7ILq7qfAarbnVw9N6tDEGUlLQO126yJGmXrnqUdtMhlPXQ5kTRcscEEU7fF2hh', 1209600, NULL, '2020-06-08 21:18:14', 1),
('V2KZrEg1SgDjTlVGdvVufIcrxzY2wXQsqsvaWEZGm1SzzASDyWTrDthUcPILsbG0', 1209600, NULL, '2020-06-09 13:43:12', 29),
('YHSlURcXqspz7QnQdEF9kXvuGcGb9SpIHP5I6CMj4uliEeBql0ua4molpm7PPNdw', 1209600, NULL, '2020-06-09 19:54:15', 29);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ACL`
--

DROP TABLE IF EXISTS `ACL`;
CREATE TABLE IF NOT EXISTS `ACL` (
  `id` int(11) NOT NULL,
  `model` varchar(512) COLLATE utf8_spanish_ci DEFAULT NULL,
  `property` varchar(512) COLLATE utf8_spanish_ci DEFAULT NULL,
  `accessType` varchar(512) COLLATE utf8_spanish_ci DEFAULT NULL,
  `permission` varchar(512) COLLATE utf8_spanish_ci DEFAULT NULL,
  `principalType` varchar(512) COLLATE utf8_spanish_ci DEFAULT NULL,
  `principalId` varchar(512) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Role`
--

DROP TABLE IF EXISTS `Role`;
CREATE TABLE IF NOT EXISTS `Role` (
  `id` int(11) NOT NULL,
  `name` varchar(512) COLLATE utf8_spanish_ci NOT NULL,
  `description` varchar(512) COLLATE utf8_spanish_ci DEFAULT NULL,
  `created` datetime DEFAULT current_timestamp(),
  `modified` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `Role`
--

INSERT INTO `Role` (`id`, `name`, `description`, `created`, `modified`) VALUES
(1, 'admin', 'Administrator', '2019-08-08 20:43:17', '2019-08-08 20:43:17'),
(2, 'system', 'Sistema', '2019-09-16 12:00:21', '2019-09-16 12:00:21'),
(3, 'config', 'Configuracion', '2019-09-16 12:00:21', '2019-09-16 12:00:21'),
(4, 'user', 'Usuario', '2019-09-16 12:00:21', '2019-09-16 12:00:21'),
(5, 'develop', 'Developer', '2019-09-20 13:36:55', '2019-09-20 13:36:55'),
(7, 'guest', 'Invitado', '2019-10-27 12:33:17', '2019-10-27 12:33:17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `RoleMapping`
--

DROP TABLE IF EXISTS `RoleMapping`;
CREATE TABLE IF NOT EXISTS `RoleMapping` (
  `id` int(11) NOT NULL,
  `principalType` varchar(512) COLLATE utf8_spanish_ci DEFAULT NULL,
  `principalId` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `roleId` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `RoleMapping`
--

INSERT INTO `RoleMapping` (`id`, `principalType`, `principalId`, `roleId`) VALUES
(1, 'USER', '1', 1),
(2, 'USER', '2', 2),
(3, 'USER', '3', 3),
(4, 'USER', '4', 4),
(5, 'USER', '5', 5),
(25, 'USER', '25', 4),
(26, 'USER', '26', 1),
(27, 'USER', '28', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `User`
--

DROP TABLE IF EXISTS `User`;
CREATE TABLE IF NOT EXISTS `User` (
  `id` int(11) NOT NULL,
  `realm` varchar(512) COLLATE utf8_spanish_ci DEFAULT NULL,
  `username` varchar(512) COLLATE utf8_spanish_ci DEFAULT NULL,
  `password` varchar(512) COLLATE utf8_spanish_ci NOT NULL,
  `email` varchar(512) COLLATE utf8_spanish_ci NOT NULL,
  `emailVerified` tinyint(1) DEFAULT NULL,
  `verificationToken` varchar(512) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Userbase`
--

DROP TABLE IF EXISTS `Userbase`;
CREATE TABLE IF NOT EXISTS `Userbase` (
  `id` int(11) NOT NULL,
  `firstname` varchar(512) COLLATE utf8_spanish_ci NOT NULL,
  `lastname` varchar(512) COLLATE utf8_spanish_ci NOT NULL,
  `profile` varchar(512) COLLATE utf8_spanish_ci NOT NULL,
  `realm` varchar(512) COLLATE utf8_spanish_ci DEFAULT NULL,
  `username` varchar(512) COLLATE utf8_spanish_ci DEFAULT NULL,
  `password` varchar(512) COLLATE utf8_spanish_ci NOT NULL,
  `email` varchar(512) COLLATE utf8_spanish_ci NOT NULL,
  `emailVerified` tinyint(1) DEFAULT NULL,
  `verificationToken` varchar(512) COLLATE utf8_spanish_ci DEFAULT NULL,
  `memberId` int(11) DEFAULT NULL,
  `user_legal_id` varchar(30) COLLATE utf8_spanish_ci DEFAULT NULL,
  `user_internal_id` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL,
  `user_photo_path` varchar(150) COLLATE utf8_spanish_ci DEFAULT NULL,
  `profile_json` varchar(250) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `Userbase`
--

INSERT INTO `Userbase` (`id`, `firstname`, `lastname`, `profile`, `realm`, `username`, `password`, `email`, `emailVerified`, `verificationToken`, `memberId`, `user_legal_id`, `user_internal_id`, `user_photo_path`, `profile_json`) VALUES
(1, 'maprotel', 'admin', 'admin', 'maprotel', 'maprotel-admin', '$2a$10$9ARBD.KCRMCchquHi/Tzje7eGgaTqq5jHzFZwzns.P7nMaMb8blG.', 'maprotel@maprotel.com', 1, NULL, NULL, 'string', 'string', 'string', NULL),
(2, 'maprotel', 'system', 'system', 'maprotel', 'maprotel-system', '$2a$10$ubijinVTR2QxuDad1nAtPuGET81oFpjGs3oJwjPRGU1jJXtF2EJT6', 'maprotel-system@maprotel.com', 1, NULL, NULL, 'string', 'string', 'string', NULL),
(3, 'maprotel', 'config', 'config', 'maprotel', 'maprotel-config', '$2a$10$PuY8q/KduTIRTHUohE3qk.XkY2j37Ep3TTYna0DAWtEAAwzDiCAZu', 'maprotel-config@maprotel.com', 1, NULL, NULL, 'string', 'string', 'string', NULL),
(4, 'maprotel', 'user', 'user', 'maprotel', 'maprotel-user', '$2a$10$.cihkjrfvDqxPUBMfzQW6Ov3YzTi1P8yq.JyZ/uviFzaUocKUWGB.', 'maprotel-user@maprotel.com', 1, NULL, NULL, 'string', 'string', 'string', NULL),
(5, 'maprotel', 'develop', 'develop', 'maprotel', 'maprotel-develop', '$2a$10$EJ.KqS7A5m3Ydj.Gy1NioO4.hiKnCI8ehznWrT9SuaSTLk.4799iW', 'maprotel-develop@maprotel.com', 1, NULL, NULL, '123456789', '123456789', NULL, NULL),
(25, 'asdf', 'dasas', 'develop', 'maprotel', 'jorge', '$2a$10$hi2t8RJMfQV2Ej.V6ADNxO2BnmHGpvcQ7yYqyPC7AIV6qgyKYyp8y', 'j@gmail', 0, NULL, NULL, '1234565', '123456', NULL, '{"id":5,"name":"develop","description":"Developer","created":"2019-09-20T13:36:55.000Z","modified":"2019-09-20T13:36:55.000Z"}'),
(26, 'Dimara', 'Rodriguez', 'admin', 'maprotel', 'drodriguez', '$2a$10$fyiFCXkAtqf5Y1YuSXpBvO1ecoMYYlacFvU7e8SaxLpRZR/.SzRRa', 'dimara_rodriguez@hmoservisalud.com', 0, NULL, NULL, '123456', '123456', '123456', NULL),
(27, 'Marinela', 'Dugarte', 'user', 'maprotel', 'mdugarte', '$2a$10$wakIc2mojenZa8o.F7K1OOmICIt/KP32IkulCmA6VIHyexojgv.O6', 'marinela_dugarte@hmoservisalud.com', 0, NULL, NULL, '19226762', '19226762', NULL, NULL),
(28, 'HMO', 'Admin', 'admin', 'maprotel', 'hmo-admin', '$2a$10$l3rjBH/Rse6We0zg376Gg.Li5fJNQx394kWQzkClPq1386GfQOu62', 'hmo@hmo.com', 0, NULL, NULL, NULL, NULL, NULL, '{"id":1,"name":"admin","description":"Administrator","created":"2019-08-08T20:43:17.000Z","modified":"2019-08-08T20:43:17.000Z"}'),
(29, 'Mariela', 'Machado', 'user', 'maprotel', 'mmachado', '$2a$10$OJa8M.Fbj.Dlqm9GwiLSbORDr5iQu/AYO5YntLP7Nh3Boit1De3qK', 'mariela_machado@hmoservisalud.com', 0, NULL, NULL, '123268', '16831', NULL, NULL),
(30, 'mercedes', 'bermudez', 'user', 'maprotel', 'mbermudez', '$2a$10$17ejXzim89yhr9iStOXziOsElsMx3NH8G05Mrg42SvA7NnKUjXtga', 'mercedes_bermudez@hmoservisalud.com', 0, NULL, NULL, '3215648', '32156', NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `AccessToken`
--
ALTER TABLE `AccessToken`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ACL`
--
ALTER TABLE `ACL`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Role`
--
ALTER TABLE `Role`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `RoleMapping`
--
ALTER TABLE `RoleMapping`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `principalId` (`principalId`);

--
-- Indices de la tabla `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Userbase`
--
ALTER TABLE `Userbase`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ACL`
--
ALTER TABLE `ACL`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `Role`
--
ALTER TABLE `Role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `RoleMapping`
--
ALTER TABLE `RoleMapping`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=28;
--
-- AUTO_INCREMENT de la tabla `User`
--
ALTER TABLE `User`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `Userbase`
--
ALTER TABLE `Userbase`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=31;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

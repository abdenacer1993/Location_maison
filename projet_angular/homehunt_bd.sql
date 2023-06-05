-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3308
-- Généré le : lun. 29 mai 2023 à 00:30
-- Version du serveur : 10.4.22-MariaDB
-- Version de PHP : 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `homehunt_bd`
--

-- --------------------------------------------------------

--
-- Structure de la table `annonces`
--

CREATE TABLE `annonces` (
  `id` int(8) NOT NULL,
  `id_user` int(8) NOT NULL,
  `etat` varchar(250) NOT NULL,
  `prix` float(10,2) NOT NULL,
  `description` text NOT NULL,
  `data_av` date NOT NULL,
  `adresse` varchar(250) NOT NULL,
  `image` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `annonces`
--

INSERT INTO `annonces` (`id`, `id_user`, `etat`, `prix`, `description`, `data_av`, `adresse`, `image`) VALUES
(1, 16, 'En cours', 500.00, 'description test', '2023-05-29', 'gafsa', 'image test'),
(2, 16, 'Accepted', 100.00, 'sqfsdf', '2023-05-30', 'sqefsdqf', 'fsfsq');

-- --------------------------------------------------------

--
-- Structure de la table `reclamation`
--

CREATE TABLE `reclamation` (
  `id` int(11) NOT NULL,
  `nom` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `message` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `reclamation`
--

INSERT INTO `reclamation` (`id`, `nom`, `email`, `message`) VALUES
(1, 'ahmed', 'mr.smoke2015@gmail.com', 'dzefergfser'),
(2, 'firas', 'firas@gmail.com', 'esfsefsf'),
(10, 'ahmed', 'ah@gmail.com', 'daefazdzad dazd'),
(15, 'grthtrh', 'ah@gmail.com', 'yryd');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(8) NOT NULL,
  `nom` varchar(250) NOT NULL,
  `prenom` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `telephone` varchar(250) NOT NULL,
  `role` varchar(250) NOT NULL DEFAULT 'user',
  `prof` varchar(250) NOT NULL,
  `adresse` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `nom`, `prenom`, `email`, `password`, `telephone`, `role`, `prof`, `adresse`) VALUES
(2, 'nomtest', 'prenomtest', 'ameni@gmail.com', '165648', '123456', 'admin', 'testprof', 'gafsa'),
(11, 'nommmm', 'prenom', 'etudiant@gmail.com', 'adresse', '55555', 'simpleAdmin', 'Travailler', 'paspasss'),
(16, 'ahmed', 'boulaabiiiii', 'testesttttt@gmail.com', '12345556', '5555566666', 'user', 'Travailler', 'adresse'),
(18, 'dzad', 'fezfezf', 'ferkfnenki@ferf.com', 'fdsfdsf', '55555', 'user', 'Etudiant', 'ffsdsfds'),
(26, 'Abnacer', 'hasnaoui', 'ahkkkk@gmail.com', '2561468', '5589648', 'user', 'Etudiant', 'gafsa'),
(27, 'fsf', 'fqsdf', 'dezd@dez.com', '', '498', 'simpleAdmin', 'Travailler', 'fdsqf');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `annonces`
--
ALTER TABLE `annonces`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `reclamation`
--
ALTER TABLE `reclamation`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `annonces`
--
ALTER TABLE `annonces`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `reclamation`
--
ALTER TABLE `reclamation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

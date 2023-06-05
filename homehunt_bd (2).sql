-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3308
-- Généré le : ven. 02 juin 2023 à 06:15
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
  `image1` varchar(255) NOT NULL,
  `telephone` int(250) NOT NULL,
  `type` varchar(250) NOT NULL,
  `nom` varchar(250) NOT NULL,
  `prenom` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `annonces`
--

INSERT INTO `annonces` (`id`, `id_user`, `etat`, `prix`, `description`, `data_av`, `adresse`, `image1`, `telephone`, `type`, `nom`, `prenom`) VALUES
(3, 18, 'en cours...', 5000.00, 'maison', '2023-06-02', 'Tunis', '../../../assets/img/home1.jpg', 0, '', 'ahmed', 'test'),
(4, 18, 'Accepted', 5478.00, 'appartement', '2023-06-02', 'ddqzf', '../../../assets/img/home1.jpg', 59564, '', 'ahmed', 'test'),
(5, 19, 'en cours...', 2500.00, 'maison', '2023-06-02', 'Sidi bouzid', '../../../assets/img/home1.jpg', 5789256, '', 'ahmed', 'test'),
(6, 18, 'Accepted', 58265.00, 'maison', '2023-06-02', 'Gabes', '../../../assets/img/home1.jpg', 516, '', 'ahmed', 'test'),
(7, 18, 'Accepted', 366565.00, 'studio', '2023-06-02', 'Ariana', '../../../assets/img/home1.jpg', 56456, '', 'ahmed', 'test');

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
(10, 'ahmed', 'ah@gmail.com', 'daefazdzad dazd'),
(15, 'grthtrh', 'ah@gmail.com', 'yryd'),
(17, 'ahmed', 'etudiant@gmail.comd', 'dazgrg');

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
(2, '', '', '', '', '', 'admin', 'testprof', ''),
(11, 'nommmm', 'prenom', 'etudiant@gmail.com', '123456', '123456', 'simpleAdmin', 'Travailler', 'paspasss'),
(16, 'ahmed', 'boulaabiiiii', 'admin@gmail.com', '123456', '123456', 'admin', 'Travailler', 'adresse'),
(18, 'ahmed', 'test', 'user@gmail.com', '123456', '123456', 'user', 'Etudiant', 'ffsdsfds'),
(26, 'Abnacer', 'hasnaoui', 'ahkkkk@gmail.com', '2561468', '5589648', 'user', 'Etudiant', 'gafsa'),
(27, 'fsf', 'fqsdf', 'dezd@dez.com', '', '498', 'simpleAdmin', 'Travailler', 'fdsqf'),
(30, 'fdszfq', 'fsqdf', 'ahmed.boulaabi.186@gmail.com', '6514986', '2561', 'simpleAdmin', 'Travailler', 'fqsdf'),
(31, 'ahmed', 'ahmed', 'mr.smoke2dsff015@gmail.com', '123456', '6565', 'user', 'Etudiant', 'Gafsa'),
(33, 'fdf', 'fsdfds', 'ahmed.boulaabi.18fdsfds6@gmail.com', '65652', '21651565', 'user', 'Travailler', 'BP 73 poste zarroug 2112 Gafsa'),
(35, 'ezer', 'zerzer', 'etufgfdgdiant@gmail.com', '15162', '65465', 'user', 'Travailler', 'rzerzer');

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
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `reclamation`
--
ALTER TABLE `reclamation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

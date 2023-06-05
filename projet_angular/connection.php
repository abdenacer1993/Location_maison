<?php

header('Content-type: application/json');
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin, access-control-allow-methods, access-control-allow-headers');

$conn = mysqli_connect('localhost:3308','root','','homehunt_bd');
$conn->set_charset("utf8");

$host = 'localhost:3308';
$username = 'root';
$password = '';
$dbname = 'homehunt_bd';

$mysqli = new mysqli($host, $username, $password, $dbname);

if ($mysqli->connect_errno) {
    echo "Échec de la connexion à la base de données: " . $mysqli->connect_error;
    exit();
}

// Autres configurations ou fonctionnalités liées à la connexion à la base de données




?>
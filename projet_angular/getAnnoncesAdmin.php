<?php
include_once("connection.php");

// select all data
$query = "SELECT *
FROM annonces
 ";
$stmt = $mysqli->prepare($query);
$stmt->execute();
$results = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
$json = json_encode($results);
echo $json;
?>

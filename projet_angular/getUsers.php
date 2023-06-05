<?php
include_once("connection.php");
header('Content-type: application/json');
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin, access-control-allow-methods, access-control-allow-headers');


// select all data
$query = "SELECT *
FROM users
WHERE role <> 'admin' ";
$stmt = $mysqli->prepare($query);
$stmt->execute();
$results = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
$json = json_encode($results);
echo $json;
?>

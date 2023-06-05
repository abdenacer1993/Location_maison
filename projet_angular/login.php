<?php
//require __DIR__ . '/generate-jwt.php';
include './connection.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$request_body = file_get_contents('php://input');
$data = json_decode($request_body);

$email = $data->email;
$password = $data->password;

$sql = "SELECT id, nom, prenom, role, email FROM users WHERE email = '$email' AND password = '$password'";
$result = mysqli_query($conn, $sql);

$data = array();

while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

echo json_encode($data);
?>

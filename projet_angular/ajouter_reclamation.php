<?php
include_once("connection.php");
header('Content-type: application/json');
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

$postdata = file_get_contents("php://input"); 
if(isset($postdata) && !empty($postdata))
{
$request = json_decode($postdata);
$nom = trim($request->nom);
$email = mysqli_real_escape_string($mysqli, trim($request->email)); 
$message = mysqli_real_escape_string($mysqli, trim($request->message));


$sql = "INSERT INTO reclamation(
nom,
email,
message
) VALUES ('$nom',
'$email', 
 '$message'
 )";
if ($mysqli->query($sql)) {
$data=array('message'=>'success');
 echo json_encode($data);
}
else{ 
    $data=array('message'=>'failed'); 
    echo json_encode($data);
}
}

?>
<?php
include_once("connection.php");
$postdata = file_get_contents("php://input"); 
if(isset($postdata) && !empty($postdata))
{
$request = json_decode($postdata);
$nom = trim($request->nom);
$prenom  = trim($request->prenom);
$email = mysqli_real_escape_string($mysqli, trim($request->email)); 
$password = mysqli_real_escape_string($mysqli, trim($request->password));
$telephone = mysqli_real_escape_string($mysqli, trim($request->telephone));
$role  = trim($request->role);
$prof  = trim($request->prof);
$adresse  = trim($request->adresse);

$sql = "INSERT INTO users(
nom,
prenom,
email,
password, 
telephone,
role,
prof,
adresse
) VALUES ('$nom',
'$prenom', 
'$email', 
'$password',
 '$telephone',
 'user',
 '$prof',
 '$adresse'
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
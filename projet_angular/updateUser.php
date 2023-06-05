<?php
include_once("connection.php");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$postdata = file_get_contents("php://input"); 

if (isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata);
    $id = mysqli_real_escape_string($mysqli, trim($request->id));
    $nom = trim($request->nom);
    $prenom = trim($request->prenom);
    $email = mysqli_real_escape_string($mysqli, trim($request->email)); 
    $password = mysqli_real_escape_string($mysqli, trim($request->password));
    $telephone = mysqli_real_escape_string($mysqli, trim($request->telephone));
    $adresse = trim($request->adresse);

    $sql = "UPDATE users 
            SET nom=?, prenom=?, email=?, adresse=?, telephone=?, password=?
            WHERE id=?";

    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param("ssssssi", $nom, $prenom, $email, $adresse, $telephone, $password, $id);

    if ($stmt->execute()) {
        $data = array('message' => 'success');
        echo json_encode($data);
    } else {
        $data = array('message' => 'failed'); 
        echo json_encode($data);
    }
}


?>
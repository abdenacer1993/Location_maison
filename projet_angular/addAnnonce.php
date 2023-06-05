<?php
require './connection.php';

header('Content-type: application/json');
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin, access-control-allow-methods, access-control-allow-headers');

// Récupérer les données envoyées depuis Angular
$id_user = $_POST['id_user'];
$nom = $_POST['nom'];
$prenom = $_POST['prenom'];
$etat = $_POST['etat'];
$telephone = $_POST['telephone'];
$data_av = date('Y-m-d');
$description = $_POST['description'];
$adresse = $_POST['adresse'];
$prix = $_POST['prix'];
$image1 = $_FILES['images'];

// Upload du fichier image
$filename = $image1['name'];
$tempFilePath = $image1['tmp_name'];
$fileExtension = pathinfo($filename, PATHINFO_EXTENSION);
$newFilename = uniqid() . "-" . time() . "." . $fileExtension;
$fileDestination = 'C:/Users/DELL/Downloads/ameni/ameni/src/assets/img/' . $newFilename;//n'oublier pas de changer source de upload de l'image 
$fileDes = '../../../assets/img/' . $newFilename;

if (move_uploaded_file($tempFilePath, $fileDestination)) {
    // Insertion des détails de la formation et de l'image dans la base de données
    $sql = "INSERT INTO annonces (
        id_user,
        nom,
        prenom,
        etat,
        prix,
        data_av,
        description,
        adresse,
        telephone,
        image1
    ) VALUES (
        '$id_user',
        '$nom',
        '$prenom',
        '$etat',
        '$prix',
        '$data_av',
        '$description',
        '$adresse',
        '$telephone',
        '$fileDes'
    )";

    $result = mysqli_query($conn, $sql);

    if ($result) {
        http_response_code(200);
        echo json_encode(array('message' => 'Formation added successfully'));
    } else {
        http_response_code(400);
        echo json_encode(array('message' => 'Error inserting formation: ' . mysqli_error($conn)));
    }
} else {
    http_response_code(400);
    echo json_encode(array('message' => 'Error uploading image file'));
}
?>

<?php
require './connection.php';

header('Content-type: application/json');
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin, access-control-allow-methods, access-control-allow-headers');

// Récupérer les données envoyées depuis Angular
if (isset($_POST['id_user']) && isset($_POST['nom']) && isset($_POST['prenom']) && isset($_POST['etat']) && isset($_POST['description']) && isset($_POST['prix']) && isset($_POST['email']) && isset($_FILES['images'])) {
    $id_user = $_POST['id_user'];
    $nom = $_POST['nom'];
    $prenom = $_POST['prenom'];
    $etat = $_POST['etat'];
    $description = $_POST['description'];
    $prix = $_POST['prix'];
    $email = $_POST['email'];
    $images = $_FILES['images'];

$filePaths = [];

// Upload des fichiers images
foreach ($images['name'] as $index => $filename) {
    $tempFilePath = $images['tmp_name'][$index];
    $fileExtension = pathinfo($filename, PATHINFO_EXTENSION);
    $newFilename = uniqid() . "-" . time() . "." . $fileExtension;
    $fileDestination = 'upload/' . $newFilename;

    if (move_uploaded_file($tempFilePath, $fileDestination)) {
        $filePaths[] = $fileDestination;
    } else {
        http_response_code(400);
        echo json_encode(array('message' => 'Error uploading image file'));
        exit;
    }
}

// Insertion des détails de la formation et des images dans la base de données
$sql = "INSERT INTO annonces (
    id_user,
    nom,
    prenom,
    etat,
    prix,
    data_av,
    description,
    adresse,
    image1,
    image2,
    image3,
    image4,
    image5
) VALUES (
    '$id_user',
    '$nom',
    '$prenom',
    '$etat',
    '$prix',
    '$data_av',
    '$description',
    '$email',
    '$filePaths[0]',
    '$filePaths[1]',
    '$filePaths[2]',
    '$filePaths[3]',
    '$filePaths[4]'
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
    echo "One or more fields are missing.";
}
?>

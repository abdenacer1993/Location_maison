<?php
require './connection.php';

header('Content-type: application/json');
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin, access-control-allow-methods, access-control-allow-headers');

// Récupérer les données envoyées depuis Angular
$id_annonce = $_POST['id_annonce'];
$id_user = $_POST['id_user'];
$nom = $_POST['nom'];
$prenom = $_POST['prenom'];
$etat = $_POST['etat'];
$data_av = date('Y-m-d');
$description = $_POST['description'];
$adresse = $_POST['email'];
$prix = $_POST['prix'];

// Vérifier si une nouvelle image a été fournie
if (!empty($_FILES['images']['name'])) {
    // Upload du fichier image
    $image1 = $_FILES['images'];
    $filename = $image1['name'];
    $tempFilePath = $image1['tmp_name'];
    $fileExtension = pathinfo($filename, PATHINFO_EXTENSION);
    $newFilename = uniqid() . "-" . time() . "." . $fileExtension;
    $fileDestination = 'upload/' . $newFilename;

    if (move_uploaded_file($tempFilePath, $fileDestination)) {
        // Mettre à jour les détails de l'annonce et de l'image dans la base de données
        $sql = "UPDATE annonces SET
            id_user = '$id_user',
            nom = '$nom',
            prenom = '$prenom',
            etat = '$etat',
            prix = '$prix',
            data_av = '$data_av',
            description = '$description',
            adresse = '$adresse',
            image1 = '$fileDestination'
        WHERE id_annonce = '$id_annonce'";

        $result = mysqli_query($conn, $sql);

        if ($result) {
            http_response_code(200);
            echo json_encode(array('message' => 'Annonce updated successfully'));
        } else {
            http_response_code(400);
            echo json_encode(array('message' => 'Error updating annonce: ' . mysqli_error($conn)));
        }
    } else {
        http_response_code(400);
        echo json_encode(array('message' => 'Error uploading image file'));
    }
} else {
    // Mettre à jour les détails de l'annonce sans modifier l'image
    $sql = "UPDATE annonces SET
        id_user = '$id_user',
        nom = '$nom',
        prenom = '$prenom',
        etat = '$etat',
        prix = '$prix',
        data_av = '$data_av',
        description = '$description',
        adresse = '$adresse'
    WHERE id_annonce = '$id_annonce'";

    $result = mysqli_query($conn, $sql);

    if ($result) {
        http_response_code(200);
        echo json_encode(array('message' => 'Annonce updated successfully'));
    } else {
        http_response_code(400);
        echo json_encode(array('message' => 'Error updating annonce: ' . mysqli_error($conn)));
    }
}
?>

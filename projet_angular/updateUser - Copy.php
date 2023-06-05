<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
 
// check if form was submitted
if($_POST){
    include 'connection.php"';
    
try {
    // write update query
    $query = "UPDATE users 
              SET nom=:nom, prenom=:prenom, email=:email, adresse=:adresse, telephone=:telephone, password=:password
              WHERE id =:id";

    // prepare query for execution
    $stmt = $mysqli->prepare($query);

    // posted values
    $id = $_POST['id'];
    $nom = $_POST['nom'];
    $prenom = $_POST['prenom'];
    $email = $_POST['email'];
    $adresse = $_POST['adresse'];
    $password = $_POST['password'];
    $telephone = $_POST['telephone'];

    // bind the parameters
    $stmt->bindParam(':id', $id);
    $stmt->bindParam(':nom', $nom);
    $stmt->bindParam(':prenom', $prenom);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':adresse', $adresse);
    $stmt->bindParam(':telephone', $telephone);
    $stmt->bindParam(':password', $password);

    // Execute the query
    if($stmt->execute()){
        echo json_encode(array('result'=>'success'));
    }else{
        echo json_encode(array('result'=>'fail'));
    }
     
}
 
// show errors
catch(PDOException $exception){
    die('ERROR: ' . $exception->getMessage());
}
}
?>

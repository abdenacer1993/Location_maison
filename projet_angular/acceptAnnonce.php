<?php
include_once("connection.php");

$postdata = file_get_contents("php://input"); 

if (isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata);
    $id = mysqli_real_escape_string($mysqli, trim($request->id));
 

    $sql = "UPDATE annonces 
            SET etat='Accepted'
            WHERE id=?";

    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param("s", $id);

    if ($stmt->execute()) {
        $data = array('message' => 'success');
        echo json_encode($data);
    } else {
        $data = array('message' => 'failed'); 
        echo json_encode($data);
    }
}


?>
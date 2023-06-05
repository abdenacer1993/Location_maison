<?php
include_once("connection.php");

try {
    // prepare select query
    $id = $_GET['id'];

$sql = "Select * from annonces where id_user= '$id'";
    $stmt = $mysqli->prepare($sql);

    // execute the query
    $stmt->execute();

    // store retrieved rows to a variable
    $result = $stmt->get_result();
    $rows = array();
    while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }

    $json = json_encode($rows);
    echo $json;
}

// show error
catch (PDOException $exception) {
    die('ERROR: ' . $exception->getMessage());
}

?>

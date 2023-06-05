<?php
include_once("connection.php");

try {
    // Get record ID
    // isset() is a PHP function used to verify if a value is there or not
    $id = isset($_GET['id']) ? $_GET['id'] : die('ERROR: Record ID not found.');

    // Delete query
    $query = "DELETE FROM users WHERE id = ?";
    $stmt = $mysqli->prepare($query);
    $stmt->bind_param('i', $id); // Assuming 'id' is an integer, use 's' for string

    if ($stmt->execute()) {
        // Return success JSON response
        echo json_encode(array('result' => 'success'));
    } else {
        // Return fail JSON response
        echo json_encode(array('result' => 'fail'));
    }
} catch (PDOException $exception) {
    // Return error JSON response
    echo json_encode(array('result' => 'error', 'message' => $exception->getMessage()));
}
?>

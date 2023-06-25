<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$database = "brief_6";

// Get the user ID from the request
$id = $_GET['id'];

// Create a new MySQLi instance
$conn = new mysqli($servername, $username, $password, $database);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare and execute the SQL query to retrieve user data by ID
$sql = "SELECT * FROM users WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

// Fetch the user data as an associative array
$user = $result->fetch_assoc();

// Close the prepared statement and database connection
$stmt->close();
$conn->close();

// Return the user data as JSON response
header('Content-Type: application/json');
echo json_encode($user);
?>


<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$host = 'localhost';
$dbname = 'breaf-6';
$username = 'root';
$password = '';

// Create a new MySQLi instance
$mysqli = new mysqli($host, $username, $password, $dbname);

// Check if the connection was successful
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: " . $mysqli->connect_error;
    exit();
}

// Get the updated user data from the request body
$data = json_decode(file_get_contents('php://input'), true);

// Extract the individual fields from the data
$id =$_GET['id'];
$name = $mysqli->real_escape_string($data['name']);
$email = $mysqli->real_escape_string($data['email']);
$age = $mysqli->real_escape_string($data['age']);
$address = $mysqli->real_escape_string($data['address']);
$mobile = $mysqli->real_escape_string($data['mobile']);
$password = $mysqli->real_escape_string($data['password']);

// Update the user data in the database
$query = "UPDATE users SET name = '$name', email = '$email', age = '$age', address = '$address', mobile = '$mobile', password = '$password' WHERE id = '$id'";

if ($mysqli->query($query) === true) {
    // Return a success message or status code if needed
    echo "User data updated successfully";
} else {
    // Return an error message or status code if needed
    echo "Failed to update user data: " . $mysqli->error;
}

// Close the connection
$mysqli->close();
?>

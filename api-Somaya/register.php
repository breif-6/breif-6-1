<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$data = json_decode(file_get_contents("php://input"));

$name = $data->name;
$email = $data->email;
$password = $data->password;

$conn = mysqli_connect('localhost', 'root', '');
mysqli_select_db($conn, "breaf-6");

$sql = "INSERT INTO users (name, email, password) 
        VALUES ('$name', '$email', '$password')";

$result = mysqli_query($conn, $sql);

if ($result) {
  $response['data'] = array('status' => 'valid');
} else {
  $response['data'] = array('status' => 'invalid');
}

echo json_encode($response);
?>

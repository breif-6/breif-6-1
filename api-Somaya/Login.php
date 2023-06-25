<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$conn = mysqli_connect('localhost', 'root', '', 'breaf-6', 3306);
if (!$conn) {
  die("Database connection failed: " . mysqli_connect_error());
}

$data = json_decode(file_get_contents("php://input"));

$email = $data->email;
$password = $data->password;

$stmt = mysqli_prepare($conn, "SELECT * FROM users WHERE email=? AND password=?");
mysqli_stmt_bind_param($stmt, 'ss', $email, $password);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

$nums = mysqli_num_rows($result);
$rs = mysqli_fetch_assoc($result);


if ($nums >= 1) {
    $status = 200;
  } else {
    $status = 202;
  }


  $response = array(
    "user" => $rs,
    "Status" => "200"
  );

  echo json_encode($response);

 

?>

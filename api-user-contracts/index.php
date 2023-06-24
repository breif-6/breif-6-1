<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
    case "GET":
        $sql = "SELECT * FROM user_contracts";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($path[3]) && is_numeric($path[3])) {
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $user_contracts = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $user_contracts = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode($user_contracts);
        break;

    case "POST":
        $user = json_decode( file_get_contents('php://input') );
        $sql = "INSERT INTO user_contracts (id, contract_id, user_id, employee_id, status, signing_date, expiration_date)
        VALUES (null, :contract_id, :user_id, :employee_id, 'new', current_timestamp(), DATE_ADD(current_timestamp(), INTERVAL 1 YEAR))";        $stmt = $conn->prepare($sql);
        $total_cost  = date('Y-m-d');
        $stmt->bindParam(':contract_id', $user->contract_id);
        $stmt->bindParam(':user_id', $user->user_id);
        $stmt->bindParam(':employee_id', $user->employee_id);



        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        echo json_encode($response);
        break;

}
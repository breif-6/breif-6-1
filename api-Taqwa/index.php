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
        $sql = "SELECT * FROM contracts";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($path[3]) && is_numeric($path[3])) {
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $contracts = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $contracts = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode($contracts);
        break;

    case "POST":
        $user = json_decode( file_get_contents('php://input') );
        $sql = "INSERT INTO contracts(id, contract_name, signing_date, expiration_date, total_cost, employee_id ) VALUES(null, :contract_name, :signing_date, :expiration_date, :total_cost, :employee_id )";
        $stmt = $conn->prepare($sql);
        $total_cost  = date('Y-m-d');
        $stmt->bindParam(':contract_name', $user->contract_name);
        $stmt->bindParam(':signing_date', $user->signing_date);
        $stmt->bindParam(':expiration_date', $user->expiration_date);
        $stmt->bindParam(':total_cost ', $total_cost );
        $stmt->bindParam(':employee_id ', $employee_id );


        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        echo json_encode($response);
        break;

    // case "PUT":
    //     $user = json_decode( file_get_contents('php://input') );
    //     $sql = "UPDATE contracts SET contract_name= :contract_name, signing_date =:signing_date, expiration_date =:expiration_date, total_cost =:total_cost WHERE id = :id";
    //     $stmt = $conn->prepare($sql);
    //     $total_cost = date('Y-m-d');
    //     $stmt->bindParam(':id', $user->id);
    //     $stmt->bindParam(':contract_name', $user->contract_name);
    //     $stmt->bindParam(':signing_date', $user->signing_date);
    //     $stmt->bindParam(':expiration_date', $user->expiration_date);
    //     $stmt->bindParam(':total_cost', $total_cost);

    //     if($stmt->execute()) {
    //         $response = ['status' => 1, 'message' => 'contract updated successfully.'];
    //     } else {
    //         $response = ['status' => 0, 'message' => 'Failed to update contract.'];
    //     }
    //     echo json_encode($response);
    //     break;

    case "DELETE":
        $sql = "DELETE FROM contracts WHERE id = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[3]);

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'contract deleted successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'contract to delete record.'];
        }
        echo json_encode($response);
        break;
}
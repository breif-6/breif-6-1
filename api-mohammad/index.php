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
switch ($method) {
    case "GET":
        $sqlContracts = "
        SELECT uc.id, uc.employee_id, uc.status, uc.signing_date, uc.expiration_date, c.contract_name , u.name AS user_name, u.email,u.id As user_id, e.name AS employee_name , e.id AS employee_id_e
        FROM user_contracts uc
        JOIN contracts c ON uc.contract_id = c.id
        JOIN users u ON uc.user_id = u.id
        JOIN employees e ON uc.employee_id = e.id
    ";
    $sqlEmployees = "
    SELECT e.id AS employee_id, e.name AS employee_name
    FROM employees e
";

$path = explode('/', $_SERVER['REQUEST_URI']);
if (isset($path[3]) && is_numeric($path[3])) {
    $sqlContracts .= " WHERE c.id = :id";
    $stmtContracts = $conn->prepare($sqlContracts);
    $stmtContracts->bindParam(':id', $path[3]);
    $stmtContracts->execute();
    $contract = $stmtContracts->fetch(PDO::FETCH_ASSOC);

} else {
    $stmtContracts = $conn->prepare($sqlContracts);
    $stmtContracts->execute();
    $contracts = $stmtContracts->fetchAll(PDO::FETCH_ASSOC);
}

$stmtEmployees = $conn->prepare($sqlEmployees);
$stmtEmployees->execute();
$employees = $stmtEmployees->fetchAll(PDO::FETCH_ASSOC);

// Combine the contracts and employees data
$result = [
    'contracts' => $contracts,
    'employees' => $employees
];

echo json_encode($result);
break;
        case "PUT":
            $contract = json_decode(file_get_contents('php://input'));
    
            $sql = "SELECT * FROM user_contracts WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $contract->id);
    
            if ($stmt->execute()) {
                $employeeId = $contract->employee_id; // Fetch the employee ID directly from the object
    
                $sqlUpdateStatus = "UPDATE user_contracts SET status = :status, employee_id = :employee_id WHERE id = :id";
                $stmtUpdateStatus = $conn->prepare($sqlUpdateStatus);
                $stmtUpdateStatus->bindParam(':id', $contract->id);
                $stmtUpdateStatus->bindParam(':status', $contract->status);
                $stmtUpdateStatus->bindParam(':employee_id', $employeeId);
                $stmtUpdateStatus->execute();
    
                $response = ['status' => 1, 'message' => 'Record updated successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Contract not found.'];
            }
    
            echo json_encode($response);
            break;
        
        
        

    case "DELETE":
        $contract = json_decode(file_get_contents('php://input'));
        $sql = "SELECT * FROM contracts WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $contract->id);

        if ($stmt->execute()) {
            // Update the status of the deleted contract to "close" in the user_contracts table
            $sqlUpdateStatus = "UPDATE user_contracts SET status = 'close', expiration_date = CURRENT_TIMESTAMP WHERE id = :id";
            $stmtUpdateStatus = $conn->prepare($sqlUpdateStatus);
            $stmtUpdateStatus->bindParam(':id', $contract->id);
            $stmtUpdateStatus->execute();

            $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to delete record.'];
        }
        echo json_encode($response);
        break;
}
?>

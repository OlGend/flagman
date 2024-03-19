<?php
// Указываем заголовки
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length");
header("Content-Type: application/json; charset=UTF-8");

// Подключаем файлы для работы с БД и объектом User
include_once '../config/database.php';
include_once '../objects/users.php';

// Получаем подключение к базе данных
$database = new Database();
$db = $database->getConnection();

// Создаем объект пользователя
$product = new Product($db);

// Получаем данные из тела запроса
$data = json_decode(file_get_contents("php://input"));

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}


if (!empty($data->id) && !empty($data->paymentDetails)) {
    // Устанавливаем значения свойств пользователя
    $product->id = $data->id; // Это присвоение теперь необязательно, так как мы будем передавать ID как параметр
    $paymentDetails = $data->paymentDetails;

    // Обновляем статус оплаты и историю платежей
    if ($product->updatePaymentStatusAndHistory($data->id, $paymentDetails)) {
        // Устанавливаем код ответа - 200 OK
        http_response_code(200);
        echo json_encode(array("message" => "Payment status and history were successfully updated."));
    } else {
        // Устанавливаем код ответа - 503 Service Unavailable
        http_response_code(503);
        echo json_encode(array("message" => "Unable to update payment status and history."));
    }
} else {
    // Устанавливаем код ответа - 400 Bad Request
    http_response_code(400);
    echo json_encode(array("message" => "Data is incomplete."));
}
?>

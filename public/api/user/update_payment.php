<?php
// HTTP-заголовки для поддержки JSON и метода PATCH
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: PATCH");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Подключаем файл для работы с БД и объектом Product
include_once "../config/database.php";
include_once "../objects/users.php";

// Получаем соединение с базой данных
$database = new Database();
$db = $database->getConnection();

// Подготавливаем объект Product
$product = new Product($db);

// Получаем данные из тела запроса
$data = json_decode(file_get_contents("php://input"));

// Устанавливаем ID свойства продукта для обновления
$product->id = $data->id;

// Пытаемся обновить статус оплаты и баланс
if ($product->update_payment($data->id, $data->status_payment, $data->sumMinus)) {
    // Код ответа - 200 OK
    http_response_code(200);
    // Сообщаем пользователю
    echo json_encode(["message" => "Статус оплаты и баланс успешно обновлены."]);
} else {
    // Код ответа - 503 Сервис не доступен
    http_response_code(503);
    // Сообщаем пользователю
    echo json_encode(["message" => "Невозможно обновить пользователя."]);
}
?>



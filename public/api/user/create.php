<?php

// Если это запрос OPTIONS, отправляем пустой ответ и завершаем выполнение
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    header('Access-Control-Max-Age: 3600');
    http_response_code(200);
    exit;
}

// необходимые HTTP-заголовки
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// получаем соединение с базой данных
include_once "../config/database.php";

// создание объекта товара
include_once "../objects/users.php";
$database = new Database();
$db = $database->getConnection();
$product = new Product($db);

// получаем отправленные данные
$data = json_decode(file_get_contents("php://input"));

// var_dump($data);

// убеждаемся, что данные не пусты
if (
    !empty($data->login) &&
    !empty($data->id) 
) {
    // устанавливаем значения свойств товара
    $product->login = $data->login;
    $product->id = $data->id;
    $product->VIP = $data->VIP;
    $product->balance = $data->balance;
    $product->country = $data->country;
    $product->input = $data->input;
    $product->password = $data->password;
    $product->tickets = $data->tickets;
    $product->winbalance = $data->winbalance;
    $product->customer = $data->customer;
 

    // var_dump($product->login, $product->id, $product->VIP, $product->balance, $product->country, $product->input, $product->password, $product->tickets, $product->winbalance, $product->customer);

    // создание товара
    try {
        if ($product->create()) {
            // установим код ответа - 201 создано
            http_response_code(201);

            // сообщим пользователю
            echo json_encode(array("message" => "Товар был создан."), JSON_UNESCAPED_UNICODE);
        } else {
            // Получаем информацию об ошибке
            $errorInfo = $product->getErrorInfo();

            // Выводим информацию об ошибке
            echo json_encode(array("message" => "Невозможно создать товар. " . $errorInfo[2]), JSON_UNESCAPED_UNICODE);
            var_dump($product->getErrorInfo());
        }
    } catch (Exception $e) {
        // Обработка и логирование исключений
        http_response_code(500);
        echo json_encode(array("message" => "Internal Server Error."), JSON_UNESCAPED_UNICODE);

        // Логирование ошибки
        error_log("Exception: " . $e->getMessage());
    }
} else {
    // установим код ответа - 400 неверный запрос
    http_response_code(400);

    // сообщим пользователю
    echo json_encode(array("message" => "Невозможно создать товар. Данные неполные."), JSON_UNESCAPED_UNICODE);
}

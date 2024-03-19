<?php

// HTTP-заголовки для поддержки CORS и указания типа контента
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Подключаем файлы для работы с базой данных и объектом UserExcel
include_once "../config/database.php";
include_once "../objects/users_excel.php";

// Получаем соединение с базой данных
$database = new Database();
$db = $database->getConnection();

// Создаем объект UserExcel
$user = new UserExcel($db);

// Получаем данные, отправленные методом POST
$data = json_decode(file_get_contents("php://input"));

// Устанавливаем свойства объекта UserExcel из полученных данных
$user->id = $data->id;
$user->login = $data->login;
$user->email = $data->email;
$user->country = $data->country;
$user->hard_bounced = $data->hard_bounced;
$user->input = $data->input;
$user->password = $data->password;
$user->customer = $data->customer;
$user->verification_status = $data->verification_status;
$user->sent_status = $data->sent_status;
$user->color = $data->color;
$user->update_date = $data->update_date;
$user->VIP = $data->VIP;
$user->balance = $data->balance;
$user->tickets = $data->tickets;
$user->winbalance = $data->winbalance;

// Пытаемся создать пользователя
if($user->create()) {
    // Устанавливаем код ответа - 201 создано

    http_response_code(201);
    echo json_encode(array("message" => "Пользователь был создан."));
} else {
    // Если не удается создать пользователя, сообщаем об ошибке
    http_response_code(503); // Сервис недоступен
    echo json_encode(array("message" => "Невозможно создать пользователя."));
}

?>

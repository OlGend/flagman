<?php

// HTTP-заголовки
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// подключаем файл для работы с БД и объектом UserExcel
include_once "../config/database.php";
include_once "../objects/users_excel.php";

// получаем соединение с базой данных
$database = new Database();
$db = $database->getConnection();

// Создание нового объекта UserExcel
$user = new UserExcel($db);

// Получаем сырые данные из тела запроса
$data = json_decode(file_get_contents("php://input"));

// Установка значений свойств объекта из полученных данных
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

// Вызов метода update() для обновления данных пользователя
if ($user->update()) {
    echo json_encode(array("message" => "Данные пользователя успешно обновлены."));
} else {
    echo json_encode(array("message" => "Не удалось обновить данные пользователя."));
}

?>

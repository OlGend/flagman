<?php

// необходимые HTTP-заголовки
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// подключение файла для соединения с базой и файл с объектом
include_once "../config/database.php";
include_once "../objects/users_excel.php";

// получаем соединение с базой данных
$database = new Database();
$db = $database->getConnection();

// подготовка объекта пользователя
$user = new UserExcel($db); // Предполагаем, что класс называется UserExcel

// установим свойство ID или email записи для чтения
$user->id = isset($_GET["id"]) ? $_GET["id"] : null;
$user->email = isset($_GET["email"]) ? $_GET["email"] : null;

// убедимся, что хотя бы один параметр (id или email) передан
if ($user->id === null && $user->email === null) {
    http_response_code(400); // Неверный запрос
    echo json_encode(array("message" => "Не передан id или email пользователя"));
    die();
}

// получим детали пользователя
$user->readOne();

if ($user->login != null) {
    // создание массива
    $user_arr = array(
        "login" =>  $user->login,
        "email" => $user->email, 
        "id" => $user->id,
        "country" => $user->country,
        "hard_bounced" => $user->hard_bounced,
        "input" => $user->input,
        "password" => $user->password,
        "customer" => $user->customer,
        "verification_status" => $user->verification_status,
        "sent_status" => $user->sent_status,
        "color" => $user->color,
        "update_date" => $user->update_date,
        "VIP" => $user->VIP,
        "balance" => $user->balance,
        "tickets" => $user->tickets,
        "winbalance" => $user->winbalance
    );

    // код ответа - 200 OK
    http_response_code(200);

    // вывод в формате json
    echo json_encode($user_arr);
} else {
    // код ответа - 404 Не найдено
    http_response_code(404);

    // сообщим пользователю, что пользователь не существует
    echo json_encode(array("message" => "Пользователь не существует"), JSON_UNESCAPED_UNICODE);
}
?>

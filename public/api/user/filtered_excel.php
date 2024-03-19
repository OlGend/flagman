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



// Создание объекта базы данных и инициализация соединения
$database = new Database();
$db = $database->getConnection();

// Создание объекта UserExcel
$userExcel = new UserExcel($db);

// Получение параметров из GET запроса
$params = [
    'login' => $_GET['login'] ?? null,
    'email' => $_GET['email'] ?? null,
    'id' => $_GET['id'] ?? null,
    'country' => $_GET['country'] ?? null,
    'hard_bounced' => $_GET['hard_bounced'] ?? null,
    'input' => $_GET['input'] ?? null,
    'password' => $_GET['password'] ?? null,
    'customer' => $_GET['customer'] ?? null,
    'verification_status' => $_GET['verification_status'] ?? null,
    'sent_status' => $_GET['sent_status'] ?? null,
    'color' => $_GET['color'] ?? null,
    'update_date' => $_GET['update_date'] ?? null,
    'VIP' => $_GET['VIP'] ?? null,
    'balance' => $_GET['balance'] ?? null,
    'tickets' => $_GET['tickets'] ?? null,
    'winbalance' => $_GET['winbalance'] ?? null,
];


// Вызов метода readByParameters
$stmt = $userExcel->readByParameters($params);

// Получение и вывод результатов
$users = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $users[] = $row;
}

// Установка заголовка ответа в формате JSON
header('Content-Type: application/json');
echo json_encode($users);
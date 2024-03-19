<?php
// Указываем заголовки
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Подключаем файлы для работы с БД и объектом User
include_once '../config/database.php';
include_once '../objects/users.php';

// Получаем подключение к базе данных
$database = new Database();
$db = $database->getConnection();

// Создаем объект пользователя
$product = new Product($db);

// Получаем пользователей
$statement = $product->getUsersWithStatusPayment();
$num = $statement->rowCount();

// Проверяем, найдены ли пользователи
if ($num > 0) {
    // Массив пользователей
    $users_arr = array();
    $users_arr["records"] = array();

    // Получаем содержимое таблицы
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $user_item = array(
            "id" => $id,
            "login" => $login,
            "status_payment" => $status_payment
        );

        array_push($users_arr["records"], $user_item);
    }

    // Устанавливаем код ответа - 200 OK
    http_response_code(200);

    // Выводим данные пользователей в формате JSON
    echo json_encode($users_arr);
} else {
    // Устанавливаем код ответа - 404 Not Found
    http_response_code(404);

    // Сообщаем, что пользователи не найдены
    echo json_encode(array("message" => "Users not found."));
}
?>

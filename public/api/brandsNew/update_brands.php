<?php
// HTTP-заголовки
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// подключаем файл для работы с БД и объектом Brand
include_once "../config/database.php";
include_once "../objects/brands_sheet.php";

// получаем соединение с базой данных
$database = new Database();
$db = $database->getConnection();

// подготовка объекта
$product = new BrandNew($db);

// получаем данные пользователя для обновления
$data = json_decode(file_get_contents("php://input"));

file_put_contents('php://stderr', print_r($data, TRUE));


$product->id_brand = $data->id_brand;

// устанавливаем значения свойств пользователя
$product->Tech = $data->Tech;
$product->CasinoBrand = $data->CasinoBrand;
$product->CurrentStatus = $data->CurrentStatus;
$product->Sandbox = $data->Sandbox;
$product->GEO = $data->GEO;
$product->LinkImg = $data->LinkImg;
$product->Segment2 = $data->Segment2;
$product->FirstPriority = $data->FirstPriority;
$product->Trendsetting = $data->Trendsetting;
$product->Hottest = $data->Hottest;
$product->QuickSignUp = $data->QuickSignUp;

$product->review = $data->review;
$product->categories = $data->categories;
$product->categories_value = $data->categories_value;
$product->WithdrawalLimits = $data->WithdrawalLimits;
$product->advantages = $data->advantages;
$product->DepositMethods = $data->DepositMethods;
$product->WithdrawalMethods = $data->WithdrawalMethods;
$product->RestrictedCountries = $data->RestrictedCountries;


// Обновляем данные бренда
if($product->update()){
    // Устанавливаем код ответа - 200 OK
    http_response_code(200);

    // Выводим сообщение об успешном обновлении
    echo json_encode(array("message" => "Данные бренда успешно обновлены."));
} else {
    // Если не удалось обновить данные, устанавливаем код ответа - 503 Сервис недоступен
    http_response_code(503);

    // Выводим сообщение о неудаче
    echo json_encode(array("message" => "Не удалось обновить данные бренда."));
}


?>
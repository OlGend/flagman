<?php

// необходимые HTTP-заголовки
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// подключение базы данных и файл, содержащий объекты
include_once "../config/database.php";
include_once "../objects/brands_generation.php";

// получаем соединение с базой данных
$database = new Database();
$db = $database->getConnection();

// инициализируем объект
$product = new BrandNew($db);
 
// запрашиваем товары
$stmt = $product->read();
$num = $stmt->rowCount();

// проверка, найдено ли больше 0 записей
if ($num > 0) {
    // массив товаров
    $products_arr = array();
    $products_arr["brandsNew"] = array();

    // получаем содержимое нашей таблицы
    // fetch() быстрее, чем fetchAll()
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        // извлекаем строку
        $product_item = array(
            "Tech" => $row['Tech'],
            "CasinoBrand" => $row['Casino brand'],
            "CurrentStatus" => $row['Current Status'],
            "Sandbox" => $row['Sandbox'],
            
            "GEO" => $row['GEO'],
            "LinkImg" => $row['Link img'],
            "Segment2" => $row['Segment2'],
            "FirstPriority" => $row['Первый приоритет'],
            "Trendsetting" => $row['Trendsetting'],
            "Hottest" => $row['Hottest'],
            "QuickSignUp" => $row['Quick Sign-Up'],
            "id_brand" => $row['id_brand'],
            
            "review" => $row['review'],
            "categories" => $row['categories'],
            "categoriesValue" => $row['categories_value'],
            "WithdrawalLimits" => $row['WithdrawalLimits'],
            "advantages" => $row['advantages'],
            "DepositMethods" => $row['DepositMethods'],
            "WithdrawalMethods" => $row['WithdrawalMethods'],
            "RestrictedCountries" => $row['RestrictedCountries']
        );
        array_push($products_arr["brandsNew"], $product_item);
    }
    

    // устанавливаем код ответа - 200 OK
    http_response_code(200);

    // выводим данные о товаре в формате JSON
    echo json_encode($products_arr);
}

else {
    // установим код ответа - 404 Не найдено
    http_response_code(404);

    // сообщаем пользователю, что товары не найдены
    echo json_encode(array("message" => "Товары не найдены.",$stmt), JSON_UNESCAPED_UNICODE);
}
<?php

class BrandNew
{
    // подключение к базе данных и таблице "brands"
    private $conn;
    private $table_name = "brands_generation";

    

    // свойства объекта
    public $Tech;
    public $CasinoBrand;
    public $CurrentStatus;
    public $Sandbox;
 
    public $GEO;
    public $LinkImg;
    public $Segment2;
    public $FirstPriority;
    public $Trendsetting;
    public $Hottest;
    public $QuickSignUp;
    public $IdBrand;
   
    public $id_brand;
    public $review;
    public $categories;
    public $categories_value;
    public $WithdrawalLimits;
    public $advantages;
    public $DepositMethods;
    public $WithdrawalMethods;
    public $RestrictedCountries;




    // конструктор для соединения с базой данных
    public function __construct($db)
    {
        $this->conn = $db;
    }


    function read()
    {
        // выбираем все записи из таблицы "brands"
        $query = "SELECT
            `Tech`, `Casino brand`, `Current Status`, `Sandbox`, `GEO`, `Link img`, 
            `Segment2`, `Первый приоритет`, `Trendsetting`, `Hottest`, `Quick Sign-Up`, `id_brand`, `id_brand`, `review`, `categories`, `categories_value`, `WithdrawalLimits`, `advantages`, `DepositMethods`, `WithdrawalMethods`, `RestrictedCountries`
        FROM
            " . $this->table_name;
    
        // подготовка запроса
        $stmt = $this->conn->prepare($query);
        
        // выполняем запрос
        $stmt->execute();
        return $stmt;
    }
    
  // Метод для обновления данных бренда
  public function update() {
    // Обновление общих данных для всех записей с таким же CasinoBrand

        $query = "UPDATE " . $this->table_name . "
          SET DepositMethods = :DepositMethods,
              WithdrawalMethods = :WithdrawalMethods,
              RestrictedCountries = :RestrictedCountries,
              categories = :categories
          WHERE `Casino brand` = :CasinoBrand"; // Изменено на правильное имя столбца


    $stmt = $this->conn->prepare($query);
    // Привязываем значения
    $stmt->bindParam(':DepositMethods', $this->DepositMethods);
    $stmt->bindParam(':WithdrawalMethods', $this->WithdrawalMethods);
    $stmt->bindParam(':RestrictedCountries', $this->RestrictedCountries);
    $stmt->bindParam(':categories', $this->categories);
    $stmt->bindParam(':CasinoBrand', $this->CasinoBrand);


    if(!$stmt->execute()){
        return false;
    }

    // Обновление WithdrawalLimits и advantages для конкретной записи по id_brand
    $query = "UPDATE " . $this->table_name . "
            SET WithdrawalLimits = :WithdrawalLimits,
                  advantages = :advantages
            WHERE id_brand = :id_brand"; 


    $stmt = $this->conn->prepare($query);
    // Привязываем значения
    $stmt->bindParam(':WithdrawalLimits', $this->WithdrawalLimits);
    $stmt->bindParam(':advantages', $this->advantages);
    $stmt->bindParam(':id_brand', $this->id_brand); // Использование свойства $this->id_brand


    if(!$stmt->execute()){
        error_log(print_r($stmt->errorInfo(), true)); 
        return false;
    }

    return true;
}



}


<?php

class Product
{
    // подключение к базе данных и таблице "users"
    private $conn;
    private $table_name = "users";

    // свойства объекта
    public $login;
    public $id;
    public $VIP;
    public $balance;
    public $country;
    public $input;
    public $password;
    public $tickets;
    public $winbalance;
    public $customer;
    public $status_payment;
    public $payment_history;
    public $auth;
    public $phone_number;
    
   



    // конструктор для соединения с базой данных
    public function __construct($db)
    {
        $this->conn = $db;
    }


    // метод для получения товаров
    function read()
    {
        // выбираем все записи без учета категорий
        $query = "SELECT
            p.login, p.id, p.VIP, p.balance, p.country, p.input, p.password, p.tickets, p.winbalance, p.customer
        FROM
            " . $this->table_name . " p";
        
        // подготовка запроса
        $stmt = $this->conn->prepare($query);
        
        // выполняем запрос
        $stmt->execute();
        return $stmt;
    }
    
    



    // метод для получения конкретного товара по ID
    function readOne()
    {
        // запрос для чтения одной записи (товара)
        $query = "SELECT
           p.login, p.id, p.VIP, p.balance, p.country, p.input, p.password, p.tickets, p.winbalance, p.customer, p.status_payment, p.payment_history, p.auth, p.phone_number
        FROM
            " . $this->table_name . " p
        WHERE
            p.id = ?
        LIMIT
            0,1";
    
        // подготовка запроса
        $stmt = $this->conn->prepare($query);
    
        // привязываем id товара, который будет получен
        $stmt->bindParam(1, $this->id);
    
        // выполняем запрос
        $stmt->execute();
    
        // получаем извлеченную строку
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
        // установим значения свойств объекта
        $this->login = $row["login"];
        $this->id = $row["id"];
        $this->VIP = $row["VIP"];
        $this->balance = $row["balance"];
        $this->country = $row["country"];
        $this->input = $row["input"];
        $this->password = $row["password"];
        $this->tickets = $row["tickets"];
        $this->winbalance = $row["winbalance"];
        $this->customer = $row["customer"];
         $this->status_payment = $row["status_payment"];
         $this->payment_history = $row["payment_history"];
         $this->auth = $row["auth"];
         $this->phone_number = $row["phone_number"];
    

    }

    // метод для обновления пользователя
    function update()
    {
        // запрос для обновления записи (пользователя)
        $query = "UPDATE
                " . $this->table_name . "
            SET
                tickets = :tickets,
                balance = :balance
            WHERE
                id = :id";

        // подготовка запроса
        $stmt = $this->conn->prepare($query);

        // очистка
        $this->tickets = htmlspecialchars(strip_tags($this->tickets));
        $this->balance = htmlspecialchars(strip_tags($this->balance));
        $this->id = htmlspecialchars(strip_tags($this->id));

        // привязываем значения
        $stmt->bindParam(":tickets", $this->tickets);
        $stmt->bindParam(":balance", $this->balance);
        $stmt->bindParam(":id", $this->id);

        // выполняем запрос
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

        // метод для обновления пользователя
        function update_phone()
        {
            // запрос для обновления записи (пользователя)
            $query = "UPDATE
                    " . $this->table_name . "
                SET
                    update_phone = :update_phone
                WHERE
                    id = :id";
    
            // подготовка запроса
            $stmt = $this->conn->prepare($query);
    
            // очистка
            $this->update_phone = htmlspecialchars(strip_tags($this->update_phone));
            $this->id = htmlspecialchars(strip_tags($this->id));
    
            // привязываем значения
            $stmt->bindParam(":update_phone", $this->update_phone);
            $stmt->bindParam(":id", $this->id);
    
            // выполняем запрос
            if ($stmt->execute()) {
                return true;
            }
            return false;
        }

    // Метод для обновления статуса оплаты и баланса пользователя
    function update_payment($id, $status_payment, $sumMinus) {
        // Получаем текущее значение status_payment для пользователя
        $selectQuery = "SELECT status_payment FROM " . $this->table_name . " WHERE id = :id";
        $selectStmt = $this->conn->prepare($selectQuery);
        $selectStmt->bindParam(":id", $id);
        $selectStmt->execute();
        $row = $selectStmt->fetch(PDO::FETCH_ASSOC);

        $currentStatusPayments = $row['status_payment'] ? json_decode($row['status_payment'], true) : [];

        // Добавляем новый статус в массив
        $newStatus = json_decode($status_payment, true); // Предполагается, что $status_payment уже в формате JSON

        // Добавляем новый объект к текущему массиву
        array_push($currentStatusPayments, $newStatus);

        // Преобразуем обратно в строку JSON для обновления в БД
        $newStatusPaymentsJson = json_encode($currentStatusPayments);

        // Обновляем статус оплаты и баланс для указанного пользователя
        $updateQuery = "UPDATE " . $this->table_name . "
                        SET status_payment = :newStatusPaymentsJson, balance = balance - :sumMinus
                        WHERE id = :id AND balance >= :sumMinus";
        $updateStmt = $this->conn->prepare($updateQuery);

        // Привязываем новое значение и остальные параметры
        $updateStmt->bindParam(":id", $id);
        $updateStmt->bindParam(":newStatusPaymentsJson", $newStatusPaymentsJson);
        $updateStmt->bindParam(":sumMinus", $sumMinus);

        // Выполняем запрос
        if ($updateStmt->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function updatePaymentStatusAndHistory($id, $paymentUpdate) {
        // Запрос для получения текущего значения status_payment для пользователя
        $selectQuery = "SELECT status_payment FROM users WHERE id = :id";
        $selectStmt = $this->conn->prepare($selectQuery);
        $selectStmt->bindParam(":id", $id);
        $selectStmt->execute();
        $result = $selectStmt->fetch(PDO::FETCH_ASSOC);
        $currentStatusPayments = $result['status_payment'] ? json_decode($result['status_payment'], true) : [];
    
        // Итерация по массиву статусов платежей для обновления нужного статуса
        foreach ($currentStatusPayments as &$statusPayment) {
            if ($statusPayment['timestamp'] === $paymentUpdate->timestamp) {
                $statusPayment['status'] = "Approve"; // Обновляем статус на "Approve"
                break; // Выходим из цикла после обновления нужной записи
            }
        }
    
        // Обновляем запись в базе данных с новым значением status_payment
        $updateQuery = "UPDATE users SET status_payment = :statusPayment WHERE id = :id";
        $updateStmt = $this->conn->prepare($updateQuery);
        $updateStmt->bindParam(":id", $id);
        $statusPaymentJson = json_encode($currentStatusPayments);
        $updateStmt->bindParam(":statusPayment", $statusPaymentJson);
    
        if ($updateStmt->execute()) {
            return true;
        } else {
            // Логирование ошибки, если запрос не был успешно выполнен
            error_log("Ошибка обновления статуса платежей: " . print_r($updateStmt->errorInfo(), true));
            return false;
        }
    }
    



    public function getUsersWithStatusPayment() {
        // Запрос для получения всех пользователей с не пустым и не NULL status_payment
        $query = "SELECT id, login, status_payment FROM users WHERE status_payment IS NOT NULL AND status_payment <> ''";

        // Подготовка запроса
        $stmt = $this->conn->prepare($query);

        // Выполнение запроса
        $stmt->execute();

        return $stmt;
    }



     // метод для создания нового пользователя
     function create()
     {
         // запрос для вставки записи (пользователя)
         $query = "INSERT INTO " . $this->table_name . "
                 SET
                     login = :login,
                     id = :id,
                     VIP = :VIP,
                     balance = :balance,
                     country = :country,
                     input = :input,
                     password = :password,
                     tickets = :tickets,
                     winbalance = :winbalance,
                     customer = :customer"; 

                     // Вывод SQL-запроса для отладки
        echo "SQL Query: " . $query;
 
         // подготовка запроса
         $stmt = $this->conn->prepare($query);
 
         // очистка
         $this->login = htmlspecialchars(strip_tags($this->login));
         $this->id = htmlspecialchars(strip_tags($this->id));
         $this->VIP = htmlspecialchars(strip_tags($this->VIP));
         $this->balance = htmlspecialchars(strip_tags($this->balance));
         $this->country = htmlspecialchars(strip_tags($this->country));
         $this->input = htmlspecialchars(strip_tags($this->input));
         $this->password = htmlspecialchars(strip_tags($this->password));
         $this->tickets = htmlspecialchars(strip_tags($this->tickets));
         $this->winbalance = htmlspecialchars(strip_tags($this->winbalance));
         $this->customer = htmlspecialchars(strip_tags($this->customer));
 
         // привязываем значения
         $stmt->bindParam(":login", $this->login);
         $stmt->bindParam(":id", $this->id);
         $stmt->bindParam(":VIP", $this->VIP);
         $stmt->bindParam(":balance", $this->balance);
         $stmt->bindParam(":country", $this->country);
         $stmt->bindParam(":input", $this->input);
         $stmt->bindParam(":password", $this->password);
         $stmt->bindParam(":tickets", $this->tickets);
         $stmt->bindParam(":winbalance", $this->winbalance);
         $stmt->bindParam(":customer", $this->customer);
 
         if ($stmt->execute()) {
            return array("success" => true, "message" => "Товар был создан.");
        } else {
            return array("success" => false, "message" => "Невозможно создать товар. " . $stmt->errorInfo()[2]);
        }
     }
    // метод для получения информации об ошибке
    public function getErrorInfo()
    {
        return $this->conn->errorInfo();
    }
}
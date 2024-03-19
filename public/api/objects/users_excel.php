

<?php

class UserExcel
{
    // подключение к базе данных и таблице "users"
    private $conn;
    private $table_name = "controlUsers";

    // свойства объекта
    public $login;
    public $email;
    public $id;
    public $country;
    public $hard_bounced;
    public $input;
    public $password;
    public $customer;
    public $verification_status;
    public $sent_status;
    public $color;
    public $update_date;
    public $VIP;
    public $balance;
    public $tickets;
    public $winbalance;



    


    // конструктор для соединения с базой данных
    public function __construct($db)
    {
        $this->conn = $db;
    }




    



    // метод для получения конкретного товара по ID
    function readOne()
    {
        // Изменен запрос для чтения одной записи, теперь он поддерживает поиск по id или email
        $query = "SELECT
            p.login, p.email, p.id, p.country, p.hard_bounced, p.input, p.password, p.customer, p.verification_status, p.sent_status, p.color, p.update_date, p.VIP, p.balance, p.tickets, p.winbalance
        FROM
            " . $this->table_name . " p
        WHERE
            p.id = :id OR p.email = :email
        LIMIT
            0,1";
    
        // подготовка запроса
        $stmt = $this->conn->prepare($query);
    
        // привязываем id и email пользователя, который будет получен
        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':email', $this->email);
    
        // выполняем запрос
        $stmt->execute();
    
        // получаем извлеченную строку
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
        // проверка, что строка была получена
        if ($row) {
            // установим значения свойств объекта
            $this->login = $row["login"];
            $this->email = $row["email"]; 
            $this->id = $row["id"];
            $this->country = $row["country"];
            $this->hard_bounced = $row["hard_bounced"]; 
            $this->input = $row["input"];
            $this->password = $row["password"];
            $this->customer = $row["customer"];
            $this->verification_status = $row["verification_status"]; 
            $this->sent_status = $row["sent_status"]; 
            $this->color = $row["color"]; 
            $this->update_date = $row["update_date"];
            $this->VIP = $row["VIP"];
            $this->balance = $row["balance"];
            $this->tickets = $row["tickets"];
            $this->winbalance = $row["winbalance"];
        }
    }

    // Метод для обновления данных пользователя
    public function update() {
        // SQL запрос для обновления данных пользователя
        $query = "UPDATE " . $this->table_name . "
                SET
                    login = :login,
                    email = :email,
                    country = :country,
                    hard_bounced = :hard_bounced,
                    input = :input,
                    password = :password,
                    customer = :customer,
                    verification_status = :verification_status,
                    sent_status = :sent_status,
                    color = :color,
                    update_date = :update_date,
                    VIP = :VIP,
                    balance = :balance,
                    tickets = :tickets,
                    winbalance = :winbalance
                WHERE
                    id = :id";

        // Подготовка запроса
        $stmt = $this->conn->prepare($query);

        // Привязываем значения
        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':login', $this->login);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':country', $this->country);
        $stmt->bindParam(':hard_bounced', $this->hard_bounced);
        $stmt->bindParam(':input', $this->input);
        $stmt->bindParam(':password', $this->password);
        $stmt->bindParam(':customer', $this->customer);
        $stmt->bindParam(':verification_status', $this->verification_status);
        $stmt->bindParam(':sent_status', $this->sent_status);
        $stmt->bindParam(':color', $this->color);
        $stmt->bindParam(':update_date', $this->update_date);
        $stmt->bindParam(':VIP', $this->VIP);
        $stmt->bindParam(':balance', $this->balance);
        $stmt->bindParam(':tickets', $this->tickets);
        $stmt->bindParam(':winbalance', $this->winbalance);

        // Выполняем запрос
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    public function create() {
        // SQL запрос для вставки записи с указанным id
        $query = "INSERT INTO " . $this->table_name . " 
                SET
                    id = :id,
                    login = :login,
                    email = :email,
                    country = :country,
                    hard_bounced = :hard_bounced,
                    input = :input,
                    password = :password,
                    customer = :customer,
                    verification_status = :verification_status,
                    sent_status = :sent_status,
                    color = :color,
                    update_date = :update_date,
                    VIP = :VIP,
                    balance = :balance,
                    tickets = :tickets,
                    winbalance = :winbalance";
    
        // Подготовка запроса
        $stmt = $this->conn->prepare($query);
    
        // Привязываем значения, включая id
        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':login', $this->login);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':country', $this->country);
        $stmt->bindParam(':hard_bounced', $this->hard_bounced);
        $stmt->bindParam(':input', $this->input);
        $stmt->bindParam(':password', $this->password);
        $stmt->bindParam(':customer', $this->customer);
        $stmt->bindParam(':verification_status', $this->verification_status);
        $stmt->bindParam(':sent_status', $this->sent_status);
        $stmt->bindParam(':color', $this->color);
        $stmt->bindParam(':update_date', $this->update_date);
        $stmt->bindParam(':VIP', $this->VIP);
        $stmt->bindParam(':balance', $this->balance);
        $stmt->bindParam(':tickets', $this->tickets);
        $stmt->bindParam(':winbalance', $this->winbalance);
    
        // Выполняем запрос
        if ($stmt->execute()) {
            return true;
        }
    
        return false;
    }
    

    public function readByParameters($params)
    {
        // Начальная часть SQL запроса
        $query = "SELECT * FROM " . $this->table_name;
    
        // Массив условий для WHERE части SQL запроса
        $conditions = [];
        // Массив параметров для PDOStatement
        $sqlParams = [];
    
        // Проходимся по всем параметрам
        foreach ($params as $key => $value) {
            // Добавляем условие только если параметр не пустой
            if (!empty($value)) {
                // Добавляем условие для SQL запроса
                $conditions[] = "$key = :$key";
                // Добавляем параметр для привязки значения
                $sqlParams[":$key"] = $value;
            }
        }
    
        // Если нет ни одного условия, формируем запрос так, чтобы он ничего не возвращал
        if (empty($conditions)) {
            $query .= " WHERE 1=0"; // Условие, которое всегда ложно
        } else {
            // Добавляем условия к запросу
            $query .= " WHERE " . implode(' AND ', $conditions);
        }
    
        // Подготовка запроса
        $stmt = $this->conn->prepare($query);
    
        // Привязываем значения параметров, если они есть
        foreach ($sqlParams as $param => $value) {
            $stmt->bindValue($param, $value);
        }
    
        // Выполнение запроса
        $stmt->execute();
    
        return $stmt;
    }
    

    


// метод для получения информации об ошибке
public function getErrorInfo()
{
    return $this->conn->errorInfo();
}
}
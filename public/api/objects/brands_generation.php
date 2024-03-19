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
    public $InteractionType;
    public $GEO;
    public $Localization;
    public $Shortcomings;
    public $DateOfLastChange;
    public $TypeOfDeal;
    public $CPA;
    public $RS;
    public $BL;
    public $BN;
    public $BonusType;
    public $Segment;
    public $DepositBonusPercentage;
    public $MaxBonus;
    public $FreeSpins;
    public $Wager;
    public $MinDeposit;
    public $Vta;
    public $OfferContent;
    public $OurOfferContent;
    public $AffiliateLink;
    public $Reg2Dep;
    public $GoBig;
    public $Weight;
    public $Count;
    public $LinkImg;
    public $CasinoBrand1;
    public $KeitaroGoBigID;
    public $KeitaroR2dID;
    public $Postback;
    public $Segment2;
    public $FirstPriority;
    public $Trendsetting;
    public $Hottest;
    public $QuickSignUp;
    public $IdBrand;
    public $Video;
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
            `Tech`, `Casino brand`, `Current Status`, `Sandbox`, `Interaction Type`, `GEO`, `Localization`, `Shortcomings`,
            `Date of Last Change`, `The type of a deal`, `CPA`, `RS`, `BL`, `BN`, `Bonus type`, `Segment`, `Deposit bonus, %`,
            `Max bonus`, `Free spins`, `Wager`, `Min deposit`, `В-та`, `Offer content`, `Our offer content`, `Affiliate Link`,
            `reg2dep`, `gobig`, `вес`, `count`, `Link img`, `Casino brand 1`, `keitaro gobig ID`, `keitaro r2d ID`, `postback`,
            `Segment2`, `Первый приоритет`, `Trendsetting`, `Hottest`, `Quick Sign-Up`, `id_brand`, `Video`, `id_brand`, `review`, `categories`, `categories_value`, `WithdrawalLimits`, `advantages`, `DepositMethods`, `WithdrawalMethods`, `RestrictedCountries`
        FROM
            " . $this->table_name;
    
        // подготовка запроса
        $stmt = $this->conn->prepare($query);
        
        // выполняем запрос
        $stmt->execute();
        return $stmt;
    }
    


    


}




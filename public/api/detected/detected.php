<?php

$apiKey = "332adc27e7f3ca552cbe76359f00df97e627a848a86b6b1cc659664cefffe543";

$urls = [
    "https://www.virustotal.com/api/v3/domains/link.gobig1.com",
    "https://www.virustotal.com/api/v3/domains/link.reg2dep1.com",
];

$curlHandles = [];
$responses = [];

$multiCurl = curl_multi_init();

foreach ($urls as $url) {
    $curlHandles[$url] = curl_init();

    curl_setopt_array($curlHandles[$url], [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => [
            "accept: application/json",
            "x-apikey: $apiKey"
        ],
    ]);

    curl_multi_add_handle($multiCurl, $curlHandles[$url]);
}

// Выполнить все запросы параллельно
do {
    curl_multi_exec($multiCurl, $running);
} while ($running > 0);

// Получить результаты запросов
foreach ($urls as $url) {
    $responses[$url] = curl_multi_getcontent($curlHandles[$url]);

    // Обработайте ответ, как в вашем предыдущем коде
    $data = json_decode($responses[$url], true);

    if ($data && isset($data['data']['attributes']['last_analysis_stats'])) {
        $lastAnalysisStats = $data['data']['attributes']['last_analysis_stats'];

        if ($lastAnalysisStats['malicious'] > 0 || $lastAnalysisStats['suspicious'] > 0) {
            // Отправить сообщение
            $message = "!ATTENTION! OUR SITE ($url) HAS A PROBLEM!\n";
            $message .= "Last Analysis Stats:\n";
            $message .= "Harmless: " . $lastAnalysisStats['harmless'] . "\n";
            $message .= "Malicious: " . $lastAnalysisStats['malicious'] . "\n";
            $message .= "Suspicious: " . $lastAnalysisStats['suspicious'] . "\n";

            // Пример отправки сообщения по электронной почте (замените на ваш код отправки сообщения)
            mail('r91788597@gmail.com', 'Site Problem Alert', $message);

            echo $message;
        }
    }

    curl_multi_remove_handle($multiCurl, $curlHandles[$url]);
    curl_close($curlHandles[$url]);
}

curl_multi_close($multiCurl);

?>


CREATE TABLE controlUsers (
    login VARCHAR(100) NOT NULL,
    id VARCHAR(100) NOT NULL PRIMARY KEY,
    VIP VARCHAR(25) NOT NULL,
    balance DECIMAL(6,2) NULL,
    country VARCHAR(25) NOT NULL,
    input VARCHAR(100) NOT NULL,
    password VARCHAR(25) NOT NULL,
    tickets VARCHAR(3) NULL,
    winbalance VARCHAR(4) NOT NULL,
    customer VARCHAR(15) NOT NULL
);

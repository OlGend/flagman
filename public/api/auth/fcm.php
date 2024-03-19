<?php
$project_id = 'your_project_id';
$url = 'https://fcm.googleapis.com/v1/projects/' . $project_id . '/messages:send';
$token = 'your_access_token'; // Токен, полученный через OAuth 2.0

$headers = [
    'Authorization: Bearer ' . $token,
    'Content-Type: application/json'
];

$message = [
    'message' => [
        'token' => $deviceToken,
        'notification' => [
            'title' => 'Заголовок уведомления',
            'body' => 'Текст уведомления'
        ]
    ]
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($message));
$response = curl_exec($ch);
curl_close($ch);

echo $response;

<?php
$host = 'localhost'; // Адрес сервера MySQL
$dbname = 'crud'; // Название вашей базы данных
$username = 'root'; // Имя пользователя MySQL
$password = ''; // Пароль MySQL

try {
    // Создаем экземпляр PDO для работы с базой данных
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Устанавливаем заголовок для всех ответов в формате JSON
    header('Content-Type: application/json');
} catch (PDOException $e) {
    // Если произошла ошибка подключения, отправляем её в формате JSON
    die(json_encode([
        'status' => 'error',
        'message' => 'Не удалось подключиться к базе данных: ' . $e->getMessage()
    ]));
}

// Функция для отправки успешного JSON-ответа
function sendSuccessResponse($data = []) {
    echo json_encode([
        'status' => 'success',
        'data' => $data
    ]);
    exit;
}

// Функция для отправки ошибочного JSON-ответа
function sendErrorResponse($message) {
    echo json_encode([
        'status' => 'error',
        'message' => $message
    ]);
    exit;
}
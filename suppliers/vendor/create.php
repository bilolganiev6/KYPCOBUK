<?php

require_once '../config/connect.php';
// Путь к JSON файлу
$json_file = '../data/data.json';

// Проверяем существование файла
if (!file_exists($json_file)) {
    die('JSON файл не найден.');
}

// Читаем содержимое JSON файла
$data = json_decode(file_get_contents($json_file), true);

// Проверяем корректность JSON
if (json_last_error() !== JSON_ERROR_NONE) {
    die('Ошибка при декодировании JSON: ' . json_last_error_msg());
}

// Проверяем метод запроса
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Получаем данные из формы
    $name = htmlspecialchars($_POST['name']);
    $inn = htmlspecialchars($_POST['inn']);
    $number = htmlspecialchars($_POST['number']);

    // Генерируем новый ID
    $new_id = isset($data['postavshiki']) && is_array($data['postavshiki']) ? count($data['postavshiki']) + 1 : 1;

    // Добавляем нового поставщика
    $new_supplier = [
        'id' => $new_id,
        'name' => $name,
        'inn' => $inn,
        'number' => $number
    ];

    if (!isset($data['postavshiki'])) {
        $data['postavshiki'] = [];
    }

    $data['postavshiki'][] = $new_supplier;

    // Записываем данные обратно в JSON файл
    file_put_contents($json_file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

    echo 'Новый поставщик успешно добавлен!';
    header('Location: /suppliers/admin.php');
    exit;
}
?>

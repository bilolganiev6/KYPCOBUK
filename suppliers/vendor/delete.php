<?php
// Подключение к базе данных
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

// Проверяем, указан ли ID
if (!isset($_GET['id'])) {
    die('ID не указан.');
}

$id = intval($_GET['id']);

// Удаляем запись из JSON
if (isset($data['postavshiki']) && is_array($data['postavshiki'])) {
    $data['postavshiki'] = array_filter($data['postavshiki'], function ($supplier) use ($id) {
        return isset($supplier['id']) && $supplier['id'] != $id;
    });

    // Перезаписываем индексы массива
    $data['postavshiki'] = array_values($data['postavshiki']);
}

// Перенумеруем IDs в JSON
foreach ($data['postavshiki'] as $index => &$supplier) {
    $supplier['id'] = $index + 1; // Новый ID = индекс + 1
}
unset($supplier); // Очищаем ссылку

// Записываем данные обратно в JSON файл
$result = file_put_contents($json_file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
if ($result === false) {
    die('Ошибка записи в JSON файл.');
}

// Удаляем запись из MySQL
$query = "DELETE FROM `postavshiki` WHERE `id`='$id'";
if (!mysqli_query($connect, $query)) {
    die('Ошибка при удалении из MySQL: ' . mysqli_error($connect));
}

// Перенумеруем IDs в MySQL
$query = "SET @count = 0;";
mysqli_query($connect, $query);

$query = "UPDATE `postavshiki` SET `id` = @count:=@count+1;";
if (!mysqli_query($connect, $query)) {
    die('Ошибка при перенумерации IDs: ' . mysqli_error($connect));
}

$query = "ALTER TABLE `postavshiki` AUTO_INCREMENT = 1;";
if (!mysqli_query($connect, $query)) {
    die('Ошибка при очистке AUTO_INCREMENT: ' . mysqli_error($connect));
}

echo 'Поставщик успешно удален, и IDs перенумерованы!';
header('Location: /suppliers/admin.php');
exit;
?>
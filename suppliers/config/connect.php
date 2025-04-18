<?php
// Подключение к базе данных
$host = 'localhost'; // Хост (обычно localhost)
$user = 'root';      // Имя пользователя MySQL
$password = '';      // Пароль MySQL (если есть)
$db_name = 'crud'; // Название вашей базы данных

$connect = mysqli_connect($host, $user, $password, $db_name);

if (!$connect) {
    die('Ошибка подключения: ' . mysqli_connect_error());
}

// Путь к JSON файлу
$json_file = __DIR__ . '/../data/data.json';

// Проверяем существование файла
if (!file_exists($json_file)) {
    die('JSON файл не найден.');
}

// Читаем содержимое JSON файла
$data = json_decode(file_get_contents($json_file), true);

// Проверяем, существует ли массив postavshiki
if (!isset($data['postavshiki']) || !is_array($data['postavshiki'])) {
    die('Некорректный формат JSON файла.');
}

// Цикл по массиву postavshiki
foreach ($data['postavshiki'] as $postavshik) {
    $id = intval($postavshik['id']);
    $name = mysqli_real_escape_string($connect, $postavshik['name']);
    $inn = mysqli_real_escape_string($connect, $postavshik['inn']);
    $number = mysqli_real_escape_string($connect, $postavshik['number']);

    // Вставка данных в таблицу
    $query = "INSERT INTO `postavshiki` (`id`, `name`, `inn`, `number`) VALUES ('$id', '$name', '$inn', '$number') 
              ON DUPLICATE KEY UPDATE `name`='$name', `inn`='$inn', `number`='$number'";
    mysqli_query($connect, $query);
}

?>
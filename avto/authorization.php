<?php
session_start();
include("db_connect.php");

// Проверяем, были ли отправлены данные через POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Получаем данные из формы
    $login = trim($_POST['login'] ?? '');
    $password = trim($_POST['password'] ?? '');

    // Проверяем, что поля не пустые
    if (empty($login) || empty($password)) {
        echo("Ошибка: Пожалуйста, заполните все поля.");
        exit(); // Прекращаем выполнение скрипта
    }

    // Хешируем пароль
    $md5_password = md5($password);

    // Проверка на конкретные значения логина и пароля для администратора
    if ($login === 'admin' && $password === '1234') {
        $_SESSION['user'] = ['nick' => $login];
        header("Location: /admin.html");
        exit(); // Завершаем выполнение после редиректа
    }

    // Проверка в базе данных
    $query = mysqli_query($db, "SELECT * FROM `users` WHERE `login`='{$login}' AND `password`='{$md5_password}'");
    if (mysqli_num_rows($query) == 1) {
        $_SESSION['user'] = ['nick' => $login];
        header("Location: /user.html");
        exit(); // Завершаем выполнение после редиректа
    } else {
        echo("Ошибка: Данный логин или пароль неправильны.");
    }
}
?>
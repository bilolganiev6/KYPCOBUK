<?php
session_start();
include("/crud/config/connect.php");

$login = $_POST['login'];
$password = $_POST['password'];
$md5_password = md5($password);

// Проверка на конкретные значения логина и пароля
if ($login === 'qwe1' && $password === '12345') {
    $_SESSION['user'] = ['nick' => $login];
    header("Location: /admin.html");
    exit(); // Не забудьте завершить выполнение скрипта после редиректа
}

$query = mysqli_query($db, "SELECT * FROM `users` WHERE `login`='{$login}' AND `password`='{$md5_password}'");
if (mysqli_num_rows($query) == 1) {
    $_SESSION['user'] = ['nick' => $login];
    header("Location: /user.html");
    exit(); // Не забудьте завершить выполнение скрипта после редиректа
} else {
    echo("Ошибка: Данный логин или пароль неправильны.");
}
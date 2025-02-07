<?php

//Обновление информации о продукте

/*
 * Подключаем файл для получения соединения к базе данных (PhpMyAdmin, MySQL)
 */

require_once '/crud/config/connect.php';

/*
 * Создаем переменные со значениями, которые были получены с $_POST
 */

$id = $_POST['id'];
$name = $_POST['name'];
$description = $_POST['description'];
$number = $_POST['number'];


/*
 * Делаем запрос на изменение строки в таблице postavshiki
 */

mysqli_query($connect, "UPDATE `postavshiki` SET `name` = '$name', `number` = '$number', `description` = '$description' WHERE `postavshiki`.`id` = '$id'");

/*
 * Переадресация на главную страницу
 */

header('Location: /');
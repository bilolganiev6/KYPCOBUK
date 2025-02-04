<?php

//Добавление нового продукта


/*
 * Подключаем файл для получения соединения к базе данных (PhpMyAdmin, MySQL)
 */

require_once '../config/connect.php';

/*
 * Создаем переменные со значениями, которые были получены с $_POST
 */

$name = $_POST['name'];
$description = $_POST['description'];
$number = $_POST['number'];

/*
 * Делаем запрос на добавление новой строки в таблицу postavshiki
 */

mysqli_query($connect,"INSERT INTO `postavshiki` (`id`, `name`, `number`, `description`) VALUES (NULL, '$name', '$number', '$description')");

/*
 * Переадресация на главную страницу
 */

header('Location: /');
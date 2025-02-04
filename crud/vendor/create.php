<?php

//Добавление нового продукта


/*
 * Подключаем файл для получения соединения к базе данных (PhpMyAdmin, MySQL)
 */

require_once '../config/connect.php';

/*
 * Создаем переменные со значениями, которые были получены с $_POST
 */

$title = $_POST['title'];
$description = $_POST['description'];
$price = $_POST['price'];
$ed = $_POST['ed'];

/*
 * Делаем запрос на добавление новой строки в таблицу products
 */

mysqli_query($connect,"INSERT INTO `products` (`id`, `title`, `price`, `description`,`ed`) VALUES (NULL, '$title', '$price', '$description', '$ed')");

/*
 * Переадресация на главную страницу
 */

header('Location: /');
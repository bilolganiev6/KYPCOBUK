<?php

//Удаление продукта

/*
 * Подключаем файл для получения соединения к базе данных (PhpMyAdmin, MySQL)
 */

require_once '/crud/config/connect.php';

/*
 * Получаем ID продукта из адресной строки
 */

$id = $_GET['id'];

/*
 * Делаем запрос на удаление строки из таблицы postavshiki
 */

mysqli_query($connect, "DELETE FROM `postavshiki` WHERE `postavshiki`.`id` = '$id'");

/*
 * Переадресация на главную страницу
 */

header('Location: /');
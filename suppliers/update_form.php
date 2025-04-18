<?php
require_once 'config/connect.php';

if (!isset($_GET['id'])) {
    die('ID не указан.');
}

$id = intval($_GET['id']);
$product = mysqli_fetch_assoc(mysqli_query($connect, "SELECT * FROM `postavshiki` WHERE `id`='$id'"));

if (!$product) {
    die('Запись не найдена.');
}
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Обновить поставщика</title>
</head>
<body>
    <h1>Обновить поставщика</h1>
    <form action="vendor/update.php" method="post">
     <input type="hidden" name="id" value="<?= htmlspecialchars($product['id']) ?>">
    <p>ФИО</p>
        <input type="text" name="name" value="<?= htmlspecialchars($product['name']) ?>" required>
    <p>ИНН</p>
        <input type="number" name="inn" value="<?= htmlspecialchars($product['inn']) ?>" required>
    <p>Номер</p>
        <input type="number" name="number" value="<?= htmlspecialchars($product['number']) ?>" required>
    <button type="submit">Обновить</button>
</body>
</html>
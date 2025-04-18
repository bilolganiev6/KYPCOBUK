<?php
// admin.php
require_once 'config/connect.php';
// Путь к JSON файлу
$json_file = 'data/data.json';

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
?>
<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Поставщики</title>
    <style>
        body {
        font-family: Arial, sans-serif;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 0;
        padding: 20px;
        background-color: #f9f9f9;
        }
        h1 {
        margin-bottom: 20px;
        color: #333;
        }
        .table {
        width: 70%; /* Уменьшили ширину таблицы */
        border: none;
        margin-bottom: 20px;
        background: #fff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .table thead th {
        font-weight: bold;
        text-align: left;
        border: none;
        padding: 12px 15px;
        background: #606060;
        color: #fff;
        font-size: 14px;
        }
        .table thead tr th:first-child {
        border-radius: 8px 0 0 0;
        }
        .table thead tr th:last-child {
        border-radius: 0 8px 0 0;
        }
        .table tbody td {
        text-align: left;
        border: none;
        padding: 10px 15px;
        font-size: 14px;
        vertical-align: top;
        }
        .table tbody tr:nth-child(even) {
        background: #f3f3f3;
        }
        .table tbody tr td:first-child {
        border-radius: 0 0 0 8px;
        }
        .table tbody tr td:last-child {
        border-radius: 0 0 8px 0;
        }
        .back-button {
        display: inline-block;
        margin-top: 20px;
        padding: 10px 20px;
        background-color: #606060;
        color: #fff;
        text-decoration: none;
        border-radius: 5px;
        font-size: 14px;
        }
        .back-button:hover {
        background-color: #808080;
        }
</style>
</head>
<body>
    <h1>Поставщики</h1>
    <table class="table">
        <thead>
            <tr>
                <th>ID</th>
                <th>ФИО</th>
                <th>ИНН</th>
                <th>Номер</th>
                <th>Действия</th>
            </tr>
        </thead>
        <tbody>
            <?php
            // Делаем выборку всех строк из таблицы "postavshiki"
            $products = mysqli_query($connect, "SELECT * FROM `postavshiki`");
            $products = mysqli_fetch_all($products, MYSQLI_ASSOC);

            foreach ($products as $product) {
                ?>
                    <tr>
                        <td><?= htmlspecialchars($product['id']) ?></td>
                        <td><?= htmlspecialchars($product['name']) ?></td>
                        <td><?= htmlspecialchars($product['inn']) ?></td>
                        <td><?= htmlspecialchars($product['number']) ?></td>
                        <td>
                            <a href="update_form.php?id=<?= htmlspecialchars($product['id']) ?>">Update</a>
                            <a style="color: red;" href="vendor/delete.php?id=<?= htmlspecialchars($product['id']) ?>" onclick="return confirm('Вы уверены?')">Delete</a>
                        </td>
                    </tr>
                <?php
            }
            ?>
        </tbody>
    </table>

    <!-- Кнопка "Добавить поставщика" -->
    <h3>Добавить Поставщика</h3>
    <form action="vendor/create.php" method="post">
        <p>ФИО</p>
        <input type="text" name="name" required>
        <p>ИНН</p>
        <input type="number" name="inn" required>
        <p>Номер</p>
        <input type="number" name="number" required>
        <button type="submit">Добавить</button>
    </form>
</body>
</html>
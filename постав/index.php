<?php

/*
 * Подключаем файл для получения соединения к базе данных (PhpMyAdmin, MySQL)
 */

require_once '/crud/config/connect.php';

?>

<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Товары</title>
</head>
<style>
    th, td {
        padding: 10px;
    }

    th {
        background: #606060;
        color: #fff;
    }

    td {
        background: #b5b5b5;
    }
</style>
<body>
    <table>
        <tr>
            <th>ID</th>
            <th>Наименование</th>
            <th>Кол-во</th>
            <th>Цена</th>
        </tr>

        <?php

            /*
             * Делаем выборку всех строк из таблицы "products"
             */

            $products = mysqli_query($connect, "SELECT * FROM `postavshiki`");

            /*
             * Преобразовываем полученные данные в нормальный массив
             */

            $products = mysqli_fetch_all($products);

            /*
             * Перебираем массив и рендерим HTML с данными из массива
             * Ключ 0 - id
             * Ключ 1 - title
             * Ключ 2 - price
             * Ключ 3 - description
             */

            foreach ($products as $product) {
                ?>
                    <tr>
                        <td><?= $product[0] ?></td>
                        <td><?= $product[1] ?></td>
                        <td><?= $product[2] ?></td>
                        <td><?= $product[3] ?></td>
                        <td><a href="update.php?id=<?= $product[0] ?>">Update</a></td>
                        <td><a style="color: red;" href="vendor/delete.php?id=<?= $product[0] ?>">Delete</a></td>
                    </tr>
                <?php
            }
        ?>
    </table>
    <h3>Добавить Поставщика</h3>
    <form action="vendor/create.php" method="post">
        <p>Наименование</p>
        <input type="text" name="name">
        <p>О Поставщика</p>
        <textarea name="description"></textarea>
        <p>Номер</p>
        <input type="number" name="number"> <br> <br>
        <button type="submit">Добавить 
    </form>
</body>
</html>

<?php
// Подключаем файл для получения соединения к базе данных (PhpMyAdmin, MySQL)
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

// Проверяем, существует ли массив postavshiki
if (!isset($data['postavshiki']) || !is_array($data['postavshiki'])) {
    die('Массив postavshiki отсутствует или некорректен.');
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
    <h1>Поставщики</h1> <!-- Заголовок добавлен -->
    <table class="table">
        <thead>
            <tr>
                <th>ID</th>
                <th>ФИО</th>
                <th>ИНН</th>
                <th>Номер</th>
            </tr>
        </thead>
        <tbody>
            <?php
                /*
                 * Делаем выборку всех строк из таблицы "postavshiki"
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
                        </tr>
                    <?php
                }
            ?>
        </tbody>
    </table>

    <!-- Кнопка "Назад" добавлена после таблицы -->
    <a href="javascript:history.back()" class="back-button">Назад</a>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            // Загружаем JSON-данные через fetch
            fetch('data/data.json')
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Ошибка HTTP: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Данные из JSON:', data);
                })
                .catch(error => {
                    console.error('Ошибка при загрузке JSON:', error);
                });
        });
    </script>
</body>
</html>
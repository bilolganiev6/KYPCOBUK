<?php
require '../config/connect.php';

// Установка заголовка JSON
header('Content-Type: application/json');

try {
    // Проверяем, есть ли параметр 'id' в запросе
    if (isset($_GET['id'])) {
        $id = intval($_GET['id']); // Преобразуем ID в целое число

        // Выполняем запрос для получения одного товара по ID
        $stmt = $pdo->prepare("SELECT * FROM products WHERE id = :id");
        $stmt->execute(['id' => $id]);
        $product = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($product) {
            echo json_encode($product); // Возвращаем один товар
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Товар не найден']);
        }
    } elseif (isset($_GET['query'])) {
        // Если есть параметр 'query', выполняем поиск по названию товара
        $query = trim($_GET['query']);
        $stmt = $pdo->prepare("SELECT * FROM products WHERE title LIKE :query");
        $stmt->execute(['query' => "%$query%"]);
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (empty($products)) {
            echo json_encode([]); // Возвращаем пустой массив, если ничего не найдено
        } else {
            echo json_encode($products); // Возвращаем список товаров
        }
    } else {
        // Если нет параметров, загружаем все товары
        $stmt = $pdo->query("SELECT * FROM products");
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($products); // Возвращаем список всех товаров
    }
} catch (Exception $e) {
    error_log('Error in vendor/read.php: ' . $e->getMessage()); // Записываем ошибку в лог
    echo json_encode(['status' => 'error', 'message' => 'Произошла ошибка при чтении данных']);
}
?>
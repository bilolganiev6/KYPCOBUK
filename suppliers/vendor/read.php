<?php
require '../config/connect.php';

// Установка заголовка JSON
header('Content-Type: application/json');

try {
    // Проверяем, есть ли параметр 'id' в запросе
    if (isset($_GET['id'])) {
        $id = intval($_GET['id']); // Преобразуем ID в целое число

        // Выполняем запрос для получения одного поставщика по ID
        $stmt = $pdo->prepare("SELECT * FROM postavshiki WHERE id = :id");
        $stmt->execute(['id' => $id]);
        $postavshik = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($postavshik) {
            echo json_encode($postavshik); // Возвращаем одного поставщика
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Поставщик не найден']);
        }
    } elseif (isset($_GET['query'])) {
        // Если есть параметр 'query', выполняем поиск по ФИО поставщика
        $query = trim($_GET['query']);
        $stmt = $pdo->prepare("SELECT * FROM postavshiki WHERE name LIKE :query");
        $stmt->execute(['query' => "%$query%"]);
        $postavshiki = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (empty($postavshiki)) {
            echo json_encode([]); // Возвращаем пустой массив, если ничего не найдено
        } else {
            echo json_encode($postavshiki); // Возвращаем список поставщиков
        }
    } else {
        // Если нет параметров, загружаем всех поставщиков
        $stmt = $pdo->query("SELECT * FROM postavshiki");
        $postavshiki = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($postavshiki); // Возвращаем список всех поставщиков
    }
} catch (Exception $e) {
    error_log('Error in vendor/read.php: ' . $e->getMessage()); // Записываем ошибку в лог
    echo json_encode(['status' => 'error', 'message' => 'Произошла ошибка при чтении данных']);
}
?>
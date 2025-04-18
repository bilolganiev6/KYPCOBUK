<?php
require '../config/connect.php';

// Установка заголовка JSON
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Недопустимый метод запроса']);
    exit;
}

$id = $_POST['id'] ?? null;
$title = $_POST['title'] ?? '';
$kol = $_POST['kol'] ?? 0;
$price = $_POST['price'] ?? 0;
$ed = $_POST['ed'] ?? '';

if (!$id || !$title || !$kol || !$price || !$ed) {
    echo json_encode(['status' => 'error', 'message' => 'Не все обязательные поля заполнены']);
    exit;
}

try {
    $stmt = $pdo->prepare("UPDATE products SET title = :title, kol = :kol, price = :price, ed = :ed WHERE id = :id");
    $result = $stmt->execute([
        'id' => $id,
        'title' => $title,
        'kol' => $kol,
        'price' => $price,
        'ed' => $ed
    ]);

    if ($result && $stmt->rowCount() > 0) {
        echo json_encode(['status' => 'success', 'message' => 'Товар успешно обновлен']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Товар не найден или не удалось его обновить']);
    }
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Ошибка при обновлении товара: ' . $e->getMessage()]);
}
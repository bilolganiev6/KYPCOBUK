// Глобальная функция для выполнения поиска товаров по названию
function searchProducts() {
    const query = document.getElementById('search-input').value.trim(); // Получаем значение из поля поиска
    loadProducts(query); // Вызываем функцию загрузки товаров с текущим запросом
}

// Функция для загрузки списка товаров с сервера
function loadProducts(query = '') {
    const url = query 
        ? `vendor/read.php?query=${encodeURIComponent(query)}` // Если есть запрос, добавляем его в URL
        : 'vendor/read.php'; // Если нет запроса, используем базовый URL

    console.log(`Loading products from URL: ${url}`); // Выводим URL для отладки
    fetch(url) // Выполняем HTTP-запрос к серверу
        .then(response => {
            if (!response.ok) { // Проверяем успешность ответа
                throw new Error(`Server error: ${response.status}`); // Если ответ не успешен, выбрасываем ошибку
            }
            return response.json(); // Преобразуем ответ в JSON
        })
        .then(products => {
            console.log("Received data from server:", products); // Выводим полученные данные для отладки
            if (!Array.isArray(products)) { // Проверяем, что ответ является массивом
                throw new Error('Invalid data format'); // Если нет, выбрасываем ошибку
            }

            // Выводим данные о товарах в консоль в формате JSON
            console.log("Products data in JSON format:", JSON.stringify(products, null, 2));

            renderProducts(products); // Рендерим список товаров
        })
        .catch(error => {
            console.error('Error loading products:', error); // Выводим ошибку в консоль
            alert(`Error loading products: ${error.message}`); // Показываем ошибку пользователю
        });
}

// Функция для рендеринга списка товаров в таблице
function renderProducts(products) {
    const tableBody = document.getElementById('products-table'); // Получаем элемент таблицы
    tableBody.innerHTML = ''; // Очищаем текущий контент таблицы
    
    products.forEach(product => { // Перебираем каждый товар
        const row = document.createElement('tr'); // Создаем новую строку таблицы
        row.innerHTML = `
            <td>${escapeHTML(product.id)}</td> <!-- ID товара -->
            <td>${escapeHTML(product.title)}</td> <!-- Название товара -->
            <td>${escapeHTML(product.kol)}</td> <!-- Количество товара -->
            <td>${escapeHTML(product.price)}</td> <!-- Цена товара -->
            <td>${escapeHTML(product.ed)}</td> <!-- Единица измерения товара -->
            <td>
                <button onclick="editProduct(${product.id})">Редактировать</button> <!-- Кнопка редактирования -->
                <button onclick="deleteProduct(${product.id})">Удалить</button> <!-- Кнопка удаления -->
            </td>
        `;
        tableBody.appendChild(row); // Добавляем строку в таблицу
    });
}

// Функция для экранирования HTML-символов
function escapeHTML(str) {
    return String(str).replace(/[&<>"']/g, m => ({ // Заменяем специальные символы на их HTML-сущности
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[m]));
}

// Функция для обработки формы добавления или редактирования товара
function setupForm(formId, url, successMessage) {
    const form = document.getElementById(formId); // Получаем форму по ID
    form.addEventListener('submit', async (e) => { // Добавляем обработчик события отправки формы
        e.preventDefault(); // Отменяем стандартное поведение формы
        try {
            const response = await fetch(url, { // Выполняем HTTP-запрос к серверу
                method: 'POST',
                body: new FormData(form) // Отправляем данные формы
            });
            const data = await response.json(); // Преобразуем ответ в JSON
            if (!response.ok) { // Проверяем успешность ответа
                throw new Error(data.message || 'Unknown error'); // Если ответ не успешен, выбрасываем ошибку
            }
            alert(successMessage); // Показываем успешное сообщение
            loadProducts(); // Перезагружаем список товаров
            form.reset(); // Сбрасываем форму
            document.getElementById(`${formId}`).style.display = 'none'; // Скрываем форму
        } catch (error) {
            console.error('Error submitting form:', error); // Выводим ошибку в консоль
            alert(`Error submitting form: ${error.message}`); // Показываем ошибку пользователю
        }
    });
}

// Инициализация форм добавления и редактирования товаров
setupForm('add-product-form', 'vendor/create.php', 'Товар успешно добавлен');
setupForm('edit-product-form', 'vendor/update.php', 'Товар успешно обновлен');

// Функция для редактирования товара
async function editProduct(id) {
    try {
        const response = await fetch(`vendor/read.php?id=${id}`); // Выполняем HTTP-запрос к серверу для получения данных товара
        if (!response.ok) { // Проверяем успешность ответа
            throw new Error(`Server error: ${response.status}`); // Если ответ не успешен, выбрасываем ошибку
        }
        const product = await response.json(); // Преобразуем ответ в JSON
        if (!product || typeof product !== 'object') { // Проверяем, что ответ является объектом
            throw new Error('Invalid data format'); // Если нет, выбрасываем ошибку
        }
        
        document.getElementById('edit-id').value = product.id; // Заполняем форму данными товара
        document.getElementById('edit-title').value = product.title;
        document.getElementById('edit-kol').value = product.kol;
        document.getElementById('edit-price').value = product.price;
        document.getElementById('edit-ed').value = product.ed;
        
        document.getElementById('edit-form').style.display = 'block'; // Показываем форму редактирования
    } catch (error) {
        console.error('Error editing product:', error); // Выводим ошибку в консоль
        alert(`Error editing product: ${error.message}`); // Показываем ошибку пользователю
    }
}

// Функция для удаления товара
async function deleteProduct(id) {
    if (!confirm('Вы уверены?')) return; // Подтверждение удаления товара
    try {
        const response = await fetch('vendor/delete.php', { // Выполняем HTTP-запрос к серверу для удаления товара
            method: 'POST',
            headers: {'Content-Type': 'application/json'}, // Устанавливаем заголовок для JSON
            body: JSON.stringify({id}) // Отправляем ID товара в JSON
        });
        const data = await response.json(); // Преобразуем ответ в JSON
        if (!response.ok) { // Проверяем успешность ответа
            throw new Error(data.message || 'Unknown error'); // Если ответ не успешен, выбрасываем ошибку
        }
        alert('Товар удалён'); // Показываем успешное сообщение
        loadProducts(); // Перезагружаем список товаров
    } catch (error) {
        console.error('Error deleting product:', error); // Выводим ошибку в консоль
        alert(`Error deleting product: ${error.message}`); // Показываем ошибку пользователю
    }
}

// Функция для закрытия формы редактирования
function closeEditForm() {
    document.getElementById('edit-form').style.display = 'none'; // Скрываем форму редактирования
}

// Функция для закрытия формы добавления
function closeAddForm() {
    document.getElementById('add-form').style.display = 'none'; // Скрываем форму добавления
}

// Инициализация при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
    loadProducts(); // Загружаем список товаров при загрузке страницы
    document.getElementById('add-product-btn').addEventListener('click', () => { // Добавляем обработчик для кнопки "Добавить товар"
        document.getElementById('add-form').style.display = 'block'; // Показываем форму добавления товара
    });
});
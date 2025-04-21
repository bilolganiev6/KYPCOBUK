// Глобальная функция для выполнения поиска поставщиков по ФИО
function searchPostavshiki() {
    const query = document.getElementById('search-input').value.trim(); // Получаем значение из поля поиска
    loadPostavshiki(query); // Вызываем функцию загрузки поставщиков с текущим запросом
}

// Функция для загрузки списка поставщиков с сервера
function loadPostavshiki(query = '') {
    const url = query 
        ? `vendor/read.php?query=${encodeURIComponent(query)}` // Если есть запрос, добавляем его в URL
        : 'vendor/read.php'; // Если нет запроса, используем базовый URL

    console.log(`Loading postavshiki from URL: ${url}`); // Выводим URL для отладки
    fetch(url) // Выполняем HTTP-запрос к серверу
        .then(response => {
            if (!response.ok) { // Проверяем успешность ответа
                throw new Error(`Server error: ${response.status}`); // Если ответ не успешен, выбрасываем ошибку
            }
            return response.json(); // Преобразуем ответ в JSON
        })
        .then(postavshiki => {
            console.log("Received data from server:", postavshiki); // Выводим полученные данные для отладки
            if (!Array.isArray(postavshiki)) { // Проверяем, что ответ является массивом
                throw new Error('Invalid data format'); // Если нет, выбрасываем ошибку
            }

            // Выводим данные о поставщиках в консоль в формате JSON
            console.log("Postavshiki data in JSON format:", JSON.stringify(postavshiki, null, 2));

            renderPostavshiki(postavshiki); // Рендерим список поставщиков
        })
        .catch(error => {
            console.error('Error loading postavshiki:', error); // Выводим ошибку в консоль
            alert(`Error loading postavshiki: ${error.message}`); // Показываем ошибку пользователю
        });
}

// Функция для рендеринга списка поставщиков в таблице
function renderPostavshiki(postavshiki) {
    const tableBody = document.getElementById('postavshiki-table'); // Получаем элемент таблицы
    tableBody.innerHTML = ''; // Очищаем текущий контент таблицы
    
    postavshiki.forEach(postavshik => { // Перебираем каждого поставщика
        const row = document.createElement('tr'); // Создаем новую строку таблицы
        row.innerHTML = `
            <td>${escapeHTML(postavshik.id)}</td> <!-- ID поставщика -->
            <td>${escapeHTML(postavshik.name)}</td> <!-- ФИО поставщика -->
            <td>${escapeHTML(postavshik.inn)}</td> <!-- ИНН поставщика -->
            <td>${escapeHTML(postavshik.number)}</td> <!-- Номер телефона поставщика -->
            <td>
                <button onclick="editPostavshik(${postavshik.id})">Редактировать</button> <!-- Кнопка редактирования -->
                <button onclick="deletePostavshik(${postavshik.id})">Удалить</button> <!-- Кнопка удаления -->
            </td>
        `;
        tableBody.appendChild(row); // Добавляем строку в таблицу
    });
}

// Функция для экранирования HTML-символов
function escapeHTML(str) {
    return String(str).replace(/[&<>"']/g, m => ({ // Заменяем специальные символы на их HTML-сущности
        '&': '&amp;',
        '<': '<',
        '>': '>',
        '"': '&quot;',
        "'": '&#39;'
    }[m]));
}

// Функция для обработки формы добавления или редактирования поставщика
function setupForm(formId, url, successMessage) {
    const form = document.getElementById(formId); // Получаем форму по ID
    if (!form) {
        console.error(`Form with ID "${formId}" not found!`);
        return;
    }
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
            loadPostavshiki(); // Перезагружаем список поставщиков
            form.reset(); // Сбрасываем форму
            document.getElementById(`${formId}`).style.display = 'none'; // Скрываем форму
        } catch (error) {
            console.error('Error submitting form:', error); // Выводим ошибку в консоль
            alert(`Error submitting form: ${error.message}`); // Показываем ошибку пользователю
        }
    });
}

// Инициализация при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
    // Убедитесь, что формы существуют в DOM перед их использованием
    setupForm('add-postavshiki-form', 'vendor/create.php', 'Поставщик успешно добавлен');
    setupForm('edit-postavshiki-form', 'vendor/update.php', 'Поставщик успешно обновлен');

    loadPostavshiki(); // Загружаем список поставщиков при загрузке страницы
    document.getElementById('add-postavshiki-btn').addEventListener('click', () => { // Добавляем обработчик для кнопки "Добавить поставщика"
        document.getElementById('add-form').style.display = 'block'; // Показываем форму добавления поставщика
    });
});

// Функция для редактирования поставщика
async function editPostavshik(id) {
    try {
        const response = await fetch(`vendor/read.php?id=${id}`); // Выполняем HTTP-запрос к серверу для получения данных поставщика
        if (!response.ok) { // Проверяем успешность ответа
            throw new Error(`Server error: ${response.status}`); // Если ответ не успешен, выбрасываем ошибку
        }
        const postavshik = await response.json(); // Преобразуем ответ в JSON
        if (!postavshik || typeof postavshik !== 'object') { // Проверяем, что ответ является объектом
            throw new Error('Invalid data format'); // Если нет, выбрасываем ошибку
        }
        
        document.getElementById('edit-id').value = postavshik.id; // Заполняем форму данными поставщика
        document.getElementById('edit-name').value = postavshik.name;
        document.getElementById('edit-inn').value = postavshik.inn;
        document.getElementById('edit-number').value = postavshik.number;
        
        document.getElementById('edit-form').style.display = 'block'; // Показываем форму редактирования
    } catch (error) {
        console.error('Error editing postavshik:', error); // Выводим ошибку в консоль
        alert(`Error editing postavshik: ${error.message}`); // Показываем ошибку пользователю
    }
}

// Функция для удаления поставщика
async function deletePostavshik(id) {
    if (!confirm('Вы уверены?')) return; // Подтверждение удаления поставщика
    try {
        const response = await fetch('vendor/delete.php', { // Выполняем HTTP-запрос к серверу для удаления поставщика
            method: 'POST',
            headers: {'Content-Type': 'application/json'}, // Устанавливаем заголовок для JSON
            body: JSON.stringify({id}) // Отправляем ID поставщика в JSON
        });
        const data = await response.json(); // Преобразуем ответ в JSON
        if (!response.ok) { // Проверяем успешность ответа
            throw new Error(data.message || 'Unknown error'); // Если ответ не успешен, выбрасываем ошибку
        }
        alert('Поставщик удален'); // Показываем успешное сообщение
        loadPostavshiki(); // Перезагружаем список поставщиков
    } catch (error) {
        console.error('Error deleting postavshik:', error); // Выводим ошибку в консоль
        alert(`Error deleting postavshik: ${error.message}`); // Показываем ошибку пользователю
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
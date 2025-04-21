// Глобальная функция для выполнения поиска поставщиков по ФИО
function searchPostavshiki() {
    const query = document.getElementById('search-input').value.trim();
    loadPostavshiki(query);
}

// Функция для загрузки списка поставщиков с сервера
function loadPostavshiki(query = '') {
    const url = query 
        ? `vendor/read.php?query=${encodeURIComponent(query)}`
        : 'vendor/read.php';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }
            return response.json();
        })
        .then(postavshiki => {
            if (!Array.isArray(postavshiki)) {
                throw new Error('Invalid data format');
            }
            renderPostavshiki(postavshiki);
        })
        .catch(error => {
            console.error('Error loading postavshiki:', error);
            alert(`Error loading postavshiki: ${error.message}`);
        });
}

// Функция для рендеринга списка поставщиков в таблице
function renderPostavshiki(postavshiki) {
    const tableBody = document.getElementById('postavshiki-table');
    tableBody.innerHTML = '';
    
    postavshiki.forEach(postavshik => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${escapeHTML(postavshik.id)}</td>
            <td>${escapeHTML(postavshik.name)}</td>
            <td>${escapeHTML(postavshik.inn)}</td>
            <td>${escapeHTML(postavshik.number)}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Функция для экранирования HTML-символов
function escapeHTML(str) {
    return String(str).replace(/[&<>"']/g, m => ({
        '&': '&amp;',
        '<': '<',
        '>': '>',
        '"': '&quot;',
        "'": '&#39;'
    }[m]));
}

// Инициализация при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
    loadPostavshiki();
});
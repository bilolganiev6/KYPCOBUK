// Используем сокращенную форму document.ready для запуска кода после загрузки DOM
jQuery(($) => {
    // HTML-код приложения сохраняем в переменную app_html
    let app_html = `
        <div class="container">
            <div class="page-header">
                <!-- Заголовок страницы -->
                <h1 id="page-title">Все товары</h1>
            </div>
            <!-- Контейнер для динамического контента страницы -->
            <div id="page-content"></div>
        </div>`;
    
    // Вставляем созданный HTML-код внутрь элемента с ID "app" на странице
    $("#app").html(app_html);
});

// Функция для изменения заголовка страницы
function changePageTitle(page_title) {
    // Изменяем текст заголовка внутри элемента с ID "page-title"
    $("#page-title").text(page_title);
    
    // Изменяем название вкладки браузера
    document.title = page_title;
}

// Расширение jQuery для преобразования данных формы в объект JSON
$.fn.serializeObject = function () {
    // Создаем пустой объект для хранения данных формы
    var o = {};
    
    // Получаем массив данных формы используя метод serializeArray()
    var a = this.serializeArray();
    
    // Проходимся по каждому элементу массива данных формы
    $.each(a, function () {
        // Если поле с таким именем уже существует в объекте
        if (o[this.name] !== undefined) {
            // Если это не массив, преобразуем значение в массив
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            // Добавляем новое значение в массив
            o[this.name].push(this.value || "");
        } else {
            // Если поля еще нет в объекте, добавляем его с текущим значением
            o[this.name] = this.value || "";
        }
    });
    
    // Возвращаем готовый объект с данными формы
    return o;
};
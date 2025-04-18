// Используем сокращенную форму document.ready для запуска кода после загрузки DOM
jQuery($ => {
    // При первой загрузке страницы показываем список товаров
    showProducts();
    
    // Обработчик события клика на кнопку "Все товары"
    $(document).on("click", ".read-products-button", function () {
        // Показываем список всех товаров
        showProducts();
    });
    
    // Обработчик события клика на элементы пагинации
    $(document).on("click", ".pagination li", function () {
        // Получаем URL JSON для текущей страницы пагинации
        const json_url = $(this).find("a").attr("data-page");
        
        // Показываем список товаров для выбранной страницы пагинации
        showProducts(json_url);
    });
});

// Функция для отображения списка товаров
function showProducts(json_url = "http://m99693zw.beget.tech/api/product/read.php") {
    // Выполняем AJAX-запрос для получения списка товаров из API
    $.getJSON(json_url, function (data) {
        // Передаем полученные данные в функцию readProductsTemplate для создания HTML-представления
        readProductsTemplate(data, "");
        
        // Изменяем заголовок страницы на "Все товары"
        changePageTitle("Все товары");
    });
}
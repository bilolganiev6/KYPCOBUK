// Используем сокращенную форму document.ready для запуска кода после загрузки DOM
jQuery($ => {
    // Обработчик события отправки формы поиска товаров
    $(document).on("submit", "#search-product-form", function () {
        // Получаем ключевые слова для поиска из поля ввода формы
        const keywords = $(this).find("input[name='keywords']").val();
        
        // Выполняем AJAX-запрос GET к API для получения данных о товарах на основе ключевых слов
        $.getJSON("http://m99693zw.beget.tech/api/product/search.php?s=" + keywords, data => {
            // Передаем полученные данные в функцию readProductsTemplate для создания HTML-представления списка товаров
            readProductsTemplate(data, keywords);
            
            // Изменяем заголовок страницы, добавляя ключевые слова поиска
            changePageTitle("Поиск товаров: " + keywords);
        });
        
        // Предотвращаем стандартное поведение формы (перезагрузку страницы)
        return false;
    });
});
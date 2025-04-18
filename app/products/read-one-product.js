// Используем сокращенную форму document.ready для запуска кода после загрузки DOM
jQuery($ => {
    // Обработчик события клика на кнопку "Просмотр товара"
    $(document).on("click", ".read-one-product-button", function () {
        // Получаем ID товара из атрибута data-id кнопки
        const id = $(this).attr("data-id");
        
        // Выполняем AJAX-запрос для получения данных о конкретном товаре
        $.getJSON("http://m99693zw.beget.tech/api/product/read_one.php?id=" + id, data => {
            // Начало HTML для отображения информации о товаре
            let read_one_product_html = `
                
                <!-- Кнопка для возврата к списку товаров -->
                <div id="read-products" class="btn btn-primary pull-right m-b-15px read-products-button">
                    <span class="glyphicon glyphicon-list"></span> Все товары
                </div>
                
                <!-- Таблица для отображения детальной информации о товаре -->
                <table class="table table-bordered table-hover">
                    <tr>
                        <td class="w-30-pct">Название</td>
                        <td class="w-70-pct">` + data.name + `</td> <!-- Название товара -->
                    </tr>
                    <tr>
                        <td>Цена</td>
                        <td>` + data.price + `</td> <!-- Цена товара -->
                    </tr>
                    <tr>
                        <td>Описание</td>
                        <td>` + data.description + `</td> <!-- Описание товара -->
                    </tr>
                    <tr>
                        <td>Категория</td>
                        <td>` + data.category_name + `</td> <!-- Название категории товара -->
                    </tr>
                </table>`;
            
            // Вставляем созданный HTML в контейнер #page-content
            $("#page-content").html(read_one_product_html);
            
            // Изменяем заголовок страницы на "Просмотр товара"
            changePageTitle("Просмотр товара");
        });
    });
});
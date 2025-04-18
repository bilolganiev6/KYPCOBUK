function readProductsTemplate(data, keywords) {
    let read_products_html = `
        <!-- Форма для поиска товаров -->
        <form id="search-product-form" action="#" method="post">
            <div class="input-group pull-left w-30-pct">
                <input type="text" value="` + keywords + `" name="keywords" class="form-control product-search-keywords" placeholder="Поиск товаров..." />
                <span class="input-group-btn">
                    <button type="submit" class="btn btn-default" type="button">
                        <span class="glyphicon glyphicon-search"></span>
                    </button>
                </span>
            </div>
        </form>
        
        <!-- Начало таблицы товаров -->
        <table class="table table-bordered table-hover">
            <!-- Заголовки колонок таблицы -->
            <tr>
                <th class="w-25-pct">Название</th>
                <th class="w-10-pct">Цена</th>
                <th class="w-10-pct">Категория</th>
            </tr>`;
    
    // Перебираем данные о товарах из параметра data.records
    $.each(data.records, (key, val) => {
        // Для каждой записи создаем новую строку таблицы
        read_products_html += `<tr>
            <td>` + val.name + `</td> <!-- Название товара -->
            <td>$` + val.price + `</td> <!-- Цена товара -->
            <td>` + val.category_name + `</td> <!-- Имя категории товара -->
            
            <!-- Кнопки действий -->
            <td>
                <!-- Кнопка для просмотра товара -->
                <button class="btn btn-primary m-r-10px read-one-product-button" data-id="` + val.id + `">
                <span class="glyphicon glyphicon-eye-open"></span> Просмотр
                </button>
            </td>
        </tr>`;
    });
    
    // Закрываем таблицу
    read_products_html += `</table>`;
    
    // Если есть пагинация (разбиение на страницы)
    if (data.paging) {
        // Добавляем HTML для пагинации
        read_products_html += `<ul class="pagination pull-left margin-zero padding-bottom-2em">`;
        
        // Если есть первая страница
        if (data.paging.first !== "") {
            read_products_html += `<li><a data-page="${data.paging.first}">Первая страница</a></li>`;
        }
        
        // Перебираем доступные страницы
        $.each(data.paging.pages, (key, val) => {
            // Определяем активную страницу
            const active_page = val.current_page == "yes" ? "class='active'" : "";
            read_products_html += `<li ${active_page}><a data-page="${val.url}">${val.page}</a></li>`;
        });
        
        // Если есть последняя страница
        if (data.paging.last !== "") {
            read_products_html += `<li><a data-page="${data.paging.last}">Последняя страница</a></li>`;
        }
        
        // Закрываем список пагинации
        read_products_html += "</ul>";
    }
    
    // Вставляем созданный HTML в контейнер #page-content
    $("#page-content").html(read_products_html);
}
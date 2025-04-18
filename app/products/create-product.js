// Используем сокращенную форму document.ready для запуска кода после загрузки DOM
jQuery(($) => {
    // Обработчик события клика на кнопку "создать товар"
    $(document).on("click", ".create-product-button", () => {
        // Загрузка списка категорий через AJAX-запрос
        $.getJSON("http://m99693zw.beget.tech/api/category/read.php", (data) => {
            // Создаем HTML для выпадающего списка категорий
            let categories_options_html = `<select name="category_id" class="form-control">`;
            
            // Перебираем полученные данные о категориях и формируем options для select
            $.each(data.records, (key, val) => {
                categories_options_html += `<option value="${val.id}">${val.name}</option>`;
            });
            
            // Закрываем тег select
            categories_options_html += `</select>`;
            
            // Создаем HTML-форму для создания нового товара
            let create_product_html = `
                <!-- Кнопка для возврата к списку товаров -->
                <div id="read-products" class="btn btn-primary pull-right m-b-15px read-products-button">
                    <span class="glyphicon glyphicon-list"></span> Все товары
                </div>
                
                <!-- Форма создания товара -->
                <form id="create-product-form" action="#" method="post" border="0">
                    <table class="table table-hover table-responsive table-bordered">
                        <tr>
                            <td>Название</td>
                            <td><input type="text" name="name" class="form-control" required /></td>
                        </tr>
                        <tr>
                            <td>Цена</td>
                            <td><input type="number" min="1" name="price" class="form-control" required /></td>
                        </tr>
                        <tr>
                            <td>Описание</td>
                            <td><textarea name="description" class="form-control" required></textarea></td>
                        </tr>
                        <!-- Выпадающий список категорий -->
                        <tr>
                            <td>Категория</td>
                            <td>${categories_options_html}</td>
                        </tr>
                        <!-- Кнопка отправки формы -->
                        <tr>
                            <td></td>
                            <td>
                                <button type="submit" class="btn btn-primary">
                                    <span class="glyphicon glyphicon-plus"></span> Создать товар
                                </button>
                            </td>
                        </tr>
                    </table>
                </form>`;
            
            // Вставляем созданную форму в контейнер #page-content
            $("#page-content").html(create_product_html);
            
            // Изменяем заголовок страницы
            changePageTitle("Создание товара");
        });
    });

    // Обработчик отправки формы создания товара
    $(document).on("submit", "#create-product-form", function () {
        // Получаем данные из формы и преобразуем их в JSON-строку
        let form_data = JSON.stringify($(this).serializeObject());
        
        // Отправляем данные формы на сервер через AJAX
        $.ajax({
            url: "http://m99693zw.beget.tech/api/product/create.php", // URL API для создания товара
            type: "POST", // HTTP-метод
            contentType: "application/json", // Тип содержимого (JSON)
            data: form_data, // Данные формы в формате JSON
            success: result => {
                // Если товар успешно создан, возвращаемся к списку товаров
                showProducts();
            },
            error: (xhr, resp, text) => {
                // В случае ошибки выводим информацию об ошибке в консоль
                console.log(xhr, resp, text);
            }
        });
        
        // Предотвращаем стандартное поведение формы (перезагрузку страницы)
        return false;
    });
});
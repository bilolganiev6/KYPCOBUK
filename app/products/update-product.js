// Используем сокращенную форму document.ready для запуска кода после загрузки DOM
jQuery($ => {
    // Обработчик события клика на кнопку "Обновить товар"
    $(document).on("click", ".update-product-button", function () {
        // Получаем ID товара из атрибута data-id кнопки
        const id = $(this).attr("data-id");
        
        // Выполняем AJAX-запрос для получения данных о конкретном товаре
        $.getJSON("http://m99693zw.beget.tech/api/product/read_one.php?id=" + id, data => {
            // Сохраняем данные о товаре в переменные
            const name = data.name; // Название товара
            const price = data.price; // Цена товара
            const description = data.description; // Описание товара
            const category_id = data.category_id; // ID категории товара
            const category_name = data.category_name; // Название категории товара
            
            // Выполняем второй AJAX-запрос для получения списка категорий
            $.getJSON("http://m99693zw.beget.tech/api/category/read.php", data => {
                // Создаем HTML для выпадающего списка категорий
                let categories_options_html = `<select name="category_id" class="form-control">`;
                
                // Перебираем список категорий и формируем options для select
                $.each(data.records, (key, val) => {
                    // Если текущая категория соответствует категории товара, делаем ее предварительно выбранной
                    if (val.id == category_id) {
                        categories_options_html += `<option value="${val.id}" selected>${val.name}</option>`;
                    } else {
                        categories_options_html += `<option value="${val.id}">${val.name}</option>`;
                    }
                });
                
                // Закрываем тег select
                categories_options_html += `</select>`;
                
                // Создаем HTML-форму для обновления товара
                let update_product_html = `
                    <!-- Кнопка для возврата к списку товаров -->
                    <div id="read-products" class="btn btn-primary pull-right m-b-15px read-products-button">
                        <span class="glyphicon glyphicon-list"></span> Все товары
                    </div>
                    
                    <!-- Форма для обновления товара -->
                    <form id="update-product-form" action="#" method="post" border="0">
                        <table class="table table-hover table-responsive table-bordered">
                            <tr>
                                <td>Название</td>
                                <td><input value="${name}" type="text" name="name" class="form-control" required /></td>
                            </tr>
                            <tr>
                                <td>Цена</td>
                                <td><input value="${price}" type="number" min="1" name="price" class="form-control" required /></td>
                            </tr>
                            <tr>
                                <td>Описание</td>
                                <td><textarea name="description" class="form-control" required>${description}</textarea></td>
                            </tr>
                            <tr>
                                <td>Категория</td>
                                <td>${categories_options_html}</td>
                            </tr>
                            <tr>
                                <!-- Скрытый input для хранения ID товара -->
                                <td><input value="${id}" name="id" type="hidden" /></td>
                                
                                <!-- Кнопка отправки формы -->
                                <td>
                                    <button type="submit" class="btn btn-info">
                                        <span class="glyphicon glyphicon-edit"></span> Обновить товар
                                    </button>
                                </td>
                            </tr>
                        </table>
                    </form>
                `;
                
                // Вставляем созданную форму в контейнер #page-content
                $("#page-content").html(update_product_html);
                
                // Изменяем заголовок страницы
                changePageTitle("Обновление товара");
            });
        });
    });

    // Обработчик события отправки формы обновления товара
    $(document).on("submit", "#update-product-form", function () {
        // Получаем данные формы и преобразуем их в JSON-строку
        const form_data = JSON.stringify($(this).serializeObject());
        
        // Отправляем данные формы на сервер через AJAX
        $.ajax({
            url: "http://m99693zw.beget.tech/api/product/update.php", // URL API для обновления товара
            type: "POST", // HTTP-метод
            contentType: "application/json", // Тип содержимого (JSON)
            data: form_data, // Данные формы в формате JSON
            
            success: result => {
                // Если товар успешно обновлен, возвращаемся к списку товаров
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
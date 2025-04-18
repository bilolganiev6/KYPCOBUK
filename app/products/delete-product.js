// Используем сокращенную форму document.ready для запуска кода после загрузки DOM
jQuery($ => {
    // Обработчик события клика на кнопку удаления товара
    $(document).on("click", ".delete-product-button", function () {
        // Получаем ID товара из атрибута data-id кнопки
        const product_id = $(this).attr("data-id");
        
        // Отображаем всплывающее окно подтверждения с помощью библиотеки bootbox
        bootbox.confirm({
            // Сообщение, которое будет показано пользователю
            message: "<h4>Вы уверены?</h4>",
            
            // Настройка кнопок всплывающего окна
            buttons: {
                confirm: {
                    // Текст и иконка для кнопки "Да"
                    label: "<span class='glyphicon glyphicon-ok'></span> Да",
                    // Класс кнопки (красный цвет)
                    className: "btn-danger"
                },
                cancel: {
                    // Текст и иконка для кнопки "Нет"
                    label: "<span class='glyphicon glyphicon-remove'></span> Нет",
                    // Класс кнопки (синий цвет)
                    className: "btn-primary"
                }
            },
            
            // Callback-функция, которая вызывается после выбора пользователя
            callback: result => {
                // Если пользователь нажал "Да" (result == true)
                if (result == true) {
                    // Отправляем AJAX-запрос на сервер для удаления товара
                    $.ajax({
                        url: "http://m99693zw.beget.tech/api/product/delete.php", // URL API для удаления товара
                        type: "POST", // HTTP-метод
                        dataType: "json", // Ожидаемый тип данных от сервера
                        data: JSON.stringify({ id: product_id }), // Данные для отправки (ID товара)
                        
                        success: result => {
                            // Если товар успешно удален, обновляем список товаров
                            showProducts();
                        },
                        error: (xhr, resp, text) => {
                            // В случае ошибки выводим информацию об ошибке в консоль
                            console.log(xhr, resp, text);
                        }
                    });
                }
            }
        });
    });
});
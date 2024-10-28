// Получаем элементы из DOM
const sendButton = document.getElementById("send-button");
const userInput = document.getElementById("user-input");
const messagesDiv = document.getElementById("messages");

// Функция для отправки сообщения
function sendMessage() {
    const message = userInput.value.trim();
    if (message) {
        addMessage("Вы: " + message); // Отображаем сообщение пользователя
        userInput.value = ""; // Очищаем поле ввода

        // Отправка сообщения на сервер
        fetch("http://localhost:5000/send-message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: message }), // Отправляем текст сообщения
        })
        .then(response => response.json()) // Обрабатываем ответ от сервера
        .then(data => {
            if (data && data.reply) {
                addMessage("Бот: " + data.reply); // Отображаем ответ от бота
            }
        })
        .catch(error => console.error("Ошибка:", error)); // Обрабатываем ошибки
    }
}

// Функция для добавления сообщения в чат
function addMessage(message) {
    const messageElement = document.createElement("div"); // Создаем новый элемент div
    messageElement.textContent = message; // Устанавливаем текст сообщения
    messagesDiv.appendChild(messageElement); // Добавляем элемент в контейнер сообщений
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Прокрутка вниз
}

// Обработчик события на кнопку "Отправить"
sendButton.addEventListener("click", sendMessage);

// Обработчик события на нажатие Enter
userInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        sendMessage(); // Если нажата клавиша Enter, отправляем сообщение
    }
});

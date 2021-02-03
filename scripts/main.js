(function () {
        "use strict";
        const messageText = document.querySelector(".message");
        const userName = document.querySelector(".username");
        const deleteMessage = document.querySelector(".delete");
        const edit = document.querySelector(".edit");
        const messageArea = document.querySelector("#message");
        const userNameText = document.querySelector("#username");

        const BASE_URL = "https://tiny-taco-server.herokuapp.com/api/v1/chats/";
        const generateHTML = (data) => {
            const source = document.querySelector("#create-message").innerHTML;
            const template = Handlebars.compile(source);
            const context = {todos: data};
            const html = template(context);
            console.log(data);
            document.querySelector("#user-input").innerHTML = html;
        }
        fetch(BASE_URL)
            .then(response => response.json())
            .then(data => generateHTML(data))
            .catch(error => console.log(error));
    }
)();
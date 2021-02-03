(function () {
        "use strict";
        const messageText = document.querySelector("#message");
        const userName = document.querySelector(".username");
        const deleteMessage = document.querySelector(".delete");
        const edit = document.querySelector(".edit");
        const messageArea = document.querySelector("#message");
        const userNameText = document.querySelector("#username");
        const form = document.querySelector("form");
        const BASE_URL = "https://tiny-taco-server.herokuapp.com/api/v1/chats/";
        const chats = {
            text: "",
            username: "",
        }
        const generateHTML = (data) => {
            const source = document.querySelector("#create-message").innerHTML;
            const template = Handlebars.compile(source);
            const context = {chats: data};
            const html = template(context);
            console.log(data);
            document.querySelector("#user-input").innerHTML = html;
        }
        document.querySelector("form").addEventListener("submit", (e) => {
            chats.text = document.querySelector("textarea").value;
            chats.username = document.querySelector("input").value;

            fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(chats),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Something went wrong.");
                }
                return response.json();
            })
            .then(data => consol.log(data))
            .catch(error => console.log("Error:", error));
        });
        fetch(BASE_URL)
            .then(response => response.json())
            .then(data => generateHTML(data))
            .catch(error => console.log(error));
    }
)();
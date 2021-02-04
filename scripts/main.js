(function () {
        "use strict";
        const messageText = document.querySelector("#message");
        const userNameText = document.querySelector("#username");
        const BASE_URL = "https://tiny-taco-server.herokuapp.com/api/v1/chats/";
        const chats = {
            text: "",
            username: "",
        }
        const generateHTML = (data) => {
            const source = document.querySelector("#create-message").innerHTML;
            const template = Handlebars.compile(source);
            const context = {chats: data.sort((a, b) => b.id - a.id)};
            const html = template(context);
            console.log(context);
            document.querySelector("#user-input").innerHTML = html;
        }
        document.querySelector("ul").addEventListener("click", (e) => {
            // e.target.parentNode.remove();
            if (e.target.classList.contains("delete")) {
                console.dir(e.target.value);
                fetch(`${BASE_URL}${e.target.value}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    // body: JSON.stringify(chats)
                })
                    .then(response => response.json())
                    .then(data => console.log("Data", data));
            }
        });

        document.querySelector("ul").addEventListener("click", (e) => {
            if (e.target.classList.contains("edit")) {
                const message = document.querySelector(".message");
                const user = document.querySelector(".username");
                messageText.value = message.innerHTML;
                userNameText.value = user.innerHTML;
                fetch(`${BASE_URL}${e.target.value}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },

                })
            }

        });
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
                .then(data => console.log(data.reverse()))
                .catch(error => console.log("Error:", error));
            e.preventDefault();
        });
        setInterval(() => {
            fetch(BASE_URL)
            .then(response => response.json())
            .then(data => generateHTML(data.reverse()))
            .catch(error => console.log(error));
        }, 3000);
    }
)();
let name = document.getElementById("name");
let age = document.getElementById("age");
let email = document.getElementById("email");
let message = document.getElementById("message");
let inputs = document.querySelectorAll("input, textarea");

let form = document.querySelector("form");
let button = document.getElementById("button");

let sideBar = document.getElementById("side-bar");
const BOT_TOKEN = "8391117913:AAGOjgkI1I-64rbX9gxr_yelYrpJ3y5ZdoQ"; 
const CHAT_ID = "2018734884";

function sendForm() {
  let allowForm = true;

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].id === "age") continue;

    if (inputs[i].value.trim() === "") {
      allowForm = false;
      inputs[i].style.borderColor = "red"; 
    } else {
      inputs[i].style.borderColor = "#333"; 
    }
  }

  if (!allowForm) {
    alert("Пожалуйста, заполните обязательные поля");
  } else {
    let originalText = button.innerText;
    button.innerText = "Отправка...";
    button.disabled = true;

    const tgMessage =
      "🚀 Новая заявка с сайта:\n\n" +
      "👤 Имя: " + name.value + "\n" +
      "🎂 Возраст: " + (age.value || "Не указан") + "\n" +
      "📧 Email: " + email.value + "\n" +
      "📝 Сообщение: " + message.value;

    const data = {
      chat_id: CHAT_ID,
      text: tgMessage,
    };

    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          form.innerHTML = `
            <div style="text-align: center; color: white;">
                <h1>✅ Сообщение отправлено!</h1>
                <p>Я свяжусь с вами в ближайшее время.</p>
            </div>`;
          button.style.display = "none";
        } else {
           alert("Ошибка Telegram: " + data.description);
           button.innerText = originalText;
           button.disabled = false;
        }
      })
      .catch((err) => {
        alert("Ошибка сети. Попробуйте позже.");
        button.innerText = originalText;
        button.disabled = false;
        console.error(err);
      });
  }
}

function openSideBar() {
  if (window.innerWidth <= 800) {
      sideBar.style.right = "0";
  } else {
      sideBar.style.right = "0";
  }
}

function closeSideBar() {
  if (window.innerWidth <= 800) {
      sideBar.style.right = "-100%";
  } else {
      sideBar.style.right = "-250px";
  }
}
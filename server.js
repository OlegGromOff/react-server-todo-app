const express = require("express"); // импортируем express

const app = express(); // создаем переменную которая является express приложением 

const port = 3000; //создали порт

app.use(express.json()); // используем middleware который парсит данные в json

let ideas = []; // наши мысли, массив (локальное хранилище без БД)

app.post("/ideas", (req, res) => {
  ideas = [...ideas, req.body]; // задаем новое значение массиву и телу запроса в нем
  res.json(ideas); // отправляем данные на страницу /ideas
});


app.get("/ideas", (req, res) => {
  // получаем с сервера ответ 
  res.json(ideas);
});

app.delete("/ideas", (req, res) => {
  ideas = ideas.filter((item) => !(item.id == req.query.id)); // выводим посты которые не равны req.query.id
  // req.query объект, содержащий свойство для каждого параметра строки запроса
  res.json(ideas);
});


app.put("/ideas_like", (req, res) => { // обновляем данные

  ideas = ideas.map((item) => { // при нажатии на лайк меняем состояние liked на противоположное
    if (item.id === req.body.id) {
      return {
        ...item,
        liked: !item.liked,
      };
    } else {
      return item;
    }
  });
  res.json(ideas); // отправка
});


app.put("/ideas_val", (req, res) => { // редактируем запись
  const { id, value } = req.body;
  ideas = ideas.map((item) => {
    if (item.id === id) {
      return { // вернем новое значение и дату редактирования
        ...item,
        value,
        lastEditted: Date.now(),
      };
    } else {
      return item;
    }
  });
  res.json(ideas);
});


app.put("/ideas_fav", (req, res) => { // добавить в избранное
  ideas = ideas.map((item) => {
    if (item.id === req.body.id) {
      return { // меняем значение favorite на противоположное
        ...item,
        favorite: !item.favorite,
      };
    } else {
      return item;
    }
  });
  res.json(ideas);
});

// слушаем событие по адресу порта, второй аргумент - коллбек, вызывается когда все запущено
app.listen(port, () => {
  console.log("server working");
});

// запуск сервера: в терминале пишем node server.js 
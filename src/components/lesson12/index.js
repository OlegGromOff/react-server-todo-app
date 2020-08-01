import React, { useState, useRef } from "react";
import Ideas from "./Ideas";
import { useEffect } from "react";
import axios from "axios";
import "./style.scss";

export default function Youridea() {
  const [ideas, setIdeas] = useState([]);
  const valueField = useRef();

  const getIdeas = () => {  // массив ideas теперь равен ответу сервера
    axios.get("/ideas").then((res) => {
      setIdeas(res.data);
    });
  };

  useEffect(() => {  // как только приложение готово вызываем ответ с сервера
    getIdeas();
  }, []);


  // update favorite state
  const toggleFavorite = (id) => { // обновление состояния избранного
    axios
      .put("/ideas_fav", {
        id,
      })
      .then(function (response) {
        getIdeas(); // после обоновления избранного возвращаем массив ideas
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const toggleLiked = (id) => { // обновление состояния лайков
    axios
      .put("/ideas_like", {
        id,
      })
      .then(function (response) {
        getIdeas(); // после обоновления лайков возвращаем массив ideas
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  const addIdea = (e) => { // добавляю идею
    if (e.key === "Enter") { // при нажатии enter отправляю на север данные
      axios
        .post("/ideas", {
          value: valueField.current.value,  // содержимое идеи равно содержимому инпута
          id: Math.random(),
          liked: false,
          favorite: false,
          lastEditted: Date.now(),
        })
        .then(function (response) {
          getIdeas(); // после отправки на сервер возвращаю массив ideas
          valueField.current.value = "";  // после отправки на сервер очищаю инпут
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };


  const updateIdeaValue = (id, value) => { // редактирую содрежимое идеи
    axios
      .put("/ideas_val", {
        id,
        value,
      })
      .then(function (response) {
        getIdeas(); // после обновления идеи возвращаю массив ideas
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  const deleteIdea = (id) => { // удаляю идею
    axios.delete("/ideas?id=" + id).then((res) => {
      // id=  это ключ     +id это значение
      getIdeas(); // после удаления идеи возвращаю массив ideas
    });
  };

  return (
    <div className="idea-wrapper">
      <h3>My ideas App</h3>
      <Ideas
        ideas={ideas}
        updateIdeaValue={updateIdeaValue}
        toggleLiked={toggleLiked}
        toggleFavorite={toggleFavorite}
        deleteIdea={deleteIdea}
      />
      <input
        ref={valueField}
        type="text"
        placeholder="Write your idea and press enter"
        onKeyPress={addIdea}
        className="addIdeaInput"
      />
    </div>
  );
}
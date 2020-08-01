import React from "react";
import Idea from "./Idea";

export default function Ideas({  //передал в пропсы данные из index.js
  ideas,
  deleteIdea,
  updateIdeaValue,
  toggleLiked,
  toggleFavorite,
}) {
  return (
    <div className="ideasWrapper">
      {ideas.map((item) => ( // оборачиваю каждую идею из массива ideas в компонент Idea
        <Idea
          // прокидываю пропсы ниже, в Idea
          key={item.id}
          item={item}
          updateIdeaValue={updateIdeaValue}
          toggleLiked={toggleLiked}
          toggleFavorite={toggleFavorite}
          deleteIdea={deleteIdea}
        />
      ))}
    </div>
  );
}
import React, { useState } from "react";
import PropTypes from "prop-types";
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import FavoriteIcon from '@material-ui/icons/Favorite';

export default function Idea({
  updateIdeaValue,
  deleteIdea,
  item,
  toggleLiked,
  toggleFavorite,
}) {
  const { id, lastEditted, liked, value } = item;
  const [changeIdea, setChangeIdea] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [favoriteState, setFavorite] = useState(false);


  const time = Date.now() - lastEditted;
  const ideaTime = {
    hours: Math.floor((time / 1000 / 60 / 60) % 24),
    minutes: Math.floor((time / 1000 / 60) % 60),
    seconds: Math.floor((time / 1000) % 60),
  };


  const updateIdea = () => {  // обновить идею
    updateIdeaValue(id, inputValue);
    setChangeIdea(false);
  };


  const changeIdeaFunc = () => {  // сохранить изменения в идее
    setChangeIdea(true);
  };


  const deleteIdeaFunc = () => { // удаление идеи
    deleteIdea(id);
  };


  const likeFunc = () => {  // лайк/дизлайк
    toggleLiked(id);
  };


  const onButtonFavorite = (e) => {  // избранное добавить
    toggleFavorite(id);
    setFavorite(!favoriteState);
  };

  const onInputChange = (e) => {  // меняем значение идеи на значание инпута
    setInputValue(e.target.value);
  };


  return (
    <div className="idea">
      <div className="idea__top-side">
        <div className="idea__top-info">
          {changeIdea ? (
            <input value={inputValue} onChange={onInputChange} type="text" />
          ) : (
              <div className="idea-data">
                <p className="edit-field">
                  Added/Edited by you {ideaTime.minutes} min ago
              </p>
                <p className="value-font">{value}</p>
              </div>
            )}
        </div>
        <div className="idea__top-buttons">
          {changeIdea ? (
            <SaveIcon onClick={updateIdea}> save</SaveIcon>

          ) : (
              <EditIcon onClick={changeIdeaFunc}>edit</EditIcon>
            )}

          <DeleteForeverIcon
            onClick={deleteIdeaFunc}
          >
            delete
          </DeleteForeverIcon>
        </div>
      </div>

      <div className="idea__bottom-side">
        <ThumbUpIcon
          onClick={likeFunc}
          className={liked ? "bottom-btn active_like" : "bottom-btn"}
        >
          thumb_up_alt
        </ThumbUpIcon>

        <FavoriteIcon
          onClick={onButtonFavorite}
          className={favoriteState ? "bottom-btn favorite-selected" : "bottom-btn"}
        >
          favorite
        </FavoriteIcon>
      </div>
    </div>
  );
}

Idea.propType = {
  item: PropTypes.shape({
    id: PropTypes.number,
    lastEddited: PropTypes.number,
    liked: PropTypes.bool,
    value: PropTypes.string,
  }),
};
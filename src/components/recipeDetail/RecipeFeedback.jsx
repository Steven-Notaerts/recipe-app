import { startsWith } from "@reach/router/lib/utils";
import React, { useState } from "react";
import { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { addFeedback } from "../../utils/crud";
const RecipeFeedback = ({ id, recipeDetail }) => {
  /* set the colors for hover or rated, and default*/
  const colors = {
    orange: "#ea7317",
    grey: "#1985a1",
  };
  //create a array of wanted stars (5)
  //and change elements to static value with fill, default is 0 and max is stars.length
  const stars = Array(5).fill(0);
  //  create state to set the current value
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [feedback, setFeedback] = useState("");

  //create click event to set te currentValue to the value you want to give
  const handleClick = (value) => {
    setCurrentValue(value);
  };
  //when on mouse hover fill the stars with orange color
  const handleMouseHover = (value) => {
    setHoverValue(value);
  };
  //when the mouse leaves set the value to undefined, no value = nothing filled
  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const handleChange = (event) => {
    event.preventDefault();
    setFeedback(event.target.value);
  };

  return (
    <>
      <section>
        <div className="feedback">
          <div className="feedback__container">
            <label className="feedback__label">
              <span>What's your feedback?</span>
            </label>

            <div className="feedback__rating">
              {/* mapping over the stars array, and for each value create a star 
        _ to skip the first parameter
        */}
              {stars.map((_, index) => {
                return [
                  <FaStar
                    key={index}
                    color={
                      (hoverValue || currentValue) > index
                        ? colors.orange
                        : colors.grey
                    }
                    onClick={() => handleClick(index + 1)}
                    onMouseOver={() => handleMouseHover(index + 1)}
                    onMouseLeave={() => handleMouseLeave()}
                    required
                  />,
                ];
              })}
            </div>
            <textarea
              name=""
              id=""
              cols="100"
              rows="2"
              required
              value={feedback}
              onChange={handleChange}
              className="feedback__text-area"
            ></textarea>

            <button
              className="btn"
              onClick={() => {
                addFeedback(id, currentValue, feedback);
                setHoverValue(undefined);
                setCurrentValue(0);
                setFeedback("");
                Array.from(document.querySelectorAll("input")).forEach(
                  (input) => (input.value = "")
                );
                alert("thanks for your feedback!");
              }}
            >
              send feedback
            </button>
          </div>
        </div>
      </section>
      <section className="visitor-feedback">
        <div className="visitor-feedback__container">
          <h3 className="visitor-feedback__title">
            see what our visitors think of this recipe
          </h3>
          <div>
            {Object.entries(recipeDetail).map((comment) => {
              const average =
                comment[1].docData.ratings.reduce((a, b) => a + b, 0) /
                comment[1].docData.ratings.length;
              return (
                <span className="visitor-feedback__average-rating">
                  average rating: {average.toFixed(0)} / 5
                </span>
              );
            })}

            <ul className="visitor-feedback__comment-list">
              {Object.entries(recipeDetail).map((key, comment) => {
                {
                  comment?.docData?.comments?.map((comment) => {
                    const comments = JSON.parse(comment);
                    return (
                      <li
                        key={key}
                        className="visitor-feedback__comment-list-item"
                      >
                        {comments}
                      </li>
                    );
                  });
                }
              })}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default RecipeFeedback;

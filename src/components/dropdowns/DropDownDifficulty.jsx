import React from "react";

const DropDownDifficulty = ({
  difficulty,
  userInput,
  setUserInput,
  onChangeHelper,
}) => {
  return (
    <select
      name="difficulty"
      defaultValue="Set difficulty"
      value={userInput.difficulty}
      onChange={onChangeHelper}
      className="select-main select-main__long"
    >
      {difficulty.map((difficulty) => {
        return (
          <option
            value={difficulty.type}
            key={difficulty.id}
            className="select-main__option"
            required
          >
            {difficulty.type}
          </option>
        );
      })}
    </select>
  );
};

export default DropDownDifficulty;

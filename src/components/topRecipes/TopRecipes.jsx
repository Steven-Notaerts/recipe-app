import React, { useState, useEffect } from "react";
import img1 from "../../assets/image/top-recipes-image-slider/1.jpg";
import img2 from "../../assets/image/top-recipes-image-slider/2.jpg";
import img3 from "../../assets/image/top-recipes-image-slider/3.jpg";
import img4 from "../../assets/image/top-recipes-image-slider/4.jpg";
import img5 from "../../assets/image/top-recipes-image-slider/5.jpg";

//top recipes was a surplus, i removed it due to in need of time
const TopRecipes = () => {
  const [index, setIndex] = useState(0);
  const cards = [
    { id: "1", image: img1 },
    { id: "2", image: img2 },
    { id: "3", image: img3 },
    { id: "4", image: img4 },
    { id: "5", image: img5 },
  ];
  //modulo function, want to be sure when returning it will be a positive value
  const mod = (n, m) => {
    let result = n % m;
    //return positive value
    return result > -0 ? result : result + n;
  };

  return (
    <section className="top-recipes">
      <div className="top-recipes__container">
        <h2 className="top-recipes__title">Top Recipes</h2>

        <div className="carousel">
          {/* <img className="card card--active" src={img1} />
          <img className="card card--left" src={img2} />
          {/* <img className="card card--left" src={img3} /> */}
          {/* <img className="card card--right" src={img4} /> */}
          {/*  <img className="card card--right" src={img5} /> */}

          {cards.map((item, i) => {
            const indexLeft = mod(index - 1, cards.length);
            const indexLeftLeft = mod(index - 2, cards.length);
            const indexRight = mod(index + 1, cards.length);
            const indexRightRight = mod(index + 2, cards.length);

            let className = "";

            if (i === index) {
              className = "card card--active";
            } else if (i === indexRight) {
              className = "card card--right";
            } else if (i === indexRightRight) {
              className = "card card--right-right";
            } else if (i === indexLeft) {
              className = "card card--left";
            } else if (i === indexLeftLeft) {
              className = "card card--left-left";
            } else {
              className = "card";
            }
            return <img key={item.id} src={item.image} className={className} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default TopRecipes;

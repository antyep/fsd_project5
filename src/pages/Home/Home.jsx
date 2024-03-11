import "./Home.css";
import tattoopic from "../../img/tattoopic.jpg";

export const Home = () => {
  return (
    <div className="home-wrapper">
      <h1>Who are we?</h1>
      <div className="home-container">
        <h5>KD Tattoo Studio</h5>
        <span>
          The KD Tattoo Studio team works hard to give their clients the respect
          and quality they deserve. They are aware of how important a tattoo is,
          that is why they work in a clean and safe environment with all the
          <b> health requirements. </b>
          <br></br>
          <br></br>
          Each artist that is part of this studio is specialized in a style,
          which reflects their <b> personality </b> and taste.
          <br></br>
          <br></br>
          Since their beginnings they have been developing all their ideas in
          different artistic forms, such as murals, posters, illustration,
          sculpture design, styling, and others.
          <br></br>
          <br></br>
          Our way of working is 100% personal, we offer free and non-binding
          consultation appointments with the artist to listen to your idea and
          advise you on what you need.
          <br></br>
          <br></br>
          <div className="main-picture">
            <img src={tattoopic} className="tattoopic" alt="tattoopic"></img>
          </div>
        </span>
      </div>
    </div>
  );
};

import Navigation from "../Navigation";
import { NavLink } from "react-router-dom";
function Art_Mobius() {
  const body = document.body;
  body.className = "default-bg";
  const items = [
    {
      id: 2,
      title: "Mercury Lounge Poster",
              image: `/mobius/Mercury_Lounge.jpg`,
      comment: "",
    },
    {
      id: 3,
      title: "Tractor Tavern Poster",
              image: `/mobius/Tractor_Tavern.jpg`,
      comment: "",
    },
    {
      id: 4,
      title: "Grey Eagle Poster",
              image: `/mobius/Grey_Eagle.jpg`,
      comment: "",
    },
    {
      id: 1,
      title: "QR Code",
              image: `/mobius/QR.jpg`,
      comment: "",
    },
    {
      id: 5,
      title: "Promotional Image 1",
              image: `/mobius/elevator.png`,
      comment: "",
    },
    {
      id: 6,
      title: "Promotional Image 4",
              image: `/mobius/climb.png`,
      comment: "",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-serif gap-4">
      <NavLink to={"/"}>Nicholas Mirigliani</NavLink>
      <Navigation/>
        <img
          className="max-w-1/2"
          src="/mobius/Logo2.jpg"
        />
        <img
          className="max-w-1/2"
          src="/mobius/croppedbeatles.png"
        />
        <p className="max-w-1/2">
          MOBIUS LINE is an ARG (Augmented Reality Game) that I co-created with
          Sumner Badzik. This project involved creating branding and marketing
          for our fictitious band MOBIUS LINE, as well as constructing a
          narrative which is scattered across multiple social media platforms
          and accounts. Originally, posters (seen below) were hung around the
          neighborbood, linking to the start of the game.On this page I have
          included some of the graphic design work I did for the project, as
          well as some of our band photos, taken by Andrew Yurovchak. I hope
          you'll take a little time to explore the game{" "}
          <a className="text-blue-700"target="_blank" href="https://m.youtube.com/watch?v=VJmVcI-avlE">
            here
          </a>
          .
        </p>

      <div className="flex flex-col items-center gap-4 max-w-1/2">
        {items.map((project) => (
          <div className="border-2" key={project.id}>
            <img src={project.image} />
            <h2 className="justify-center">{project.title}</h2>
            <p>{project.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Art_Mobius;

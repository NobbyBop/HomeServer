import Navigation from "./Navigation";
import { NavLink } from "react-router-dom";
function Photography() {
  let body = document.body;
  body.className = "photography-bg";
  let photoNames = [
    "24-09-07-a.png",
    "24-09-07-b.JPG",
    "24-09-07-c.JPG",
    "24-09-07-d.JPG",
    "24-09-07-e.JPG",
    "24-09-14-a.JPG",
    "24-09-14-b.JPG",
    "24-09-14-d.JPG",
    "24-09-14-e.JPG",
    "24-09-14-g.JPG",
    "24-09-14-h.JPG",
    "24-09-21-a.JPG",
    "24-09-21-b.JPG",
    "24-09-21-c.JPG",
    "24-09-21-d.JPG",
    "24-09-21-e.JPG",
    "24-10-06-a.JPG",
    "24-10-06-b.JPG",
    "24-10-06-c.JPG",
    "24-12-15-a.JPG",
    "24-12-23-a.JPG",
    "25-01-04-a.JPG",
    "25-01-04-b.JPG",
    "25-01-04-c.JPG",
    "25-01-18-a.JPG",
    "25-01-18-b.JPG",
    "25-01-18-c.JPG",
    "25-01-26-a.JPG",
    "25-01-26-b.JPG",
    "25-01-27-a.JPG",
    "25-01-27-b.JPG",
    "25-01-27-c.JPG",
    "25-01-27-d.JPG",
  ];

  photoNames = photoNames.reverse();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-serif gap-4">
      <NavLink to={"/"}>Nicholas Mirigliani</NavLink>
      <Navigation/>
      <h2>PHOTOGRAPHY</h2>
      <p className="max-w-1/2">Taken on a Canon PowerShot ELPH 190 IS. (Most recent to oldest.)</p>
      <div className="flex flex-col gap-4 max-w-1/2">
        {photoNames.map((name) => (
          <img src={`/photos/${name}`}/>
        ))}
      </div>
    </div>
  );
}
export default Photography;

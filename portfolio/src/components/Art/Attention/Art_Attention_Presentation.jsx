// import { SnavLink } from "react-router-dom";
import SnavLink from "../../SnavLink";
import Navigation from "../../Navigation";
import { NavLink } from "react-router-dom";
function Art_Attention() {
  const body = document.body;
  body.className = "default-bg";
  const pageList = Array.from({ length: 23 }, (_, i) => (i + 1).toString());
  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-roboto gap-4">
    <NavLink to={"/"}>Nicholas Mirigliani</NavLink>
    <Navigation />
      <img
        className="max-w-3xs"
        src={`/attention/title.png`}
      />
        <SnavLink to="/art/attention/">BACK TO MAIN PAGE</SnavLink>
        <h2>PART THREE: THE USB</h2>
        <p>PLEASE FIND THE SLIDES OF THE PRESENTATION BELOW.</p>
        <div className="flex flex-col items-center gap-4">
          {pageList.map((page) => (
            <img
              className="max-w-1/2 border-2"
              src={`/attention/presentation_slides/${page}.png`}
            />
          ))}
        </div>
        <SnavLink to="/art/attention/">BACK TO MAIN PAGE</SnavLink>
      </div>
  );
}
export default Art_Attention;

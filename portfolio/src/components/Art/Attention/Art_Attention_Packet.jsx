// import { SnavLink } from "react-router-dom";
import SnavLink from "../../SnavLink";
import { NavLink } from "react-router-dom";
import Navigation from "../../Navigation";

function Art_Attention() {
  const pageList = Array.from({ length: 18 }, (_, i) => (i + 1).toString());
  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-roboto gap-4">
    <Navigation displayName="true"/>
      <img
        className="max-w-3xs"
        src={`/attention/title.png`}
      />
      <SnavLink to="/art/attention/">BACK TO MAIN PAGE</SnavLink>
      <h2>PART TWO: THE BOOK</h2>
      <p>PLEASE FIND THE PAGES OF THE INSTRUCTION BOOK BELOW.</p>
      <div className="flex flex-col items-center gap-4">
        {pageList.map((page) => (
          <img
            className="max-w-1/2 border-2"
            src={`/attention/packet_pages/${page}.png`}
          />
        ))}
      </div>
      <SnavLink to="/art/attention/">BACK TO MAIN PAGE</SnavLink>
    </div>
  );
}
export default Art_Attention;

import SnavLink from "./SnavLink";
import { NavLink } from "react-router-dom";
function Navigation({displayName=false, underline=true}) {
  const activeClass = "text-blue-600 underline"
  const inactiveClass = "hover:underline"
  return (
    <>
      {displayName && <NavLink className="font-bold text-2xl" to={"/"}>NICHOLAS MIRIGLIANI</NavLink>}
      {/* ${underline=="true" ? "border-b-2  pb-4" : ""} */}
      <nav className={`flex gap-4 justify-center items-center ${underline!="false" ? "border-b-2" : ""} `}>
        <SnavLink
          to="/home"
          className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        >
          Home
        </SnavLink>
        <SnavLink
          to="/art"
          className={({ isActive }) => (isActive ? activeClass: inactiveClass)}
        >
          Art
        </SnavLink>
      </nav>
    </>
  );
}

export default Navigation;

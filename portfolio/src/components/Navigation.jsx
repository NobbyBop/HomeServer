import SnavLink from "./SnavLink";
import { NavLink } from "react-router-dom";
function Navigation({displayName=false}) {
  const activeClass = "text-blue-600 underline"
  const inactiveClass = "hover:underline"
  return (
    <>
      {displayName && <NavLink className="font-bold" to={"/"}>Nicholas Mirigliani</NavLink>}
      <nav className="flex gap-4">
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

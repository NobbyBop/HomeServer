import SnavLink from "./SnavLink";
function Navigation() {
  const activeClass = "text-blue-600 underline"
  const inactiveClass = "hover:underline"
  return (
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
      <SnavLink
        to="/photography"
        className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
      >
        Photography
      </SnavLink>
    </nav>
  );
}

export default Navigation;

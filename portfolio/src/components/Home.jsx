import { NavLink } from "react-router-dom";
import Navigation from "./Navigation";
function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 font-serif">
      <NavLink to={"/"}>Nicholas Mirigliani</NavLink>
      <Navigation/>
      <img
        className="w-full max-w-3xs"
        src="/images/me.JPEG"
      />
      <p className="max-w-1/2">
        Insert a long piece of text here.
      </p>

      <div className="flex gap-2">
        <a target="_blank" href="https://www.youtube.com/@nobbybop">
          YouTube
        </a>
        <a target="_blank" href="https://www.instagram.com/nick.mirig/">
          Instagram
        </a>
        <a
          target="_blank"
          href="https://www.linkedin.com/in/nicholas-mirigliani/"
        >
          LinkedIn
        </a>
        <a target="_blank" href="https://github.com/NobbyBop">
          GitHub
        </a>
        <a target="_blank" href="/Resume.pdf">
          Résumé
        </a>
      </div>
    </div>
  );
}
export default Home;

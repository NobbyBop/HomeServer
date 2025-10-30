import { NavLink } from "react-router-dom";
import Navigation from "./Navigation";
function Home() {
  return (
    <div className={`bg-rose-400 bg-[url('/images/backgrounds/EUPHORIA_RUN.png')] bg-position-[center_top_20%]`}>
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 font-[Courier_New]">
      <div className="text-2xl"><Navigation displayName="true"/></div>
      <img
        className="w-full lg:max-w-1/3 md:max-w-1/2"
        src="/images/me_frame_shadow.png"
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
    </div>
  );
}
export default Home;

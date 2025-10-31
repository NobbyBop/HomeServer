import Navigation from "./Navigation";
function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 font-[Courier_New]">
      <div><Navigation displayName="true" underline="false"/></div>
      <img
        className="w-full lg:max-w-1/3 md:max-w-1/2"
        src="/images/me_frame_shadow.png"
      />
      <p className="max-w-1/2">
        Insert a long piece of text here.
      </p>

      <div className="flex gap-2">
        <a className="hover:underline" target="_blank" href="https://www.youtube.com/@nobbybop">
          YouTube
        </a>
        <a className="hover:underline" target="_blank" href="https://www.instagram.com/nick.mirig/">
          Instagram
        </a>
        <a className="hover:underline" target="_blank" href="https://www.linkedin.com/in/nicholas-mirigliani/"
        >
          LinkedIn
        </a>
        <a  className="hover:underline" target="_blank" href="https://github.com/NobbyBop">
          GitHub
        </a>
        <a className="hover:underline" target="_blank" href="/Resume.pdf">
          Résumé
        </a>
      </div>
    </div>
  );
}
export default Home;

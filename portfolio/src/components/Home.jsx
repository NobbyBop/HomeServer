import Navigation from "./Navigation";
function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4 font-[monospace] bg-cover" 
    style={{ backgroundImage: "url('images/HomeBG3.webp')", backgroundPosition: 'top' }}>
      <div><Navigation displayName="true" underline="false"/></div>

      <div className="grid lg:grid-cols-2 border-2 border-gray-200 bg-white/50 p-4 lg:max-w-1/2 md:max-w-1/2 gap-4">
        <img
          className="w-full border-2"
          src="/images/me.webp"
        />
        <p> Hi and welcome! I'm Nick, a software developer and artist (among other things) from {" "}
          <a href="https://en.wikipedia.org/wiki/Wilkes-Barre,_Pennsylvania"
          target="_blank"
          className="text-blue-600 hover:underline">
            Wilkes-Barre, Pennsylvania
            </a>{". "} 
          My technical background includes web development, building AI agents, and systems programming. 
          I'm a problem solver and love working with new technologies. I'm currently pursuing my B.S. in Computer Science from Stevens Institute of Technology. For more information, please see my {" "}
          <a 
          href="/Resume.pdf"
          target="_blank"
          className="text-blue-600 hover:underline">
          résumé
          </a>
          {". "} Otherwise, please feel free to send me an email at {" "}
          <a href="mailto:nicholasmirigliani@gmail.com"
          target="_blank"
          className="text-blue-600 hover:underline">
            nicholasmirigliani@gmail.com
            </a>{". "} 
          <br/>
          In my creative work, I mainly use pen, collage, and photography. I dabble in digital art, and as you'll see
          I tend to work across mediums in my projects. I'm also pursing a minor in Visual Arts & Technology.
          <br/>
          When I'm not developing or making art, I enjoy running (I completed my first marathon in Jersey City this spring), playing 
          guitar, and watching sitcoms.
          <br/>
          I maintain and host this website myself on my Raspberry Pi, so if you see any issues, let me know!
          </p>
      </div>

      <div className="flex gap-4">
        <a className="hover:underline" target="_blank" href="https://www.instagram.com/nick.mirig/">
          Instagram
        </a>
        <a className="hover:underline" target="_blank" href="https://www.linkedin.com/in/nicholas-mirigliani/">
          LinkedIn
        </a>
        <a className="hover:underline" target="_blank" href="https://github.com/NobbyBop">
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
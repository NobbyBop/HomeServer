import Navigation from "../Navigation";
import SnavLink from "../SnavLink";
function Art() {
  let projects = [
    {
      id: 0,
      title: "\"Orange Season\"",
      description: "An homage to my favorite fruit. An exploration the form of an orange in public spaces. Here comes the \"Orange Season\" .",
      medium: "Photography",
      date: "2025",
      link: "/art/orangeseason",
              image: `/photos/OrangeSeason/thumbnail.JPG`,
    },
    {
      id: 1,
      title: "Sketchbook",
      description: "Some of my favorite sketches, old and new.",
      medium: "Ballpoint pen",
      date: "2022-Present",
      link: "/art/sketchbook",
              image: `/sketchbook/thumbnail.JPG`,
    },
    {
      id: 2,
      title: "\"The 'ATTENTION!' Experience\"",
      description:
        "This page is a digital presentation of my multi-media, multi-layered project called 'ATTENTION!' Originally an in-person, interactive experience.",
      medium: "Multimedia",
      date: "2024",
      link: "/art/attention",
              image: `/attention/thumbnail.png`,
    },
    {
      id: 3,
      title: "\"MOBIUS LINE\"",
      description:
        "An ARG (Augmented Reality Game) co-developed with Sumner Badzik. Players had to solve the mystery of MOBIUS LINE's unreleased song.",
      medium: "Multimedia",
      date: "2024",
      link: "/art/mobiusline",
              image: `/mobius/thumbnail.jpg`,
    },
    {
      id: 4,
      title: "\"WORLDLY\"",
      description:
        "A zine about my experience with materialism, overconsumption, and identity.",
      medium: "Ballpoint pen and collage",
      date: "2023",
      link: "/art/worldly",
              image: `/worldly/thumbnail.JPG`,
    },
    {
      id: 5,
      title: "\"On Comfort...\"",
      description: "A series of drawings exploring the concept of comfort.",
      medium: "Ink",
      date: "2024",
      link: "/art/comfort",
              image: `/comfort/thumbnail.JPG`,
    },
    {
      id: 6,
      title: "Photography",
      description: "General photography.",
      medium: "guess",
      date: "Ongoing",
      link: "/art/photography",
              image: `/photos/thumbnail.JPG`,
    }
  ];
  return (
    <div className={`bg-cover bg-center p-4`} 
    style={{ backgroundImage: "url('images/HomeBG2.png')", backgroundPosition: "center" }}>
    <div className="flex flex-col items-center min-h-screen font-[monospace]">
      <div><Navigation displayName="true" underline="false"/></div>

      <div className="grid lg:grid-cols-2 lg:max-w-3/4 gap-4">
        {projects.map((project) => (
          <SnavLink to={project.link}>
          <div className="flex flex-col border-2 border-gray-200 hover:border-black bg-white/50 p-4" key={project.id}>

            <div className="text-center text-2xl">
              <h2 className="font-bold">{project.title} </h2>
            </div>

            <div className="lg:grid grid-cols-2">
              <div className="justify-left">
                <p className="text-gray-600">{project.description}</p>
                <p className="">
                  <b>Medium</b>: {project.medium}
                </p>
                <p className="">
                  <b>Date</b>: {project.date}
                </p>
              </div>

              <div>
                  <img className="w-full max-w-3xs border-2" src={project.image} />
              </div>

            </div>
            
          </div>
          </SnavLink>
        ))}
      </div>
    </div>
    </div>
  );
}
export default Art;

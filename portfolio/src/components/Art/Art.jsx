import Navigation from "../Navigation";
import SnavLink from "../SnavLink";
function Art() {
  let projects = [
    {
      id: 0,
      title: "The 'ATTENTION!' Experience",
      description:
        "This page is a digital presentation of my multi-media, multi-layered project called 'ATTENTION!' Originally an in-person, interactive experience.",
      medium: "Multimedia",
      date: "2024",
      link: "/art/attention",
              image: `/attention/thumbnail.png`,
    },
    {
      id: 1,
      title: "MOBIUS LINE",
      description:
        "An ARG (Augmented Reality Game) co-developed with Sumner Badzik. Players had to solve the mystery of MOBIUS LINE's unreleased song.",
      medium: "Multimedia",
      date: "2024",
      link: "/art/mobiusline",
              image: `/mobius/thumbnail.jpg`,
    },
    {
      id: 2,
      title: "'On Comfort...'",
      description: "A series of drawings exploring the concept of comfort.",
      medium: "Ink",
      date: "2024",
      link: "/art/comfort",
              image: `/comfort/thumbnail.JPG`,
    },
    {
      id: 3,
      title: "'WORLDLY'",
      description:
        "A zine about my experience with materialism, overconsumption, and identity.",
      medium: "Ballpoint pen and collage",
      date: "2023",
      link: "/art/worldly",
              image: `/worldly/thumbnail.JPG`,
    },
    {
      id: 4,
      title: "Sketchbook",
      description: "Some of my favorite sketches, old and new.",
      medium: "Ballpoint pen",
      date: "2022-Present",
      link: "/art/sketchbook",
              image: `/sketchbook/thumbnail.JPG`,
    },
    {
      id: 5,
      title: "Photography",
      description: "General photography.",
      medium: "guess",
      date: "Ongoing",
      link: "/art/photography",
              image: `photos/24-12-23-a.JPG`,
    }
  ];
  return (
    <div className={`bg-[url()] bg-center p-4`}>
    <div className="flex flex-col items-center min-h-screen font-[Courier_New]">
      <div><Navigation displayName="true" underline="false"/></div>

      <div className="grid lg:grid-cols-2 lg:max-w-3/4 gap-4">
        {projects.map((project) => (
          <div className="flex flex-col border-2 bg-white p-4" key={project.id}>
            <div className="text-center text-2xl">
              <h2>
                <SnavLink to={project.link} className="font-bold">{project.title}</SnavLink>
                <br></br>
              </h2>
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
        ))}
      </div>
    </div>
    </div>
  );
}
export default Art;

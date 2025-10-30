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
    <div className="flex flex-col items-center justify-center min-h-screen font-[Courier_New]">
      <Navigation displayName="true"/>
      <div className="flex flex-col gap-4 lg:max-w-1/3 sm:max-w-1/2">
        {projects.map((project) => (
          <div className="flex flex-col border-2 items-center bg-white" key={project.id}>
            <h2>
              <SnavLink to={project.link} className="font-bold">{project.title}</SnavLink>
            </h2>
            <p className="">{project.description}</p>
            <p className="">
              <b>Medium</b>: {project.medium}
            </p>
            <p className="">
              <b>Date</b>: {project.date}
            </p>
            <img className="w-full max-w-3xs" src={project.image} />
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
export default Art;

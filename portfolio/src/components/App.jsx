import { Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import Home from "./Home";
import Art from "./Art/Art";
import Art_Attention from "./Art/Attention/Art_Attention";
import Art_Attention_Packet from "./Art/Attention/Art_Attention_Packet";
import Art_Attention_Presentation from "./Art/Attention/Art_Attention_Presentation";
import Art_Attention_Participants from "./Art/Attention/Art_Attention_Participants";
import GalleryPage from "./GalleryPage";

const comfortConfig = {
  title: "On Comfort...",
  description: `"On Comfort..." is a series of 6 drawings I did over 2024. My initial concept, as you'll see below, was to capture the feeling of those places that we grow comfortable in, especially those that we'll never see again. A dorm room, a friend's apartment. This expanded to exploring the feeling of comfort across a range of situations. Comfortability in your own skin, comfortability in your mind. This project ultimately strayed away from that initial concept but resulted in a distinct set of drawings regardless.`,
  imageFolder: "/comfort/",
  showCaptions: true,
  items: [
    {
      id: 1,
      title: "3",
      image: `/comfort/1.JPG`,
      comment: "The comfort of my college bedroom which I have since left.",
    },
    {
      id: 2,
      title: ".5",
      image: `/comfort/2.JPG`,
      comment:
        "Looking in the mirror for too long and feeling like an alien, uncomfortable in my own skin.",
    },
    {
      id: 3,
      title: "Overwhelm",
      image: `/comfort/3.JPG`,
      comment:
        "Realizing all the things you don't know about the world. How can you find comfort when you'll never know everything?",
    },
    {
      id: 4,
      title: "'Hold on' and a journal entry",
      image: `/comfort/4.JPG`,
      comment: "Comfort in romantic partners who aren't in your life forever.",
    },
    {
      id: 5,
      title: "Chaos/Comfort",
      image: `/comfort/5.JPG`,
      comment: "Struggling to find comfort amid anxiety.",
    },
    {
      id: 6,
      title: "Coping/Winning",
      image: `/comfort/6.JPG`,
      comment: "The comfort of coping mechanisms, positive or not.",
    },
    {
      id: 7,
      title: "Concept",
      image: `/comfort/concept.JPG`,
      comment: "My initial planning.",
    },
  ],
};

const worldlyConfig = {
  title: "WORLDLY",
  description: `WORLDLY is a zine I worked on at the end of 2023. It was a time I felt that I had been consumed with worries of career and social status. I noticed my own departure from philisophical and spiritual contemplation, and wanted to express the shallowness of materialism and commercialism. This was my (somewhat successful) attempt to reshift my focus to things that really matter.`,
  imageFolder: "/worldly/",
  showCaptions: true,
  items: [
    {
      id: 1,
      title: "Cover",
      image: `/worldly/1.JPG`,
      comment: "",
    },
    {
      id: 2,
      title: "Page 1",
      image: `/worldly/2.JPG`,
      comment: "",
    },
    {
      id: 3,
      title: "Page 2",
      image: `/worldly/3.JPG`,
      comment: "",
    },
    {
      id: 4,
      title: "Page 3",
      image: `/worldly/4.JPG`,
      comment: "",
    },
    {
      id: 5,
      title: "Page 4",
      image: `/worldly/5.JPG`,
      comment: "",
    },
    {
      id: 6,
      title: "Page 5",
      image: `/worldly/6.JPG`,
      comment: "",
    },
    {
      id: 7,
      title: "Page 6",
      image: `/worldly/7.JPG`,
      comment: "",
    },
    {
      id: 8,
      title: "Page 7",
      image: `/worldly/8.JPG`,
      comment: "",
    },
    {
      id: 9,
      title: "Concept",
      image: `/worldly/concept.JPG`,
      comment: "",
    },
  ],
};

const sketchbookConfig = {
  title: "Sketchbook",
  description: `These are some of my favorite sketches I've done on over the past few years (starting circa 2022). Most are done in ballpoint pen, although some use other kinds of ink pens. This sketchbook has been a primary emotional outlet for me for the past few years, and these pieces articulate the sense of style I've developed over that time.`,
  imageFolder: "/sketchbook/",
  showCaptions: true,
  items: [
    {
      id: 1,
      title: "Birthday Art at Pier C",
      image: `/sketchbook/BIRTHDAY.JPG`,
      comment: "",
    },
    {
      id: 2,
      title: "BLOOM II",
      image: `/sketchbook/BLOOM_II.JPG`,
      comment: "",
    },
    {
      id: 3,
      title: "BOXED IN",
      image: `/sketchbook/BOXED_IN.JPG`,
      comment: "",
    },
    {
      id: 4,
      title: "Chairs",
      image: `/sketchbook/CHAIRS.JPG`,
      comment: "",
    },
    {
      id: 5,
      title: "The Concert",
      image: `/sketchbook/CONCERT.JPG`,
      comment: "",
    },
    {
      id: 6,
      title: "Euphoria Run",
      image: `/sketchbook/EUPHORIA_RUN.JPG`,
      comment: "My favorite place to go for runs back home in Forty-Fort, PA.",
    },
    {
      id: 7,
      title: "On Being A Real Human",
      image: `/sketchbook/HUMAN.JPG`,
      comment: "",
    },
    {
      id: 8,
      title: "LONG",
      image: `/sketchbook/LONG.JPG`,
      comment: "",
    },
    {
      id: 9,
      title: "ORANGE SEASON 2",
      image: `/sketchbook/OS2.JPG`,
      comment:
        "The most recent sketch of mine relating to ORANGE SEASON, a concept album I wrote over a few years (never recorded).",
    },
    {
      id: 10,
      title: "PEER",
      image: `/sketchbook/PEER.JPG`,
      comment: "",
    },
    {
      id: 11,
      title: "Front Yard Plant",
      image: `/sketchbook/PLANT.JPG`,
      comment: "",
    },
    {
      id: 12,
      title: "SAD",
      image: `/sketchbook/SAD.JPG`,
      comment: "",
    },
    {
      id: 13,
      title: "Spotlight",
      image: `/sketchbook/SPOTLIGHT.JPG`,
      comment: "",
    },
    {
      id: 14,
      title: "'She looks like Susan.'",
      image: `/sketchbook/SUSAN.JPG`,
      comment:
        "My favorite line from the movie 'Tick, Tick... Boom!' Appears in the song titled 'Swimming.'",
    },
    {
      id: 15,
      title: "UGH!",
      image: `/sketchbook/UGH.JPG`,
      comment: "",
    },
  ],
};

const mobiusConfig = {
  title: "",
  description: (
    <>
      MOBIUS LINE is an ARG (Augmented Reality Game) that I co-created with
      Sumner Badzik. This project involved creating branding and marketing for
      our fictitious band MOBIUS LINE, as well as constructing a narrative which
      is scattered across multiple social media platforms and accounts.
      Originally, posters (seen below) were hung around the neighborbood,
      linking to the start of the game.On this page I have included some of the
      graphic design work I did for the project, as well as some of our band
      photos, taken by Andrew Yurovchak. I hope you'll take a little time to
      explore the game{" "}
      <a
        className="text-blue-700"
        target="_blank"
        href="https://m.youtube.com/watch?v=VJmVcI-avlE"
      >
        here
      </a>
      .
    </>
  ),
  imageFolder: "/mobius/",
  showCaptions: true,
  headerImages: [
    { src: "/mobius/Logo2.jpg", className: "max-w-1/2" },
    { src: "/mobius/croppedbeatles.png", className: "max-w-1/2" },
  ],
  items: [
    {
      id: 2,
      title: "Mercury Lounge Poster",
      image: `/mobius/Mercury_Lounge.jpg`,
      comment: "",
    },
    {
      id: 3,
      title: "Tractor Tavern Poster",
      image: `/mobius/Tractor_Tavern.jpg`,
      comment: "",
    },
    {
      id: 4,
      title: "Grey Eagle Poster",
      image: `/mobius/Grey_Eagle.jpg`,
      comment: "",
    },
    {
      id: 1,
      title: "QR Code",
      image: `/mobius/QR.jpg`,
      comment: "",
    },
    {
      id: 5,
      title: "Promotional Image 1",
      image: `/mobius/elevator.png`,
      comment: "",
    },
    {
      id: 6,
      title: "Promotional Image 4",
      image: `/mobius/climb.png`,
      comment: "",
    },
  ],
};

const photographyConfig = {
  title: "PHOTOGRAPHY",
  description: "Taken on a Canon PowerShot ELPH 190 IS. (Most recent to oldest.)",
  imageFolder: "/photos/",
  showCaptions: false,
  items: [
    "25-01-27-d.JPG",
    "25-01-27-c.JPG",
    "25-01-27-b.JPG",
    "25-01-27-a.JPG",
    "25-01-26-b.JPG",
    "25-01-26-a.JPG",
    "25-01-18-c.JPG",
    "25-01-18-b.JPG",
    "25-01-18-a.JPG",
    "25-01-04-c.JPG",
    "25-01-04-b.JPG",
    "25-01-04-a.JPG",
    "24-12-23-a.JPG",
    "24-12-15-a.JPG",
    "24-10-06-c.JPG",
    "24-10-06-b.JPG",
    "24-10-06-a.JPG",
    "24-09-21-e.JPG",
    "24-09-21-d.JPG",
    "24-09-21-c.JPG",
    "24-09-21-b.JPG",
    "24-09-21-a.JPG",
    "24-09-14-h.JPG",
    "24-09-14-g.JPG",
    "24-09-14-e.JPG",
    "24-09-14-d.JPG",
    "24-09-14-b.JPG",
    "24-09-14-a.JPG",
    "24-09-07-e.JPG",
    "24-09-07-d.JPG",
    "24-09-07-c.JPG",
    "24-09-07-b.JPG",
    "24-09-07-a.png",
  ],
};

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/art" element={<Art />} />
        <Route path="/art/sketchbook" element={<GalleryPage {...sketchbookConfig} />} />
        <Route path="/art/comfort" element={<GalleryPage {...comfortConfig} />} />
        <Route path="/art/worldly" element={<GalleryPage {...worldlyConfig} />} />
        <Route path="/art/attention" element={<Art_Attention />} />
        <Route
          path="/art/attention/packet"
          element={<Art_Attention_Packet />}
        />
        <Route
          path="/art/attention/presentation"
          element={<Art_Attention_Presentation />}
        />
        <Route
          path="/art/attention/participants"
          element={<Art_Attention_Participants />}
        />
        <Route path="/art/mobiusline" element={<GalleryPage {...mobiusConfig} />} />
        <Route path="/photography" element={<GalleryPage {...photographyConfig} />} />
      </Routes>
    </div>
  );
}

export default App;

// Imports image lists from JSON, and then I can add hardcoded things like descriptions, etc.

import attentionPacket from "../config/attentionPacket.json"
import attentionParticipants from "../config/attentionParticipants.json"
import attentionPresentation from "../config/attentionPresentation.json"
import mobius from "../config/mobius.json"
import orange from "../config/orange.json"
import photos from "../config/photos.json"
import sketchbook from "../config/sketchbook.json"
import worldly from "../config/worldly.json"

import SnavLink from "../components/SnavLink"

export const attentionPacketConfig = {
  title: "PART TWO: THE BOOK",
  description: 
  ( 
  <>
    <p>PLEASE FIND THE PAGES OF THE INSTRUCTION BOOK BELOW.</p>
    <p className="text-blue-600 hover:underline"><SnavLink to="/art/attention/">BACK TO MAIN PAGE</SnavLink></p>
  </>
  ),
  imageFolder: "/attention/packet_pages/",
  showCaptions: false,
  // font:"roboto",
  headerImages: [
    {
      src: "/attention/title.webp",
      className: "lg:max-w-1/2"
    }
  ],
  items: attentionPacket
}

export const attentionParticipantsConfig = {
  title: "PART SIX: THE PARTICIPANTS",
  description: 
  ( 
  <>
    <p>PLEASE FIND THE PARTICIPANTS' RESPONSES BELOW.</p>
    <p className="text-blue-600 hover:underline"><SnavLink to="/art/attention/">BACK TO MAIN PAGE</SnavLink></p>
  </>
  ),
  imageFolder: "/attention/participants/",
  showCaptions: false,
  // font:"roboto",
  headerImages: [
    { src: "/attention/title.webp", 
        className: "lg:max-w-1/2" 
    }
  ],
  items: attentionParticipants
}

export const attentionPresentationConfig = {
  title: "PART THREE: THE USB",
  description: 
  ( 
  <>
    <p>PLEASE FIND THE SLIDES OF THE PRESENTATION BELOW.</p>
    <p className="text-blue-600 hover:underline"><SnavLink to="/art/attention/">BACK TO MAIN PAGE</SnavLink></p>
  </>
  ),
  imageFolder: "/attention/presentation_slides/",
  showCaptions: false,
  // font:"roboto",
  headerImages: [
    {
        src: "/attention/title.webp", 
        className: "lg:max-w-1/2" 
    }
  ],
  items: attentionPresentation
}
export const mobiusConfig = {
  title: "",
  description: (
    <>
      <br/>
      MOBIUS LINE is an ARG (Augmented Reality Game) that I co-created with
      Sumner Badzik. This project involved creating branding and marketing for
      our fictitious band MOBIUS LINE, as well as constructing a narrative which
      is scattered across multiple social media platforms and accounts.
      Originally, posters (seen below) were hung around the neighborbood,
      linking to the start of the game. On this page I have included some of the
      graphic design work I did for the project, as well as some of our band
      photos, taken by <a
        className="text-blue-600"
        target="_blank"
        href="https://photos.baetylboy.biz"
      >Andrew Yurovchak</a>. I hope you'll take a little time to
      explore the game{" "}
      <a
        className="text-blue-600"
        target="_blank"
        href="https://m.youtube.com/watch?v=VJmVcI-avlE"
      >
        here
      </a>
      .
      <br/>
      <br/>
    </>
  ),
  imageFolder: "/mobius/",
  showCaptions: false,
  headerImages: [
    { src: "/mobius/headings/Logo2.webp", className: "" },
    { src: "/mobius/headings/croppedbeatles.webp", className: "" },
  ],
  items: mobius,
  backgroundClass: "bg-center bg-repeat",
  backgroundImageUrl: "/images/MobiusBG.webp"
};

export const orangeConfig = {
  title: "\"ORANGE SEASON\"",
  description: "\"ORANGE SEASON\" is a photo collection of oranges in public spaces. I rode my bike through parks, along the river, and through my neighborhood, and photographed a few oranges that I carried with me.",
  imageFolder:"/photos/OrangeSeason/",
  showCaptions: false,
  items: orange,
  backgroundClass: "bg-fixed bg-center",
  backgroundImageUrl:"/images/LandingBG_Mobile.webp"
}

export const photographyConfig = {
  title: "PHOTOGRAPHY",
  description: "Photos taken on a Canon PowerShot ELPH 190 IS - an old (circa 2010) digital camera - and LUMIX ZS99.",
  imageFolder: "/photos/",
  showCaptions: false,
  items: photos.reverse(),
  backgroundImageUrl:"/images/PhotosBG2.webp",
  backgroundClass:"bg-fixed bg-center",
};

export const sketchbookConfig = {
  title: "Sketchbook",
  description: "My favorite sketches, mostly done in ballpoint pen, with some exceptions. The goal is to draw and improvise to fix mistakes.",
  imageFolder: "/sketchbook/",
  showCaptions: false,
  items: sketchbook,
  backgroundClass:"bg-center bg-repeat",
  backgroundImageUrl:"/images/SketchbookBG.webp"
}

export const comfortConfig = {
    title: "On Comfort...",
    description: "My initial concept, as you'll see below, was to capture the feeling of those places that we grow comfortable in, especially those that we'll never see again. A dorm room, a friend's apartment. This expanded to exploring the feeling of comfort across a range of situations. Comfortability in your own skin, comfortability in your mind, etc.",
    imageFolder: "/comfort/",
    showCaptions: true,
    items: [
        {
            id: 1,
            title: "3",
            image: "/comfort/1.webp",
            comment: "The comfort of my college bedroom which I have since left."
        },
        {
            id: 2,
            title: ".5",
            image: "/comfort/2.webp",
            comment: "Looking in the mirror for too long and feeling like an alien, uncomfortable in my own skin."
        },
        {
            id: 3,
            title: "Overwhelm",
            image: "/comfort/3.webp",
            comment: "Realizing all the things you don't know about the world. How can you find comfort when you'll never know everything?"
        },
        {
            id: 4,
            title: "'Hold on' and a journal entry",
            image: "/comfort/4.webp",
            comment: "Comfort in romantic partners who aren't in your life forever."
        },
        {
            id: 5,
            title: "Chaos/Comfort",
            image: "/comfort/5.webp",
            comment: "Struggling to find comfort amid anxiety."
        },
        {
            id: 6,
            title: "Coping/Winning",
            image: "/comfort/6.webp",
            comment: "The comfort of coping mechanisms, positive or not."
        },
        {
            id: 7,
            title: "Concept",
            image: "/comfort/concept.webp",
            comment: "My initial planning."
        }
    ],
    backgroundImageUrl:"/images/ComfortBG.webp",
    backgroundClass:"bg-center bg-repeat"
}

export const worldlyConfig = {
    title: "WORLDLY",
    description: "A zine.",
    imageFolder: "/worldly/",
    showCaptions: false,
    items: worldly,
    backgroundImageUrl: "/images/WorldlyBG.webp",
    backgroundClass: "bg-fixed bg-center"
}
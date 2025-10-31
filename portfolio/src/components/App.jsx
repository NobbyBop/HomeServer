import { Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import Home from "./Home";
import Art from "./Art/Art";
import Art_Attention from "./Art/Art_Attention";
import GalleryPage from "./GalleryPage";
import photoList from "../json/photos.json"
import sketchbookConfig from "../json/sketchbook.json"
import comfortConfig from "../json/comfort.json"
import worldlyConfig from "../json/worldly.json";
import mobiusItems from "../json/mobius.json"
import attentionPacketConfig from "../json/attention_packet.json"
import attentionParticipantsConfig from "../json/attention_participants.json"
import attentionPresentationConfig from "../json/attention_presentation.json"

const mobiusConfig = {
  title: "",
  description: (
    <>
      <br/>
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
      <br/>
      <br/>
    </>
  ),
  imageFolder: "/mobius/",
  showCaptions: true,
  headerImages: [
    { src: "/mobius/Logo2.jpg", className: "" },
    { src: "/mobius/croppedbeatles.png", className: "" },
  ],
  items: mobiusItems,
};

const photographyConfig = {
  title: "PHOTOGRAPHY",
  description: "Taken on a Canon PowerShot ELPH 190 IS. (Most recent to oldest.)",
  imageFolder: "/photos/",
  showCaptions: false,
  items: photoList
};

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/art" element={<Art />} />
        <Route path="/art/photography" element={<GalleryPage {...photographyConfig} />} />
        <Route path="/art/sketchbook" element={<GalleryPage {...sketchbookConfig} />} />
        <Route path="/art/comfort" element={<GalleryPage {...comfortConfig} />} />
        <Route path="/art/worldly" element={<GalleryPage {...worldlyConfig} />} />
        <Route path="/art/attention" element={<Art_Attention />} />
        <Route path="/art/attention/packet" element={<GalleryPage {...attentionPacketConfig} />} />
        <Route path="/art/attention/presentation" element={<GalleryPage {...attentionPresentationConfig} />} />
        <Route path="/art/attention/participants" element={<GalleryPage {...attentionParticipantsConfig} />} />
        <Route path="/art/mobiusline" element={<GalleryPage {...mobiusConfig} />} />
       
      </Routes>
    </div>
  );
}

export default App;

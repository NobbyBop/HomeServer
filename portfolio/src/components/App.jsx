import { Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import Home from "./Home";
import Art from "./Art/Art";
import Art_Attention from "./Art/Art_Attention";
import GalleryPage from "./GalleryPage";
import Professional from "./Professional"
import { 
  attentionPacketConfig, 
  attentionParticipantsConfig, 
  attentionPresentationConfig,
  comfortConfig,
  mobiusConfig, 
  orangeConfig,
  photographyConfig, 
  sketchbookConfig,
  worldlyConfig
 } from "../config/config";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/professional" element={<Professional/>}/>
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
        <Route path="art/orangeseason" element={<GalleryPage {...orangeConfig}/>}/>
       
      </Routes>
    </div>
  );
}

export default App;

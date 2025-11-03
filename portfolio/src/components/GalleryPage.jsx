import Navigation from "./Navigation";
import { useEffect, useState } from "react";

function GalleryPage({
  title,
  description,
  items,
  imageFolder,
  backgroundImageUrl,
  backgroundClass,
  headerImages = [],
  showCaptions = true,
  font = "monospace"
}) {

  let [imageToZoom, setImageToZoom] = useState("")
  let [zoomed, setZoomed] = useState(false);

  function handleZoom(wantToZoom, imageToSet){
    if(wantToZoom && imageToSet != imageToZoom){
      setImageToZoom(imageToSet);
    }
    setZoomed(wantToZoom)
    document.body.style.overflow = wantToZoom ? 'hidden' : 'auto';

  }

  return (
    <div
      className={`p-4  ${backgroundClass || ""}`}
      style={backgroundImageUrl ? { backgroundImage: `url(${backgroundImageUrl})` } : {}}
    >

    {zoomed && (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/20 cursor-pointer"
        onClick={() => handleZoom(false, imageToZoom)}>
        <img src={imageToZoom} className=" border-2 lg:max-h-screen"></img>
      </div>
      )}

    <div className={`flex flex-col items-center justify-center min-h-screen font-[${font}]`}>
    <div className=" lg:max-w-5/8 flex flex-col items-center">
      <div><Navigation displayName="true"/></div>

      <div className="p-2"></div>

      {headerImages.map((img, index) => (
        <img key={index} className={img.className} src={img.src} />
      ))}

      <h2 className="font-bold text-3xl">{title}</h2>
      <p className="text-lg lg:max-w-3/4">{description}</p>

      <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-4">
        {showCaptions ? (
          items.map((project) => (
            <div className="border-2" key={project.id}>
              <img onClick={() => handleZoom(true, project.image)} className="border-b-2 cursor-pointer" src={project.image} />
              <div className="p-4">
                <h2 className="font-bold text-2xl">{"\""+project.title+"\""}</h2>
                <p className="text-gray-600">{project.comment}</p>
              </div>
            </div>
          ))
        ) : (
          items.map((name, index) => <img onClick={() => handleZoom(true, imageFolder+name)} className="border-2 cursor-pointer"key={index} src={`${imageFolder}${name}`} />)
        )}
      </div>
    </div>
    </div>
    </div>
  );
}

export default GalleryPage;

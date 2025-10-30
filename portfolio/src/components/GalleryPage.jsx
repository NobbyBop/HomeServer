import Navigation from "./Navigation";
import { NavLink } from "react-router-dom";

function GalleryPage({
  title,
  description,
  items,
  imageFolder,
  backgroundImageUrl,
  headerImages = [],
  showCaptions = true,
}) {
  return (
    <div className={`bg-[url('${backgroundImageUrl}')] bg-center p-4`}>
    <div className="flex flex-col items-center justify-center min-h-screen font-[Courier_New]">
      <Navigation displayName="true"/>
      {headerImages.map((img, index) => (
        <img key={index} className={img.className} src={img.src} />
      ))}

      <h2 className="font-bold text-3xl">{title}</h2>
      <p className="lg:max-w-1/2">{description}</p>

      <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-4 md:max-w-1/2 lg:max-w-1/2">
        {showCaptions ? (
          items.map((project) => (
            <div className="border-2" key={project.id}>
              <img src={project.image} />
              <h2 className="font-bold text-2xl">{"\""+project.title+"\""}</h2>
              <p className="text-gray-500">{project.comment}</p>
            </div>
          ))
        ) : (
          items.map((name, index) => <img key={index} src={`${imageFolder}${name}`} />)
        )}
      </div>
    </div>
    </div>
  );
}

export default GalleryPage;

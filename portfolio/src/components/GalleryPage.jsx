import Navigation from "./Navigation";
import { NavLink } from "react-router-dom";

function GalleryPage({
  title,
  description,
  items,
  imageFolder,
  headerImages = [],
  showCaptions = true,
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-serif gap-4 p-4">
      <Navigation displayName="true"/>
      {headerImages.map((img, index) => (
        <img key={index} className={img.className} src={img.src} />
      ))}

      <h2 className="font-bold text-3xl">{title}</h2>
      <p className="lg:max-w-1/2">{description}</p>

      <div className="flex flex-col gap-4 md:max-w-1/2 lg:max-w-1/3">
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
  );
}

export default GalleryPage;

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
    <div className="flex flex-col items-center justify-center min-h-screen font-serif gap-4">
      <NavLink to={"/"}>Nicholas Mirigliani</NavLink>
      <Navigation />

      {headerImages.map((img, index) => (
        <img key={index} className={img.className} src={img.src} />
      ))}

      <h2>{title}</h2>
      <p className="max-w-1/2">{description}</p>

      <div className="flex flex-col gap-4 max-w-1/2">
        {showCaptions ? (
          items.map((project) => (
            <div className="border-2" key={project.id}>
              <img src={project.image} />
              <h2>{project.title}</h2>
              <p>{project.comment}</p>
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

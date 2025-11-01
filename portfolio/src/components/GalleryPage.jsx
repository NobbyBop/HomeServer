import Navigation from "./Navigation";

function GalleryPage({
  title,
  description,
  items,
  imageFolder,
  backgroundImageUrl,
  backgroundColor,
  fontColor,
  headerImages = [],
  showCaptions = true,
  font = "monospace"
}) {
  return (
    <div
      className={`p-4 bg-center bg-repeat-y ${backgroundColor || ""} ${fontColor || ""}`}
      style={backgroundImageUrl ? { backgroundImage: `url(${backgroundImageUrl})` } : {}}
    >
    <div className={`flex flex-col items-center justify-center min-h-screen font-[${font}]`}>
    <div className=" lg:max-w-3/5 flex flex-col items-center">
      <div><Navigation displayName="true"/></div>

      <div className="p-4"></div>

      {headerImages.map((img, index) => (
        <img key={index} className={img.className} src={img.src} />
      ))}

      <h2 className="font-bold text-3xl">{title}</h2>
      <p className="lg:text-2xl">{description}</p>

      <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-4">
        {showCaptions ? (
          items.map((project) => (
            <div className="border-2" key={project.id}>
              <img className="border-b-2" src={project.image} />
              <div className="p-4">
                <h2 className="font-bold text-2xl">{"\""+project.title+"\""}</h2>
                <p className="text-gray-600">{project.comment}</p>
              </div>
            </div>
          ))
        ) : (
          items.map((name, index) => <img className="border-2"key={index} src={`${imageFolder}${name}`} />)
        )}
      </div>
    </div>
    </div>
    </div>
  );
}

export default GalleryPage;

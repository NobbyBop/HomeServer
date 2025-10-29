import Navigation from "./Navigation";
function Landing() {
  return (
    <div className={`bg-[url('/images/backgrounds/EUPHORIA_RUN.JPG')] bg-position-[center_top_20%] `}>
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 font-serif">
      <Navigation displayName="true"/>
    </div>
    </div>
  );
}
export default Landing;

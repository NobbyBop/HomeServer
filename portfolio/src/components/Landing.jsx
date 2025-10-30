import Navigation from "./Navigation";
function Landing() {
  return (
    <div className={`bg-orange-300 bg-[url('/images/backgrounds/PLANT.png')]`}>
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 font-[Courier_New] text-2xl">
      <Navigation displayName="true"/>
    </div>
    </div>
  );
}
export default Landing;

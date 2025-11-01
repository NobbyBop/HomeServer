import Navigation from "./Navigation";
function Landing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 font-[monospace] lg:bg-[url('images/LandingBG_Desktop.png')] bg-[url('images/LandingBG_Mobile.png')]  bg-cover bg-[center_10%]">
      <div className="flex flex-col items-center justify-center gap-0">
        <h1 className="font-bold text-2xl">NICHOLAS MIRIGLIANI</h1>
        <h2 className="text-gray-500">dot com</h2>
      </div>
      <Navigation underline="false"/>
    </div>
  );
}
export default Landing;

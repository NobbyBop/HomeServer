import Navigation from "./Navigation";
function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4 font-[monospace] bg-[url('images/HomeBG2.png')] bg-cover bg-[right_center_10%]">
      <div><Navigation displayName="true" underline="false"/></div>
      <img
        className="w-full lg:max-w-1/4 md:max-w-1/2"
        src="/images/me_frame_2.png"
      />
      <p className="lg:max-w-1/2">
        Ut veniam consectetur commodo dolor sed ut. Ad eiusmod ea ex adipiscing tempor labore incididunt. Eiusmod ut dolore labore sed sed ad et ut amet veniam consequat. Dolore magna incididunt ut quis laboris exercitation ipsum ex enim adipiscing amet ut dolore et. Sit ut ipsum labore ex ut consectetur dolor ut. Labore labore ex amet ex consectetur.

Ad adipiscing ullamco aliquip quis quis ut ullamco nostrud ut dolor et consequat sed nisi. Aliquip magna consequat ad ipsum adipiscing. Lorem nisi do adipiscing sit elit ad incididunt. Ipsum sit sit et aliqua minim sit eiusmod amet enim aliquip dolore.

Minim adipiscing laboris exercitation tempor aliqua do consectetur ut ut nisi. Do commodo lorem quis minim consequat commodo. Ut exercitation veniam labore adipiscing labore nostrud elit ea ut. Commodo exercitation ullamco ullamco ad sed consequat ut lorem dolore ipsum ut sit enim nisi. Dolore eiusmod nostrud et aliqua minim lorem consequat ut ex sit ad. Ut dolore nostrud ipsum sed aliqua dolore ut nostrud dolore do consequat tempor laboris.
      </p>

      <div className="flex gap-2">
        <a className="hover:underline" target="_blank" href="https://www.youtube.com/@nobbybop">
          YouTube
        </a>
        <a className="hover:underline" target="_blank" href="https://www.instagram.com/nick.mirig/">
          Instagram
        </a>
        <a className="hover:underline" target="_blank" href="https://www.linkedin.com/in/nicholas-mirigliani/"
        >
          LinkedIn
        </a>
        <a  className="hover:underline" target="_blank" href="https://github.com/NobbyBop">
          GitHub
        </a>
        <a className="hover:underline" target="_blank" href="/Resume.pdf">
          Résumé
        </a>
      </div>
    </div>
  );
}
export default Home;

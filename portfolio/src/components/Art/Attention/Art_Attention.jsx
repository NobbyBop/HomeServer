// import { SnavLink } from "react-router-dom";
import SnavLink from "../../SnavLink";
import { NavLink } from "react-router-dom";
import Navigation from "../../Navigation";
function Art_Attention() {
  const body = document.body;
  body.className = "default-bg";
  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-roboto gap-4">
      <Navigation displayName="true"/>
      <img
        className="max-w-3xs"
        src="/attention/title.png"
      />
      <p className="max-w-1/2">
        THIS PROJECT IS A MULTI-LAYERED, MULTI-MEDIA EXPERIENCE THAT WAS
        INTENDED TO BE CONDUCTED IN-PERSON IN AN INTERACTIVE STYLE. IN LIEU OF
        THAT, BELOW IS A DIGITAL DISPLAY OF THE PROJECT ALONG WITH COMMENTARY
        TO HELP GUIDE THE EXPERIENCE. THIS DIGITAL FORMAT ADDS YET ANOTHER
        LAYER TO "ATTENTION!" PLEASE BE SURE TO FOLLOW ALONG CLOSELY THOUGHOUT
        THE DISPLAY. FOR A COMPLETE UNDERSTANDING, PLEASE CONSULT THE
        SUPPLEMENTAL DIAGRAM BELOW.
      </p>
      <img
        className="max-w-3xs"
        src="/attention/webdiagram1.png"
      />
      <h2 className="font-bold">PART ONE: THE ENVELOPE</h2>
      <p className="max-w-1/2">
        PARTICIPANTS OF THE "ATTENTION!" EXPERIENCE ARE GIVEN THE FOLLOWING
        ENVELOPE AND ENCOURAGED TO INSPECT AND OPEN IT.
      </p>
      <p className="max-w-1/2">
        (THE TEXT READS: "PACKET FOR PROCTOR OF GUIDED VIEWING SESSION; DO NOT
        REDISTRIBUTE; SNUCK THIS OUT, LET ME KNOW WHAT YOU THINK. -M")
      </p>
      <img
        className="max-w-3xs"
        src={`/attention/envelope.JPEG`}
      />
      <p className="max-w-1/2">
        INSIDE THE ENVELOPE IS A COLLECTION OF ITEMS, EACH OF WHICH REQUIRES
        FURTHER INSPECTION. IN THE SECTIONS BELOW, WE WILL ELABORATE ON EACH
        ITEM.
      </p>
      <h2 className="font-bold">PART TWO: THE INSTRUCTION BOOK</h2>
      <p className="max-w-1/2">
        THE FIRST AND MOST NOTABLE ITEM IN THE ENVELOPE IS A PACKET LABELED:
        "INSTRUCTION BOOK FOR PROCTORS OF GUIDED VIEWING EXPERIENCE." CLICKING
        ON THE IMAGE BELOW WILL ALLOW YOU TO VIEW THE BOOK IN ITS ENTIRETY.
      </p>
      <SnavLink to="/art/attention/packet">
        <img
          className="max-w-3xs"
          src={`/attention/packet.JPEG`}
        />
      </SnavLink>
      <h2 className="font-bold">PART THREE: THE USB</h2>
      <p className="max-w-1/2">
        THE NEXT ITEM IN THE ENVELOPE IS A USB FLASH DRIVE. PARTICIPANTS WERE
        GIVEN COMPUTER ACCESS AND WERE PERMITTED TO OPEN THE CONTENTS OF THE
        FLASH DRIVE. UPON INSPECTION, A POWERPOINT PRESENTATION WAS THE ONLY
        FILE. CLICKING ON THE IMAGE BELOW WILL ALLOW YOU TO VIEW THE
        POWERPOINT PRESENTATION IN ITS ENTIRETY.
      </p>
      <SnavLink to="/art/attention/presentation">
        <img
          className="max-w-3xs"
          src={`/attention/usb.JPEG`}
        />
      </SnavLink>
      <h2 className="font-bold">PART FOUR: THE PHOTOS</h2>
      <p className="max-w-1/2">
        ALONG WITH THE USB PRESENTATION, HARD COPIES OF THE PHOTOS USED IN IT
        ARE ALSO PROVIDED TO ENHANCE THE EXPERIENCE FOR MULITPLE PARTICIPANTS
        SIMULTANEOUSLY.
      </p>
      <img
        className="max-w-3xs"
        src={`/attention/photos.JPEG`}
      />
      <h2>PART FIVE: THE CASSETTE</h2>
      <p className="max-w-1/2">
        A CASSETTE LABELED "AUDIO INSTRUCTIONS" IS PROVIDED. PARTICIPANTS WERE
        GIVEN A CASSETTE PLAYER DURING THE IN-PERSON EXPERIENCE TO LISTEN.
        PLEASE USE THE PLAYER BELOW TO HEAR THE AUDIO.
      </p>
      <img
        className="max-w-3xs"
        src={`/attention/cassette.JPEG`}
      />
      <br />
      <audio controls>
        <source
          src={`/attention/audio.m4a`}
          type="audio/mp4"
        />
        Your browser does not support the audio element.
      </audio>
      <h2 className="font-bold">PART SIX: THE PARTICIPANTS</h2>
      <p className="max-w-1/2">
        THE ENVELOPE INCLUDES FIVE PARTICIPANT EXAMPLES (THOSE WHO HAD
        PARTICIPATED IN THE ORIGINAL "ATTENTION!" PRESENTATION). CLICK ON THE
        IMAGE BELOW TO VIEW THEIR RESPONSES.
      </p>
      <SnavLink to="/art/attention/participants">
        <img
          className="max-w-3xs"
          src={`/attention/participants.JPEG`}
        />
      </SnavLink>
      <h2 className="font-bold">PART SEVEN: THE LETTER</h2>
      <p className="max-w-1/2">
        THE FINAL ITEM IN THE ENVELOPE IS A LETTER WHICH READS AS FOLLOWS:
      </p>
      <p className="max-w-1/2">"DEAR MARSHALL,</p>
      <p className="max-w-1/2">
        SORRY FOR MY DELAYED REPLY TO YOUR MOST RECENT LETTER, I HAVE BEEN
        VERY BUSY WITH PLANNING AND ORGANIZING THIS NEXT BATCH OF
        PRESENTATIONS. WE'VE MADE A LOT OF IMPROVEMENTS & IT IS LOOKING LIKE
        THIS SERIES WILL BE OUR MOST EFFECTIVE YET.
      </p>
      <p className="max-w-1/2">
        IN YOUR LAST LETTER YOU ASKED WHY I AM INSTRUCTING PROCTORS TO BURN
        THE RESULTS. WHILE THIS MIGHT NOT BE THE MOST SATISFYING ANSWER, THE
        REASON IS SIMPLY THAT I AM NOT INTERESTED IN THE RESULTS. I ONLY WISH
        TO KNOW THAT THE PRESENTATIONS HAVE BEEN GIVEN, THAT THE PARTICIPANTS
        ARE COMPLETELY FOCUSED ON MY WORK FOR SOME SHORT TIME.
      </p>
      <p className="max-w-1/2">
        I HOPE YOU ARE WELL. GIVE MY BEST TO YOUR FAMILY. SORRY FOR MY BREVITY
        BUT I MUST GET BACK TO WORK.
      </p>
      <p className="max-w-1/2">YOURS TRULY, [LAMBDA]"</p>
      <img
        className="max-w-3xs"
        src={`/attention/letter.JPEG`}
      />
      <h2 className="font-bold">DISMISSAL</h2>
      <p className="max-w-1/2">
        AT THIS TIME WE HAVE REACHED THE END OF THE DIGITAL DISPLAY. AT THIS
        TIME THE CREATOR WISHES TO SPEAK A FEW WORDS ABOUT THE PROJECT. THEY
        ARE AS FOLLOWS:
      </p>
      <p className="max-w-1/2">
        "WHEN MAKING "ATTENTION!" I WANTED TO CREATE A MYSTERY THAT
        PARTICIPANTS WOULD HAVE TO SOLVE. BY GIVING THEM THIS ENVELOPE, I GAVE
        THEM ALL EVIDENCE OF A PRESENTATION ("ATTENTION!") THAT HAD OCCURRED
        AND BEEN INTERCEPTED SOMEHOW. I WANTED THE PARTICIPANTS TO PIECE
        TOGETHER EACH PART OF THE PRESENTATION. HOW THE PROCTOR WOULD HAVE
        READ FROM THE BOOK, PLAYED THE CASSETTE, ADVANCED THROUGH THE SLIDES,
        AND COLLECTED PARTICIPANT RESULTS. I WANTED THEM TO ASK WHY THIS
        PRESENTATION HAD BEEN GIVEN, ONLY TO FIND THAT THE CREATOR HAD NO GOAL
        OTHER THAN TO TAKE THE ATTENTION OF THE VIEWER.
      </p>
      <p className="max-w-1/2">
        THIS IDEA WAS INSPIRED BY THE THOUGHT THAT, AT ANY GIVEN MOMENT, A
        PERSON'S WHOLE UNIVERSE IS ONLY WHAT THEY HAVE THEIR ATTENTION ON, AND
        TO BE ABLE TO COMMAND SOMEONE'S ATTENTION, EVEN JUST FOR ONE SECOND,
        IS TO FULLY TAKE UP THEIR ENTIRE UNIVERSE FOR THAT TIME.
      </p>
      <p className="max-w-1/2">
        I BELIEVE THAT THIS IS MY MOST AMBITIOUS PROJECT TO DATE, AND AM VERY
        PLEASEED WITH THE RESULTS, AESTHETICALLY AND CONTENT-WISE."
      </p>
      <p className="max-w-1/2">AT THIS TIME YOU ARE DISMISSED.</p>
      <SnavLink to="/art/">BACK TO ART</SnavLink>
    </div>
  );
}
export default Art_Attention;

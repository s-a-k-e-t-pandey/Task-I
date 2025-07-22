import { Topbar } from "../Topbar";
import { Spotlight } from "../ui/Spotlight";
import Footer from "../Footer";
import { UserCard } from "../UserCard";
import { useState, useRef } from "react";
import HeroScrollDemo from "../HeroScroll";
import {UserList} from "../UserList";
import { ClaimsHistory } from "../ClaimsHistory";

export default function Hero() {
  const [isUserCard, setIsUserCard] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <Topbar></Topbar>
      <div className="flex flex-col justify-center items-center">
        <div className="relative mx-auto z-10 flex flex-col md:flex-row items-center justify-center px-4 min-h-screen">
          {!isUserCard && (
            <div className="text-center max-w-4xl mx-auto px-4">
              <h1 className="font-Bodoni text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
                Top Users
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 font-sans leading-relaxed drop-shadow-lg">
                Real-Time Rankings. Real Impact.
              </p>
              <div className="mt-8 flex justify-center">
                <button
                  ref={buttonRef}
                  onClick={() => setIsUserCard((prev) => !prev)}
                  className="w-full sm:w-auto text-white px-6 py-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 font-medium hover:shadow-lg/30 transition"
                  >
                  {" "}
                  Add new User
                </button>
              </div>
            </div>
          )}
          {isUserCard && <UserCard onClose={() => setIsUserCard(false)} />}
          <HeroScrollDemo />
        </div>
        <div className="flex flex-row justify-center bottom-30 ">
          <UserList></UserList>
          <ClaimsHistory></ClaimsHistory>
        </div>
      </div>
      <Footer></Footer>
      <Spotlight direction="right" fill="#8b5cf6" />
      <Spotlight direction="left" fill="#3b82f6" />
    </div>
  );
}

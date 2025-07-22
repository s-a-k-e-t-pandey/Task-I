import { ContainerScroll } from "./ui/ScrollContainer"
import { RealtimeLeaderboard } from "./Leaderboard"

export default function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Live Competition <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">Leaderboard</span>
            </h1>
          </>
        }
      >
        <RealtimeLeaderboard />
      </ContainerScroll>
    </div>
  )
}

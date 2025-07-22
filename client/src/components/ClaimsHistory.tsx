import { div } from "motion/react-client"


interface PointsHistory {
  id: number
  name: string
  score: number
  pointsEarned: number
  timestamp: string
}

export const ClaimsHistory: React.FC = () => {


    const pointsHistory: PointsHistory[] = [
      { id: 1, name: "Alex Chen", score: 2850, pointsEarned: 150, timestamp: "2 hours ago" },
      { id: 2, name: "Sarah Kim", score: 2720, pointsEarned: 200, timestamp: "3 hours ago" },
      { id: 3, name: "Mike Johnson", score: 2680, pointsEarned: 75, timestamp: "4 hours ago" },
      { id: 1, name: "Alex Chen", score: 2700, pointsEarned: 100, timestamp: "5 hours ago" },
      { id: 4, name: "Emma Davis", score: 2540, pointsEarned: 180, timestamp: "6 hours ago" },
      { id: 5, name: "James Wilson", score: 2420, pointsEarned: 90, timestamp: "7 hours ago" },
      { id: 2, name: "Sarah Kim", score: 2520, pointsEarned: 120, timestamp: "8 hours ago" },
      { id: 6, name: "Lisa Brown", score: 2380, pointsEarned: 160, timestamp: "9 hours ago" },
      { id: 3, name: "Mike Johnson", score: 2605, pointsEarned: 85, timestamp: "10 hours ago" },
      { id: 7, name: "David Lee", score: 2290, pointsEarned: 110, timestamp: "11 hours ago" },
    ]


    return (
        <div className="flex top-10 w-full max-w-6xl bg-black/90 gap-4 rounded-3xl p-6 shadow-2xl z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-4 w-full rounded-xl border border-gray-200 bg-slate-700/40 p-4">
        <h3 className="text-xl font-semibold text-white mb-2">Claims History</h3>

        <div className="flex items-center font-semibold text-white border-b border-gray-500 pb-2">
          <span className="w-full flex justify-start text-lg">Name</span>
          <span className="flex justify-center px-6 text-base">Score</span>
          <span className="flex justify-center px-6 text-base">Earned</span>
          <span className="flex justify-end px-4 text-base">Time</span>
        </div>

        {/* History List with Hidden Scrollbar */}
        <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto scrollbar-hide">
          {pointsHistory.map((entry, index) => (
            <div
              key={index}
              className="flex items-center text-gray-300 font-normal py-3 px-2 hover:bg-slate-600/30 rounded-lg transition-colors"
            >
              <span className="w-full flex justify-start text-base font-medium text-white">{entry.name}</span>
              <span className="flex justify-center px-6 text-sm">{entry.score.toLocaleString()}</span>
              <span className="flex justify-center px-6 text-sm text-green-400 font-semibold">
                +{entry.pointsEarned}
              </span>
              <span className="flex justify-end px-4 text-xs text-gray-400">{entry.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
        </div>
    )
}
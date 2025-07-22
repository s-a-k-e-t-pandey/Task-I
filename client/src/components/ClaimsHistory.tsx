import { motion } from "motion/react"
import { useClaimHistoryStore } from "../stores/useClaimHistoryStore"

interface PointsHistory {
    id: string
    name: string
    score: number
    pointsEarned: number
    timestamp: string
}

export const ClaimsHistory: React.FC = () => {
    const claims = useClaimHistoryStore((state) => state.claims)

    const pointsHistory: PointsHistory[] = claims.map((claim) => ({
      id: claim.userId,
      name: claim.userName,
      score: claim.totalPoints,
      pointsEarned: claim.points,
      timestamp: new Date(claim.timestamp).toLocaleString(),
    }))

    return (
        <motion.div className="flex top-4 w-full max-w-6xl bg-black/90 gap-4 rounded-3xl p-6 shadow-2xl z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200 hover:shadow-lg hover:shadow-gray-500/20 hover:bg-slate-800/50">
            <div className="flex flex-col gap-4 w-full rounded-xl border border-gray-200 bg-slate-700/40 p-4">
                <h3 className="text-xl font-semibold text-white mb-2">Claims History</h3>

                <div className="flex items-center font-semibold text-white border-b border-gray-500 pb-2">
                <span className="w-full flex justify-start text-lg">Name</span>
                <span className="flex justify-center px-6 text-base">Score</span>
                <span className="flex justify-center px-6 text-base">Earned</span>
                <span className="flex justify-end px-4 text-base">Time</span>
                </div>

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
        </motion.div>
    )
}

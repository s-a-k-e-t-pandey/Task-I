"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Trophy, Medal, Award, TrendingUp, TrendingDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar"
import { Badge } from "./ui/Badge"

// Add this style block after the imports
const scrollbarHideStyles = `
  .scrollbar-hide {
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */
  }
  .scrollbar-hide::-webkit-scrollbar { 
    display: none;  /* Safari and Chrome */
  }
`

// Add the style element to inject the CSS
if (typeof document !== "undefined") {
  const styleElement = document.createElement("style")
  styleElement.textContent = scrollbarHideStyles
  document.head.appendChild(styleElement)
}

interface User {
  id: number
  name: string
  score: number
  avatar: string
  trend: "up" | "down" | "same"
  previousPosition?: number
}

const initialUsers: User[] = [
  { id: 1, name: "Alex Chen", score: 2850, avatar: "/placeholder.svg?height=40&width=40", trend: "same" },
  { id: 2, name: "Sarah Kim", score: 2720, avatar: "/placeholder.svg?height=40&width=40", trend: "same" },
  { id: 3, name: "Mike Johnson", score: 2680, avatar: "/placeholder.svg?height=40&width=40", trend: "same" },
  { id: 4, name: "Emma Davis", score: 2540, avatar: "/placeholder.svg?height=40&width=40", trend: "same" },
  { id: 5, name: "James Wilson", score: 2420, avatar: "/placeholder.svg?height=40&width=40", trend: "same" },
  { id: 6, name: "Lisa Brown", score: 2380, avatar: "/placeholder.svg?height=40&width=40", trend: "same" },
  { id: 7, name: "David Lee", score: 2290, avatar: "/placeholder.svg?height=40&width=40", trend: "same" },
  { id: 8, name: "Anna Taylor", score: 2180, avatar: "/placeholder.svg?height=40&width=40", trend: "same" },
  { id: 9, name: "Chris Martin", score: 2050, avatar: "/placeholder.svg?height=40&width=40", trend: "same" },
  { id: 10, name: "Maya Patel", score: 1980, avatar: "/placeholder.svg?height=40&width=40", trend: "same" },
]

export function RealtimeLeaderboard() {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setUsers((prevUsers) => {
        const newUsers = prevUsers.map((user, index) => {
          const previousPosition = index + 1
          // Random score changes
          const scoreChange = Math.floor(Math.random() * 100) - 50
          const newScore = Math.max(0, user.score + scoreChange)

          return {
            ...user,
            score: newScore,
            previousPosition,
          }
        })

        // Sort by score and update trends
        const sortedUsers = newUsers
          .sort((a, b) => b.score - a.score)
          .map((user, index) => {
            const currentPosition = index + 1
            const previousPosition = user.previousPosition || currentPosition

            let trend: "up" | "down" | "same" = "same"
            if (currentPosition < previousPosition) trend = "up"
            else if (currentPosition > previousPosition) trend = "down"

            return { ...user, trend }
          })

        return sortedUsers
      })
      setLastUpdate(new Date())
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const topThree = users.slice(0, 3)
  const restOfUsers = users.slice(3)

  return (
    <div className="h-full w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 overflow-hidden">
      <div className="max-w-6xl mx-auto h-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm font-medium">LIVE</span>
          </div>
          <p className="text-gray-400 text-sm">Last updated: {lastUpdate.toLocaleTimeString()}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
          {/* Top 3 Podium */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Top Performers</h2>
            <div className="flex items-end justify-center gap-4 h-80">
              {/* 2nd Place */}
              <PodiumCard user={topThree[1]} position={2} height="h-48" />

              {/* 1st Place */}
              <PodiumCard user={topThree[0]} position={1} height="h-64" />

              {/* 3rd Place */}
              <PodiumCard user={topThree[2]} position={3} height="h-40" />
            </div>
          </div>

          {/* Remaining 7 Users List */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold text-white mb-6">Rankings</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-hide">
              <AnimatePresence>
                {restOfUsers.map((user, index) => (
                  <motion.div
                    key={user.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl font-bold text-white/60">#{index + 4}</div>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-white font-medium text-sm">{user.name}</p>
                          <p className="text-gray-400 text-xs">{user.score.toLocaleString()} pts</p>
                        </div>
                      </div>
                      <TrendIndicator trend={user.trend} />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PodiumCard({ user, position, height }: { user: User; position: number; height: string }) {
  const getPositionIcon = () => {
    switch (position) {
      case 1:
        return <Trophy className="h-8 w-8 text-yellow-400" />
      case 2:
        return <Medal className="h-8 w-8 text-gray-300" />
      case 3:
        return <Award className="h-8 w-8 text-amber-600" />
      default:
        return null
    }
  }

  const getPositionColor = () => {
    switch (position) {
      case 1:
        return "from-yellow-400/20 to-yellow-600/20 border-yellow-400/30"
      case 2:
        return "from-gray-300/20 to-gray-500/20 border-gray-300/30"
      case 3:
        return "from-amber-600/20 to-amber-800/20 border-amber-600/30"
      default:
        return "from-white/10 to-white/5 border-white/20"
    }
  }

  return (
    <motion.div
      layout
      className={`${height} w-32 bg-gradient-to-t ${getPositionColor()} backdrop-blur-sm rounded-t-lg border flex flex-col items-center justify-end p-4 relative`}
    >
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">{getPositionIcon()}</div>

      <div className="text-center mb-4">
        <Avatar className="h-12 w-12 mx-auto mb-2">
          <AvatarImage src={user.avatar || "/placeholder.svg"} />
          <AvatarFallback>
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <p className="text-white font-bold text-sm">{user.name}</p>
        <p className="text-gray-300 text-xs">{user.score.toLocaleString()}</p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-8 bg-white/20 rounded-b-lg flex items-center justify-center">
        <span className="text-white font-bold">#{position}</span>
      </div>

      <TrendIndicator trend={user.trend} className="absolute top-2 right-2" />
    </motion.div>
  )
}

function TrendIndicator({ trend, className = "" }: { trend: "up" | "down" | "same"; className?: string }) {
  if (trend === "same") return null

  return (
    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className={className}>
      {trend === "up" ? (
        <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
          <TrendingUp className="h-3 w-3" />
        </Badge>
      ) : (
        <Badge variant="secondary" className="bg-red-500/20 text-red-400 border-red-500/30">
          <TrendingDown className="h-3 w-3" />
        </Badge>
      )}
    </motion.div>
  )
}

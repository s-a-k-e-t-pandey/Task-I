import { useState, useMemo } from "react"
import { Search } from "lucide-react"
import { Input } from "./ui/Input"
import { Button } from "./ui/Button"

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
  { id: 11, name: "John Smith", score: 1850, avatar: "/placeholder.svg?height=40&width=40", trend: "same" },
  { id: 12, name: "Emily Johnson", score: 1720, avatar: "/placeholder.svg?height=40&width=40", trend: "same" },
  { id: 13, name: "Michael Brown", score: 1680, avatar: "/placeholder.svg?height=40&width=40", trend: "same" },
  { id: 14, name: "Jessica Davis", score: 1540, avatar: "/placeholder.svg?height=40&width=40", trend: "same" },
  { id: 15, name: "Robert Wilson", score: 1420, avatar: "/placeholder.svg?height=40&width=40", trend: "same" },
]



export const UserList = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = initialUsers.length

  const filteredUsers = useMemo(() => {
    return initialUsers.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [searchTerm])

  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage)

  const handleClaim = (userId: number) => {
    console.log(`Claiming for user ${userId}`)
  }

  return (
    <div className="flex top-4 w-full max-w-6xl bg-black/90 gap-4 rounded-3xl p-6 shadow-2xl z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
      <div className="flex flex-col gap-4 w-full rounded-xl border border-gray-200 bg-slate-700/40 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
            }}
            className="pl-10 bg-slate-600/50 border-gray-500 text-white placeholder:text-gray-400"
          />
        </div>

        <div className="flex items-center font-semibold text-white border-b border-gray-500 pb-2">
          <span className="w-full flex justify-start text-lg">Name</span>
          <span className="flex justify-center px-10 text-base">Score</span>
          <span className="flex justify-end px-10 text-base">Action</span>
        </div>

        <div className="flex flex-col gap-2 min-h-[400px]">
          {initialUsers.length > 0 ? (
            <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto scrollbar-hide">
                {paginatedUsers.map((entry) => (
                    <div
                        key={entry.id}
                        className="flex items-center text-gray-300 font-normal py-3 px-2 hover:bg-slate-600/30 rounded-lg transition-colors"
                        >
                        <span className="w-full flex justify-start text-base font-medium text-white">{entry.name}</span>
                        <span className="flex justify-center px-6 text-sm">{entry.score.toLocaleString()}</span>
                        <Button
                            onClick={() => handleClaim(entry.id)}
                            size="sm"
                            className="flex justify-end px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                            >
                            Claim
                        </Button>
                    </div>
                ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-32 text-gray-400">
              No users found matching "{searchTerm}"
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

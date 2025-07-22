import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";
import { useClaimHistoryStore } from "../stores/useClaimHistoryStore";

interface User {
    id: number;
    name: string;
    score: number;
    avatar: string;
    trend: "up" | "down" | "same";
    previousPosition?: number;
}

export const UserList = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const queryClient = useQueryClient();
    const itemsPerPage = 15;

    const fetchUsers = async (): Promise<User[]> => {
        try {
            const response = await axios.get("http://localhost:3000/api/users");
            console.log("User data:", response.data);

            if (!response.data) {
                console.error("Invalid user data format", response.data);
                return [];
            }

            const data = response.data;
            const formattedUsers = data.map((user: any, index: number) => ({
                id: user._id || index + 1,
                name: user.firstName + " " + user.lastName,
                score: user.totalPoints || 0,
                avatar: user.avatar || "",
                trend: "same" as const,
                previousPosition: index + 1,
            }));

            return formattedUsers;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    };

    const {
        data: users = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers,
        refetchInterval: 5000,
    });

    const claimPoints = async (userId: number) => {
        try {
            const response = await axios.post(`http://localhost:3000/api/claim`, {
                userId,
            });
            console.log("Claim response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error claiming points:", error);
            throw error;
        }
    };

    const claimPointsMutation = useMutation({
        mutationFn: claimPoints,
        onSuccess: (data, userId) => {
            toast.success("Points claimed successfully!");

            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
            useClaimHistoryStore.getState().addClaim({
                userId: String(userId),
                points: data.pt,
                timestamp: new Date().toISOString(),
                totalPoints: data.totalPoints,
                userName: data.userName,
            });
            console.log("Points claimed for user:", userId, data);
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to claim points");
            console.error("Error claiming points:", error);
        },
    });

    const handleClaim = (userId: number) => {
        claimPointsMutation.mutate(userId);
    };

    const filteredUsers = useMemo(() => {
        return users.filter((user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [users, searchTerm]);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedUsers = filteredUsers.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    if (isLoading) {
        return (
            <div className="flex top-4 w-full max-w-6xl bg-black/90 gap-4 rounded-3xl p-6 shadow-2xl z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-center h-64 text-white w-full">
                    Loading users...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex top-4 w-full max-w-6xl bg-black/90 gap-4 rounded-3xl p-6 shadow-2xl z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-center h-64 text-red-400 w-full">
                    Error loading users. Please try again.
                </div>
            </div>
        );
    }

    return (
        <div className="flex top-4 w-full max-w-6xl bg-black/90 gap-4 rounded-3xl p-6 shadow-2xl z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200 hover:shadow-lg hover:shadow-gray-500/20 hover:bg-slate-800/50">
            <div className="flex flex-col gap-4 w-full rounded-xl border border-gray-200 bg-slate-700/40 p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
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
                    {filteredUsers.length > 0 ? (
                        <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto scrollbar-hide">
                            {paginatedUsers.map((user) => (
                                <div
                                    key={user.id}
                                    className="flex items-center text-gray-300 font-normal py-3 px-2 hover:bg-slate-600/30 rounded-lg transition-colors hover:shadow-lg hover:shadow-gray-500/20"
                                >
                                    <span className="w-full flex justify-start text-base font-medium text-white">
                                        {user.name}
                                    </span>
                                    <span className="flex justify-center px-6 text-sm">
                                        {user.score.toLocaleString()}
                                    </span>
                                    <Button
                                        onClick={() => handleClaim(user.id)}
                                        disabled={claimPointsMutation.isPending}
                                        size="sm"
                                        className="flex justify-end px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg"
                                    >
                                        {claimPointsMutation.isPending &&
                                            claimPointsMutation.variables === user.id
                                            ? "Claiming..."
                                            : "Claim"}
                                    </Button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-32 text-gray-400">
                            {searchTerm
                                ? `No users found matching "${searchTerm}"`
                                : "No users available"}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

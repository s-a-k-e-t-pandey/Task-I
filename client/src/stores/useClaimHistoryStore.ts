import { create } from "zustand";
import { persist } from "zustand/middleware";


interface Claim {
    userId: string;
    userName: string;
    points: number;
    timestamp: string;
    totalPoints: number;
}

interface ClaimHistoryStore {
    claims: Claim[];
    addClaim: (claim: Claim) => void;
    clearClaims: () => void;
}


export const useClaimHistoryStore = create<ClaimHistoryStore>()(
  persist(
    (set) => ({
      claims: [],
      addClaim: (claim) =>
        set((state) => ({ claims: [claim, ...state.claims] })),
      clearClaims: () => set({ claims: [] }),
    }),
    {
      name: "claim-history", 
    }
  )
);

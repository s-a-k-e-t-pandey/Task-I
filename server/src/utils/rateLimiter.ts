const userClaimTimestamps = new Map<string, number[]>(); 

export const validClaim = (userId: string, windowMs: number = 10_000, maxClaims: number = 5): boolean => {
  const currentTime = Date.now(); 
  const userClaims = userClaimTimestamps.get(userId) || []; 

  const claimWindow = userClaims.filter(
    (timestamp: number) => timestamp > currentTime - windowMs 
  );

  if (claimWindow.length < maxClaims) { 
    claimWindow.push(currentTime); 
    userClaimTimestamps.set(userId, claimWindow);
    return true; 
  } else {
    return false;
  }
};

export default validClaim;


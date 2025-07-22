"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validClaim = void 0;
const userClaimTimestamps = new Map();
const validClaim = (userId, windowMs = 10000, maxClaims = 5) => {
    const currentTime = Date.now();
    const userClaims = userClaimTimestamps.get(userId) || [];
    const claimWindow = userClaims.filter((timestamp) => timestamp > currentTime - windowMs);
    if (claimWindow.length < maxClaims) {
        claimWindow.push(currentTime);
        userClaimTimestamps.set(userId, claimWindow);
        return true;
    }
    else {
        return false;
    }
};
exports.validClaim = validClaim;
exports.default = exports.validClaim;

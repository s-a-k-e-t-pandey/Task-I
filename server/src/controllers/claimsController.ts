import { Response, Request } from "express";
import User from "../models/userModel";
import Claim from "../models/claimsModel";
import validClaim from "../utils/rateLimiter"
import {io} from "../socket"

const pointGenerator = ()=> {
    return Math.floor(Math.random() * 10) + 1;
}

export const claim = async (req: Request, res: Response) => {
    try{
        const { userId } = req.body;
        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({
                msg: "User not Found"
            })
        }

        if (!validClaim(userId)) {
            return res.status(429).json({ message: 'Please wait before claiming again.' });
        }

        const pt = pointGenerator();

        user.totalPoints += pt;
        await user.save();

        const fullName = `${user.firstName}" "${user.lastName}`

        await Claim.create({
            userId: user._id,
            userName: fullName,
            curPoints: user.totalPoints,
            points: pt
        })

        const topUsers = await User.find()
            .sort({ totalPoints: -1 })
            .limit(10);

        io?.emit('leaderboard:update', topUsers);
        res.json({ message: 'Points claimed', pt, totalPoints: user.totalPoints });
    }catch(err){
        res.status(500).json({ message: 'Failed to claim points', error: err });
    }
}
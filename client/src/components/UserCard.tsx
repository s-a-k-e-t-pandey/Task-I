import {motion} from "motion/react"
import React from "react";
import { useState } from "react";


interface addUserCardProps {
    // isOpen: boolean;
    onClose: () => void;
    // buttonRef: React.RefObject<HTMLButtonElement | null>;
}

export const UserCard: React.FC<addUserCardProps> = ({ onClose }) => {
        const [firstName, setFirstName] = useState("");
        const [lastName, setLastName] = useState("");

    return (
        <div className="w-full sm:max-w-md lg:max-w-lg top-20 overflow-hidden rounded-3xl border bg-gradient-to-b from-slate-50/90 to-slate-100/90 transition duration-300 dark:from-slate-950/90 dark:to-neutral-800/90 md:hover:border-transparent md:bg-gradient-to-bl"
        >
            <motion.div
                initial={{}} 
                className="flex flex-col gap-12 justify-between bg-primary/5 p-8 rounded-2xl border border-primary/10 shadow-xl shadow-primary/5 min-w-[40vw]"
            >
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-bold text-gray-800">Add New User</h2>
                        <div className="flex flex-row gap-4 text-gray-500">
                            <div className="flex flex-col w-1/2">
                                <label className="text-sm md:text-base">First name</label>
                                <input className="border p-2 w-4/5 rounded mt-2 flex justify-center items-center" placeholder="Enter your email address" 
                                onChange={(e)=> setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col w-1/2">
                                <label className="text-sm md:text-base">Last name</label>
                                <input className="border p-2 w-4/5 rounded mt-2 flex justify-center items-center" 
                                placeholder="Enter your password" 
                                onChange={(e)=> setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                </div>
                <div className="flex justify-between">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Save
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 mr-12 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
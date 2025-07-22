import {motion} from 'motion/react'




export const Topbar = () => {

  return (
    <nav className="sticky mx-auto wrapper top-0 z-30 flex items-center gap-2 py-6 w-full">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut", type: "spring", damping: 10 }}
        className="flex w-full justify-between mx-auto bg-secondary/15 shadow-lg shadow-neutral-600/5 backdrop-blur-lg border border-primary/10 p-6 rounded-2xl"
      >
          <span className="text-lg md:text-2xl font-bold tracking-tight text-slate-600 hidden md:block text-shadow-lg hover:text-shadow-lg/20 font-Bodoni">
            Topboard
          </span>
        </motion.div>
    </nav>
  );
};
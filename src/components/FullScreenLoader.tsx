import { motion } from "framer-motion";

const FullScreenLoader = ({ text = "Please wait..." }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        className="w-14 h-14 border-4 border-green-main border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-4 text-white font-medium"
      >
        {text}
      </motion.p>
    </div>
  );
};

export default FullScreenLoader;

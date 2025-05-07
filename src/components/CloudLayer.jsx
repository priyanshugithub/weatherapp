import { motion } from "framer-motion";
import Cloud from "@/assets/cloud.svg"; // your own SVGs

function CloudLayer({ speed = 20, opacity = 0.3 }) {
  return (
    <motion.img
      src={Cloud}
      className="absolute top-1/4 w-[120%] -left-[10%] pointer-events-none select-none"
      style={{ opacity }}
      animate={{ x: ["-10%", "10%"] }}
      transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
    />
  );
}

export default CloudLayer;
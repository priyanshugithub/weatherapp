// src/components/AnimatedSky.jsx
import { motion } from "framer-motion";
import { useMemo } from "react";

export default function AnimatedSky({ condition, hour }) {
  // crude buckets — tweak or map from API icons
  const isNight = hour < 6 || hour >= 20;
  const palette = useMemo(() => {
    if (isNight) return ["#0f172a", "#1e293b"];          // dark navy gradient
    if (condition.includes("Cloud")) return ["#6b7280", "#9ca3af"]; // gray
    if (condition.includes("Rain")) return ["#475569", "#1e3a8a"];  // blue‑gray
    return ["#38bdf8", "#0ea5e9"];                       // clear day
  }, [condition, isNight]);

  return (
    <motion.div
      className="absolute inset-0 -z-10"
      animate={{ background: `linear-gradient(to bottom, ${palette[0]}, ${palette[1]})` }}
      transition={{ duration: 1 }}
    />
  );
}

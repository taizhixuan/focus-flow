import { useState, useEffect } from "react";

export function useTime() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 6) return "凌晨好，注意休息";
    if (hour < 9) return "早上好，开启元气一天";
    if (hour < 12) return "上午好，保持专注";
    if (hour < 14) return "中午好，记得午休";
    if (hour < 18) return "下午好，继续加油";
    if (hour < 23) return "晚上好，享受静谧时光";
    return "深夜了，早点休息";
  };

  return { currentTime, getGreeting };
}

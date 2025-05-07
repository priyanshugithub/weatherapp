// src/utils/date.js
export function formatHour(isoString) {
    // isoString like "2025-05-07 18:00:00"
    return new Date(isoString).toLocaleTimeString([], {
      hour: "numeric",
      hour12: true,          // "6 PM" / "3 AM"
    });
  }  
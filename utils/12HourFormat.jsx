export function convertTo12HourFormat(time) {
    if (!time) return "N/A";
    const [hour, minute] = time.split(":");
    let hour12 = parseInt(hour, 10);
    const ampm = hour12 >= 12 ? "PM" : "AM";
    hour12 = hour12 % 12 || 12; // Convert 0 to 12 for 12 AM
    return `${hour12}:${minute} ${ampm}`;
  }
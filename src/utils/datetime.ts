export function formatShortDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}


export function parseTimeLabelToDate(baseDateISO: string, timeLabel: string): Date {
  const base = new Date(baseDateISO);
  // Expect formats like "8:00 am", "12:30 pm", "12:00 am"
  const [time, meridiemRaw] = timeLabel.trim().split(" ");
  const meridiem = (meridiemRaw || "").toLowerCase();
  const [hStr, mStr] = time.split(":");
  let hours = parseInt(hStr, 10);
  const minutes = parseInt(mStr, 10) || 0;

  if (meridiem === "am") {
    if (hours === 12) hours = 0; // 12am -> 00:xx
  } else if (meridiem === "pm") {
    if (hours !== 12) hours += 12; // 1-11pm -> 13-23
  }

  const withTime = new Date(base.getFullYear(), base.getMonth(), base.getDate(), hours, minutes, 0, 0);
  return withTime;
}



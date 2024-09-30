export function createdAt(date: Date) {
  const nowDay = new Date();
  const postDay = new Date(date);

  const createdAtDate = postDay.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const diffTime = Math.abs(nowDay.getTime() - postDay.getTime());
  const diffMinutes = Math.ceil(diffTime / (1000 * 60));
  const createdAt =
    diffMinutes <= 60
      ? `${diffMinutes} minutes ago`
      : diffMinutes <= 60 * 24
      ? `${Math.ceil(diffMinutes / 60)} hours ago`
      : diffMinutes <= 60 * 24 * 30
      ? `${Math.ceil(diffMinutes / (60 * 24))} days ago`
      : createdAtDate;

  return createdAt;
}

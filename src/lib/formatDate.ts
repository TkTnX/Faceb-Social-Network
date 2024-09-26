export async function formatDate(date: Date) {
  const joinedAt = new Date(date);

  const formattedDate = joinedAt.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return formattedDate;
}

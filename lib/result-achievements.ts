// The audit identified universal pass-rate and alumni totals without evidence.
// Keep individual published toppers; withhold these aggregate marketing cards.
export function schoolAchievements<T extends { value: string; label: string; sub: string }>(
  achievements: T[], schoolName: string,
): T[] {
  return achievements
    .filter((item) => !/(?:board results|pass rate|alumni|nations|countries)/i.test(`${item.label} ${item.sub}`))
    .map((item) => /boards?/i.test(item.label)
      ? { ...item, value: "CBSE", label: "School curriculum", sub: schoolName }
      : item);
}

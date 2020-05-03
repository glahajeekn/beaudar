// todo: take a dependency on some relative time library.

const thresholds = [
  1000, '秒',
  1000 * 60, '分钟',
  1000 * 60 * 60, '小时',
  1000 * 60 * 60 * 24, '天',
  1000 * 60 * 60 * 24 * 7, '周',
  1000 * 60 * 60 * 24 * 27, '月'
];

const formatOptions: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };

export function timeAgo(current: number, value: Date) {
  const elapsed = current - value.getTime();
  if (elapsed < 5000) {
    return '刚刚';
  }
  let i = 0;
  while (i + 2 < thresholds.length && elapsed * 1.1 > thresholds[i + 2]) {
    i += 2;
  }

  const divisor = thresholds[i] as number;
  const text = thresholds[i + 1] as string;
  const units = Math.round(elapsed / divisor);

  if (units > 3 && i === thresholds.length - 2) {
    return `于 ${value.toLocaleDateString(undefined, formatOptions)}`;
  }
  return units === 1 ? `一 ${text} 前` : `${units} ${text} 前`;
}

/**
 * 将数字转换为字符串，如果数字大于等于10000，则转换为万单位
 * @param num 数字值
 */
export default function (num: number): string {
  if (num >= 10000) {
    const numWan = num / 10000
    return numWan.toFixed(1) + '万'
  } else {
    return num.toString()
  }
}

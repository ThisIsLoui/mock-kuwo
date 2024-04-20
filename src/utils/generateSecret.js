/**
 * 酷我音乐请求验证，根据 cookie value 和 cookie key 生成 secret
 * @param t cookie value
 * @param e cookie key
 * @returns secret
 */
export default function generateSecret(t, e) {
  if (null == e || e.length <= 0) return null
  for (var n = '', i = 0; i < e.length; i++) n += e.charCodeAt(i).toString()
  var r = Math.floor(n.length / 5),
    o = parseInt(n.charAt(r) + n.charAt(2 * r) + n.charAt(3 * r) + n.charAt(4 * r) + n.charAt(5 * r)),
    l = Math.ceil(e.length / 2),
    c = Math.pow(2, 31) - 1
  if (o < 2) return null
  var d = Math.round(1e9 * Math.random()) % 1e8
  for (n += d; n.length > 10; ) n = (parseInt(n.substring(0, 10)) + parseInt(n.substring(10, n.length))).toString()
  n = (o * n + l) % c
  var h = '',
    f = ''
  for (i = 0; i < t.length; i++)
    (f += (h = parseInt(t.charCodeAt(i) ^ Math.floor((n / c) * 255))) < 16 ? '0' + h.toString(16) : h.toString(16)), (n = (o * n + l) % c)
  for (d = d.toString(16); d.length < 8; ) d = '0' + d
  return (f += d)
}

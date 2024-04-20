// 酷我音乐的每次请求都需要一个请求头里有一个 secret ，此外还需要有一对特别的 cookie，不然就无法请求
// 这个 secret 是由那对特别的 cookie 就算出来的
// 任意请求一次酷我音乐首页就可以得到那对特别的 cookie，每次请求得到的 cookie 都不一样
export default function getTargetCookie(prefix: string = 'Hm_Iuvt_') {
  const cookies = document.cookie.split('; ')
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim()
    if (cookie.startsWith(prefix)) {
      return {
        key: cookie.split('=')[0],
        value: cookie.split('=')[1],
      }
    }
  }
  return {
    key: '',
    value: '',
  }
}

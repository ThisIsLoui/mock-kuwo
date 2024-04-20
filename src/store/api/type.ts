// Banner 项
export interface BannerItem {
  endTime: number
  id: number
  pic: string
  priority: number
  startTime: number
  url: string
}
// 歌单标签列表
export interface PlaylistTagList {
  data: PlaylistTag[]
  name: string
  id: string
  img: string
  img1: string
}
// 歌单标签
export interface PlaylistTag {
  digest: string
  id: string
  name: string
  img: string
}
// 歌单
export interface Playlist {
  img300?: string
  img500?: string
  img700?: string
  isOfficial?: number
  musicList?: Music[]
  tag?: string
  uPic?: string
  userName?: string
  attribute: string
  commentcnt: string
  desc: string
  digest: string
  extend: string
  favorcnt: string
  id: string
  img: string
  imgscript: string
  info: string
  isnew: string
  listencnt: string
  lossless_mark: string
  name: string
  radio_id: string
  total: string
  uid: string
  uname: string
}
// 排行榜菜单
export interface RankMenu {
  list: Rank[]
  name: string
}
// 排行榜
export interface Rank {
  id: string
  intro?: string
  source?: string
  sourceid?: string
  leader: string
  musicList: Music[]
  name: string
  num: string
  pic: string
  pub: string
}
// 音乐
export interface Music {
  albuminfo?: string
  hasLossless?: boolean
  mvPlayCnt?: number
  mvUpPcStr?: string
  upPcStr?: string
  ad_subtype: string
  ad_type: string
  album: string
  albumid: number
  albumpic: string
  artist: string
  artistid: number
  barrage: string
  content_type: string
  duration: number
  disable?: number
  hasmv: number
  isListenFee: boolean
  isstar: number
  musicrid: string
  mvpayinfo: Mvpayinfo
  name: string
  online: number
  originalsongtype: number
  pay: string
  payInfo: PayInfo
  pic: string
  pic120: string
  releaseDate: string
  rid: number
  score100: string
  tme_musician_adtype: string
  track: number
  songTimeMinutes?: string
}
// MV支付信息
export interface Mvpayinfo {
  down: number
  play: number
  vid: number
}
// 音乐支付信息
export interface PayInfo {
  cannotDownload: number
  cannotOnlinePlay: number
  down: string
  download: string
  feeType: FeeType
  limitfree: number
  listen_fragment: string
  local_encrypt: string
  ndown: string
  nplay: string
  overseas_ndown: string
  overseas_nplay: string
  play: string
  refrain_end: number
  refrain_start: number
}
// 费用信息
export interface FeeType {
  album?: string
  song: string
  vip: string
}
// 评论
export interface Comment {
  bpic: string
  broadcaster: string
  color: string
  commentTalent: string
  commentTalentType: string
  id: string
  identity_icon: string
  isYear: string
  is_like: string
  kuwoMusician: string
  like_num: string
  medalImg: string
  medalLevel: number
  medalName: string
  medalUrl: string
  menuTalent: string
  menuTalentType: string
  mpic: string
  msg: string
  nameplateImg: string
  rankImg: string
  rankUrl: string
  rankVal: number
  reply: Comment
  singTalent: string
  singTalentType: string
  state: string
  svip: string
  time: string
  typeface: string
  u_hangerid: string
  u_headframe: string
  u_id: string
  u_name: string
  u_pic: string
  videoTalentType: string
  vip: string
  vip2: string
  vip3: string
  vipIcon: string
}
// 评论列表
export interface CommentList {
  comment_tpye: string
  currentPage: number
  pageSize: number
  total: number | string
  totalPage: number
  rows: Comment[]
}
// 歌手
export interface Artist {
  birthday?: string
  birthplace?: string
  constellation?: string
  country?: string
  gener?: string
  info?: string
  language?: string
  tall: string
  upPcUrl: string
  weight: string
  aartist: string
  albumNum: number
  artistFans: number
  content_type: string
  id: number
  isStar: number
  musicNum: number
  mvNum: number
  name: string
  pic: string
  pic120: string
  pic300: string
  pic70: string
}
// MV
export interface Mv {
  artist: string
  artistid: number
  duration: number
  id: number
  mvPlayCnt: number
  name: string
  online: number
  pic: string
  songTimeMinutes: string
}
// 专辑
export interface Album {
  musicList?: Music[]
  playCnt?: number
  total?: number
  album: string
  albumid: number
  albuminfo: string
  artist: string
  artistid: number
  content_type: string
  isstar: number
  lang: string
  pay: number
  pic: string
  releaseDate: string
}
// 歌词
export interface LyricItem {
  lineLyric: string
  time: string
}

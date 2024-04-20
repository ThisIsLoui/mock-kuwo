import { useDispatch } from 'react-redux'
import { AppDispatch, store } from '../store'
import { Music } from '../store/api/type'
import useModal from './useModal'
import { addOne, clearList, clearOne, playMusic, updateCurrentTime } from '../store/player/playerSlice'
import { useLazyGetPlayurlQuery } from '../store/api/playurlApiSlice'
import { useGlobalAudioPlayer } from 'react-use-audio-player'
import { useRef } from 'react'

export default function usePlay() {
  const { open } = useModal()
  const { play, seek, load, getPosition, stop, src } = useGlobalAudioPlayer()
  const dispatch = useDispatch<AppDispatch>()
  const timerId = useRef<number>(0)
  const [fetchMusicUrl, { isFetching }] = useLazyGetPlayurlQuery()

  // 添加单首音乐到播放列表
  const addOneToList = (music: Music) => {
    const musicList = store.getState().player.musicList
    if (music.disable === 1) return open({ content: '因版权方要求，该音乐无法播放' })
    if (music.isListenFee) return open({ content: '该歌曲为付费内容，请下载酷我音乐客户端后付费收听' })
    if (musicList.find((item) => item.rid === music.rid)) return

    dispatch(addOne(music))
  }

  // 添加多首音乐到播放列表
  const addManyToList = (musics: Music[]) => {
    const musicList = store.getState().player.musicList
    const availableList = musics.filter((item) => item.disable !== 1 && !item.isListenFee)
    if (availableList.length === 0) return open({ content: '该列表中暂无可播放的音乐' })
    availableList.forEach((item) => {
      if (musicList.find((i) => i.rid === item.rid)) return
      dispatch(addOne(item))
    })
  }

  // 播放单首音乐
  const playOne = async (music: Music) => {
    const currentMusic = store.getState().player.currentMusic
    const musicList = store.getState().player.musicList

    // 如果还在加载上一次的音乐，则不响应此次播放的操作
    if (isFetching) return
    // 如果该音乐就是当前正在播放的音乐，则从头开始放
    if (currentMusic.rid === music.rid && src) {
      seek(0)
      play()
      return
    }
    // 判断音乐是否可播放
    if (music.disable === 1) return open({ content: '因版权方要求，该音乐无法播放' })
    if (music.isListenFee) return open({ content: '该歌曲为付费内容，请下载酷我音乐客户端后付费收听' })

    // 如果该音乐未在播放列表中，则先添加到列表
    if (!musicList.find((item) => item.rid === music.rid)) {
      dispatch(addOne(music))
    }

    // 获取音乐播放地址，然后设置当前播放的音乐为它，最后播放
    try {
      dispatch(playMusic(music))
      const res = await fetchMusicUrl({ id: music.rid.toString(), type: 'music' }).unwrap()

      stop()
      load(res.data.url, {
        autoplay: true,
        loop: false,
        html5: true,
        onplay: () => {
          timerId.current = window.setInterval(() => {
            dispatch(updateCurrentTime(getPosition()))
          }, 250)
        },
        onstop: () => {
          clearInterval(timerId.current)
        },
        onpause: () => {
          clearInterval(timerId.current)
        },
        onend: () => {
          clearInterval(timerId.current)
          playNext()
        },
      })
    } catch (e) {
      open({ content: '播放音乐失败' })
      removeOne(music)
    }
  }

  // 播放多首音乐
  const playMany = async (musics: Music[]) => {
    addManyToList(musics)
    const firstAvailableMusic = musics.find((item) => item.disable !== 1 && !item.isListenFee)
    if (firstAvailableMusic) playOne(firstAvailableMusic)
  }

  // 播放下一首音乐
  const playNext = () => {
    const currentMusic = store.getState().player.currentMusic
    const musicList = store.getState().player.musicList
    const playMode = store.getState().player.playMode

    let index = musicList.findIndex((item) => item.rid === currentMusic.rid)
    if (index === -1) return
    // 根据播放模式选择下一首音乐
    if (playMode === 'loop') {
      index = (index + 1 + musicList.length) % musicList.length
    } else if (playMode === 'onebyone') {
      if (index + 1 >= musicList.length) {
        open({ content: '已经是最后一首了' })
        stop()
        dispatch(updateCurrentTime(0))
        return
      } else {
        index = index + 1
      }
    }
    playOne(musicList[index])
  }

  // 播放上一首音乐
  const playPrev = () => {
    const currentMusic = store.getState().player.currentMusic
    const musicList = store.getState().player.musicList
    const playMode = store.getState().player.playMode

    let index = musicList.findIndex((item) => item.rid === currentMusic.rid)
    if (index === -1) return
    // 根据播放模式选择上一首音乐
    if (playMode === 'loop') {
      index = (index - 1 + musicList.length) % musicList.length
    } else if (playMode === 'onebyone') {
      if (index - 1 < 0) {
        open({ content: '已经是第一首了' })
        stop()
        dispatch(updateCurrentTime(0))
        return
      } else {
        index = index - 1
      }
    }
    playOne(musicList[index])
  }

  // 删除所有音乐
  const removeAll = () => {
    dispatch(clearList())
    stop()
  }

  // 删除一个音乐
  const removeOne = (music: Music) => {
    const musicList = store.getState().player.musicList
    const currentMusic = store.getState().player.currentMusic
    const playMode = store.getState().player.playMode
    // 如果该音乐正在播放
    if (currentMusic.rid === music.rid) {
      // 先停止播放
      stop()
      // 如果没有其他音乐了，或者是单曲循环，直接清空当前音乐、复原当前时间
      if (musicList.length === 1 || playMode === 'singleloop') dispatch(playMusic({} as Music))
      // 如果还有其他音乐，播放下一首
      else playNext()
    }
    // 最后将该音乐从播放列表中删掉
    dispatch(clearOne(music))
  }

  return { addOneToList, addManyToList, playOne, playMany, playNext, playPrev, removeOne, removeAll }
}

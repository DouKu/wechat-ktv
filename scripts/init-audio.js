import '../nconf'
import '../mongoose'
import mongoose from 'mongoose'
import { uploadToQiniu, checkfile } from '../services/qiniu-oss'
import Path from 'path'

const Audio = mongoose.model('Audios')
const dir = '../tempFiles'

const resource = [
  { 
    name: '死了都要爱', 
    fileName: '1.mp3',
    url: '',
    secondes: [
      1, 4, 11, 13, 17, 21, 25, 29, 32, 36, 39
    ],
    parLen: [16, 8, 7, 8, 8],
    lyric: [
      '享受现在',
      '别一开怀就怕受伤害',
      '许多奇迹',
      '我们相信才会存在',
      '死了都要爱',
      '不淋漓尽致不痛快',
      '感情多深 只有这样',
      '才足够表白',
      '死了都要爱',
      '不哭到微笑不痛快',
      '宇宙毁灭心还在'
    ]
  },
  { 
    name: '离歌', 
    fileName: '2.mp3', 
    url: '',
    secondes: [
      1, 8, 15, 18, 21, 28, 35, 42, 45, 48, 55, 57
    ],
    parLen: [14, 13, 14, 13, 15],
    lyric: [
      '想留不能留 才最寂寞',
      '没说完温柔 只剩离歌',
      '心碎前一秒',
      '用力的相拥着沉默',
      '用心跳送你 辛酸离歌',
      '想留不能留 才最寂寞',
      '没说完温柔 只剩离歌',
      '心碎前一秒',
      '用力的相拥着沉默',
      '用心跳送你 辛酸离歌',
      '看不见永久',
      '听见离歌'
    ]
  },
  { 
    name: '火烧的寂寞', 
    fileName: '3.mp3',
    url: '',
    secondes: [
      1, 4, 7, 14, 21, 24, 29, 36, 45, 51, 54, 59, 67
    ],
    parLen: [14, 16, 16, 15, 20],
    lyric: [
      '我拒绝不想我',
      '却还奢求你爱我',
      '倔强让感情窒息了',
      '火烧的寂寞 冷冻的沉默',
      '没来由的激动',
      '不能抱住你 手像半废了',
      '被大海淹没 从山顶滑落',
      '可怕的想念 还活着',
      '火烧的寂寞 冷冻的沉默',
      '在坚持些什么',
      '有时连自己也不是太懂',
      '我不想祈求 就只好承受',
      '可怕的想念 翻搅着'
    ]
  },
  { 
    name: 'One night in 北京', 
    fileName: '4.mp3',
    url: '',
    secondes: [
      1, 4, 8, 10, 13, 16, 19, 22, 24, 29, 35, 41
    ],
    parLen: [12, 6, 6, 12, 13],
    lyric: [
      'One Night in 北京',
      '我留下许多情',
      '不管你爱与不爱',
      '都是历史的尘埃',
      'One Night in 北京',
      '我留下许多情',
      '不敢在午夜问路',
      '怕走到了百花深处',
      '人说百花地深处',
      '住着老情人 缝着绣花鞋',
      '面容安详的老人',
      '依旧等着那出征的归人',
    ]
  }
]

const start = async () => {
  await Audio.remove({})
  const res = await resource.forEach(async item => {
    try {
      const url = await uploadToQiniu(Path.resolve(__dirname, './files'), item.fileName)
      console.log(url)
      return await new Audio({
        url: url,
        fileName: item.fileName,
        name: item.name,
        secondes: item.secondes,
        parLen: item.parLen,
        lyric: item.lyric
      }).save()
    } catch (error) {
      console.log(error)    
    }
  })
}

start()

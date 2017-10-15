import { getMedia } from '../services/core/audio-service'

const saveMedia = async (req, res, next) => {
  const mediaId = req.body.mediaId
  try {
    const res = await getMedia(mediaId)
    console.log(res, 'outdata')
    res.json({
      code: 200,
      data: {
        res
      }
    })
  } catch (error) {
    res.json({
      code: 400,
      msg: error.message
    })    
  }
}

export {
  saveMedia
}
import { findAudio } from '../services/core/audio-service'

const getAllXinMusic = async (req, res, next) => {
	try {
		let xinMusics = await findAudio({})
		res.json({ code: 200, data: xinMusics })
	} catch (err) {
		res.json({ code: 400, msg: err.message })
	}
}

const addXinMusic = async (req, res, next) => {
	try {
		// TODO 检查七牛云是否有对应的文件,有才保存 
		res.json({ code: 200 })
	} catch (err) {
		res.json({ code: 400, msg: err.message })
	}
}



export {
	getAllXinMusic
}
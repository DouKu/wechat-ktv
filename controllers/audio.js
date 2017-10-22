import { findAudio, findOneAudio, saveAudio, updateAudio } from '../services/core/audio-service'
import { checkfile } from '../services/qiniu-oss/index'

const getOneXinMusic = async (req, res, next) => {
	try {
		const audioId = req.params.id
		const xinMusic = await findOneAudio({ _id: audioId })
		res.json({
			code: 200,
			data: xinMusic
		})
	} catch (error) {
		console.log(error)
		res.json({
			code: 500,
			msg: error.message
		})
	}
}
/**
 * 获取所有信的音乐
 * @param {*} req  get 
 * @param {*} res 
 * @param {*} next 
 */
const getAllXinMusic = async (req, res, next) => {
	try {
		let xinMusics = await findAudio({})
		res.json({ code: 200, data: xinMusics })
	} catch (err) {
		res.json({ code: 400, msg: err.message })
	}
}

/**
 * 添加信的音乐
 * @param {name: string, url: string} req post
 * @param {*} res 
 * @param {*} next 
 */
const addXinMusic = async (req, res, next) => {
	try {
		// 检查七牛云是否有对应的文件,有才保存
		await checkfile(req.name)
		await saveAudio(req.body)
		res.json({ code: 200 })
	} catch (err) {
		res.json({ code: 400, msg: err.message })
	}
}

/**
 * 修改
 * @param {*} req put 
 * @param {*} res 
 * @param {*} next 
 */
const updateXinMusic = async (req, res, next) => {
	try {
		// 同样需要检查是否有对应的文件,有才可以更新
		await checkfile(req.name)
		await updateAudio({ id: req.params.audioId }, req.body)
		res.json({ code: 200 })
	} catch (err) {
		res.json({ code: 400, msg: err.message })
	}
}

export {
	getOneXinMusic,
	getAllXinMusic,
	addXinMusic,
	updateXinMusic,
}
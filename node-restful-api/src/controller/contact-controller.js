import { logger } from "../application/logging.js"
import contactService from "../service/contact-service.js"

const create = async (req, res, next) => {
    try {
        const user = req.user
        const request = req.body
        const result = await contactService.create(user, request)

        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const get = async (req, res, next) => {
    try {
        const result = await contactService.get(req.user, req.params.contactId)
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
} 

const update = async (req, res, next) => {
    try {
        const result = await contactService.update(req.user, req.body)
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const remove = async (req, res, next) => {
    try {
        await contactService.remove(req.user, req.params.contactId)
        res.status(200).json({
            data: "OK"
        })
    } catch (error) {
        next(error)
    }
}

const search = async (req, res, next) => {
    try {
        logger.info(req)
        const result = await contactService.search(req.user, req.query)
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

export default {
    create,
    get,
    update,
    remove,
    search
}
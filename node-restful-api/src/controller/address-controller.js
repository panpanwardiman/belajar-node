import addressService from "../service/address-service.js"

const create = async (req, res, next) => {
    try {
        const result = await addressService.create(req.user, req.params.contactId, req.body)
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const request = req.body
        request.id = req.params.addressId
        const result = await addressService.update(req.user, req.params.contactId, request)
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const get = async (req, res, next) => {
    try {
        const contactId = req.params.contactId
        const addressId = req.params.addressId
        const result = await addressService.get(req.user, contactId, addressId)
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const remove = async (req, res, next) => {
    try {
        const contactId = req.params.contactId
        const addressId = req.params.addressId
        await addressService.get(req.user, contactId, addressId)
        res.status(200).json({
            data: "OK"
        })
    } catch (error) {
        next(error)
    }
}

export default {
    create,
    update,
    get,
    remove
}
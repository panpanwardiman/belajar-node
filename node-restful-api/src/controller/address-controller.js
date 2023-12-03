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

export default {
    create,
    update
}
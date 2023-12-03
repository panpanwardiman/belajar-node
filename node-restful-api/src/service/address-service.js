import { prismaClient } from "../application/database.js"
import { ResponseError } from "../error/response-error.js"
import { createAddressValidation } from "../validation/address-validation.js"
import { getContactValidation } from "../validation/contact-validation.js"
import { validate } from "../validation/validation.js"

const checkContactMustExists = async (user, contactId) => {
    contactId = validate(getContactValidation, contactId)
    
    const totalContact = await prismaClient.contact.count({
        where: {
            username: user.username,
            id: contactId
        }
    })

    if (!totalContact) {
        throw new ResponseError(404, 'Contact not found')
    }

    return contactId
}

const create = async (user, contactId, request) => {
    contactId = await checkContactMustExists(user, contactId)

    const address = validate(createAddressValidation, request)
    address.contact_id = contactId

    return prismaClient.address.create({
        data: address,
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true
        }
    })
}

export default {
    create
}
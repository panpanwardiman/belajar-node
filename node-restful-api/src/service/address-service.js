import { prismaClient } from "../application/database.js"
import { ResponseError } from "../error/response-error.js"
import { createAddressValidation, getAddressValidation, updateAddressValidation } from "../validation/address-validation.js"
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

const update = async (user, contactId, request) => {
    contactId = await checkContactMustExists(user, contactId)    
    const address = validate(updateAddressValidation, request)
    const countAddress = await prismaClient.address.count({
        where: {
            contact_id: contactId,
            id: address.id
        }
    })

    if (!countAddress) {
        throw new ResponseError(404, 'Address not found')
    }

    return prismaClient.address.update({
        where: {
            id: address.id
        },
        data: {
            street: address.street,
            city: address.city,
            province: address.province,
            country: address.country,
            postal_code: address.postal_code
        },
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

const get = async (user, contactId, addressId) => {
    contactId = await checkContactMustExists(user, contactId) 
    const address = validate(getAddressValidation, {
        id: addressId,
        contact_id: contactId
    })  

    const result = await prismaClient.address.findUnique({
        where: {
            id: address.id
        },
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true
        }
    })

    if (!result) {
        throw new ResponseError(404, 'Address not found')
    }

    return result
}

export default {
    create,
    update,
    get
}
import supertest from "supertest"
import { createTestContact, createTestUser, getTestContact, removeAllTestContacts, removeAllTestAddresses, removeTestUser } from "./test-utils.js"
import { web } from "../src/application/web.js"

describe('POST /api/contacts/:contactId/address', function() {
    beforeEach(async () => {
        await createTestUser()
        await createTestContact()
    })

    afterEach(async () => {
        await removeAllTestAddresses()
        await removeAllTestContacts()
        await removeTestUser()
    })

    it('should create new address in contact', async () => {
        const contact = await getTestContact()
        const result = await supertest(web)
            .post('/api/contacts/' + contact.id + '/address')
            .set('Authorization', 'test')
            .send({
                street: "jalan test",
                city: "kota test",
                province: "provinsi test",
                country: "negara test",
                postal_code: "12345"
            })

        expect(result.status).toBe(200)
        expect(result.body.data.id).toBeDefined()
        expect(result.body.data.street).toBe('jalan test')
        expect(result.body.data.city).toBe('kota test')
        expect(result.body.data.province).toBe('provinsi test')
        expect(result.body.data.country).toBe('negara test')
        expect(result.body.data.postal_code).toBe('12345')
    })
})
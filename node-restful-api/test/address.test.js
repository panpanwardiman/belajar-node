import supertest from "supertest"
import { createTestContact, createTestUser, getTestContact, removeAllTestContacts, removeAllTestAddresses, removeTestUser, createTestAddress, getTestAddress } from "./test-utils.js"
import { web } from "../src/application/web.js"
import { logger } from "../src/application/logging.js"

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

describe('PUT /api/contacts/:contactId/address/:addressId', function() {
    beforeEach(async () => {
        await createTestUser()
        await createTestContact()
        await createTestAddress()
    })

    afterEach(async () => {
        await removeAllTestAddresses()
        await removeAllTestContacts()
        await removeTestUser()
    })

    it('should update data address', async () => {
        const contact = await getTestContact()
        const address = await getTestAddress()
        const result = await supertest(web)
            .put('/api/contacts/' + contact.id + '/address/' + address.id)
            .set('Authorization', 'test')
            .send({
                street: "jalan test update",
                city: "kota test update",
                province: "provinsi test update",
                country: "negara test update",
                postal_code: "12345"
            })
        
        expect(result.status).toBe(200)
        expect(result.body.data.id).toBeDefined()
        expect(result.body.data.street).toBe('jalan test update')
        expect(result.body.data.city).toBe('kota test update')
        expect(result.body.data.province).toBe('provinsi test update')
        expect(result.body.data.country).toBe('negara test update')
        expect(result.body.data.postal_code).toBe('12345')
    }) 
    
    it('should can\'t update data address', async () => {
        const contact = await getTestContact()
        const address = await getTestAddress()
        const result = await supertest(web)
            .put('/api/contacts/' + contact.id + '/address/' + address.id)
            .set('Authorization', 'test')
            .send({
                street: "jalan test update",
                city: "kota test update",
                province: "provinsi test update",
                country: "",
                postal_code: "12345"
            })

        logger.info(result)
        
        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    }) 
})

describe('GET /api/contacts/:contactId/address/:addressId', function () {
    beforeEach(async () => {
        await createTestUser()
        await createTestContact()
        await createTestAddress()
    })

    afterEach(async () => {
        await removeAllTestAddresses()
        await removeAllTestContacts()
        await removeTestUser()
    })

    it('should get data address', async () => {
        const contact = await getTestContact()
        const address = await getTestAddress()
        const result = await supertest(web)
            .get('/api/contacts/'+ contact.id +'/address/' + address.id)
            .set('Authorization', 'test')
        
        expect(result.status).toBe(200)
        expect(result.body.data.id).toBeDefined()
        expect(result.body.data.street).toBe('jalan test')
        expect(result.body.data.city).toBe('kota test')
        expect(result.body.data.province).toBe('provinsi test')
        expect(result.body.data.country).toBe('negara test')
        expect(result.body.data.postal_code).toBe('12345')
    })

    it('should can\'t get data address', async () => {
        const contact = await getTestContact()
        const result = await supertest(web)
            .get('/api/contacts/'+ contact.id +'/address/1')
            .set('Authorization', 'test')
        
        expect(result.status).toBe(404)
        expect(result.body.errors).toBeDefined()
    })

    it('should invalid url get address', async () => {
        const result = await supertest(web)
            .get('/api/contacts/a/address/1')
            .set('Authorization', 'test')
        
        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })
})

describe('DELETE /api/contacts/:contactId/address/:addressId', function () {
    beforeEach(async () => {
        await createTestUser()
        await createTestContact()
        await createTestAddress()
    })

    afterEach(async () => {
        await removeAllTestAddresses()
        await removeAllTestContacts()
        await removeTestUser()
    })

    it('should can delete data address', async () => {
        const contact = await getTestContact()
        const address = await getTestAddress()
        const result = await supertest(web)
            .delete('/api/contacts/'+ contact.id +'/address/' + address.id)
            .set('Authorization', 'test')
        
        expect(result.status).toBe(200)
        expect(result.body.data).toBe("OK")
    })
})

describe('GET /api/contacts/:contactId/address', function () {
    beforeEach(async () => {
        await createTestUser()
        await createTestContact()
        await createTestAddress()
    })

    afterEach(async () => {
        await removeAllTestAddresses()
        await removeAllTestContacts()
        await removeTestUser()
    })

    it('should can show list data address', async () => {
        const contact = await getTestContact()
        const result = await supertest(web)
            .get('/api/contacts/'+ contact.id +'/address/')
            .set('Authorization', 'test')
        
        expect(result.status).toBe(200)
        expect(result.body.data.length).toBe(1)
    })
})
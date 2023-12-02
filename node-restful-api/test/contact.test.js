import supertest from "supertest"
import { createManyTestContacts, createTestContact, createTestUser, getTestContact, removeAllTestContacts, removeTestUser } from "./test-utils.js"
import { web } from "../src/application/web.js"
import { logger } from "../src/application/logging.js"

describe('POST /api/contacts', function() {
    beforeEach(async () => {
        await createTestUser()
    })

    afterEach(async () => {
        await removeAllTestContacts()
        await removeTestUser()
    })

    it('sould can create new contact', async () => {
        const result = await supertest(web)
            .post('/api/contacts')
            .set('Authorization', 'test')
            .send({
                first_name: "test",
                last_name: "test",
                email: "test@test.id",
                phone: "123456789012"
            })
        
        expect(result.status).toBe(200)
        expect(result.body.data.id).toBeDefined()
        expect(result.body.data.first_name).toBe("test")
        expect(result.body.data.last_name).toBe("test")
        expect(result.body.data.email).toBe("test@test.id")
        expect(result.body.data.phone).toBe("123456789012")
    })
    
    it('sould reject create new contact', async () => {
        const result = await supertest(web)
            .post('/api/contacts')
            .set('Authorization', 'test')
            .send({
                first_name: "",
                last_name: "test",
                email: "test@test.id",
                phone: "123456789012"
            })
        
        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })
})

describe('GET /api/contacts/:contactId', function() {
    beforeEach(async () => {
        await createTestUser()
        await createTestContact()
    })

    afterEach(async () => {
        await removeAllTestContacts()
        await removeTestUser()
    })

    
    it('sould can get contact', async () => {
        const contact = await getTestContact()
        const result = await supertest(web)
            .get('/api/contacts/' + contact.id)
            .set('Authorization', 'test')
        
        expect(result.status).toBe(200)
        expect(result.body.data.id).toBe(contact.id)
        expect(result.body.data.first_name).toBe('test')
        expect(result.body.data.last_name).toBe('test')
        expect(result.body.data.email).toBe('test@test.id')
        expect(result.body.data.phone).toBe('123456789012')

    })
})

describe('PUT /api/contacts/:contactId', function() {
    beforeEach(async () => {
        await createTestUser()
        await createTestContact()
    })

    afterEach(async () => {
        await removeAllTestContacts()
        await removeTestUser()
    })

    it('sould can update data contact', async () => {
        const contact = await getTestContact();
        const result = await supertest(web)
            .put('/api/contacts/' + contact.id)
            .set('Authorization', 'test')
            .send({
                id: contact.id,
                first_name: "test",
                last_name: "wardiman",
                email: "test@test.id",
                phone: "123456789012"
            })

        expect(result.status).toBe(200)
        expect(result.body.data.id).toBe(contact.id)
        expect(result.body.data.first_name).toBe('test')
        expect(result.body.data.last_name).toBe('wardiman')
        expect(result.body.data.email).toBe('test@test.id')
        expect(result.body.data.phone).toBe('123456789012')
    })
})

describe('DELETE /api/contacts/:contactId', function() {
    beforeEach(async () => {
        await createTestUser()
        await createTestContact()
    })

    afterEach(async () => {
        await removeAllTestContacts()
        await removeTestUser()
    })

    it('sould can delete data contact', async () => {
        const contact = await getTestContact()
        const result = await supertest(web)
            .delete('/api/contacts/' + contact.id)
            .set('Authorization', 'test')
        
        expect(result.status).toBe(200)   
        expect(result.body.data).toBe("OK")   
    })

    it('sould can\'t delete data contact', async () => {
        const contact = await getTestContact()
        const result = await supertest(web)
            .delete('/api/contacts/49')
            .set('Authorization', 'test')
        
        expect(result.status).toBe(404)   
        expect(result.body.errors).toBeDefined()
    })
})

describe('GET /api/contacts', function() {
    beforeEach(async () => {
        await createTestUser()
        await createManyTestContacts()
    })

    afterEach(async () => {
        await removeAllTestContacts()
        await removeTestUser()
    })

    it('sould can search without params', async () => {
        const result = await supertest(web)
            .get('/api/contacts')
            .set('Authorization', 'test')
        
        expect(result.status).toBe(200)
        expect(result.body.data.length).toBe(10)
        expect(result.body.paging.page).toBe(1)
        expect(result.body.paging.total_page).toBe(2)
        expect(result.body.paging.total_item).toBe(15)

    })
    
    it('sould can search by page 2', async () => {
        const result = await supertest(web)
            .get('/api/contacts')
            .set('Authorization', 'test')
            .query({
                page: 2
            })
        
        expect(result.status).toBe(200)
        expect(result.body.data.length).toBe(5)
        expect(result.body.paging.page).toBe(2)
        expect(result.body.paging.total_page).toBe(2)
        expect(result.body.paging.total_item).toBe(15)
    })
    
    it('sould can search by name', async () => {
        const result = await supertest(web)
            .get('/api/contacts')
            .set('Authorization', 'test')
            .query({
                name: "test 1"
            })

        logger.info(result)
        
        expect(result.status).toBe(200)
        expect(result.body.data.length).toBe(6)
        expect(result.body.paging.page).toBe(1)
        expect(result.body.paging.total_page).toBe(1)
        expect(result.body.paging.total_item).toBe(6)
    })
})
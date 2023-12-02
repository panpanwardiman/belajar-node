import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import { createTestUser, getTestUser, removeTestUser } from "./test-utils.js";
import bcrypt from "bcrypt";

describe('POST /api/users', function() {

    afterEach(async () => {
        await removeTestUser();
    });

    it('shoud can register new register', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username: "test",
                password: "test",
                name: "test"
            });

        expect(result.status).toBe(200); 
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("test");
        expect(result.body.data.password).toBeUndefined();
    });

    it('shoud reject if request invalid', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username: "",
                password: "",
                name: ""
            });    

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined()
    }); 

    it('shoud reject if username already exist', async () => {
        let result = await supertest(web)
            .post('/api/users')
            .send({
                username: "test",
                password: "test",
                name: "test"
            });

        logger.info(result.body)

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("test");
        expect(result.body.data.password).toBeUndefined();

        result = await supertest(web)
            .post('/api/users')
            .send({
                username: "test",
                password: "test",
                name: "test"
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
});

describe('POST /api/users/login', function() {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it("sould be login", async () => {
        const result = await supertest(web)
            .post("/api/users/login")
            .send({
                username: "test",
                password: "rahasia"
            });
    
            logger.info(result.body)
    
            expect(result.status).toBe(200);
            expect(result.body.data.token).toBeDefined();
            expect(result.body.data.token).not.toBe("test")
    });
    
    it("sould reject login if invalid request", async () => {
        const result = await supertest(web)
            .post("/api/users/login")
            .send({
                username: "",
                password: ""
            });
    
            logger.info(result.body)
    
            expect(result.status).toBe(400);
            expect(result.body.errors).toBeDefined();
    });
    
    it("sould reject login if password wrong", async () => {
        const result = await supertest(web)
            .post("/api/users/login")
            .send({
                username: "test",
                password: "test"
            });
    
            logger.info(result.body)
    
            expect(result.status).toBe(401);
            expect(result.body.errors).toBeDefined();
    });
});

describe('GET /api/users/current', function () {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it("sould can get current user", async () => {
        const result = await supertest(web)
            .get('/api/users/current')
            .set('Authorization', 'test')

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('test');
        expect(result.body.data.name).toBe('test');
    });

    it("sould reject if token invalid", async () => {
        const result = await supertest(web)
            .get('/api/users/current')
            .set('Authorization', 'salah')

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });
})

describe('PATCH /api/users/current', function() {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it('sould can update user', async () => {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'test')
            .send({
                name: 'panpan',
                password: 'rahasialagi'
            })

        expect(result.status).toBe(200)
        expect(result.body.data.username).toBeDefined()
        expect(result.body.data.name).toBeDefined()

        const user = await getTestUser()
        expect(await bcrypt.compare("rahasialagi", user.password)).toBe(true)
    })

    it('sould can update password', async () => {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'test')
            .send({
                password: 'rahasialagi'
            })

        expect(result.status).toBe(200)
        expect(result.body.data.username).toBeDefined()
        expect(result.body.data.name).toBeDefined()

        const user = await getTestUser()
        expect(await bcrypt.compare("rahasialagi", user.password)).toBe(true)
    })
})
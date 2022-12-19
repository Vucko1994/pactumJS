const pactum = require('pactum');
const jsonSchema = require('../Test-Data/jsonSchema.json');
const testData = require('../Test-Data/testData.json');
const request = pactum.request;
request.setDefaultTimeout(20000);
request.setBaseUrl('https://reqres.in/');

it('Register test', async () => {
    await pactum.spec()
        .post('api/register')
        .withJson(testData.registerAndLoginBody)
        .expectStatus(200)
        .expectResponseTime(700)
        .expectBody(testData.registerResponseBody);
});

it('Login test', async () => {
    const expectedBody = { token: 'QpwL5tke4Pnpja7X4' };
    await pactum.spec()
        .post('api/login')
        .withJson(testData.registerAndLoginBody)
        .expectStatus(200)
        .expectResponseTime(700)
        .expectBody(expectedBody);
});

it('Create user test', async () => {
    const createBody = {
        'name': 'morpheus',
        'job': 'leader'
    }
    await pactum.spec()
        .post('api/users')
        .withJson(createBody)
        .expectStatus(201)
        .expectResponseTime(700)
        .expectJsonMatch('name', 'morpheus')
        .expectJsonMatch('job', 'leader');
});

it('Update user (PATCH) test', async () => {
    const createBody = {
        'name': 'morpheus',
        'job': 'qa engineer'
    }
    await pactum.spec()
        .patch('api/users/2')
        .withJson(createBody)
        .expectStatus(200)
        .expectResponseTime(700)
        .expectJsonMatch('name', 'morpheus')
        .expectJsonMatch('job', 'qa engineer');
});

it('Update user (PUT) test', async () => {
    const createBody = {
        'name': 'morpheus',
        'job': 'developer'
    }
    await pactum.spec()
        .put('api/users/2')
        .withJson(createBody)
        .expectStatus(200)
        .expectResponseTime(700)
        .expectJsonMatch('name', 'morpheus')
        .expectJsonMatch('job', 'developer');
});


it('Get all users test', async () => {
    await pactum.spec()
        .get('api/users?')
        .expectStatus(200)
        .expectResponseTime(700)
        .expectJsonSchema(jsonSchema);
});

it('Get single users test', async () => {
    await pactum.spec()
        .get('api/users/2')
        .expectStatus(200)
        .expectResponseTime(700)
        .expectJsonMatch('data.id', 2)
        .expectJsonMatch('data.email', 'janet.weaver@reqres.in')
        .expectJsonMatch('data.first_name', 'Janet')
        .expectJsonMatch('data.last_name', 'Weaver')
        .expectJsonMatch('data.avatar', 'https://reqres.in/img/faces/2-image.jpg');
});

it('Delete user test', async () => {
    await pactum.spec()
        .delete('api/users/2')
        .expectStatus(204)
        .expectResponseTime(700);
});
const pactum = require('pactum');
const request = pactum.request;
request.setDefaultTimeout(20000);
request.setBaseUrl('https://reqres.in/');

it('Unsuccessful-Register test', async () => {
    const registerBody = { "email": "sydney@fife" }
    const expectedBody = { 'error': 'Missing password' };
    await pactum.spec()
        .post('api/register')
        .withJson(registerBody)
        .expectStatus(400)
        .expectResponseTime(700)
        .expectBody(expectedBody);
});

it('Unsuccessful-Login test', async () => {
    const loginBody = {
        "email": "sydney@fife"
    }
    const expectedBody = { "error": "Missing password" };
    await pactum.spec()
        .post('api/login')
        .withJson(loginBody)
        .expectStatus(400)
        .expectResponseTime(700)
        .expectBody(expectedBody);
});

it('Get single user not found test', async () => {
    await pactum.spec()
        .get('api/users/23')
        .expectStatus(404)
        .expectResponseTime(700)
        .expectBody({});
});
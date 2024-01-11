const chai = require("chai");
const supertest = require("supertest");

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Test E-commerce', () => {

    let cookie;

    describe('Test Users', async () => {

        // it('Registrar un nuevo usuario', async () => {
        //     const userMock = {
        //         firstName: 'nameTest',
        //         lastName: 'lastNameTest',
        //         email: 'emailtest@email.com',
        //         age: 32,
        //         password: '123456',
        //         rol: 'admin'
        //     };

        //     const { statusCode, ok, _body } = await requester.post('/api/sessions/register').send(userMock);

        //     console.log(statusCode)
        //     console.log(ok)
        //     console.log(_body)

        // });

        it('Debe loguear correctamente a un usuario y devolver una cookie', async () => {

            const userMock = {
                email: 'emailtest@email.com',
                password: '123456'
            }

            const result = await requester.post('/api/sessions/login').send(userMock);

            const cookieResult = result.headers['set-cookie'][0];
            expect(cookieResult).to.be.ok;
            cookie = {
                name: cookieResult.split('=')[0],
                value: cookieResult.split('=')[1]
            }

            expect(cookie.name).to.be.ok.and.eql('token');
            expect(cookie.value).to.be.ok;

        })

        it('Debe enviar la cookie que contiene el usuario y destructurar este correctamenten', async () => {

            const { _body } = await requester.get('/api/sessions/current').set('Cookie', [`${cookie.name}=${cookie.value}`]);

            expect(_body.email).to.be.eql('emailtest@email.com');

        })

    });
});
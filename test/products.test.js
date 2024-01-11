const chai = require("chai");
const supertest = require("supertest");

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Testing Ecommerce', () => {

    describe('Test Products', () => {

        it('Endpoint post product', async () => {

            const productMock = {
                title: 'titleTest',
                description: 'descrTest',
                category: 'catetest',
                price: 123,
                code: 'codeTest',
                stock: 8,
                availability: 'inStock'
            };

            const { statusCode, ok, _body } = await requester.post('/api/products').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsdGVzdEBlbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJuYW1lVGVzdCIsImxhc3ROYW1lIjoibGFzdE5hbWVUZXN0Iiwicm9sIjoiYWRtaW4iLCJpYXQiOjE3MDUwMDgyMTQsImV4cCI6MTcwNTA5NDYxNH0.EygYn9EMWZrlG8cqEDEJyE6ZeT60ilTfNV_Y-Z_7WMc').send(productMock);

            console.log(statusCode)
            console.log(ok)
            console.log(_body)

        })

        it('debe devolver la lista de productos', async () => {

            const { statusCode, ok, _body } = await requester.get('/api/products')

            expect(statusCode).to.equal(200)
            expect(_body).to.have.property('payload')
            expect(_body.payload).to.be.an('array')

        })

        it('El metodo PUT debe poder actualizar correctamente a una mascota determinada', async () => {

            const productUpdated = {
                title: 'NewTitle'
            }

            const existProductId = '153f348d3c08b474b93rvh37'

            const { statusCode, ok, _body } = await requester.put(`/api/products/${existProductId}`).send(productUpdated)

            expect(statusCode).to.equal(200)
            expect(_body.payload).to.have.property('_id').to.equal(existProductId)
            expect(_body.payload).to.have.property('title').to.equal('NewTitle')
        })

        it('El metodo DELETE debe poder borrar el último producto agregado', async () => {
            
            const newProduct = {
                title: 'titleTest',
                description: 'descrTest',
                category: 'catetest',
                price: 123,
                code: 'codeTest',
                stock: 8,
                availability: 'inStock'
            }

            const postResponse = await requester.post('/api/products').send(newProduct)
            const productIdToDelete = postResponse._body.payload._id

            const deleteResponse = await requester.delete(`/api/products/${productIdToDelete}`)

            expect(deleteResponse.statusCode).to.equal(200)

            const getResponse = await requester.get('/api/products')
            const deleteProduct = getResponse._body.payload.find(product => product._id === productIdToDelete)
            expect(deleteProduct).to.be.undefined
        })

    })

})
const chai = require("chai");
const supertest = require("supertest");
const mongoose = require("mongoose");

const { expect, assert } = chai;

describe('Testing Ecommerce', () => {

    describe('Test Carts', () => {

        it('Debe crear un nuevo carrito', async () => {

            const cartMock = {
                products: [
                    {
                        productId: new mongoose.Types.ObjectId(),
                        quantity: 2,
                    },
                ],
            };

            const { statusCode, _body } = await requester.post("/api/carts").send(cartMock);

            expect(statusCode).to.equal(200); 
            expect(_body.success).to.equal(true);

        })

        it('debe devolver todos los carritos', async () => {

            const { statusCode, ok, _body } = await requester.get("/api/carts")

            expect(statusCode).to.equal(200)
            expect(_body).to.have.property('payload')
            expect(_body.payload).to.be.an('array')

        })

        it('El metodo PUT debe poder actualizar correctamente a una mascota determinada', async () => {

            const productUpdated = {
                products: [
                    {
                        productId: new mongoose.Types.ObjectId(),
                        quantity: 4,
                    },
                ]    
            }

            const existProductId = '153f348d3c08b474b93rvh37'

            const { statusCode, ok, _body } = await requester.put(`/api/carts/${existProductId}`).send(productUpdated)

            expect(statusCode).to.equal(200)
            expect(_body.payload).to.have.property('_id').to.equal(existProductId)
            expect(_body.payload).to.have.property('quantity').to.equal(4)
        })

        it('Debe borrar un producto del carrito', async () => {

            const { body: createdCart } = await requester.post('/api/carts').send(cartMock);
    
            const productIdToDelete = createdCart.products[0].productId;
    
            const { statusCode, ok, _body } = await requester.delete(`/api/carts/${createdCart._id}/products/${productIdToDelete}`);
    
            expect(statusCode).to.equal(200);
            expect(_body.success).to.be.true;
            expect(_body.productsNotProcessed).to.have.lengthOf(0);
            expect(_body.orderDetails).to.have.lengthOf(1);

        });

        it('Debe borrar todos los productos del carrito', async () => {

            const { body: createdCart } = await requester.post('/api/carts').send(cartMock);
    
            const { statusCode, ok, _body } = await requester.delete(`/api/carts/${createdCart._id}`);
    
            expect(statusCode).to.equal(200);
            expect(_body.success).to.be.true;
            expect(_body.productsNotProcessed).to.have.lengthOf(0);
            expect(_body.orderDetails).to.have.lengthOf(createdCart.products.length);
            
        });

    })

})
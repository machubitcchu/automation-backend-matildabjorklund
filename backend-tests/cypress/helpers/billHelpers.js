const faker = require ('faker')
const ENDPOINT_GET_BILLS = 'http://localhost:3000/api/bills'
const ENDPOINT_GET_BILL = 'http://localhost:3000/api/bill'
const ENDPOINT_POST_BILL = 'http://localhost:3000/api/bill/new'

function billPayload(){
    const fakeAmount = faker.finance.amount()
    const fakePaid = faker.random.boolean()
    const payload = {
        "paid": fakePaid,
        "value": fakeAmount
    }
    return payload  
}

function createBill(cy){
    let fakeBill = billPayload()
    cy.request({
        method: "POST",
        url: ENDPOINT_POST_BILL,
        headers:{
            'Content-Type': 'application/json',
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken)
        },
        body: fakeBill
    })
    .then((response =>{
        expect(JSON.stringify(response.body.value)).to.have.string(fakeBill.value)
        expect(JSON.stringify(response.body.paid)).to.have.string(fakeBill.paid) 
    }))
}

function deleteBill(cy){
    cy.request({
        method: "GET",
        url: ENDPOINT_GET_BILLS,
        headers:{
            'Content-Type': 'application/json',
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken)
        },
    }) .then((response =>{
        let lastId = response.body[response.body.length-1].id
        cy.request({
            method: "DELETE",
            url: ENDPOINT_GET_BILL+lastId,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            }
        })
        .then((response =>{
            const responseAsString = JSON.stringify(response)
            expect (responseAsString).to.have.string("true")
        }))
    }))
}

module.exports = {
    createBill,
    deleteBill 
} 
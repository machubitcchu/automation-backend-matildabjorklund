const faker = require ('faker')
const ENDPOINT_GET_CLIENTS = 'http://localhost:3000/api/clients'
const ENDPOINT_GET_CLIENT = 'http://localhost:3000/api/client/'
const ENDPOINT_POST_CLIENT = 'http://localhost:3000/api/client/new'

function clientPayload(){
    const fakeName = faker.name.findName()
    const fakeMail = faker.internet.email()
    const fakePhone = faker.phone.phoneNumber()
    const payload = {
        "name": fakeName,
        "email": fakeMail,
        "telephone": fakePhone
    }
    return payload
}
function editPayload(id){
    const fakeName = faker.name.findName()
    const fakeMail = faker.internet.email()
    const fakePhone = faker.phone.phoneNumber()
    const payload = {
        "id": id,
        "name": fakeName,
        "email": fakeMail,
        "telephone": fakePhone
    }
    return payload
}

function createClient(cy){
    let fakeClient = clientPayload()
    cy.request({
        method: "POST",
        url: ENDPOINT_POST_CLIENT,
        headers:{
            'Content-Type': 'application/json',
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken)
        },
        body: fakeClient
    })
    .then((response =>{
        expect(JSON.stringify(response.body.name)).to.have.string(fakeClient.name)
        expect(JSON.stringify(response.body.email)).to.have.string(fakeClient.email)
        expect(JSON.stringify(response.body.telephone)).to.have.string(fakeClient.telephone)
    }))
}

function editClient(cy){
    cy.request({
        method: "GET",
        url: ENDPOINT_GET_CLIENTS,
        headers:{
            'Content-Type': 'application/json',
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken)
        }
    }).then((response =>{
        // let lastId = response.body[response.body.length-1].id
        let lastId = response.body[2].id
        let updateClient = editPayload(lastId)
        cy.request({
            method: "PUT",
            url: ENDPOINT_GET_CLIENT+lastId,
            headers:{
                'Content-Type': 'application/json',
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken)
            },
            body: updateClient
        })
        .then((response =>{
            const responseAsString = JSON.stringify(response)
            expect(responseAsString).to.have.string(updateClient.name)
        }))
    }))  
}

module.exports = {
    createClient,
    editClient
} 
const LOGIN_URL = 'http://localhost:3000/api/login'
const LOGOUT_URL = 'http://localhost:3000/api/logout'

Cypress.Commands.add('authenticateSession', () => {
    const userCredentials = {
      "username":"tester01", 
      "password":"GteteqbQQgSr88SwNExUQv2ydb7xuf8c"
    }
    cy.request({
      method: "POST",
      url: LOGIN_URL,
      headers:{
       'Content-Type': 'application/json'
      },
      body: JSON.stringify(userCredentials)
    })
    .then((response =>{
      expect(response.status).to.eq(200)
      Cypress.env({loginToken:response.body})
    }))
  })

  Cypress.Commands.add('terminateSession', () => {
      cy.request({
          method: "POST",
          url: LOGOUT_URL,
          headers:{
            'Content-Type': 'application/json',
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken)
          }
      })
      .then((response =>{
          expect(response.status).to.eq(200)
      }))
  })

/// <reference types="cypress" />

import * as clientHelpers from '../helpers/clientHelpers'
import * as billHelpers from '../helpers/billHelpers'

describe('Test suite', function(){

 beforeEach(() => {
    cy.authenticateSession()
})

 afterEach(() => {
    cy.terminateSession()
})

    it('TC01 - Create client', function(){
      clientHelpers.createClient(cy)
    })

    it('TC02 - Edit client', function(){
        clientHelpers.editClient(cy)
    })

    it('TC03 - Create bill', function(){
        billHelpers.createBill(cy)
    })

    it('TC04 - Delete bill', function(){
        billHelpers.deleteBill(cy)
    })
    
  })

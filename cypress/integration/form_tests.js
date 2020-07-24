describe('special instructions test', () => {
    it('tests that you can add text to the box', () => {
      cy.visit('/Form')
      cy.get('input[name="instructions"]')
        .type('well done')
        .should('have.value', 'well done')
    })
  })
  describe('toppings test', () => {
    it('tests that you can select multiple toppings', () => {
      cy.visit('/Form')
      cy.get('[data-cy="checkThis"]').check()
    })
  })
  describe('submit test', () => {
    it('tests that you can submit the form', () => {
      cy.visit('/Form')
      cy.get('[data-cy=submit]').click()
    })
  })
describe("Wordsmith e2e test", () => {
  it("can visit the page", () => {
    cy.visit("/");

    // verify visible page headers
    cy.contains("Reverse words");
    cy.contains("Result");
    cy.contains("Recently reversed");
  });

  it("can create a reversal", () => {
    cy.visit("/");

    // Enter text to reverse
    const originalText = "Reverse me please!";
    const expectedReversedText = "esreveR em esaelp!";
    cy.get("textarea").should("be.empty").type(originalText);

    // Send form
    cy.get("button").should("be.enabled").click();

    // Verify Result
    cy.contains("p", expectedReversedText);

    // Verify recent results list
    cy.get("ul > li")
      .should("have.length.at.least", 1)
      .first()
      .contains("p", originalText);

    cy.get("ul > li").first().as("latestResult");

    cy.get("@latestResult").contains(originalText);

    cy.get("@latestResult").contains(expectedReversedText);

    cy.get("@latestResult").contains("1 second ago");
  });
});

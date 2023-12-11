describe("home_test_suite", () => {
  it("passes", () => {
    cy.visit("http://127.0.0.1:5173/");
    cy.get("span").should(
      "contain",
      "Download High Quality Images by creators"
    );
  });

  it("should display the home page with images", () => {
    cy.visit("http://127.0.0.1:5173/");
    cy.get(".flex-wrap").should("have.length.greaterThan", 0);
  });

  it("should open and close the modal on image click", () => {
    cy.visit("http://127.0.0.1:5173/");
    cy.get(".flex-wrap").click();
    cy.get(".modal").should("be.visible");
    cy.get(".modal .close-button").click();
    cy.get(".modal").should("not.exist");
  });

  it("should load more images on scrolling down", () => {
    cy.visit("http://127.0.0.1:5173/");
    const initialImageCount = Cypress.$(".flex-wrap").length;

    // Scroll to the bottom of the page
    cy.scrollTo("bottom");

    // Wait for new images to load
    cy.wait(2000);

    // Check if more images are loaded
    cy.get(".flex-wrap").should("have.length.greaterThan", initialImageCount);
  });

  it("should perform a search and display search results", () => {
    cy.visit("http://127.0.0.1:5173/");
    const searchTerm = "nature";

    // Type a search term
    cy.get('input[type="text"]').type(searchTerm);

    // Wait for search results
    cy.wait(1000);

    // Check if the results are displayed
    cy.get(".flex-wrap").should("have.length.greaterThan", 0);
  });

  it("should switch theme between light and dark", () => {
    cy.visit("http://127.0.0.1:5173/");
    // Initially, the theme should be light
    cy.get("body").should("not.have.class", "dark");

    // Click on the theme switch button
    cy.get(".theme-switch").click();

    // After clicking, the theme should be dark
    cy.get("body").should("have.class", "dark");
  });
});

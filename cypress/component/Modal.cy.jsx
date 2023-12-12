import Modal from "../../src/components/Modal.jsx";

const sampleData = {
  img: "lore ipsum image",
  description: "lore ipsum",
  img_download: "lorem ipsum download link",
  userImg: "lore ipsum user image",
  user: "Harsh Sharma",
  username: "harshsH-28",
  likes: 1000000000,
};

describe("Modal Component Tests", () => {
  it("renders modal with provided data", () => {
    cy.mount(<Modal closeModal={() => {}} data={sampleData} theme="dark" />);
    cy.get('[data-test="modal"]').should("exist");
    cy.get("[data-test='modal'] img").should(
      "have.attr",
      "src",
      sampleData.img
    );
    cy.get("[data-test='modal'] .description").should(
      "have.text",
      sampleData.description
    );
    cy.get("[data-test='modal'] .download-button").should(
      "have.attr",
      "href",
      sampleData.img_download
    );
    cy.get("[data-test='modal'] .user-info .username").should(
      "have.text",
      `@${sampleData.username}`
    );
    cy.get("[data-test='modal'] .likes-count").should(
      "have.text",
      `${sampleData.likes} Likes`
    );
  });

  it("closes the modal on X button click", () => {
    const closeModalStub = cy.stub().as("closeModal");
    cy.mount(
      <Modal closeModal={closeModalStub} data={sampleData} theme="light" />
    );
    cy.get("[data-test='modal'] .close-button").click();
    cy.get("@closeModal").should("be.calledOnce");
  });

  it("displays the download button only if img_download is present", () => {
    const dataWithoutDownload = { ...sampleData, img_download: undefined };
    cy.mount(
      <Modal closeModal={() => {}} data={dataWithoutDownload} theme="light" />
    );
    cy.get("[data-test='modal'] .download-button").should("not.exist");
  });

  it("changes theme appropriately", () => {
    cy.mount(<Modal closeModal={() => {}} data={sampleData} theme="light" />);
    cy.get("[data-test='modal'] .dark").should("not.exist");
    cy.mount(<Modal closeModal={() => {}} data={sampleData} theme="dark" />);
    cy.get("[data-test='modal'] .dark").should("exist");
  });
});

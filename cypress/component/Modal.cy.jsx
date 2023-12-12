import { Modal } from "../../src/components/Modal/Modal";

const sampleData = {
  img: "path/to/image.jpg",
  description: "Sample description",
  img_download: "path/to/download",
  userImg: "path/to/user/image.jpg",
  user: "John Doe",
  username: "john_doe",
  likes: 10,
};

describe("Modal Component Tests", () => {
  it("renders modal with provided data", () => {
    cy.mount(<Modal closeModal={() => {}} data={sampleData} theme="light" />);
    cy.get(".modal").should("exist");
    cy.get(".modal img").should("have.attr", "src", sampleData.img);
    cy.get(".modal .description").should("have.text", sampleData.description);
    cy.get(".modal .download-button").should(
      "have.attr",
      "href",
      sampleData.img_download
    );
    cy.get(".modal .user-info .username").should(
      "have.text",
      `@${sampleData.username}`
    );
    cy.get(".modal .likes-count").should(
      "have.text",
      `${sampleData.likes} Likes`
    );
  });

  it("closes the modal on X button click", () => {
    const closeModalStub = cy.stub().as("closeModal");
    cy.mount(
      <Modal closeModal={closeModalStub} data={sampleData} theme="light" />
    );
    cy.get(".modal .close-button").click();
    cy.get("@closeModal").should("be.calledOnce");
  });

  it("displays the download button only if img_download is present", () => {
    const dataWithoutDownload = { ...sampleData, img_download: undefined };
    cy.mount(
      <Modal closeModal={() => {}} data={dataWithoutDownload} theme="light" />
    );
    cy.get(".modal .download-button").should("not.exist");
  });

  it("changes theme appropriately", () => {
    cy.mount(<Modal closeModal={() => {}} data={sampleData} theme="light" />);
    cy.get(".modal.dark").should("not.exist");
    cy.mount(<Modal closeModal={() => {}} data={sampleData} theme="dark" />);
    cy.get(".modal.dark").should("exist");
  });
});

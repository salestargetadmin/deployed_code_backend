const {faker} = require('@faker-js/faker'); // Import faker
// Function to generate a random email template
const generateEmail = () => {
    const intro = faker.lorem.sentence(); // Random intro sentence
    const body = faker.lorem.paragraphs(3); // Random body with 3 paragraphs
    const conclusion = faker.lorem.sentence(); // Random conclusion sentence
    const template = `Hi ${faker.person.firstName()},\n\n${intro}\n\n${body}\n\n${conclusion}\n\nSincerely,\n${faker.person.firstName()}\n${faker.company.name()}`;
    return template;
  };
  module.exports = generateEmail;
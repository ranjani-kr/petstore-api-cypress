/// <reference types="cypress" />

describe('upload image to pet', () => {
  it('Uploads an image to the pet successfully and logs the status code', () => {
      // Define the pet ID
      const petId = 1;
      
      // Use the fixture method to read the image file from the cypress fixtures folder as base64
      cy.fixture('pet2.jpg', 'base64').then(fileContent => {
          // Manually construct the multipart form-data body
          const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
          const body = `--${boundary}\r\n` +
                       `Content-Disposition: form-data; name="file"; filename="pet2.jpg"\r\n` +
                       `Content-Type: image/jpeg\r\n\r\n` +
                       `${fileContent}\r\n` +
                       `--${boundary}--\r\n`;

          // Send the POST request to upload the image
          cy.request({
              method: 'POST',
              url: `/pet/${petId}/uploadImage`,  // Upload image to the pet
              headers: {
                  'Content-Type': `multipart/form-data; boundary=${boundary}`
              },
              body: body,
              failOnStatusCode: false  // Continue the test even if the status code isn't 2xx
          }).then(response => {
              // Log the entire response
              cy.log('Full response:', JSON.stringify(response));

              // Check if the response body and message exist
              if (response.body && response.body.message) {
                  const responseMessage = response.body.message;
                  cy.log(`Response Message: ${responseMessage}`);
                  expect(responseMessage).to.include('File uploaded to ./pet2.jpg');
                  expect(response.status).to.equal(200);  // Assert that the status code is 200
              } else {
                  cy.log('Response body or message is undefined');
                  throw new Error('Response body or message is missing');
              }
          });
      });
  });
});

///<reference types = "cypress">

const { should } = require("chai");

describe('Add pet to the store - Test Senarios',() =>{

    let petId;
    let petData;

    beforeEach(()=>{
    // Generate a random petId to ensure no conflict with existing data
    petId = Math.floor(Math.random() * 10000);

    // Base pet data for creating a new pet with only mandatory fields
    petData = {
        id: petId,
        name: `Pet_${petId}`,
        photoUrls: [
          'https://example.com/photo1.jpg'
        ]
      };
    });

    it('successfully able to add the pet with all the mandatory fields ',() => {
        cy.request({
            method:'POST',
            url:'/pet',
            body:petData,
            headers:{
                'Content-Type': 'application/json'
            }     
        }).then((response)=> {
            expect(response.status).to.equal(200);
            expect(response.body.id).to.equal(petId);
            expect(response.body.name).to.equal(petData.name);
            expect(response.body.photoUrls).to.deep.equal(petData.photoUrls);

            // Log the response body
            cy.log('Response Body:', JSON.stringify(response.body));

        });
    });

    it('should return 400 when mandatory fields are missing while adding the pet',() =>{
        const missingMandatoryFieldsPetData = {
            status : 'availabe'
        };

        cy.request({
            method:'POST',
            url:'/pet',
            body:missingMandatoryFieldsPetData,
            headers:{
                'Content-Type':'application/json'
            },
            failOnStatus : 'false'
        }).then((response)=> {
            expect(response.status).to.equal(400);
            cy.log('Invalid pet creation attempt due to missing fields.');

        });
    });

    it('should be able to add pet with all the fields',() => {
        
        const fullPetData = {
            id: petId,
            category: {
              id: 1,
              name: 'Dog'
            },
            name: `Pet_${petId}`,
            photoUrls: [
              'https://example.com/photo1.jpg'
            ],
            tags: [
              {
                id: 1,
                name: 'Friendly'
              }
            ],
            status: 'available'
          };

          cy.request({
            method:'POST',
            url: '/pet',
            body:fullPetData,
            headers:{
                'Content-Type': 'application/json'
            },

          }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.id).to.equal(petId);
            expect(response.body.category.name).to.equal(fullPetData.category.name);
            expect(response.body.tags[0].name).to.equal(fullPetData.tags[0].name);
            expect(response.body.status).to.equal(fullPetData.status);
            expect(response.body.photoUrls).to.deep.equal(fullPetData.photoUrls);
            cy.log('Response Body:', JSON.stringify(response.body));
          });
    });

  // Add a pet with invalid data (e.g., incorrect format)
  it('should return a 400 status with bad request when pet data is in incorrect format', () => {
    const invalidPetData = {
      id: 'invalid-id',  // Invalid ID format
      name: `Pet_${petId}`,
      photoUrls: ['https://example.com/photo1.jpg']
    };

    cy.request({
      method: 'POST',
      url: 'https://petstore.swagger.io/v2/pet',
      body: invalidPetData,
      headers: {
        'Content-Type': 'application/json'
      },
      failOnStatusCode: false  // To handle expected failures
    }).then((response) => {
      // Assert the response status
      expect(response.status).to.equal(400);  // Invalid input
      cy.log('Response Body:', JSON.stringify(response.body));
      cy.log('Invalid format detected, failed to create pet');
    });
  });

  // Add more than one photo url
  it('should verify that the photoUrls can upload multiple data', () => {
    // Define the pet object with valid photoUrls
    const petData = {
      id: 1,
      name: "doggie",
      photoUrls: [
        "https://example.com/photo1.jpg",
        "https://example.com/photo2.png"
      ],
      status: "available"
    };

    // Send the POST request with the pet data
    cy.request({
      method: 'POST',
      url: '/pet',
      body: petData,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      // Assert that the request was successful
      expect(response.status).to.equal(200);
      
      // Verify the response body has the photoUrls field and it's an array
      expect(response.body.photoUrls).to.be.an('array');
      expect(response.body.photoUrls.length).to.be.greaterThan(0); // Ensure it's not empty

      //Compare the response photoUrls with the ones you sent
      expect(response.body.photoUrls).to.deep.equal(petData.photoUrls);
    });
  });

   it('should return 405 when using invalid HTTP method', () => {
      cy.request({
        method: 'PATCH', // Invalid method for this endpoint
        url: '/pet',
        failOnStatusCode: false,
        body: petData,
      }).then((response) => {
        expect(response.status).to.equal(405); 
      });
    });

  it('should verifies that the photoUrls in the valid format', () => {

  })

  it('should return bad request when more than 5 photos are attached', () => {

  })

});
/// <reference types="cypress" />

describe('Pet API CRUD Tests', () => {
    let petId; // Dynamic variable to store pet ID
  
    // Data for creating a new pet
    const newPetData = {
        id: Math.floor(Math.random() * 1000000), // Generate a random ID
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
  
    // Data for updating the pet
    const updatedPet = {
        id: newPetData.id,
        category: {
          id: 2,
          name: 'Cat'
        },
        name: `UpdatedPet_${petId}`,
        photoUrls: [
          'https://example.com/photo2.jpg'
        ],
        tags: [
          {
            id: 2,
            name: 'cute'
          }
        ],
        status: 'sold'
      };
  
    it('should create a new pet', () => {
      cy.request('POST', '/pet', newPetData).then((response) => {
        expect(response.status).to.equal(200); 
        expect(response.body.id).to.equal(newPetData.id);
        expect(response.body.name).to.equal(newPetData.name);
        expect(response.body.status).to.equal(newPetData.status);
        expect(response.body.category.name).to.equal(newPetData.category.name);
        expect(response.body.category.id).to.equal(newPetData.category.id);
        expect(response.body.tags[0].name).to.equal(newPetData.tags[0].name);
        expect(response.body.tags[0].id).to.equal(newPetData.tags[0].id);
        expect(response.body.status).to.equal(newPetData.status);
        expect(response.body.photoUrls).to.deep.equal(newPetData.photoUrls);
        
        // Store petId for later tests
        petId = response.body.id;
      });
    });
  
    it('should get the pet by ID', () => {
      cy.request('GET', `/pet/${petId}`).then((response) => {
        expect(response.status).to.equal(200); 
        expect(response.body.id).to.equal(newPetData.id);
        expect(response.body.name).to.equal(newPetData.name);
        expect(response.body.status).to.equal(newPetData.status);
        expect(response.body.category.name).to.equal(newPetData.category.name);
        expect(response.body.category.id).to.equal(newPetData.category.id);
        expect(response.body.tags[0].name).to.equal(newPetData.tags[0].name);
        expect(response.body.tags[0].id).to.equal(newPetData.tags[0].id);
        expect(response.body.status).to.equal(newPetData.status);
        expect(response.body.photoUrls).to.deep.equal(newPetData.photoUrls);
      });
    });
  
    it('should update the pet', () => {
      cy.request('PUT', '/pet', updatedPet).then((response) => {
        expect(response.status).to.equal(200); 
        expect(response.body.id).to.equal(updatedPet.id);
        expect(response.body.name).to.equal(updatedPet.name);
        expect(response.body.status).to.equal(updatedPet.status);
        expect(response.body.category.name).to.equal(updatedPet.category.name);
        expect(response.body.category.id).to.equal(updatedPet.category.id);
        expect(response.body.tags[0].name).to.equal(updatedPet.tags[0].name);
        expect(response.body.tags[0].id).to.equal(updatedPet.tags[0].id);
        expect(response.body.status).to.equal(updatedPet.status);
        expect(response.body.photoUrls).to.deep.equal(updatedPet.photoUrls);
      });
    });
  
    it('should delete the pet', () => {
      const apiKey = Cypress.env('apiKey'); 
      cy.request({
        method:'DELETE', 
        url :`/pet/${petId}`,
        headers: {
            'api_key': apiKey
          }
      }).then((response) => {
        expect(response.status).to.equal(200); 
        expect(response.body.message).to.equal(petId.toString());
      });
    });
  
    it('should return 404 when getting a deleted pet', () => {
      cy.request({
        method: 'GET',
        url: `/pet/${petId}`,
        failOnStatusCode: false, 
      }).then((response) => {
        expect(response.status).to.equal(404); 
        expect(response.body.message).to.equal('Pet not found');
      });
    });
  
    it('should find pets by status', () => {
      cy.request('GET', '/pet/findByStatus', { status: 'available' }).then((response) => {
        expect(response.status).to.equal(200); 
        expect(response.body).to.be.an('array');
        response.body.forEach((pet) => {
          expect(pet.status).to.equal('available');
        });
      });
    });
  });
  
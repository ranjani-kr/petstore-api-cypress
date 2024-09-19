# Petstore API Testing with Cypress

## Overview
This repository contains automated tests for the Petstore API using the Cypress testing framework. The tests cover creating, updating, deleting pets, and verifying various scenarios on adding pet api.

## Features
Cypress: E2E testing framework used for automating API tests.
Mochawesome: A reporting tool that generates detailed HTML and JSON reports of test executions.
Dynamic Variables: Utilizes dynamic variables for managing petId to ensure data consistency.
Error Handling: Includes scenarios for handling various HTTP status codes and edge cases.

## Prerequisites
Node.js (version 12 or above)
npm (Node Package Manager)

## Installation
1.Clone the repository:
```bash
git clone https://github.com/your-username/petstore-api.git
```
```bash
cd petstore-api
```

**2.Install dependencies, including Cypress, Chai, and Mochawesome:**
```bash
npm install
```
```bash
npm install cypress --save-dev
```
```bash
npm install chai --save-dev
```
```bash
npm install mochawesome --save-dev
```

**3.Install Mochawesome Reporter:**
```bash
npm install cypress-mochawesome-reporter --save-dev
```

## Configuration
The Cypress configuration is located in the cypress.config.js file. Here are the key components:

**Mochawesome Reporter:** Generates HTML and JSON reports in cypress/reports.
**API Key:** Stored in env.apiKey, used for authenticating API requests.
**Base URL:** Set to https://petstore.swagger.io/v2/, which is used for all API requests.
**Spec Pattern:** Specifies the location of your test files under cypress/e2e/. 

## Running Tests

1.**Run tests in headless mode:**
```bash
npx cypress run
```

2.**Open Cypress Test Runner (interactive mode):**
```bash
npx cypress open
```
## Reporting

Reports are generated using Mochawesome and saved in the cypress/reports directory.
HTML reports can be viewed by opening the .html files in a web browser.
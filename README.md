# WEB SCRAPER - ASSESSMENT

This project is designed to scrap data from https://dhanush623.github.io/assessment for particular user who has logged in.

## Prerequisites

1. Node.js
2. npm or yarn
3. Google Chrome (required by Puppeteer)

## Getting Started

A few resources to get you started if this is your first project:
1. Typescript - https://www.typescriptlang.org/
2. Puppeteer - https://pptr.dev/

## Installation

1. Clone this repo(https://github.com/Dhanush623/WebScraper.git)
2. Navigate to the project directory
3. Install dependencies
        
        npm i

### To Run Application

    npm start

## Usage

1. Run the application
2. Enter your username and password when prompted.(Username and password mentioned below)
3. Choose an option:
   - Enter `1` to view your latest purchase history.
        - Will retrieve latest purchase product
   - Enter `2` to search for products.
        - Prompted for search text and get related product list
   - Enter `3` to exit the application.
        - Exit the application

### To Run Test

    npx jest

### For Testing 

    There five user for testing purpose. If any other username or password entered then user will not allow to next step.
    
    |------------------------------------------------------------------------|
    | Username          | Password              | Display Name               |
    |-------------------|-----------------------|----------------------------|
    | john              | johnsmith             | John Smith                 |
    | emily             | emily@johnson         | Emily Johnson              |
    | brown             | brown#321             | Michael Brown              |
    | williams          | williams#007          | Sarah Williams             |
    | david             | david@123             | David Jones                |
    |------------------------------------------------------------------------|
    
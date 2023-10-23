# currency-exchange

## Getting Started

Follow these instructions to set up the project on your local machine.

### Prerequisites

- Node.js and npm installed on your local machine.

### Installation

1. **Clone the Repository**:


2. **Install Dependencies in the Root Directory**:
  ```
npm run install-all
  ```

### Running the Project

1. **Run the Client**:
- Navigate to the `client` directory:
  ```
  cd client
  ```
- Start the client:
  ```
  npm start
  ```
- The client will be running on [http://localhost:3000/](http://localhost:3000/)

2. **Run the Server**:
- Open another terminal instance and navigate to the `server` directory:
  ```
  cd server
  ```
- Start the server:
  ```
  npm start
  ```
- The server will be running on [http://localhost:8000/](http://localhost:8000/)

## Features

- **User Authentication**: Log in using the test user credentials:
- **Email**: `test@test.se`
- **Password**: `1234`

- **Country Search**: Search for a country by its name to view its official name, population, and currencies.

- **Add to List**: Countries searched can be added to a user's list. Currently, only countries with the Euro (€) currency are supported due to limitations of the free version of the external API used in this project.

- **Currency Conversion**: Input an amount in Swedish Krona (SEK) to view its equivalent in the official currencies of the countries saved in your list.


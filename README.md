# fragments
This is a node.js based REST API using Express.

## Getting Started
To get started with this project, follow these steps:
1. clone the project
```
git clone https://github.com/neginzahedi/fragments.git
```
2. Navigate to the project directory
```
cd fragments
```
3. Install the project dependencies
```
npm install
```

## Directory Tree Structure
``` bash
.
├── README.md
├── node_modules
│   ├── eslint
│   ├── express
│   ├── nodemon
│   ├── pino
│   ├── prettier
│   ├── stoppable
│   └── ...
├── package-lock.json
├── package.json
└── src
    ├── app.js
    ├── logger.js
    └── server.js
```

## Dependencies
- **Prettier:** automatically format the source code
- **ESLint:** identify and report problematic patterns in the source code
- **Pino:** structured Logging in cloud environments, with JSON formatted strings
- **Express:** middleware, routing, and HTTP utility methods
- **stoppable:** gracefully shut down a server
- **nodemon:** reload server whenever the code changes

## Scripts
The following scripts are available in this project:
- **lint:** The linter will check the code for errors and style violations and output any errors or warnings. To run the linter, open terminal and navigate to the project directory. Then, run the following command:
   ```
    nmp run lint
   ```

- **start:** To start the application in production mode, open terminal and navigate to the project directory. Then, run the following command:
   ```
   nmp start
   ```
   > note: The application will start and be accessible in web browser at http://localhost:8080, use CTRL + c to stop.


- **dev:** To start the application in development mode, open terminal and navigate to the project directory. Then, run the following command:
   ```
   nmp run dev
   ```
   > note: The application will start and be accessible in web browser at http://localhost:8080, use CTRL + c to stop.
 Any changes made to the code will automatically be updated in the browser.

- **debug:** To start the application in debug mode, open terminal and navigate to the project directory. Then, run the following command:
   ```
   nmp run debug
   ```
   > note: The application will start and be accessible in web browser at http://localhost:8080, use CTRL + c to stop. Debugging tools will be available in browser's developer console.


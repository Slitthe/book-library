Prerequisites
* Have Node.js installed, [version 18 LTS](https://nodejs.org/en/about/previous-releases) recommended

How to run the project

* In one command, run `npm install && npm run install:both && npm run dev:both` in the root directory
* With individual commands
  1. Run `npm install` on the root directory in order to install the `concurrently` npm package, needed to start the server and the client at the same time
  2. Run `npm run install:both` to install the dependencies for both projects (client and mock server)
  3. Run `npm run dev:both` to start the development servers for both

In both cases the client should be available at http://localhost:5173/ while the server at http://localhost:3001/



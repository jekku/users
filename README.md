EEEE (Ecmascript6 ExpressJS Enterprise Edition) Users App
====

![Travis CI Build](https://api.travis-ci.org/jekku/users.svg) [![Code Climate](https://codeclimate.com/github/jekku/users/badges/gpa.svg)] (https://codeclimate.com/github/jekku/users)

Introduction
----
This is an Ecmascript 6 NodeJS API that combines the philosophy of Java EE thinking and Asynchronous Programming.
Just a simple app that allows registration, logging in, and logging out of users.

Technology Selection
----
- Node JS
  - The whole server app runs with Node JS
- Express JS
  - Choice of framework to allow Dependency-Injectible Testing of server-handle
- Babel Core
  - Transpiles our EcmaScript6 code into EcmaScript5 before running the v8 engine
- MySQL
  - Our persistence DB
- Travis CI, Mocha, Chai, Should.js
  - These allow us to seamlessly do TDD, by writing tests first then the code.
  - You can find the build status of the app [HERE](https://travis-ci.org/jekku/users).
- Codeclimate
  - Regularly checks our code quality per merge to master
  - You can find the quality status of the app [HERE](https://codeclimate.com/github/jekku/users/).
  
Architecture and Way of Thinking
----
This is an experiment I always wanted to do - introduce EE concepts to a Node JS boilerplate and apply it.
These are the parts of the app that should be understood:

Structure
----
- Controllers
  - Responsible for validating outer input and data.
  - Calls and ORCHESTRATES services to be used together.
  - Holds the definition of the finalmost callback functions which decides the return data.
  - Receives the data from the finalmost callback, which can be an error or a result.
- Services
  - Responsible for CHOREOGRAPHING Data Access Objects
  - Has the second layer of the finalmost callback
- Data Access Objects (DAO)
  - Responsible for communicating with the PERSISTENCE layer of the application
  - In this case our PERSISTENCE layer is MySQL
  - Holds the final layer of the finalmost callback, therefore:
    - In standard callbacks (err, result), it must always:
      - Return the error to be thrown at the first parameter.
      - Always return successful retrieves to the second parameter as a type of a MODEL.
      - Non retrieve operations can optionally send 'result'
- Model
  - Should be a formal ES6 Object.
  - Some non-persisted data can be stored here.
  - Should define objects from our persistence layer.
- Helpers
  - Set of complex but reusable functions.
  
Philosophy
----
- Fail as early as possible by:
  - Validate the inputs ONLY at the controller layer, and make DAMN sure that wrong inputs are caught here
  - Always invoke easy-to-inspect validations first, such as input regex, before the more complex ones - Unique checking, Integrity checking, etc.
- Avoid embellishing DAO code by:
  - Transferring property additions and manipulations to the model.
  - Use generic callbacks for queries that will do the same kind of action in the callback.
  - Models can do their own computations
- Avoid embellishing Model code by:
  - Transferring complex and reusable functions into helpers
  - Imagine it in such a way that a set of Objects B (models) can commonly use a set of Tools A (helpers)
- Yoyo principle
  - Request goes DOWNWARD each layer through a callback that transports the data.
  - Should always return UPWARD by calling the callback to hoist upward the results from the DAO.


Milestone Progress
----
- API
  - [x] User registration
  - [ ] User login
  - [ ] User logout

- Frontend
  - [ ] User registration
  - [ ] User login
  - [ ] User logout

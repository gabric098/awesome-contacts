# Awesome Contacts

Awesome Contacts is a simple contact management application build with the purpose of experimenting with angular and [ngrx](https://github.com/ngrx/platform).

It's essentially a CRUD application interacting with a very basic REST API provided (in development mode) by [json-server](https://github.com/typicode/json-server). The library is using a json file as a persistency method, it can be found at `assets/data.json`.

## Install the application

Run `npm install` or `yarn install`

## Development server

Run `npm run start-awesome` for a dev server. Navigate to `http://localhost:4200/`. This command spins up the API server running on `http://localhost:3000/` and the actual development server on port 4200. The API url is proxied to `http://localhost:4200/api`, proxy configuration is defined in `proxy.conf.json` file.

# Project Architecture

Awesome Contacts architecture is based on redux store which contains most of the application state. Libraries to interact with the store are provided by the [ngrx](https://github.com/ngrx/platform) project.

The application consists of 3 modules:
- the **awc** module: it's the root application module responsible for bootstrapping the application.
- the **core** module: manages the state of the router and the layout of the application window.
- the **contacts** module: manages the state and the actions related with all the contact related operations.

All side effects (like ajax calls to the server) are contained into `Effect` classes which (like sagas for react) help to encapsulate asyncronous operation and makes the code look more "syncronous".

As in any redux application, all the user interactions end up dispatching `Action` classes which get intercepted by the relevant `Reducer` responsible to update the store in an immutable way.

This application tries to follow the standard React approach separating *Components* and *Containers* or, if you want, dumb components and smart components. Containers are usually top level angular Components which are retrieving the data from the store using `Selectors`. The data is then passed down to standard children Components using Input properties. Any user interaction with the standard Compoents emits `Events` that flows up to the Container class which deals with dispatching `Actions` if needed.

# Open issues and TODOs

Awesome Contacts is very much a work in progress and I'm aware there's a lot of work to do in terms of functionalities and refactoring. These are the main areas I'd like to improve as soon as possible:

- Cover edge cases: No contact available, 404s server errors
- Better user feedbacks: Confirmation messages, error messages
- Tests: add unit and e2e tests to get to a decent code coverage
- Build pipeline: build a CI pipeline relying on the abovementioned tests.
- Style guide: review the code and make sure it follows the official [Angular styleguide](https://angular.io/guide/styleguide) as much as possible
- Docs: add code documentation (what's the best tool out there?)
- App styling: I didn't spend much time on it so, plenty of space for improvement here.

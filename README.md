# Getting Started with Portchain

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You can use `npm` as well as `yarn` but I'm listing yarn commands.

First install all the dependencies `yarn install`

In this project I'm using following technologies to best describe my technical skills
  
  - React-Redux
  - Redux-Saga
  - React Hooks (useEffect etc to describe react component lifecycle)
  - Styled Components for styling
  - Using Hooks to get data from stores and dispatch actions instead of using connect with container component
  - React Router to manage different routes. I only provide two routes `/` & `/notFound`
  - Enzyme and jest for testing components
  - I'm using github v3 api for data retreival
  - Built with responsiveness in mind with min-width upto 507px

Code is organized in following folder

  - Containers (Connecting store to component, dispatch actions and select data from store)
  - Components (React components nothing else)
  - Store (Contains folder with model name like `Issues` and type describes the model)
    - Actions
    - Reducers
    - Saga
    - Types

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# [bob.fyi](https://bob.fyi)

## Dependencies

- [Create React App](https://github.com/facebook/create-react-app) | [Docs](https://facebook.github.io/create-react-app/docs/getting-started)
- [Chakra UI](https://chakra-ui.com)
- [Radix Icons](https://radix-ui.com/icons)
- [React Router](https://reactrouter.com/en/main)
- [React Docs](https://reactjs.org/)

## Local Development

```
npm start
```

- Runs the app in the development mode on [http://localhost:3000](http://localhost:3000) with hot reload and lint errors in the console.

```
npm test
```

- Launches the test runner in the interactive watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

```
npm run build
```

- Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.
- The build is minified and the filenames include the hashes.
- See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

```
npm run deploy
```

- Builds the app for production to the `build` folder, commits to the `gh-pages` branch, and redeploys the site.

```
npm run eject
```

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### App

For PWA functionality, see https://developers.google.com/web/fundamentals/web-app-manifest/.

```
// index.html
<link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
```

      *Note:* `%PUBLIC_URL%` will be replaced with the URL of the `public` folder during the build. Only files inside the `public` folder can be referenced from the HTML.

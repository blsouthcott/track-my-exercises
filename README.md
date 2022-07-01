# exercises-tracker
This application allows users to log exericses performed, and view, delete and update them.

This application is built using [React](https://reactjs.org/) and [MongoDB](https://www.mongodb.com/) 

## To run this locally
Git clone and `cd` into your local directory. Then run
```
cd exercise-server
npm install
cd ..
cd exercise-ui
npm install
```

Once the dependencies are installed, inside the server directory in the `.env` file, replace `YOUR_MONGODB_CONNECT_STRING` with your MongoDB connect string. For more information on this, refer [here](https://www.mongodb.com/docs/manual/reference/connection-string/).

Then run `npm start` from both the server directory and UI directory. Because all exericses logged by the user are displyed on loading the application, be sure to start the server before running the UI.

## Local tests
Once the app is running locally, you can use the `test-requests.http` file to test the backend is working properly. In VS Code, installing the [REST Client](https://github.com/Huachao/vscode-restclient) extension will allow you to make requests simply by clicking the URLs in that file and viewing the responses directly.
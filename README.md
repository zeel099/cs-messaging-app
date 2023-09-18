# CS Messaging App
It's a real-time chat application for multiple agents who provide support to multiple customers who can create queries and then some agent will be alloted to a query to solve issue by real time messaging with that customer. It also tag urgent messages based on important strings appearing in their chats.
### Screen Recorder 
[![Screen Recording](file:///Users/zeelsojitra/Desktop/scree_recorder.png)](https://drive.google.com/file/d/1oZ_dwJFDXmnq0cZpdUG54E0I0ZSBugl_/view?usp=drive_link)
### How to get Started?

#### Clone repo

    git clone https://github.com/zeel099/cs-messaging-app


#### To run Server
In the directory, "cs-messaging-app-master":

- Install all packages for the server, run command
    ```
    npm install
    ```

- Then, to run server, run command
    ```
    npm start
    ```


#### To run Frontend - WebApp
- In another terminal, come inside the directory, "cs-messaging-app-master/client":
    ```
    cd client
    ```

- Install all packages for the client, run command
    ```
    npm install
    ```

- In file- "cs-messaging-app-master/client/src/index.js" :
  To use local server url - uncomment the line 11 and comment the line 9.

- Then, to run WebApp, run command
    ```
    npm start
    ```


## How to run

Both server & frontend App are hosted on:

<!-- - client: [https://admirable-caramel-5b6f46.netlify.app](https://admirable-caramel-5b6f46.netlify.app)
- server: [https://cs-mesaging-app.onrender.com](https://cs-mesaging-app.onrender.com)
- postman APIs collection: [https://www.postman.com/...](https://www.postman.com/planetary-equinox-821652/workspace/branch-assignment-by-rachit-goel/collection/19949199-eb06d1c9-411a-4dc4-9798-f9d51adc7a9c?action=share&creator=19949199) You can set environment as heroku server or local server. -->

 - http://localhost:3000/select-customer to see the customer interface
 - http://localhost:3000/select-agent to see the agent interface
 - http://localhost:3000/api/conversations/unalloted to see the Unalloted query
 - http://localhost:3000/api/conversations/allot to see the Alloted query
 - http://localhost:3000/api/messages/search to search the query

## Implemented features
- customer interface for submit queries or messages
- Agent interface that allows to respond to queries
- Provision to respond to multiple queries of same user in one go
- Search functionality to allow agents to search over messages and customers
- Tag messages based on the urgency and surface urgent messages
- Filter the user-queries based on resolution status and urgency
- View all agent responses and link to queries resolved by the agent

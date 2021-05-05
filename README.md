## Tomorrow assignment

Tomorrow assignment using CRA, Materia UI and styled components.
## Build With

* [React](https://reactjs.org/)
* [Create-react-app](https://create-react-app.dev)
* [Material-UI](https://material-ui.com/)
* [styled-components](https://styled-components.com/)
* [React-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd) 
* [Docker](https://www.docker.com/)

### How to run with NPM in development

```
git clone tomorrow-assignment
cd tomorrow-assignment
```

```
npm install
npm run start
```

### How to run with Docker in production

#### Prerequisites 

Docker must be installed in order to run the below instructions. 
Learn more [Docker documentation](https://docs.docker.com/)

I have used multi-stage build in Docker, in order to optimize the size of the built image. 
As you will see in the Dockerfile, an initial node-based phase is utilized only for building the static assets, which are then copied over and served from a stripped-down nginx image. 
In order to run the project please run:

```
cd tomorrow-assignment

docker-compose up production
```

*Production listening at:*  **localhost:8080**.

### Features implemented
* Add or remove new columns in board.
* Add or remove tasks withing the columns.
* Add estimation time in each task.
* Drag and drop any task from one column to another.
* Reorder cards by using drag and drop
* Sort by "Highest priority task" or "Lowest priority task".
* Column average estimation of tasks

# Scientific Articles Search Engine

## Description
This project is a web application designed to search scientific articles using a set of keywords

## Table of Contents

1. [Technologies](#technologies)
2. [Folder Structure](#folder-structure)
3. [Installation](#installation)

## Technologies
### Frontend:
  1. ReactJS JavaScript framework
  2. TailwindCSS for styling
  3. GSAP (Green Socket Animation Platform) for animations

### Backend:
  1. Flask python library
  2. SQLite relational database management system (RDBMS)
  3. SQLAlchemy python library

   <details>
  <summary><strong>SQLAlchemy:</strong></summary>

  SQLAlchemy is an SQL toolkit and Object-Relational Mapping (ORM) library for Python. It provides a set of high-level APIs for interacting with relational databases. With SQLAlchemy, you can use Python classes to represent database tables and perform database operations in an object-oriented manner.

  [Learn more about SQLAlchemy](https://www.sqlalchemy.org/)
</details>

<details>
  <summary><strong>SQLite:</strong></summary>

  SQLite is a self-contained, serverless, and zero-configuration relational database management system (RDBMS). It's an excellent choice for embedded systems and applications that don't require a separate database server. SQLite is the default database engine used by SQLAlchemy in this project.

  [Learn more about SQLite](https://www.sqlite.org/)
</details>

## Folder Structure
### Backend:
- backend/
  - app/
    - enigne/        (contains the elastic search instance and manipulation)
    - models/        (contains the data models)
    - routes/        (the main page route, main components will be called here)
    - test/          (contains the required unit test)
  - instance/      (constains the instance of the database)
  - config.py         (environment configurations)
  - doceker-compose.yaml (elastic search cluster)
  - output.json      (contains the text file of the articles uploaded to the elastic search server)
  - run.py            (app entry point)


### Frontend:
- client/
  - public/
    - fonts/         
    - images/        
  - src/
    - components/    (folders of React components, each page has a separate folder)
    - pages/         (all the pages of the website)
    - styles/        (contains global styling where raw CSS is required, use TailwindCSS otherwise)
  - App.jsx            (this is where all pages will be called and where routes are handled)


## Installation
### Frontend
  - If you don't have Node.js installed, navigate to (https://nodejs.org/en) and download the latest stable version (LTS) then install it.
  - install yarn command on the command prompt by running
    ```nmp -g install yarn ```
  - check if it successfully installed by running
    ``` yarn --version ```
  - Navigate to the client folder
    ``` cd client ```
  - Run the command
    ``` yarn install ```
  - Start the development server by running
    ``` yarn dev```
  - CTRL + Click the link displayed in the terminal to view the local development server.

### Backend
  - If you don't have Python installed, navigate to (https://www.python.org/downloads/) and download the last release then install it.
  - Navigate to the backend folder
     ``` cd backend ```
  - Install the required dependecies by typing the command
     ``` pip install -r requirements.txt ```
  - Start the flask server by running
     ``` python run.py ```

### staring the elastic search cluster
  - Navigate to the backend folder
  - Run the following command 
    ```docker compose up --remove-orphans -d```
- A container will be created in the docker desktop application
- When launching the container, the engine will run on (localhost:9200)
  

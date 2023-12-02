# Scientific Articles Search Engine

## Contribution guidelines

  ### - create a branch for each section
  ### - branches will follow the naming convention ```<member name>/<feature or section name> ```
        example: wissal/authentication
  ### - try to provide meaningfull commit messages 
        example: added an api route for user credentials
  ### - open a Pull Request after finishing a section or feature

  ## *!!! NEVER PUSH TO MAIN OR AUTOMATICALLY MERGE YOUR BRANCH TO MAIN, EVEN IF YOUR BRANCH CAN BE AUTOMATICALLY MERGED !!!*

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
    - models/        (contains the data models)
    - routes/        (the main page route, main components will be called here)
    - static/        (client-side resources like images, CSS...)
  - run.py            (app entry point)
  - config.py         (environment configurations)

### Frontend:
- client/
  - public/
    - fonts/         (contains the data models)
    - images/        (the main page route, main components will be called here)
  - src/
    - components/    (folders of React components, each page has a separate folder)
    - pages/         (all the pages of the website)
    - styles/        (contains global styling where raw CSS is required, use TailwindCSS otherwise)
  - App.jsx            (this is where all pages will be called and where routes are handled)


## Installation
### Frontend
  - If you don't have Node.js installed, navigate to (https://nodejs.org/en) and download the latest stable version (LTS) then install it.
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
  - Install Flask and flask_sqlalchemy by typing the command
     ``` pip install Flask flask-sqlalchemy ```
  - Start the flask server by running
     ``` python run.py ```
    
#### Starting the database
  - Open a terminal and make sure you are at the backend folder
  - Start a python shell by typing
    ```python```
  - Inside the python shell, enter the  following 2 commands
    ```python
    from app import app, db
    ```
    ```python
    with app.app_context(): 
      db.create_all()
    ```
    this will create an SQLite database file with the specified name in config.py containing all the database tables defined in models 
    
    End

    






    




  

    

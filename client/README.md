# Scientific Articles Search Engine

## Description

This project is a web application designed to search scientific articles using a set of keywords
## Table of Contents

1. [Technologies](#technologies)
2. [Folder Structure](#folder-structure)
3. [Installation]

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
----/backend
            |___ /app
            |    |___ /models    (contains the data models)
            |    |___ /routes    (the main page route, main components will be called here)
            |    |___ /static    (client side ressources like images, css..)
            |
            run.py              (app entry point)
            config.py           (environement configurations)
----/client
            |___ /public
            |    |___ /fonts    (contains the data models)
            |    |___ /images    (the main page route, main components will be called here)
            |    
            |
            |___ /src
            |    |___ /components    (folders of react components, each page has a separate folder)
            |    |___ /pages         (all the pages of the website)
            |    |___ /styles        (contains global styling where raw CSS is required, use TailwindCSS otherwise)
            App.jsx                  (this is where all pages will be called and where routes are handled)

## Installation
### Frontend
  Navigate to the client folder
  ```cd client ```

    

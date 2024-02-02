# Moteur de recherche d'articles scientifiques

## Description
Ce projet est une application web conçue pour rechercher des articles scientifiques à l'aide d'un ensemble de mots-clés.

## Table des matières

1. [Technologies](#technologies)
2. [Structure des dossiers](#structure-des-dossiers)
3. [Installation et démarrage des serveurs en local](#installation-et-démarrage-des-serveurs-en-local)
4. [Livrables](#livrables)

## Technologies
### Frontend:
  1. Cadre JavaScript ReactJS
  2. TailwindCSS pour le style
  3. GSAP (Green Socket Animation Platform) pour les animations

### Backend:
  1. Bibliothèque Python Flask
  2. Système de gestion de base de données relationnelle SQLite (RDBMS)
  3. Bibliothèque Python SQLAlchemy

   <details>
  <summary><strong>SQLAlchemy:</strong></summary>

  SQLAlchemy est une boîte à outils SQL et une bibliothèque de mappage objet-relationnel (ORM) pour Python. Il fournit un ensemble d'API de haut niveau pour interagir avec les bases de données relationnelles. Avec SQLAlchemy, vous pouvez utiliser des classes Python pour représenter des tables de base de données et effectuer des opérations de base de données de manière orientée objet.

  [En savoir plus sur SQLAlchemy](https://www.sqlalchemy.org/)
</details>

<details>
  <summary><strong>SQLite:</strong></summary>

  SQLite est un système de gestion de base de données relationnelle (RDBMS) autonome, sans serveur et sans configuration. C'est un excellent choix pour les systèmes embarqués et les applications qui ne nécessitent pas de serveur de base de données distinct. SQLite est le moteur de base de données par défaut utilisé par SQLAlchemy dans ce projet.

  [En savoir plus sur SQLite](https://www.sqlite.org/)
</details>

## Structure des dossiers
### Backend:
- backend/
  - app/
    - engine/        (contient l'instance de recherche élastique et la manipulation)
    - models/        (contient les modèles de données)
    - routes/        (route de la page principale, les principaux composants seront appelés ici)
  - functional_test/ (contient les tests fonctionnels de la recherche des articles)
  - instance/        (contient l'instance de la base de données)
  - config.py        (configurations de l'environnement)
  - docker-compose.yaml (cluster de elastic search)
  - output.json      (contient le fichier texte des articles téléchargés sur l'index d'elastic search)
  - run.py           (point d'entrée de l'application)
  - unit_tests.py    (contient 3 tests unitaires) 


### Frontend:
- client/
  - public/
    - fonts/         
    - images/        
  - src/
    - components/    (dossiers des composants React, chaque page a un dossier séparé)
    - pages/         (toutes les pages du site web)
    - styles/        (contient le style global là où le CSS brut est requis, utilisez TailwindCSS sinon)
  - App.jsx            (c'est ici que toutes les pages seront appelées et où les routes sont gérées)


## Installation et démarrage des serveurs en local
### Frontend
  - Si vous n'avez pas Node.js installé, accédez à (https://nodejs.org/en) et téléchargez la dernière version stable (LTS) puis installez-la.
  - Installez la commande yarn dans l'invite de commande en exécutant
    ```nmp -g install yarn ```
  - Vérifiez si elle est installée en exécutant
    ``` yarn --version ```
  - Accédez au dossier client
    ``` cd client ```
  - Exécutez la commande
    ``` yarn install ```
  - Démarrez le serveur de développement en exécutant
    ``` yarn dev```
  - CTRL + Cliquez sur le lien affiché dans le terminal pour afficher le serveur de développement local.

> Si une erreur survient lors de l'exécution de la commande ``` yarn dev```, pensez à activer l'exécution des scripts en entrant la commande ``` Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass ```

### Démarrage du cluster d'elastic search pour la première fois
  - Accédez au dossier backend
  - Exécutez la commande suivante 
    ```docker compose up --remove-orphans -d```
- Un conteneur sera créé dans l'application Docker Desktop
- Activez le conteneur à chaque fois que vous voulez lancer l'API backend

### Backend
  - Si vous n'avez pas Python installé, accédez à (https://www.python.org/downloads/) et téléchargez la dernière version, puis installez-la.
  - Accédez au dossier backend
     ``` cd backend ```
  - Installez les dépendances requises en tapant la commande
     ``` pip install -r requirements.txt ```
  - Démarrez le serveur Flask en exécutant
     ``` python run.py ```

---
## Livrables
### Base de données
- La base de données SQLite se trouve dans le dossier `backend/instance` sous le nom de db.sqlite3
### Tests unitaires
- Les tests unitaires se trouvent dans le dossier `backend` sous le nom de unit_tests.py
- Vous pouvez exécuter les tests en naviguant au dossier `backend` puis exécuter la commande `python -m unit_tests`
### Test fonctionnel
- Un test fonctionnel est implémenté avec Selenium pour la fonctionnalité "rechercher un article".
- Afin d'exécuter le test :
  - installez Python comme indiqué auparavant et Selenium avec la commande ```pip install selenium```
  - installez le WebDriver correspondant à votre navigateur, pour Chrome, allez sur : https://sites.google.com/a/chromium.org/chromedriver/downloads. Pour Mozilla, allez sur : https://github.com/mozilla/geckodriver/releases
  - Vous pouvez exécuter les tests en naviguant au dossier `backend/functional_test` puis exécuter la commande `python functional_test_chrome.py` ou `python functional_test_mozilla.py` selon votre navigateur.
### Documentation du code
- La documentation se trouve au niveau du endpoint : http://127.0.0.1:5000/api/docs
### Fichier .json de l'index elastic search
- Le fichier se trouve au niveau du dossier `backend` sous le nom output.json
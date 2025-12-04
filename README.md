# Secret Santa Game

## Overview

This project consists of a full Secret Santa game built with a React
(functional components) frontend and a Node.js + Express backend.

## Frontend

The frontend is built entirely using React functional components and
contains three main menus:

### 1. Home

-   Allows uploading two Excel files:
    -   Current Year Employees
    -   Previous Year Employees
-   After uploading both files, clicking Submit will process the data
    and insert the employee details into the database.
-   Each employee receives a unique Employee Code during upload.

### 2. Assignment

-   Used to upload the master assignment file (e.g., 20--100 tasks).
-   The file must be in Excel format.
-   Each assignment is stored in the database with a unique Assignment
    Code.

### 3. Assignment Matcher

-   Contains an Assign Task button.
-   When clicked:
    -   The system randomly selects three tasks from the assignments.
    -   These tasks are mapped to each employee's Santa Child
        (pre-generated in the employee upload file).
    -   The final matched list is displayed in a table.

------------------------------------------------------------------------

## Backend

The backend is built using Node.js with ExpressJS, structured into three
main modules:

### 1. Database Module

-   File: database.js
-   Manages MySQL connectivity.
-   Connects to the database named santa_game_db.

### 2. Routes Module

-   Contains route files that receive requests from the frontend.
-   Each route file corresponds to a specific functional area:
    -   Employee Routes
    -   Assignment Routes
    -   Task Routes

### 3. Controllers Module

-   Each route has a matching controller file inside the Controllers
    folder.
-   Controllers contain the main logic for handling:
    -   Employee uploads and insertion
    -   Assignment uploads and insertion
    -   Task assignment processing

------------------------------------------------------------------------

## Database Structure

The database santa_game_db contains four tables:

1.  Employees -- stores all employee details with unique Employee Codes.
2.  Assignments -- stores uploaded tasks with unique Assignment Codes.
3.  Committed Assignments -- records successfully assigned tasks.
4.  Santa Child Matchups -- stores the mapping between employees and
    their assigned Santa children.

# Goal and scope of this template
This template consists of
* a frontend with either:
  * plain HTML and JavaScript using the VW design system "GroupUI"
  * React using TypeScript and the Audi design system "Audi React UI"
* a Java Spring Boot application with
  * communication layer (REST-API)
  * service layer (business logic)
  * repository layer (database connection)
  * model layer (Java beans)
* a containerized database in either
  * mySQL/mariaDB (including sql setup file and a script to start/stop the database in a docker container)
  * SQLite (running locally only)
* this README with exhaustive explanations and further reading/course sources

This readme assumes that you have a MacOS system with the [homebrew package manager](https://brew.sh/) installed.

------------------------------------------------------------------------------------------------------------

# Table of contents

<!-- TOC -->
* [Run the application](#run-the-application)
  * [Run the mySQL database locally](#run-the-mysql-database-locally)
  * [Run the SQLite database locally](#run-the-sqlite-database-locally)
  * [Run the Java Spring Boot application locally](#run-the-java-spring-boot-application-locally)
  * [Run the plain html frontend locally](#run-the-plain-html-frontend-locally)
  * [Run the react fronted locally](#run-the-react-fronted-locally)
* [Development](#development)
  * [Database](#database)
    * [mySQL](#mysql)
    * [SQLite](#sqlite)
  * [Backend](#backend)
    * [To make the backend even more professional](#to-make-the-backend-even-more-professional)
  * [Plain HTML Frontend](#plain-html-frontend)
  * [React Frontend](#react-frontend)
    * [Official development guides](#official-development-guides)
    * [How to setup a new frontend from scratch](#how-to-setup-a-new-frontend-from-scratch)
* [Project Structure](#project-structure)
* [Guides and Trainings](#guides-and-trainings)
  * [Publicly available](#publicly-available)
  * [Within Audi](#within-audi-)
  * [Official Reference Documentation](#official-reference-documentation)
<!-- TOC -->


# Run the application
## Run the mySQL database locally
1. install Colima: `brew install colima`
2. install Docker: `brew install docker`
3. go to `/database-setup` and run the script [to start the database](database-setup/startDatabase.sh)
4. wait until the database is successfully started
5. make sure your Java application is using the mySQL database 
   * in the [pom.xml](backend/pom.xml) use the dependency for `mysql-connector-j` and delete the one called `sqlite-jdbc`
   * in the [AnimalRepository](backend/src/main/java/audi/sdc/ja_project_template/repository/AnimalRepository.java) look for the TODOs and activate the DatabaseConnectorMySQL
 
## Run the SQLite database locally
1. make sure your Java application is using the SQLite database
    * in the [pom.xml](backend/pom.xml) use the dependency for `mysql-connector-j` and delete the one called `sqlite-jdbc`
    * in the [AnimalRepository](backend/src/main/java/audi/sdc/ja_project_template/repository/AnimalRepository.java) look for the TODOs and activate the DatabaseConnectorMySQL

## Run the Java Spring Boot application locally
1. navigate to `/backend` and find the [Maven configuration](backend/pom.xml) for this project
2. right-click on the `pom.xml` and select `+ add as Maven project` from the context menu
3. find the [application main class](backend/src/main/java/audi/sdc/ja_project_template/Application.java) and run it clicking the play button
4. wait until the application is successfully started 

## Run the plain html frontend locally
a) by running the development artifacts directly (incl. hot reload on changes of the code)
1. navigate to `frontend_plain_html` and find the [index.html](frontend_plain_html/index.html)
2. open the file and select one of the browsers in the right upper corner to open it
3. simply reload the browser page to see any changes you did in the frontend code

b) by adding it to the backend server
1. find the [build-script](build-frontend.sh) in the project root and run it
2. (re-)start the Java Spring Boot application
3. open your browser and open [localhost:8080](http://localhost:8080/)
4. to see any changes you did in the frontend code, repeat steps b-1 to b-3

## Run the react fronted locally
React depends on a set of node.js packages. To use them you have to install node first:
1. run `brew install nvm` to install the node version manager on your system
2. run `nvm install node` to install the latest node version

When having node installed you can install all dependencies for your frontend project and run it:
1. in the IntelliJ terminal navigate to `frontend_react`
2. run the command `npm install` to install all frontend dependencies
3. if successfully installed, run `npm run dev` to start your application
4. open the URL shown in the terminal (it should look similar like this: http://localhost:51xx/)

------------------------------------------------------------------------------------------------------------


# Development

Generally: replace all occurrences of `ja-project-template` to how you want to name your app

> [!WARNING]  
> This part is under construction.

## Database
### mySQL
1. open the [data.sql](database-setup/data.sql) file
2. alter/add any SQL to CREATE tables following the given schema
3. make sure to DROP every table if exists before creating them
4. make sure to INSERT some test data for every table
5. run the database locally like described [here](#run-the-mysql-database-locally)

### SQLite
1. open the [DatabaseConnectorSqLite.java](backend/src/main/java/audi/sdc/ja_project_template/repository/DatabaseConnectorSqLite.java) file
2. add SQL statements to CREATE tables as constant
3. add SQL statements to DROP tables as constant
4. add SQL statements to INSERT data to tables as constant
5. in the setupDatabase() method call the drop - create - insert statements for every table


* two versions, for sqlite and mysql
* sql-file/setup in code
* username & password
* what needs to be installed
* connect using build in tools
* rerun after change
## Backend


> [!WARNING]  
> This part is under construction.
* maven project
* schichtenarchitektur (schaubild - oder eigenes .md?)
* rerun after change
* Stichwörter für best practices

### To make the backend even more professional
During your learning path you might notice a few things. Constructors, getters, setters are often very similar and it's annoying to write and read them again and again. Also, the code in your repository classes (incl. SQL-statements to CRUD something in your database) will be very similar for every model class. Instead of writing this functionality on your own, you can use frameworks and libraries to help you with it. One framework is already in use in this example - Spring Boot Web. But Spring Boot is capable of a lot more. You could:
* replace JDBC with [Spring Data JPA](https://www.baeldung.com/the-persistence-layer-with-spring-and-jpa)
* add validation directly to your endpoint using [Spring Validation](https://www.baeldung.com/spring-boot-bean-validation)
* get rid of standard constructor and getter/setter code (so called 'boilerplate code') using [lombok](https://www.baeldung.com/intro-to-project-lombok)

## Plain HTML Frontend

> [!WARNING]  
> This part is under construction.

## React Frontend

### Official development guides
* [React learning](https://react.dev/learn)
* [React reference](https://react.dev/reference/react)
* [React with TypeScript instead of JavaScript](https://react.dev/learn/typescript)
* [Vite reference](https://vite.dev/guide/)

### How to setup a new frontend from scratch
a) Add React to your project (using Vite and TypeScript) (read up [here](https://www.jetbrains.com/help/idea/vite.html#creating_vite_app_with_create_vite))
1. Open a terminal in your root directory of your project and execute 
``` npx create-vite <app-name>```.  
The app name chosen here is "frontend_react"
2. Answer the questions in the terminal:  
Install packages: _yes_  
Select framework: _React_  
Select variant: _TypeScript_
3. Navigate to the apps directory: ```cd app-name```
4. Install dependencies: ```npm install```
5. Run the demo react app you just created: ```npm run dev```

b) Allow access the Audi UI React library
1. Open a terminal in your users directory of your Mac: ```cd /Users/<user-id>```
2. and open your npm configuration: ```open .npmrc```
3. If the file does not exist create it: ```touch ~/.npmrc```
4. Open the file (look at 2.)
5. Add the following three lines to the file and save it:  
    ```
    always-auth=true
    @audi:registry=https://npm.pkg.github.com
    //npm.pkg.github.com/:_authToken=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
    ```

c) Add the Audi UI React library to your App  
This guide follows the [official developer guideline](https://react.ui.audi/?path=/docs/getting-started-developer--docs)
1. Add the dependency to [package.json](frontend_react/package.json):  
    ```
     "dependencies": {
        "@audi/audi-ui-react": "^some version",
        "react": "^some version",
        "react-dom": "^some version"
     },
   ```  
   You can find the latest version in the [changelog](https://react.ui.audi/?path=/docs/change-log--docs)
2. Import the ThemeProvider to your main.tsx  
    ```typescript jsx
    import ...
    import {audiLightTheme, ThemeProvider} from "@audi/audi-ui-react";
    
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <ThemeProvider theme={{...audiLightTheme, iconBasePath: './icons/audi'}}>
                <App/>
            </ThemeProvider>
        </StrictMode>,
    )
    ```
3. Add the Audi Layout to your App.tsx  
    ```typescript jsx
    import ...
    import {Layout} from '@audi/audi-ui-react'
    
    function App() {
        return (
            <Layout direction="column" align="center">
               {/*your content*/}
            </Layout>
        )
    }
    
    export default App
    ```
4. Use elements of the Audi UI React library wherever needed  
    ```typescript jsx
   import { Button, Layout} from '@audi/audi-ui-react';

    function Header() {
    
        return (
            <div className="header">
                <Layout justify="around" align="center">
                    <Button onClick={()=> alert("Hello!  I'm a button")} variant="secondary" icon="editorial" size="small">
                        click me
                    </Button>
                </Layout>
            </div>
        );
    }
    
    export default Header;
   ```

------------------------------------------------------------------------------------------------------------

# Project Structure

> [!WARNING]  
> This part is under construction.

------------------------------------------------------------------------------------------------------------

# I want to learn more...
Then take a look [here](LEARNING.md)

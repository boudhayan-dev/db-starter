# Database Starter

![Demo]()


This is a simple utility script created using NodeJS to enable the restarting of existing DB in SAP CP.

## Requirements

Install NodeJS prior to running the script.

* Node JS - [Download and Install NodeJS](https://nodejs.org/en/download/)

## Install

* Clone the repo

    ` git clone https://github.com/boudhayan-dev/db-starter`

* Navigate into the cloned project
    
    `cd path/to/db-starter`

* Run npm install.

    ` npm i `

## Usage

The script can be invoked from the command line or you can also schedule the script to run daily at a pre-defined time using the windows scheduler tool.

* Run using command-line

    * Run using npm

        ```
        cd path/to/db-starter
        
        node index.js
        ```
    * Run batch file

        * Edit the `main.bat`  file as follows -

            `cmd /k C:\"Program Files"\path\to\node.exe	C:\Users\path\to\index.js`
        
        * Double click on `main.bat` to run it.

* Run using windows scheduler tool

    Add the `main.bat` (created in the above step) as the script in windows scheduler to be run daily at your chosen time.


 




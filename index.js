const cmd = require('node-cmd');
const inquirer = require('inquirer');
const chalk = require('chalk')


const getUserDetails= async () => {
    const questions = [
        {
            type: 'input',
            name: 'username',
            message: `${chalk.bold.blue("Username")}`,
            prefix: `${chalk.blue.bold("*")}`,
            suffix: `${chalk.blue.bold(" - ")}`
        },
        {
            type: 'password',
            name: 'password',
            message: `${chalk.bold.blue("Password")}`,
            prefix: `${chalk.blue.bold("*")}`,
            suffix: `${chalk.blue.bold(" - ")}`,
            mask: true
        },
        {
            type: 'input',
            name: 'database',
            message: `${chalk.bold.blue("Database")}`,
            prefix: `${chalk.blue.bold("*")}`,
            suffix: `${chalk.blue.bold(" - ")}`,
            mask: true
        } 
    ];

    return inquirer.prompt(questions);
}


const neoCli =  async (username,password,database) => {
    return cmd.get(`neo display-db-info -a ${username.toLowerCase()}sapdev -h int.sap.hana.ondemand.com -u ${username} -p ${password} -i ${database}`,
        function (error, data, stderr) {
        
            if (data.indexOf("STOPPED") != -1) {

                console.log("DB Status : ",chalk.red.bold("STOPPED"))
                console.log("Attempting to start DB . . .")
                
                cmd.get(`neo start-db-hana -h int.sap.hana.ondemand.com -a ${username.toLowerCase()}sapdev -u ${username} -p ${password} --id ${database}`,
                        function (err,data,stderr) {
                            if(!err){
                                if(data.indexOf('accepted') != -1){
                                    console.log(chalk.green.bold("Successfully started DB"))
                                }
                            }
                            else{
                                console.log(chalk.red.bold('Error re-starting db.'))
                            }
                        }
                )

            }
            
            else{
                if(data.indexOf('properties')!=-1){
                    console.log("DB Status : ", chalk.green.bold("STARTED"))
                }
                else{
                    console.log("Error : ", chalk.red.bold("Database not found. Please check the name."))
                }
                
            }
        }
    )

}

const main = async () => {
    const answers = await getUserDetails();
    const { username, password , database} = answers;

    console.log("\nGetting current DB status . . .")
    await neoCli(username,password,database)
}


main()








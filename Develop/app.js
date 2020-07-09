const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const teamArr = [];

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");

const newEmployee = function () {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is your name?",
                name: "name"
            },
            {
                type: "input",
                message: "What is your email address?",
                name: "email"
            },
            {
                type: "input",
                message: "What is your employee id number?",
                name: "id"
            },
            {
                type: "list",
                message: "What is your role?",
                choices: ["Manager", "Engineer", "Intern"],
                name: "role"
            }
        ])
        .then(function (response) {
            if (response.role === "Manager") {
                inquirer
                    .prompt([
                        {
                            type: "input",
                            message: "What is your office number?",
                            name: "officeNum"
                        }
                    ])
                    .then(function (manager) {
                        const managerNew = new Manager(response.name, response.role, response.id, response.email, manager.officeNum);
                        teamArr.push(managerNew);
                        init();
                    })
            }
            if (response.role === "Engineer") {
                inquirer
                    .prompt([
                        {
                            type: "input",
                            message: "What is your github username?",
                            name: "githubUsername"
                        }
                    ])
                    .then(function (engineer) {
                        const engineerNew = new Engineer(response.name, response.role, response.id, response.email, engineer.githubUsername);
                        teamArr.push(engineerNew);
                        init();
                    })
            }
            if (response.role === "Intern") {
                inquirer
                    .prompt([
                        {
                            type: "input",
                            message: "Where do you attend School?",
                            name: "schoolName"
                        }
                    ])
                    .then(function (intern) {
                        const internNew = new Intern(response.name, response.role, response.id, response.email, intern.schoolName);
                        teamArr.push(internNew);
                        init();
                    })
            }
        })       
}




function init() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Would you like to add an Employee?",
                choices: ["Yes", "No"],
                name: "employeeNew"
            }
        ])
        .then(function (initial) {
            if (initial.employeeNew === "Yes") {
                newEmployee();
            } else {
                inquirer
                    .prompt([
                        {
                            type: "list",
                            message: "Generate Team Page?",
                            choices: ["Yes", "No"],
                            name: "teamPage"
                        }
                    ])
                    .then(function(response){
                        if(response.teamPage === "Yes"){
                            fs.writeFile(outputPath, render(teamArr), (err) => {
                                if(err){
                                    console.log(err);
                                } else{
                                    console.log("Profile Page Written!");   
                                }
                            })
                        } else {
                            console.log("All done")
                        }
                    })
            }
        })
}
init();

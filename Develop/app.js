const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");

const newEmployee = function(){
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
            type: "list",
            message: "What is your role?",
            choices: ["Manager", "Engineer", "Intern"],
            name: "role"
        }
    ])
    .then(function (response) {
        let counter = 0
        counter++
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
                    const managerNew = new Manager(response.name, response.role, counter, response.email, manager.officeNum);
                    console.log(managerNew);
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
                    const engineerNew = new Engineer(response.name, response.role, counter, response.email, engineer.githubUsername);
                    console.log(engineerNew);
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
                    const internNew = new Intern(response.name, response.role, counter, response.email, intern.schoolName);
                    console.log(internNew);
                })
        }
    })
    init();
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
            if (initial.employeeNew === "Yes"){
                newEmployee();
            } else {
                console.log("Employee Profiles Completed");
            }
        })
}
init();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
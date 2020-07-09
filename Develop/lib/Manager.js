// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, title, id, email, office){
        super(name, title, id, email)
        this.office = office;
        this.getRole = ()=> "Manager",
        this.getOfficeNumber = ()=> this.office
    }
}

module.exports = Manager
// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, role, id, email){
        this.name = name;
        this.role = role;
        this.id = id;
        this.email = email;

        this.getName = ()=> this.name
        this.getId = ()=> this.id
        this.getEmail = ()=> this.email
        this.getRole = ()=> "Employee"
    }
}

module.exports = Employee
// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./employee");

class Intern extends Employee {
    constructor(name, id, email, school){
        super(name, id, email);
            this.school = school;
    }
    getSchool(){
        return `${this.school}`;
    }
    getRole(){
        return ("Intern");
    }
}
const newIntern = new Intern('Michael',4,'m@me.com','UNLV');

console.log(newIntern);
console.log(newIntern.getRole());
console.log(newIntern.getName());
console.log(newIntern.getEmail());

module.exports = Intern;
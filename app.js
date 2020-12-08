const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Prompts to build user questionnaire, depending on which role the team member has.

const rolePrompt = {
  name: "role",
  type: "list",
  message: "Role of team member:",
  choices: ["Manager", "Engineer", "Intern"],
};

const managerPrompt = [
  {
    name: "name",
    type: "input",
    message: "Name of Manager",
  },
  {
    name: "id",
    type: "input",
    message: "Manager ID",
  },
  {
    name: "email",
    type: "input",
    message: "Manager's Email",
  },
  {
    name: "officeNumber",
    type: "input",
    message: "Manager's Office Number",
  },
];

const engineerPrompt = [
  {
    name: "name",
    type: "input",
    message: "Name of Engineer",
  },
  {
    name: "id",
    type: "input",
    message: "Engineer ID",
  },
  {
    name: "email",
    type: "input",
    message: "Engineer's Email",
  },
  {
    name: "github",
    type: "input",
    message: "GitHub Username",
  },
];

const internPrompt = [
  {
    name: "name",
    type: "input",
    message: "Name of Intern",
  },
  {
    name: "id",
    type: "input",
    message: "Intern ID",
  },
  {
    name: "email",
    type: "input",
    message: "Intern's Email",
  },
  {
    name: "school",
    type: "input",
    message: "Intern's School",
  },
];

// Prompts the user to add another employee or render the output.

const anotherPrompt = [
  {
    name: "next",
    type: "confirm",
    message:
      "Team member added. Add another? (enter NO to render the team summary)",
  },
];

let employees = [];

// Gather information about the team members and create objects for each team member.

const addEmployees = () =>
  inquirer.prompt(rolePrompt).then((roleChoice) => {
    let role = roleChoice.role;
    switch (role) {
      case "Manager":
        inquirer.prompt(managerPrompt).then((managerData) => {
          let managerName = managerData.name;
          let managerId = managerData.id;
          let managerEmail = managerData.email;
          let managerOffice = managerData.officeNumber;

          const manager = new Manager(
            managerName,
            managerId,
            managerEmail,
            managerOffice
          );
          employees.push(manager);
          addAnother();
        });
        break;
      case "Engineer":
        inquirer.prompt(engineerPrompt).then((engineerData) => {
          let engineerName = engineerData.name;
          let engineerId = engineerData.id;
          let engineerEmail = engineerData.email;
          let engineerGithub = engineerData.github;

          const engineer = new Engineer(
            engineerName,
            engineerId,
            engineerEmail,
            engineerGithub
          );
          employees.push(engineer);
          addAnother();
        });
        break;
      case "Intern":
        inquirer.prompt(internPrompt).then((internData) => {
          let internName = internData.name;
          let internId = internData.id;
          let internEmail = internData.email;
          let engineerGithub = internData.school;

          const intern = new Intern(
            internName,
            internId,
            internEmail,
            engineerGithub
          );
          employees.push(intern);
          addAnother();
        });
        break;
    }
    const addAnother = () =>
      inquirer.prompt(anotherPrompt).then((answer) => {
        let choice = answer.next;
        if (choice) {
          addEmployees();
        } else {
          renderOutput(employees);
        }
      });
  });

addEmployees();

// renders the output to the html

const renderOutput = (employees) => {
  fs.writeFileSync(outputPath, render(employees));
};

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

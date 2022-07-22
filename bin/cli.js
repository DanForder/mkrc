#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// import modules
const boilerplate = require("./boilerplate");

// get arguments from command line
const commander = require("commander");
commander
  .arguments("<component-type> <component-name>")
  .action((type, name) => {
    componentName = name;
    componentType = type;
  });

// Create flags for command
commander.option("-f, --function", "functional component");

// Link command line to js
commander.parse(process.argv);

// Check arguments have been passed
const checkArguments = () => {
  if (
    typeof componentName === "undefined" ||
    typeof componentType === "undefined"
  ) {
    console.error(
      "command requires format: mkrc <component-type> <component-name>"
    );
    process.exit(1);
  }
};

const checkFolderExists = (folder) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
    console.log(`${folder} folder created!`);
  }
};

const createComponent = (type, name) => {
  // If arguments not given, prevent code from running
  checkArguments();

  // File path setup
  const src = path.resolve("src");
  const typeOfComponent = path.resolve("src/" + type);
  const nameOfComponent = path.resolve("src/" + type + "/" + name);

  // Check if folders exist and create them if they don't
  checkFolderExists(src);
  checkFolderExists(typeOfComponent);
  checkFolderExists(nameOfComponent);

  // Boilerplate code for the files
  const jsx = boilerplate.createFuncJsx(name);
  const test = boilerplate.createTestJs(name);
  const scss = boilerplate.createScss(name);

  // Create the files we use for React
  jsx.forEach((line) => {
    fs.appendFileSync(`${nameOfComponent}/${name}.jsx`, line);
    fs.appendFileSync(`${nameOfComponent}/${name}.jsx`, "\n");
  });

  test.forEach((line) => {
    fs.appendFileSync(`${nameOfComponent}/${name}.test.js`, line);
    fs.appendFileSync(`${nameOfComponent}/${name}.test.js`, "\n");
  });

  scss.forEach((line) => {
    fs.appendFileSync(`${nameOfComponent}/${name}.scss`, line);
    fs.appendFileSync(`${nameOfComponent}/${name}.scss`, "\n");
  });

  console.log(
    `Component with name: ${name} has been created in ${type} folder`
  );
};

// Run function when command given
createComponent(componentType, componentName);

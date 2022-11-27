import inquirer from "inquirer";
import type { Config } from "./types";
import unTypedConfig from "./cbconfig.json" assert { type: "json" };
import { PartsBranchName } from "./types";

// import yargs from "yargs";
import repl from "node:repl";
import childProcess, { exec } from "child_process";
import { spawn } from "node:child_process";
const config = unTypedConfig as Config;

const DEFAULT_TASK_NAME_DELIMITER = "_";
const DEFAULT_BRANCH_NAME_TEMPLATE =
  "<branch_type>/<project_name>-<task_id>-<branch_name>";
const DEFAULT_IS_AUTO_CHECKOUT = false;

const tryCatchDecorator =
  (fn: Function, onRejected: (err: unknown) => any) =>
  (...args: any[]) => {
    try {
      return fn(...args);
    } catch (err) {
      return onRejected(err);
    }
  };

const defaultTryCatchDecorator = (fn: Function) =>
  tryCatchDecorator(fn, (err) => {
    console.error(err);
  });

const tcd = defaultTryCatchDecorator;

const getProperty = <T extends keyof Config>(name: T): Config[T] => {
  if (!config[name]) throw new Error(`You need to add ${name} property`);
  return config[name];
};

const getBranchTypes = (): string[] => {
  const result = getProperty("branch_types");
  return Array.isArray(result) ? result : [result];
};

const getProjectNames = (): string[] => {
  const result = getProperty("project_names");
  return Array.isArray(result) ? result : [result];
};

const getTaskNameDelimiter = (): string =>
  getProperty("task_name_delimiter") ?? DEFAULT_TASK_NAME_DELIMITER;

const getBranchNameTemplate = (): string =>
  getProperty("branch_name_template") ?? DEFAULT_BRANCH_NAME_TEMPLATE;

const getIsAutoCheckout = (): boolean =>
  getProperty("autoCheckout") ?? DEFAULT_IS_AUTO_CHECKOUT;

const transformToAnswers = (data: string[]) =>
  data.map((answer) => ({
    value: answer,
  }));

const getBranchType = tcd(async () => {
  const branchTypes = getBranchTypes();
  if (branchTypes.length === 1) return branchTypes[0];

  const answers = transformToAnswers(branchTypes);
  const question = {
    message: "Select branch type",
    name: "branch_type",
    type: "list",
    choices: answers,
  };

  const answer = await inquirer.prompt([question]);

  return answer[question.name];
});

const getProjectName = tcd(async () => {
  const questionName = "project_name";
  const projectNames = getProjectNames();
  if (projectNames.length === 1) return projectNames[0];

  const answers = transformToAnswers(projectNames);
  const question = {
    message: "Select project name",
    name: questionName,
    type: "list",
    choices: answers,
  };

  const answer = await inquirer.prompt([question]);

  return answer[questionName];
});

const getTaskNumber = tcd(async () => {
  const question = {
    message: "Type task id",
    name: "task_id",
    type: "number",
  };

  const answer = await inquirer.prompt([question]);

  return answer[question.name];
});

const getTaskName = tcd(async () => {
  const question = {
    message: "Type branch name",
    name: "branch_name",
    type: "input",
  };

  const answer = await inquirer.prompt([question]);
  const delimiter = getTaskNameDelimiter();

  return answer[question.name].trim().replace(/\W/gi, delimiter);
});

const propertyMap: Record<PartsBranchName, () => any> = {
  branch_type: getBranchType,
  project_name: getProjectName,
  task_id: getTaskNumber,
  task_name: getTaskName,
};

const removeNonLetterCharacters = (str: string) => str.replace(/\W/gi, "");

const getBranchNameByTemplate = tcd(async () => {
  const branchNameTemplate = getBranchNameTemplate();
  const properties = branchNameTemplate.match(/<\w*>/gi) ?? [];

  let result = branchNameTemplate;

  for await (const property of properties) {
    const propertyName = removeNonLetterCharacters(property);
    const propertyValue = await propertyMap[propertyName as PartsBranchName]();
    const regExp = propertyValue
      ? new RegExp(property, "gi")
      : new RegExp(`${property}?\\W`, "gi");
    result = result.replace(regExp, propertyValue || "");
  }

  return result;
});

const main = async () => {
  const branchNameByTemplate = await getBranchNameByTemplate();
  const isAutoCheckout = getIsAutoCheckout();
  exec(`git checkout -b ${branchNameByTemplate}`, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
};

main();

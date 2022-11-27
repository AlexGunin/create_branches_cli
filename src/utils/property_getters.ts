import {
  getBranchTypes,
  getProjectNames,
  getTaskNameDelimiter,
} from "./json_getters";
import inquirer from "inquirer";
import { tcd } from "./tcd";
import { transformToAnswers } from "./helpers";

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
    message: "Type task name",
    name: "task_name",
    type: "input",
  };

  const answer = await inquirer.prompt([question]);
  const delimiter = getTaskNameDelimiter();

  return answer[question.name].trim().replace(/\W/gi, delimiter);
});

export { getBranchType, getTaskName, getTaskNumber, getProjectName };

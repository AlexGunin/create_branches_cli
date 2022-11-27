var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getBranchTypes, getProjectNames, getTaskNameDelimiter, } from "./json_getters";
import inquirer from "inquirer";
import { tcd } from "./tcd";
import { transformToAnswers } from "./helpers";
const getBranchType = tcd(() => __awaiter(void 0, void 0, void 0, function* () {
    const branchTypes = getBranchTypes();
    if (branchTypes.length === 1)
        return branchTypes[0];
    const answers = transformToAnswers(branchTypes);
    const question = {
        message: "Select branch type",
        name: "branch_type",
        type: "list",
        choices: answers,
    };
    const answer = yield inquirer.prompt([question]);
    return answer[question.name];
}));
const getProjectName = tcd(() => __awaiter(void 0, void 0, void 0, function* () {
    const questionName = "project_name";
    const projectNames = getProjectNames();
    if (projectNames.length === 1)
        return projectNames[0];
    const answers = transformToAnswers(projectNames);
    const question = {
        message: "Select project name",
        name: questionName,
        type: "list",
        choices: answers,
    };
    const answer = yield inquirer.prompt([question]);
    return answer[questionName];
}));
const getTaskNumber = tcd(() => __awaiter(void 0, void 0, void 0, function* () {
    const question = {
        message: "Type task id",
        name: "task_id",
        type: "number",
    };
    const answer = yield inquirer.prompt([question]);
    return answer[question.name];
}));
const getTaskName = tcd(() => __awaiter(void 0, void 0, void 0, function* () {
    const question = {
        message: "Type task name",
        name: "task_name",
        type: "input",
    };
    const answer = yield inquirer.prompt([question]);
    const delimiter = getTaskNameDelimiter();
    return answer[question.name].trim().replace(/\W/gi, delimiter);
}));
export { getBranchType, getTaskName, getTaskNumber, getProjectName };

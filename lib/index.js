var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
import inquirer from "inquirer";
import unTypedConfig from "./cbconfig.json" assert { type: "json" };
import { exec } from "child_process";
const config = unTypedConfig;
const DEFAULT_TASK_NAME_DELIMITER = "_";
const DEFAULT_BRANCH_NAME_TEMPLATE = "<branch_type>/<project_name>-<task_id>-<branch_name>";
const DEFAULT_IS_AUTO_CHECKOUT = false;
const tryCatchDecorator = (fn, onRejected) => (...args) => {
    try {
        return fn(...args);
    }
    catch (err) {
        return onRejected(err);
    }
};
const defaultTryCatchDecorator = (fn) => tryCatchDecorator(fn, (err) => {
    console.error(err);
});
const tcd = defaultTryCatchDecorator;
const getProperty = (name) => {
    if (!config[name])
        throw new Error(`You need to add ${name} property`);
    return config[name];
};
const getBranchTypes = () => {
    const result = getProperty("branch_types");
    return Array.isArray(result) ? result : [result];
};
const getProjectNames = () => {
    const result = getProperty("project_names");
    return Array.isArray(result) ? result : [result];
};
const getTaskNameDelimiter = () => { var _a; return (_a = getProperty("task_name_delimiter")) !== null && _a !== void 0 ? _a : DEFAULT_TASK_NAME_DELIMITER; };
const getBranchNameTemplate = () => { var _a; return (_a = getProperty("branch_name_template")) !== null && _a !== void 0 ? _a : DEFAULT_BRANCH_NAME_TEMPLATE; };
const getIsAutoCheckout = () => { var _a; return (_a = getProperty("autoCheckout")) !== null && _a !== void 0 ? _a : DEFAULT_IS_AUTO_CHECKOUT; };
const transformToAnswers = (data) => data.map((answer) => ({
    value: answer,
}));
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
        message: "Type branch name",
        name: "branch_name",
        type: "input",
    };
    const answer = yield inquirer.prompt([question]);
    const delimiter = getTaskNameDelimiter();
    return answer[question.name].trim().replace(/\W/gi, delimiter);
}));
const propertyMap = {
    branch_type: getBranchType,
    project_name: getProjectName,
    task_id: getTaskNumber,
    task_name: getTaskName,
};
const removeNonLetterCharacters = (str) => str.replace(/\W/gi, "");
const getBranchNameByTemplate = tcd(() => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    var _d;
    const branchNameTemplate = getBranchNameTemplate();
    const properties = (_d = branchNameTemplate.match(/<\w*>/gi)) !== null && _d !== void 0 ? _d : [];
    let result = branchNameTemplate;
    try {
        for (var _e = true, properties_1 = __asyncValues(properties), properties_1_1; properties_1_1 = yield properties_1.next(), _a = properties_1_1.done, !_a;) {
            _c = properties_1_1.value;
            _e = false;
            try {
                const property = _c;
                const propertyName = removeNonLetterCharacters(property);
                const propertyValue = yield propertyMap[propertyName]();
                const regExp = propertyValue
                    ? new RegExp(property, "gi")
                    : new RegExp(`${property}?\\W`, "gi");
                result = result.replace(regExp, propertyValue || "");
            }
            finally {
                _e = true;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_e && !_a && (_b = properties_1.return)) yield _b.call(properties_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return result;
}));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const branchNameByTemplate = yield getBranchNameByTemplate();
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
});
main();

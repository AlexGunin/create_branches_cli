import { DEFAULT_BRANCH_NAME_TEMPLATE, DEFAULT_IS_AUTO_CHECKOUT, DEFAULT_TASK_NAME_DELIMITER, } from "../constants";
import unTypedConfig from "../../cbconfig.json" assert { type: "json" };
const config = unTypedConfig;
const getProperty = (name) => {
    if (config[name] == null)
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
export { getProperty, getIsAutoCheckout, getBranchNameTemplate, getBranchTypes, getProjectNames, getTaskNameDelimiter, };

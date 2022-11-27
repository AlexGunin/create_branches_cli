import { getBranchType, getProjectName, getTaskName, getTaskNumber, } from "./utils/property_getters";
const DEFAULT_TASK_NAME_DELIMITER = "_";
const DEFAULT_BRANCH_NAME_TEMPLATE = "<branch_type>/<project_name>-<task_id>-<branch_name>";
const DEFAULT_IS_AUTO_CHECKOUT = false;
const PROPERTY_MAP = {
    branch_type: getBranchType,
    project_name: getProjectName,
    task_id: getTaskNumber,
    task_name: getTaskName,
};
export { DEFAULT_IS_AUTO_CHECKOUT, DEFAULT_TASK_NAME_DELIMITER, DEFAULT_BRANCH_NAME_TEMPLATE, PROPERTY_MAP, };

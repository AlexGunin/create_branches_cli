import { PartsBranchName } from "./types";
import {
  getTaskType,
  getProjectName,
  getTaskName,
  getTaskNumber,
} from "./utils/property_getters";

const CONFIG_FILE_NAME = "cbconfig.json";

const DEFAULT_TASK_NAME_DELIMITER = "_";
const DEFAULT_BRANCH_NAME_TEMPLATE =
  "<task_type>/<project_name>-<task_id>-<task_name>";
const DEFAULT_IS_AUTO_CHECKOUT = false;

const PROPERTY_MAP: Record<PartsBranchName, () => any> = {
  [PartsBranchName.task_type]: getTaskType,
  [PartsBranchName.project_name]: getProjectName,
  [PartsBranchName.task_id]: getTaskNumber,
  [PartsBranchName.task_name]: getTaskName,
};

export {
  DEFAULT_IS_AUTO_CHECKOUT,
  DEFAULT_TASK_NAME_DELIMITER,
  DEFAULT_BRANCH_NAME_TEMPLATE,
  PROPERTY_MAP,
  CONFIG_FILE_NAME,
};

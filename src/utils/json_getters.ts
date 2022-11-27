import { Config } from "../types";
import {
  DEFAULT_BRANCH_NAME_TEMPLATE,
  DEFAULT_IS_AUTO_CHECKOUT,
  DEFAULT_TASK_NAME_DELIMITER,
} from "../constants";
import unTypedConfig from "../../cbconfig.json" assert { type: "json" };

const config = unTypedConfig as Config;

const getProperty = <T extends keyof Config>(name: T): Config[T] => {
  if (config[name] == null) throw new Error(`You need to add ${name} property`);
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

export {
  getProperty,
  getIsAutoCheckout,
  getBranchNameTemplate,
  getBranchTypes,
  getProjectNames,
  getTaskNameDelimiter,
};

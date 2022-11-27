import { Config } from "../types";
import {
  CONFIG_FILE_NAME,
  DEFAULT_BRANCH_NAME_TEMPLATE,
  DEFAULT_IS_AUTO_CHECKOUT,
  DEFAULT_TASK_NAME_DELIMITER,
} from "../constants";
import { findUpSync } from "find-up";
import fs from "fs";
import { tcd } from "./tcd";

const readConfig = () => {
  let config: Config | null = null;

  const resolve = tcd(() => {
    const pkg = findUpSync(CONFIG_FILE_NAME, { cwd: process.cwd() });
    config = JSON.parse(fs.readFileSync(pkg as string, "utf8"));
    return config;
  });

  return () => config ?? resolve();
};

const getConfig = readConfig();

const getProperty = <T extends keyof Config>(name: T): Config[T] => {
  const config = getConfig();
  if (!config) throw new Error(`You need to create file cbconfig.json`);
  if (config[name] == null) throw new Error(`You need to add ${name} property`);
  return config[name];
};

const getTaskTypes = (): string[] => {
  const result = getProperty("task_types");
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
  getTaskTypes,
  getProjectNames,
  getTaskNameDelimiter,
};

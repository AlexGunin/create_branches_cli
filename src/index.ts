import { createResultLog, removeNonLetterCharacters } from "./utils/helpers";
import { exec } from "child_process";
import { PartsBranchName } from "./types";
import { PROPERTY_MAP } from "./constants";
import { tcd } from "./utils/tcd";
import { getBranchNameTemplate, getIsAutoCheckout } from "./utils/json_getters";

const getBranchNameByTemplate = tcd(async () => {
  const branchNameTemplate = getBranchNameTemplate();
  const properties = branchNameTemplate.match(/<\w*>/gi) ?? [];

  let result = branchNameTemplate;

  for await (const property of properties) {
    const propertyName = removeNonLetterCharacters(property);
    const propertyValue = await PROPERTY_MAP[propertyName as PartsBranchName]();
    const regExp = propertyValue
      ? new RegExp(property, "gi")
      : new RegExp(`${property}?\\W`, "gi");
    result = result.replace(regExp, propertyValue || "");
  }

  return result;
});

const index = async () => {
  const branchNameByTemplate = await getBranchNameByTemplate();
  const isAutoCheckout = getIsAutoCheckout();
  const gitCommand = isAutoCheckout ? "checkout -b" : "branch";

  const fullCommand = `git ${gitCommand} ${branchNameByTemplate}`;

  exec(fullCommand, createResultLog(fullCommand));
};

index();

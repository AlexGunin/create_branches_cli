export interface Config {
  project_names: string | string[];
  branch_types: string | string[];
  task_name_delimiter?: string;
  branch_name_template: string;
  autoCheckout?: boolean;
}

export enum PartsBranchName {
  project_name = "project_name",
  branch_type = "branch_type",
  task_id = "task_id",
  task_name = "task_name",
}

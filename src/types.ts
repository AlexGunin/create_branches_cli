export interface Config {
  project_names: string | string[];
  task_types: string | string[];
  task_name_delimiter?: string;
  branch_name_template: string;
  autoCheckout?: boolean;
}

export enum PartsBranchName {
  project_name = "project_name",
  task_type = "task_type",
  task_id = "task_id",
  task_name = "task_name",
}

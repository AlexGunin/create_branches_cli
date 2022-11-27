import { ExecException } from "child_process";

const transformToAnswers = (data: string[]) =>
  data.map((answer) => ({
    value: answer,
  }));

const removeNonLetterCharacters = (str: string) => str.replace(/\W/gi, "");

const createResultLog =
  (command: string) =>
  (error: ExecException | null, stdout: string, stderr: string) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(command);
  };

export { transformToAnswers, removeNonLetterCharacters, createResultLog };

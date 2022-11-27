const transformToAnswers = (data) => data.map((answer) => ({
    value: answer,
}));
const removeNonLetterCharacters = (str) => str.replace(/\W/gi, "");
const createResultLog = (command) => (error, stdout, stderr) => {
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

#!/usr/bin/env node

import {exec as $gHeVW$exec} from "child_process";
import $gHeVW$inquirer from "inquirer";
import {cwd as $gHeVW$cwd} from "process";
import {findUpSync as $gHeVW$findUpSync} from "find-up";
import $gHeVW$fs from "fs";

const $0ad0bc75b5eb16a6$export$3e2a003fb60aac51 = (data)=>data.map((answer)=>({
            value: answer
        }));
const $0ad0bc75b5eb16a6$export$16ae133f336020fd = (str)=>str.replace(/\W/gi, "");
const $0ad0bc75b5eb16a6$export$365c62e5f8532e08 = (command)=>// @ts-ignore
    (error, stdout, stderr)=>{
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



let $81c1b644006d48ec$export$648134ce7ac007fb;
(function(PartsBranchName) {
    PartsBranchName["project_name"] = "project_name";
    PartsBranchName["task_type"] = "task_type";
    PartsBranchName["task_id"] = "task_id";
    PartsBranchName["task_name"] = "task_name";
})($81c1b644006d48ec$export$648134ce7ac007fb || ($81c1b644006d48ec$export$648134ce7ac007fb = {}));





const $243fbdb628f4cca8$var$tryCatchDecorator = (fn, onRejected)=>(...args)=>{
        try {
            return fn(...args);
        } catch (err) {
            return onRejected(err);
        }
    };
const $243fbdb628f4cca8$var$defaultTryCatchDecorator = (fn)=>$243fbdb628f4cca8$var$tryCatchDecorator(fn, (err)=>{
        console.error(err);
    });
const $243fbdb628f4cca8$export$84c0a90d80080172 = $243fbdb628f4cca8$var$defaultTryCatchDecorator;



const $50b13159f6282d6f$var$readConfig = ()=>{
    let config = null;
    const resolve = (0, $243fbdb628f4cca8$export$84c0a90d80080172)(()=>{
        const pkg = (0, $gHeVW$findUpSync)((0, $234747a9630b4642$export$ef0d7260c38fe763), {
            cwd: $gHeVW$cwd()
        });
        config = JSON.parse((0, $gHeVW$fs).readFileSync(pkg, "utf8"));
        return config;
    });
    return ()=>config ?? resolve();
};
const $50b13159f6282d6f$var$getConfig = $50b13159f6282d6f$var$readConfig();
const $50b13159f6282d6f$export$63ef76b19cf4a753 = (name)=>{
    const config = $50b13159f6282d6f$var$getConfig();
    if (!config) throw new Error(`You need to create file cbconfig.json`);
    if (config[name] == null) throw new Error(`You need to add ${name} property`);
    return config[name];
};
const $50b13159f6282d6f$export$7a9cc7d7795b1ea = ()=>{
    const result = $50b13159f6282d6f$export$63ef76b19cf4a753("task_types");
    return Array.isArray(result) ? result : [
        result
    ];
};
const $50b13159f6282d6f$export$9d2478af5a6e5e7e = ()=>{
    const result = $50b13159f6282d6f$export$63ef76b19cf4a753("project_names");
    return Array.isArray(result) ? result : [
        result
    ];
};
const $50b13159f6282d6f$export$c6ccc76cc5ef7024 = ()=>$50b13159f6282d6f$export$63ef76b19cf4a753("task_name_delimiter") ?? (0, $234747a9630b4642$export$8ae42b4c1a3edfaa);
const $50b13159f6282d6f$export$75645165895caede = ()=>$50b13159f6282d6f$export$63ef76b19cf4a753("branch_name_template") ?? (0, $234747a9630b4642$export$2ab2785046f819bb);
const $50b13159f6282d6f$export$92c6256bb826de79 = ()=>$50b13159f6282d6f$export$63ef76b19cf4a753("auto_checkout") ?? (0, $234747a9630b4642$export$f71302df76ec14b6);





const $af5d2fe3777da1fe$export$87cbdc2ba79bea53 = (0, $243fbdb628f4cca8$export$84c0a90d80080172)(async ()=>{
    const taskTypes = (0, $50b13159f6282d6f$export$7a9cc7d7795b1ea)();
    if (taskTypes.length === 1) return taskTypes[0];
    const answers = (0, $0ad0bc75b5eb16a6$export$3e2a003fb60aac51)(taskTypes);
    const question = {
        message: "Select task type",
        name: "task_type",
        type: "list",
        choices: answers
    };
    const answer = await (0, $gHeVW$inquirer).prompt([
        question
    ]);
    return answer[question.name];
});
const $af5d2fe3777da1fe$export$2cd058184eb75757 = (0, $243fbdb628f4cca8$export$84c0a90d80080172)(async ()=>{
    const questionName = "project_name";
    const projectNames = (0, $50b13159f6282d6f$export$9d2478af5a6e5e7e)();
    if (projectNames.length === 1) return projectNames[0];
    const answers = (0, $0ad0bc75b5eb16a6$export$3e2a003fb60aac51)(projectNames);
    const question = {
        message: "Select project name",
        name: questionName,
        type: "list",
        choices: answers
    };
    const answer = await (0, $gHeVW$inquirer).prompt([
        question
    ]);
    return answer[questionName];
});
const $af5d2fe3777da1fe$export$7f4f11a580da0d7a = (0, $243fbdb628f4cca8$export$84c0a90d80080172)(async ()=>{
    const question = {
        message: "Type task id",
        name: "task_id",
        type: "number"
    };
    const answer = await (0, $gHeVW$inquirer).prompt([
        question
    ]);
    return answer[question.name];
});
const $af5d2fe3777da1fe$export$f22ad6bc41436f9d = (0, $243fbdb628f4cca8$export$84c0a90d80080172)(async ()=>{
    const question = {
        message: "Type task name",
        name: "task_name",
        type: "input"
    };
    const answer = await (0, $gHeVW$inquirer).prompt([
        question
    ]);
    const delimiter = (0, $50b13159f6282d6f$export$c6ccc76cc5ef7024)();
    return answer[question.name].trim().replace(/\W/gi, delimiter);
});


const $234747a9630b4642$export$ef0d7260c38fe763 = "cbconfig.json";
const $234747a9630b4642$export$8ae42b4c1a3edfaa = "_";
const $234747a9630b4642$export$2ab2785046f819bb = "<task_type>/<project_name>-<task_id>-<task_name>";
const $234747a9630b4642$export$f71302df76ec14b6 = false;
const $234747a9630b4642$export$a3dddd4caa53abcd = {
    [(0, $81c1b644006d48ec$export$648134ce7ac007fb).task_type]: (0, $af5d2fe3777da1fe$export$87cbdc2ba79bea53),
    [(0, $81c1b644006d48ec$export$648134ce7ac007fb).project_name]: (0, $af5d2fe3777da1fe$export$2cd058184eb75757),
    [(0, $81c1b644006d48ec$export$648134ce7ac007fb).task_id]: (0, $af5d2fe3777da1fe$export$7f4f11a580da0d7a),
    [(0, $81c1b644006d48ec$export$648134ce7ac007fb).task_name]: (0, $af5d2fe3777da1fe$export$f22ad6bc41436f9d)
};




const $149c1bd638913645$var$getBranchNameByTemplate = (0, $243fbdb628f4cca8$export$84c0a90d80080172)(async ()=>{
    const branchNameTemplate = (0, $50b13159f6282d6f$export$75645165895caede)();
    const properties = branchNameTemplate.match(/<\w*>/gi) ?? [];
    let result = branchNameTemplate;
    for await (const property of properties){
        const propertyName = (0, $0ad0bc75b5eb16a6$export$16ae133f336020fd)(property);
        const propertyValue = await (0, $234747a9630b4642$export$a3dddd4caa53abcd)[propertyName]();
        const regExp = propertyValue ? new RegExp(property, "gi") : new RegExp(`${property}?\\W`, "gi");
        result = result.replace(regExp, propertyValue || "");
    }
    return result;
});
const $149c1bd638913645$var$main = async ()=>{
    const branchNameByTemplate = await $149c1bd638913645$var$getBranchNameByTemplate();
    const isAutoCheckout = (0, $50b13159f6282d6f$export$92c6256bb826de79)();
    const gitCommand = isAutoCheckout ? "git checkout -b" : "git branch";
    const fullCommand = `${gitCommand} ${branchNameByTemplate}`;
    (0, $gHeVW$exec)(fullCommand, (0, $0ad0bc75b5eb16a6$export$365c62e5f8532e08)(fullCommand));
};
$149c1bd638913645$var$main();


//# sourceMappingURL=index.js.map

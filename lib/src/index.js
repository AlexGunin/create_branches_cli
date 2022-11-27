var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
import { createResultLog, removeNonLetterCharacters } from "./utils/helpers";
import { exec } from "child_process";
import { PROPERTY_MAP } from "./constants";
import { tcd } from "./utils/tcd";
import { getBranchNameTemplate, getIsAutoCheckout } from "./utils/json_getters";
const getBranchNameByTemplate = tcd(() => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    var _d;
    const branchNameTemplate = getBranchNameTemplate();
    const properties = (_d = branchNameTemplate.match(/<\w*>/gi)) !== null && _d !== void 0 ? _d : [];
    let result = branchNameTemplate;
    try {
        for (var _e = true, properties_1 = __asyncValues(properties), properties_1_1; properties_1_1 = yield properties_1.next(), _a = properties_1_1.done, !_a;) {
            _c = properties_1_1.value;
            _e = false;
            try {
                const property = _c;
                const propertyName = removeNonLetterCharacters(property);
                const propertyValue = yield PROPERTY_MAP[propertyName]();
                const regExp = propertyValue
                    ? new RegExp(property, "gi")
                    : new RegExp(`${property}?\\W`, "gi");
                result = result.replace(regExp, propertyValue || "");
            }
            finally {
                _e = true;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_e && !_a && (_b = properties_1.return)) yield _b.call(properties_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return result;
}));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const branchNameByTemplate = yield getBranchNameByTemplate();
    const isAutoCheckout = getIsAutoCheckout();
    const gitCommand = isAutoCheckout ? "checkout -b" : "branch";
    const fullCommand = `git ${gitCommand} ${branchNameByTemplate}`;
    exec(fullCommand, createResultLog(fullCommand));
});
main();

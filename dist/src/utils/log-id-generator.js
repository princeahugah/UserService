"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let id = 0;
class LogIdGenerator {
    static getId() {
        id += 1;
        return id;
    }
}
exports.default = LogIdGenerator;
//# sourceMappingURL=log-id-generator.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (req, res) => {
    console.log('no route found for request', req.originalUrl);
    res.status(404).json({}).end();
};
//# sourceMappingURL=404.controller.js.map
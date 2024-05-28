"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_js_1 = require("./users/users.js");
const port = 8000;
const app = (0, express_1.default)();
app.use((req, res, next) => {
    console.log(new Date());
    next();
});
app.get('/hello', (req, res) => {
    throw new Error('ошибка');
});
app.use('/users', users_js_1.userRouter);
app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(500).send(err.message);
});
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map
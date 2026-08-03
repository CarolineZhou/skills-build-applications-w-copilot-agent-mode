"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = require("./app");
require("./config/database");
dotenv_1.default.config();
const port = Number(process.env.PORT || 8000);
const app = (0, app_1.createApp)();
app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
});

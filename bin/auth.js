"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.credential = void 0;
const identity_1 = require("@azure/identity");
exports.credential = new identity_1.DefaultAzureCredential();

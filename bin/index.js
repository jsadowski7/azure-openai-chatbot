"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("./auth");
const chat_1 = require("./chat");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield (0, auth_1.authenticateUser)();
        if (!user) {
            console.error('Authentication failed.');
            return;
        }
        while (true) {
            const response = yield (0, chat_1.handleChatRequest)(user);
            console.log('Bot:', response.reply);
        }
    });
}
main().catch(console.error);

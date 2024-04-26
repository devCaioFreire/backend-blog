"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTP = void 0;
const generateOTP = () => {
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    return randomNumber.toString();
};
exports.generateOTP = generateOTP;
//# sourceMappingURL=generate-otp.js.map
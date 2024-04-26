"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const router_1 = require("./routes/router");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const corsOptions = {
    origin: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: [
        'Content-Type', 'Authorization', 'Set-Cookie', 'Cookie',
        'Access-Control-Allow-Credentials', 'X-Requested-With'
    ],
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(router_1.router);
app.use((err, req, res, next) => {
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message,
        });
    }
    return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
    });
});
app.listen(8099, () => {
    console.log('Server is running on port 8099');
});
//# sourceMappingURL=app.js.map
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("../routes/");
const routes_2 = require("../routes/");
const ShopingRoutes_1 = require("../routes/ShopingRoutes");
const path_1 = __importDefault(require("path"));
exports.default = (app) => __awaiter(void 0, void 0, void 0, function* () {
    app.get('/', (req, res) => {
        res.send('hello expres');
    });
    app.use('/images', express_1.default.static(path_1.default.join(__dirname, 'images')));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use('/api/v1/admin', routes_1.AdminRoutes);
    app.use('/api/v1/Vandor', routes_2.VandorRoutes);
    app.use('/api/v1/', ShopingRoutes_1.ShopingRoutes);
    app.use('/api/v1/customer', routes_1.CustomerRoutes);
    return app;
});
//# sourceMappingURL=ExpressApp.js.map
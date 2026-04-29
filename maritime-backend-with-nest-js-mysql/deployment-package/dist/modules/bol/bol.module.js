"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BolModule = void 0;
const common_1 = require("@nestjs/common");
const bol_service_1 = require("./bol.service");
const bol_controller_1 = require("./bol.controller");
let BolModule = class BolModule {
};
exports.BolModule = BolModule;
exports.BolModule = BolModule = __decorate([
    (0, common_1.Module)({
        controllers: [bol_controller_1.BolController],
        providers: [bol_service_1.BolService],
    })
], BolModule);
//# sourceMappingURL=bol.module.js.map
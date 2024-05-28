"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.D = exports.C = void 0;
require("reflect-metadata");
function Injecteble(key) {
    return (target) => {
        Reflect.defineMetadata(key, 'a', target);
        const meta = Reflect.getMetadata(key, target);
        console.log(meta);
    };
}
function Prop(target, name) { }
function Inject(key) {
    return (target, key, index) => {
    };
}
let C = class C {
};
__decorate([
    Prop,
    __metadata("design:type", Number)
], C.prototype, "prop", void 0);
C = __decorate([
    Injecteble('C')
], C);
exports.C = C;
let D = class D {
    constructore(c) {
    }
};
__decorate([
    __param(0, Inject('C')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [C]),
    __metadata("design:returntype", void 0)
], D.prototype, "constructore", null);
D = __decorate([
    Injecteble('D')
], D);
exports.D = D;
//# sourceMappingURL=test2.js.map
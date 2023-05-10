"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EclaireEtlModule = void 0;
const common_1 = require("@nestjs/common");
const eclaire_etl_service_1 = require("./eclaire-etl.service");
let EclaireEtlModule = class EclaireEtlModule {
};
EclaireEtlModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        providers: [eclaire_etl_service_1.EclaireEtlService],
    })
], EclaireEtlModule);
exports.EclaireEtlModule = EclaireEtlModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWNsYWlyZS1ldGwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZWNsYWlyZS1ldGwubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDJDQUF3QztBQUN4QywrREFBMEQ7QUFNbkQsSUFBTSxnQkFBZ0IsR0FBdEIsTUFBTSxnQkFBZ0I7Q0FBRyxDQUFBO0FBQW5CLGdCQUFnQjtJQUo1QixJQUFBLGVBQU0sRUFBQztRQUNOLE9BQU8sRUFBRSxFQUFFO1FBQ1gsU0FBUyxFQUFFLENBQUMsdUNBQWlCLENBQUM7S0FDL0IsQ0FBQztHQUNXLGdCQUFnQixDQUFHO0FBQW5CLDRDQUFnQiJ9
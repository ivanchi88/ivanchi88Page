"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const platform_browser_1 = require("@angular/platform-browser");
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms"); // <-- NgModel lives here
const material_1 = require("@angular/material");
const app_routing_module_1 = require("./app-routing.module");
const app_component_1 = require("./app.component");
const homeComponent_component_1 = require("./Pages/home/homeComponent.component");
const animations_1 = require("@angular/platform-browser/animations");
const contactFormComponent_component_1 = require("./Components/ContactForm/contactFormComponent.component");
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.AppComponent,
            homeComponent_component_1.HomeComponent,
            contactFormComponent_component_1.ContactFormComponent
        ],
        imports: [
            platform_browser_1.BrowserModule,
            app_routing_module_1.AppRoutingModule,
            animations_1.BrowserAnimationsModule,
            forms_1.FormsModule,
            material_1.MatButtonModule,
            material_1.MatFormFieldModule
        ],
        providers: [],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
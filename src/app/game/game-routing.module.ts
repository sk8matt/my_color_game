import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CaseComponent } from "./case/case.component";
import { NewComponent } from "./new/new.component";

export const gameRouteList: Routes = [
    {
        path: '',
        component: CaseComponent
    },
    {
        path: 'new',
        component: NewComponent
    },
    {
        path: 'case',
        component: CaseComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(gameRouteList)
    ],
    exports: [
        RouterModule
    ]
})
export class GameRoutingModule {
}
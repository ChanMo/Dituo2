import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptHttpModule } from 'nativescript-angular/http';

import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";

import { MainComponent } from './main.component';

import { ArticleCategoryComponent } from './articleCategory.component';
import { ArticleListComponent } from './articleList.component';
import { ArticleDetailComponent } from './articleDetail.component';

import { CategoryListComponent } from './categoryList.component';
import { CategoryDetailComponent } from './categoryDetail.component';
import { ProductListComponent } from './productList.component';
import { ProductDetailComponent } from './productDetail.component';
import { TaskInfoComponent } from './taskInfo.component';
import { TaskListComponent } from './taskList.component';
import { TaskDetailComponent } from './taskDetail.component';

import { CommodityCategoryComponent } from './commodityCategory.component';
import { CommodityListComponent } from './commodityList.component';
import { CommodityDetailComponent } from './commodityDetail.component';

import { PointDetailComponent } from './pointDetail.component';
import { ContactComponent } from './contact.component';
import { VersionComponent } from './version.component';
import { LinkComponent } from './link.component';
import { CodeComponent } from './code.component';
import { WebComponent } from './web.component';
import { SearchComponent } from './search.component';

import { MemberComponent } from './member.component';
import { InfoComponent } from './info.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { PasswordComponent } from './password.component';

import { AdComponent } from './ad.component';

import { AuthGuard } from './shared/auth-guard.service';
import { AuthService } from './shared/auth.service';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    providers: [
      AuthService,
      AuthGuard,
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptHttpModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        MainComponent,
        ArticleCategoryComponent,
        ArticleListComponent,
        ArticleDetailComponent,
        CategoryListComponent,
        CategoryDetailComponent,
        ProductListComponent,
        ProductDetailComponent,
        TaskInfoComponent,
        TaskListComponent,
        TaskDetailComponent,
        CommodityCategoryComponent,
        CommodityListComponent,
        CommodityDetailComponent,
        LoginComponent,
        RegisterComponent,
        PasswordComponent,
        MemberComponent,
        InfoComponent,
        PointDetailComponent,
        ContactComponent,
        VersionComponent,
        LinkComponent,
        CodeComponent,
        WebComponent,
        AdComponent,
        SearchComponent,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }

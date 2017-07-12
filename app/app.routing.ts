import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { MainComponent } from './main.component';

import { ArticleListComponent } from './articleList.component';
import { ArticleDetailComponent } from './articleDetail.component';

import { CategoryListComponent } from './categoryList.component';
import { CategoryDetailComponent } from './categoryDetail.component';
import { ProductListComponent } from './productList.component';
import { ProductDetailComponent } from './productDetail.component';
import { TaskInfoComponent } from './taskInfo.component';
import { TaskListComponent } from './taskList.component';
import { TaskDetailComponent } from './taskDetail.component';

import { CommodityListComponent } from './commodityList.component';
import { CommodityCategoryComponent } from './commodityCategory.component';
import { CommodityDetailComponent } from './commodityDetail.component';

import { MemberComponent } from './member.component';
import { InfoComponent } from './info.component';
import { PointDetailComponent } from './pointDetail.component';
import { ContactComponent } from './contact.component';
import { VersionComponent } from './version.component';
import { LinkComponent } from './link.component';
import { CodeComponent } from './code.component';
import { WebComponent } from './web.component';
import { SearchComponent } from './search.component';

import { AdComponent } from './ad.component';

import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { PasswordComponent } from './password.component';

import { AuthGuard } from './shared/auth-guard.service';

const routes: Routes = [
  //{ path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: '', component: AdComponent },
  { path: 'main', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'password', component: PasswordComponent },
  { path: 'article', component: ArticleListComponent },
  { path: 'article/:id', component: ArticleDetailComponent },
  { path: 'category', component: CategoryListComponent },
  { path: 'category/:id', component: CategoryDetailComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'product/task/:id', component: TaskInfoComponent },
  { path: 'task', component: TaskListComponent, canActivate:[AuthGuard] },
  { path: 'task/:id', component: TaskDetailComponent, canActivate:[AuthGuard] },
  { path: 'commodity/category', component: CommodityCategoryComponent },
  { path: 'commodity', component: CommodityListComponent },
  { path: 'commodity/:id', component: CommodityDetailComponent },
  { path: 'member', component: MemberComponent },
  { path: 'info', component: InfoComponent, canActivate:[AuthGuard] },
  { path: 'point', component: PointDetailComponent, canActivate:[AuthGuard] },
  { path: 'contact', component: ContactComponent },
  { path: 'version', component: VersionComponent },
  { path: 'link', component: LinkComponent },
  { path: 'code', component: CodeComponent, canActivate:[AuthGuard] },
  { path: 'web/:link', component: WebComponent },
  { path: 'search', component: SearchComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }

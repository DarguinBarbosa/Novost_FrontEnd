import { NgModule } from '@angular/core';
import { NbButtonModule, NbChatModule, NbIconModule, NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { NgDynamicBreadcrumbModule } from 'ng-dynamic-breadcrumb';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ChatUIComponent } from './chat-ui/chat-ui.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    NbIconModule,
    NbButtonModule,
    NbEvaIconsModule,
    NgDynamicBreadcrumbModule,
    NbChatModule,
  ],
  declarations: [
    PagesComponent,
    BreadcrumbComponent,
    ChatUIComponent,
  ],
})
export class PagesModule {
}

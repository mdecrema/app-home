import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'lights',
        loadChildren: () => import('../lights/lights.module').then(m => m.LightsModule)
      },
      {
        path: 'cameras',
        loadChildren: () => import('../cameras/cameras.module').then(m => m.CamerasModule)
      },
      {
        path: 'tab1',
        loadChildren: () => import('../devices/devices.module').then(m => m.DevicesModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../calendar/calendar.module').then(m => m.CalendarModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tasks/tasks.module').then(m => m.TasksModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}

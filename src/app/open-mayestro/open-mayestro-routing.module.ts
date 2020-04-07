import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpenMayestroComponent } from './open-mayestro.component';
import { OverviewComponent } from './overview/overview.component';
import { ProfileComponent } from './profile/profile.component';
import { NotificationComponent } from './notification/notification.component';
import { SetDevicePasswordComponent } from './set-device-password/set-device-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';



const routes: Routes = [
  {path:'',
  component:OpenMayestroComponent,
  children:[
    
    {path:'',pathMatch:'full',redirectTo:'overview'},
    {path:'overview',component:OverviewComponent},
    {path:'notification',component:NotificationComponent},
    {path:'profile',component:ProfileComponent},
    {path:'set-device-password',component:SetDevicePasswordComponent},
    {path:'change-password',component:ChangePasswordComponent},
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpenMayestroRoutingModule { }

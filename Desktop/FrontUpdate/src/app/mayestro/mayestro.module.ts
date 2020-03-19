import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MayestroRoutingModule } from './mayestro-routing.module';
import { MayestroComponent } from './mayestro.component';
import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { PlayerComponent } from './player/player.component';
import { PlaylistComponent } from './playlist/playlist.component';


@NgModule({
  declarations: [MayestroComponent, HeaderComponent, SideBarComponent, PlayerComponent, PlaylistComponent],
  imports: [
    CommonModule,
    MayestroRoutingModule,
  ]
})
export class MayestroModule { }

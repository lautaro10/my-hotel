import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamFormComponent } from './team-form/team-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TeamRoutingModule } from './team-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TeamFormComponent, TeamListComponent],
  imports: [CommonModule, TeamRoutingModule, ReactiveFormsModule, SharedModule],
})
export class TeamModule {}

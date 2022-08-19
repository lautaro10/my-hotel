import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamFormComponent } from './team-form/team-form.component';

const teamRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: TeamListComponent,
      },
      {
        path: 'form',
        component: TeamFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(teamRoutes)],
  exports: [RouterModule],
})
export class TeamRoutingModule {}

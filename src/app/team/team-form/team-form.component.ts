import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Team } from '../models/team.model';
import { AddTeam, UpdateTeam } from '../store/actions/team.action';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
})
export class TeamFormComponent {
  dataToEdit: Team;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.dataToEdit = params as Team;
    });
  }

  addTeam() {
    const teamExample: Team = {
      id: 2,
      name: 'Boca juniors',
      createdAt: '7-20-22, 9:03 AM',
      country: 'Argentina',
      idolPlayers: ['martin Palermo'],
    };
    this.store.dispatch(new AddTeam(teamExample)).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  updateTeam() {
    const teamExample: Team = {
      id: 2,
      name: 'Boca Juniors',
      createdAt: '7-20-22, 9:03 AM',
      country: 'Argentina',
      idolPlayers: ['Diego Maradona'],
    };
    this.store.dispatch(new UpdateTeam(teamExample, 2)).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}

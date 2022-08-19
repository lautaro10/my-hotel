import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Team } from '../models/team.model';
import { DeleteTeam, GetTeams } from '../store/actions/team.action';
import { TeamState } from '../store/state/team.state';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
})
export class TeamListComponent implements OnInit {
  @Select(TeamState.getTeamList) teams: Observable<Team[]>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new GetTeams());
  }

  deleteTeam() {
    this.store.dispatch(new DeleteTeam(2));
  }
}

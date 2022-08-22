import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Team } from '../models/team.model';
import { DeleteTeam, GetTeams } from '../store/actions/team.action';
import { TeamState } from '../store/state/team.state';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss'],
})
export class TeamListComponent implements OnInit {
  @Select(TeamState.getTeamList) teams: Observable<Team[]>;
  dataSource = new MatTableDataSource<Team>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [
    'id',
    'name',
    'country',
    'createdAt',
    'idolPlayers',
    'actions',
  ];

  constructor(private store: Store, private router: Router) {}

  ngOnInit() {
    this.store.dispatch(new GetTeams());
  }

  ngAfterViewInit() {
    this.teams.subscribe((data: Team[]) => {
      this.dataSource.data = data;
    });
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  deleteTeam(team: Team) {
    this.store.dispatch(new DeleteTeam(team.id));
  }

  addTeam() {
    this.router.navigate(['/form']);
  }

  editTeam(data: Team) {
    this.router.navigate(['/form'], {
      queryParams: data,
      skipLocationChange: true,
    });
  }
}

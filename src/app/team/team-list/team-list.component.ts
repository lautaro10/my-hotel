import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    'idolPlayers',
    'createdAt',
    'actions',
  ];

  constructor(
    private store: Store,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.store.dispatch(new GetTeams());
    this.teams.subscribe((data: Team[]) => {
      this.dataSource.data = data;
    });
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  filterData(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteTeam(team: Team) {
    this.store.dispatch(new DeleteTeam(team.id)).subscribe(() => {
      this._snackBar.open('Equipo eliminado correctamente');
    });
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

import { Team } from '../../models/team.model';

export class GetTeams {
  static readonly type = '[Team] Get';
}

export class AddTeam {
  static readonly type = '[Team] Add';

  constructor(public payload: Team) {}
}

export class UpdateTeam {
  static readonly type = '[Team] Update';

  constructor(public payload: Team, public id: number) {
  }
}

export class DeleteTeam {
  static readonly type = '[Team] Delete';

  constructor(public id: number) {
  }
}

import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Team } from '../../models/team.model';
import { AddTeam, DeleteTeam, UpdateTeam } from '../actions/team.action';
import { Injectable } from '@angular/core';

export class TeamStateModel {
  teams: Team[] = [];
}

@State<TeamStateModel>({
  name: 'teams',
  defaults: {
    teams: [],
  },
})
@Injectable()
export class TeamState {
  @Selector()
  static getTeamList(state: TeamStateModel) {
    return state.teams;
  }

  @Action(AddTeam)
  addTeam(
    { getState, patchState }: StateContext<TeamStateModel>,
    { payload }: AddTeam
  ) {
    const state = getState();
    patchState({
      teams: [...state.teams, payload],
    });
  }

  @Action(UpdateTeam)
  updateTeam(
    { getState, setState }: StateContext<TeamStateModel>,
    { payload, id }: UpdateTeam
  ) {
    const state = getState();
    const teamList = [...state.teams];
    const teamIndex = teamList.findIndex((item) => item.id === id);
    teamList[teamIndex] = payload;
    setState({
      ...state,
      teams: teamList,
    });
  }

  @Action(DeleteTeam)
  deleteTeam(
    { getState, setState }: StateContext<TeamStateModel>,
    { id }: DeleteTeam
  ) {
    const state = getState();
    const filteredArray = state.teams.filter((item) => item.id !== id);
    setState({
      ...state,
      teams: filteredArray,
    });
  }
}

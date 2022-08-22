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
    const teamList = [...state.teams];
    const dataToAdd: Team = {
      id: teamList.length + 1,
      createdAt: new Date(),
      name: payload.name,
      country: payload.country,
      idolPlayers: payload.idolPlayers,
    };
    patchState({
      teams: [...state.teams, dataToAdd],
    });
  }

  @Action(UpdateTeam)
  updateTeam(
    { getState, setState }: StateContext<TeamStateModel>,
    { payload, id }: UpdateTeam
  ) {
    const state = getState();
    const teamList = [...state.teams];
    const teamIndex = teamList.findIndex((item) => item.id === Number(id));
    const dataToEdit: Team = {
      id: teamList[teamIndex].id,
      createdAt: teamList[teamIndex].createdAt,
      name: payload.name,
      country: payload.country,
      idolPlayers: payload.idolPlayers,
    };
    teamList[teamIndex] = dataToEdit;
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

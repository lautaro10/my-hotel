import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Team } from '../models/team.model';
import { AddTeam, UpdateTeam } from '../store/actions/team.action';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { isEmptyObject } from 'src/app/utils/empty-object';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss'],
})
export class TeamFormComponent {
  dataToEdit: Team;
  idolsArray: string[] = [];
  teamForm: FormGroup;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.dataToEdit = params as Team;
      this.idolsArray = this.dataToEdit.idolPlayers
        ? this.dataToEdit.idolPlayers
        : [];
    });
    this.buildForm();
  }

  addTeam() {
    this.teamForm.valid &&
      this.store.dispatch(new AddTeam(this.teamForm.value)).subscribe(() => {
        this._snackBar.open('Equipo agregado correctamente');
        this.router.navigate(['/']);
      });
  }

  updateTeam() {
    this.teamForm.valid &&
      this.store
        .dispatch(new UpdateTeam(this.teamForm.value, this.dataToEdit.id))
        .subscribe(() => {
          this._snackBar.open('Equipo editado correctamente');
          this.router.navigate(['/']);
        });
  }

  removeIdol(subject: any) {
    const index = this.idolsArray.indexOf(subject);
    if (index >= 0) {
      this.idolsArray.splice(index, 1);
    }
  }

  addIdol(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;
    const index = this.idolsArray.indexOf(value);
    if (index === -1 && (value || '').trim() && this.idolsArray.length < 5) {
      this.idolsArray.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
  }

  cancelEvent() {
    this.router.navigate(['/']);
  }

  isEdition(): boolean {
    return !isEmptyObject(this.dataToEdit);
  }

  private buildForm() {
    this.teamForm = this.fb.group({
      name: [this.dataToEdit?.name, [Validators.required]],
      country: [this.dataToEdit?.country, [Validators.required]],
      idolPlayers: [this.idolsArray],
    });
  }
}

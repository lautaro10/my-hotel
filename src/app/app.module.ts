import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { TeamState } from './team/store/state/team.state';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getSpanishPaginatorIntl } from './utils/custom-paginator.intl';

import {
  MatSnackBarConfig,
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';

const matSnackbarDefaultConfig: MatSnackBarConfig = {
  verticalPosition: 'top',
  horizontalPosition: 'right',
  duration: 4000,
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot([TeamState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    BrowserAnimationsModule,
    MatSnackBarModule,
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: matSnackbarDefaultConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

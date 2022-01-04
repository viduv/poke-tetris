import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from '../environments/environment';
import { MainMenuComponent } from './main-menu/main-menu.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogCreateGameComponent } from './dialog-create-game/dialog-create-game.component';
import { DialogJoinGameComponent } from './dialog-join-game/dialog-join-game.component';
import {MatSelectModule} from '@angular/material/select';
import {preGameReducer} from "./stores/pre-game-store/pre-game.reducer";

//const config: SocketIoConfig = { url: 'http://10.12.10.3:4444', options: {} };
const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    DialogCreateGameComponent,
    DialogJoinGameComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ preGame: preGameReducer }, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    SocketIoModule.forRoot(config),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

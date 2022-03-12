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
import {MatRadioModule} from '@angular/material/radio';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { DialogCreateGameComponent } from './dialog-create-game/dialog-create-game.component';
import { DialogJoinGameComponent } from './dialog-join-game/dialog-join-game.component';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';

import {preGameReducer} from "./stores/pre-game-store/pre-game.reducer";
import { GameComponent } from './game/game.component';
import { GameReducer } from './stores/game-store/game.reducer';
import { GameFieldComponent } from './game/game-field/game-field.component';
import { BoardComponent } from './game/game-field/board/board.component';
import { TileComponent } from './game/game-field/tile/tile.component';

const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    DialogCreateGameComponent,
    DialogJoinGameComponent,
    GameComponent,
    GameFieldComponent,
    BoardComponent,
    TileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatRadioModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ preGame: preGameReducer, Game: GameReducer  }, {}),
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

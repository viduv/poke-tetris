// This file is required by karma.conf.js and loads recursively all the .spec and framework files
import 'zone.js/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {Socket, SocketIoModule} from "ngx-socket-io";
import { AppComponent } from './app/app.component';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import {MatDialogModule,  MatDialogRef} from '@angular/material/dialog';
import { preGameReducer } from './app/stores/pre-game-store/pre-game.reducer';
import { StoreModule } from '@ngrx/store';
import { GameReducer } from './app/stores/game-store/game.reducer';
import { MatSnackBarModule } from '@angular/material/snack-bar';


declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp): {
    <T>(id: string): T;
    keys(): string[];
  };
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);

beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      StoreModule.forRoot({ preGame: preGameReducer, Game : GameReducer}, {}),
      SocketIoModule.forRoot({ url: 'http://localhost:4444', options: {} }),
      MatDialogModule,
      MatSnackBarModule,
    ],
    declarations: [
      AppComponent
    ],
    providers: [
      {
        provide: MatDialogRef,
        useValue: {}
      }
    ]
  }).compileComponents();
});
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);

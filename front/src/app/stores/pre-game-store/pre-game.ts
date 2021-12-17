export class PreGame {
  private _gameId: string;
  private _gameName: string;
  private _ownerName: string;


  constructor(gameId: string, gameName: string, ownerName: string) {
    this._gameId = gameId;
    this._gameName = gameName;
    this._ownerName = ownerName;
  }

  get gameId(): string {
    return this._gameId;
  }

  set gameId(value: string) {
    this._gameId = value;
  }

  get gameName(): string {
    return this._gameName;
  }

  set gameName(value: string) {
    this._gameName = value;
  }

  get ownerName(): string {
    return this._ownerName;
  }

  set ownerName(value: string) {
    this._ownerName = value;
  }

  public getDisplayName(): string {
    return this._gameName + " | " + this._ownerName;
  }
}

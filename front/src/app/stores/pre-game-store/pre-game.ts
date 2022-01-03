export class PreGame {
  private _gameId: string;
  private _gameName: string;
  private _ownerName: string;
  private _isPublic: boolean;


  constructor(gameId: string, gameName: string, ownerName: string, isPublic: boolean) {
    this._gameId = gameId;
    this._gameName = gameName;
    this._ownerName = ownerName;
    this._isPublic = isPublic;
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

  get isPublic(): boolean {
    return this._isPublic;
  }
  
  set isPublic(value: boolean) {
    this._isPublic = value;
  }



  public getDisplayName(): string {
    return this._gameName + " | " + this._ownerName;
  }
}

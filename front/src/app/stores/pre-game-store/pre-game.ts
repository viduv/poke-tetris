export class PreGame {
  private _gameId: string;
  private _gameName: string;
  private _ownerName: string;
  private _isPublic: string;
  private _gameState: string;


  constructor(gameId: string, gameName: string, ownerName: string, isPublic: string, gameState: string) {
    this._gameId = gameId;
    this._gameName = gameName;
    this._ownerName = ownerName;
    this._isPublic = isPublic;
    this._gameState = gameState;
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

  get isPublic(): string {
    return this._isPublic;
  }
  
  set isPublic(value: string) {
    this._isPublic = value;
  }

  get gameState(): string {
    return this._gameState
  }

  set gameState(value: string){
    this._gameState = value;
  }

  public getDisplayName(): string {
    return this._gameName + " | " + this._ownerName;
  }
}

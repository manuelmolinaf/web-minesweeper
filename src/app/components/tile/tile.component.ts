import { Component, OnInit, Input } from '@angular/core';
import { Tile } from '../../models/tile';
import { GameState } from '../../models/game-state'

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {

  @Input() tile: Tile;
  @Input() gameState: GameState;

  constructor() { }

  ngOnInit() {
  }

  public showFlag(): boolean {
    return (this.tile.isFlagged() && (this.gameState === 0 || this.gameState === 2 ) || this.tile.hasBomb() && this.tile.isFlagged() && this.gameState === 1)
  }
}

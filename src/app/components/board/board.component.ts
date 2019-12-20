import { Component, OnInit } from '@angular/core';
import { Tile } from '../../models/tile'
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  //TODO: Fix only working with same x and y values
  public xTiles: number = 10;
  public yTiles: number = 10;
  public nBombs: number = 35;
  public board:Array<Array<Tile>> = new Array<Array<Tile>>();
  

  constructor() { }

  ngOnInit() {
    this.setNewBoard();
  }

  //initialize board
  public setNewBoard(): void {

    for(let x = 0; x < this.xTiles; x++) {

      this.board.push(new Array<Tile>());

      for(let y = 0; y < this.yTiles; y++) {

        this.board[x].push(new Tile());

      }

    }

    //plant bombs
    for(let i = 0; i< this.nBombs; i++){

      var x = this.getRandomInt(0,this.xTiles);
      var y = this.getRandomInt(0,this.yTiles);

      this.board[x][y].plantBomb();
    }   

    //number tiles
    for(let y = 0; y < this.yTiles; y++) {

      for(let x = 0; x < this.xTiles; x++) {

        if(!this.board[x][y].hasBomb()){
          this.board[x][y].adjacentBombs = this.getAdjacentBombs(x,y);
        }
        
      }
    }

  }

  public getAdjacentBombs(x: number, y: number): number {

    var bombs = 0;
    
    
    if(!this.isOutOfIndex(x-1,y-1) && this.board[x-1][y-1].hasBomb()) {
      bombs++;
    }

    if(!this.isOutOfIndex(x,y-1) && this.board[x][y-1].hasBomb()) {
      bombs++;
    }

    if(!this.isOutOfIndex(x+1,y-1) && this.board[x+1][y-1].hasBomb()) {
      bombs++;
    }

    if(!this.isOutOfIndex(x-1,y) && this.board[x-1][y].hasBomb()) {
      bombs++;
    }

    if(!this.isOutOfIndex(x,y) && this.board[x][y].hasBomb()) {
      bombs++;
    }

    if(!this.isOutOfIndex(x+1,y) && this.board[x+1][y].hasBomb()) {
      bombs++;
    }

    if(!this.isOutOfIndex(x-1,y+1) && this.board[x-1][y+1].hasBomb()) {
      bombs++;
    }

    if(!this.isOutOfIndex(x,y+1) && this.board[x][y+1].hasBomb()) {
      bombs++;
    }

    if(!this.isOutOfIndex(x+1,y+1) && this.board[x+1][y+1].hasBomb()) {
      bombs++;
    }

    
    return bombs;
  }

  public isOutOfIndex(x: number, y: number): boolean {
    return(x < 0 || x > this.xTiles - 1|| y < 0 || y > this.yTiles - 1)
  }

  public getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  public action(e, x: number, y: number):void {
   
    if(e.type === 'click' ) {

      if(this.board[x][y].isHidden() && e.shiftKey === true){
        this.board[x][y].toggleFlag();
      }

      if(this.board[x][y].isHidden() && !this.board[x][y].isFlagged() && e.shiftKey === false){
        this.board[x][y].reveal();
      }
    }
    
    
  }

}

import { Component, OnInit } from '@angular/core';
import { Tile } from '../../models/tile';
import { GameState } from '../../models/game-state';
@Component({
	selector: 'app-board',
	templateUrl: './board.component.html',
	styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  
	public boardWidth: number = 100;
	public boardHeight: number = 100;


	public xTiles: number = 21;
	public yTiles: number = 12;
	public nBombs: number = 10;
	public board:Array<Array<Tile>> = new Array<Array<Tile>>();
	public gameState: GameState = GameState.InProgress;

	constructor() { }

	ngOnInit() {

		this.setNewBoard();	
	}

	public setNewBoard(): void {

		for(let x = 0; x < this.xTiles; x++) {

			this.board.push(new Array<Tile>());

			for(let y = 0; y < this.yTiles; y++) {

				this.board[x].push(new Tile());

			}

		}

		this.plantBombs();
		
		this.numberTiles();

	}

	public plantBombs(): void {

		for(let i = 0; i< this.nBombs; i++){

			var x = this.getRandomInt(0,this.xTiles);
			var y = this.getRandomInt(0,this.yTiles);

			while(this.board[x][y].hasBomb()) {

				x = this.getRandomInt(0,this.xTiles);
				y = this.getRandomInt(0,this.yTiles);
			}

			this.board[x][y].plantBomb();
		}

	}

	public  numberTiles(): void {

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
		
		for(let i = x-1; i <= x + 1; i++) {
			for(let j = y-1; j <= y+ 1; j++) {
				if(!this.isOutOfIndex(i,j) && this.board[i][j].hasBomb()) {
					bombs++;
				}
			}	
		}

		return bombs;
	}

	public isOutOfIndex(x: number, y: number): boolean {

		return(x < 0 || x > this.xTiles - 1|| y < 0 || y > this.yTiles - 1)
	}

	public getRandomInt(min: number, max: number): number {

		min = Math.ceil(min);
		max = Math.floor(max);

		return Math.floor(Math.random() * (max - min)) + min;
	}

	public action(event:any, x: number, y: number):void {
	
		if(event.type === 'click' ) {

			if(this.board[x][y].isHidden() && event.shiftKey === true){
				this.board[x][y].toggleFlag();
			}

			if(this.board[x][y].isHidden() && !this.board[x][y].isFlagged() && event.shiftKey === false){
				
				this.revealTiles(x,y);
			}

			if(this.gameState !== GameState.GameOver && this.gameIsCleared()) {
				this.gameState = GameState.Cleared
				console.log('cleared!');
			}
		}		
	}

	public revealTiles(x:number, y:number): void {

		this.board[x][y].reveal();
		
		if(!this.board[x][y].hasBomb() && !this.board[x][y].isFlagged())
		{
			if(!this.board[x][y].hasNumber()) {

				for(let i = x-1; i <= x + 1; i++) {

					for(let j = y-1; j <= y+ 1; j++) {
						
						if(!this.isOutOfIndex(i,j)) {
		
							if(this.board[i][j].isEmpty() && this.board[i][j].isHidden()) {

								this.revealTiles(i,j)
							}
							else if(this.board[i][j].hasNumber()) {

								this.board[i][j].reveal();
							}
							
						}
					}	
				}
			}
		}
		else {

			this.board[x][y].explode();
			this.gameOver();

		}
		

	}

	public gameOver(): void {

		this.gameState = GameState.GameOver;
		this.revealBombs();

	}

	public revealBombs(): void {

		for(let y = 0; y < this.yTiles; y++) {

			for(let x = 0; x < this.xTiles; x++) {

				if(this.board[x][y].hasBomb() && !this.board[x][y].isFlagged()){
					this.board[x][y].reveal();
				}
				
			}
		}
	}

	public gameIsCleared(): boolean {

		var cleared = true;

		for(let y = 0; y < this.yTiles; y++) {

			for(let x = 0; x < this.xTiles; x++) {

				if(this.board[x][y].hasBomb() && !this.board[x][y].isFlagged() || !this.board[x][y].hasBomb() && this.board[x][y].isHidden() ){
					cleared = false;
				}
				
			}
		}
		return cleared;
	}
}


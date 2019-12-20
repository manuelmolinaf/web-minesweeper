export class Tile {

    public bomb: boolean;
    public adjacentBombs: number;
    public hidden: boolean;

    constructor(){
        this.bomb = false;
        this.adjacentBombs = 0;
        this.hidden = true;
    }

    public plantBomb(): void {
        this.bomb = true;
    }

    public hasBomb(): boolean {
        return this.bomb;
    }

    public isEmpty(): boolean{
        
        return (!this.bomb && this.adjacentBombs === 0)
    }

    public isHidden(){
        return this.hidden;
    }

    public reveal(){
        this.hidden = false; 
    }


}
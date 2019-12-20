export class Tile {

    public bomb: boolean;
    public hidden: boolean;
    public flagged: boolean;
    public adjacentBombs: number;

    constructor(){
        this.bomb = false;
        this.adjacentBombs = 0;
        this.hidden = true;
        this.flagged = false;
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

    public isFlagged(){       
        return this.flagged;
    }

    public toggleFlag(){
        this.flagged = !this.flagged; 
    }

}
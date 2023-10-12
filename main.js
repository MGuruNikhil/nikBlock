var SHA256 = require("crypto-js/sha256");

class Block {
    constructor(index,data,previousHash='') {
        this.index = index;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.generateHash();
    }

    generateHash() {
        return SHA256(this.index + this.previousHash + JSON.stringify(this.data)).toString();
    }
}

class BlockChain {
    constructor() {
        this.chain = [this.createGenesis()];
    }

    createGenesis() {
        return new Block(0,"Genesis Block","0");
    }

    getLastBlock() {
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLastBlock().hash;
        newBlock.hash = newBlock.generateHash();
        this.chain.push(newBlock);
    }
}

let nikBlock = new BlockChain();
nikBlock.addBlock(new Block(1,"Nikhil"));
nikBlock.addBlock(new Block(2,"Nischal"));

console.log(JSON.stringify(BlockChain,null,4));
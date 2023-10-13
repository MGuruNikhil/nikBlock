import sha256 from 'crypto-js/sha256.js';

class Block {
    constructor(index,data,previousHash='') {
        this.index = index;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.generateHash();
    }

    generateHash() {
        return sha256(this.index + this.previousHash + JSON.stringify(this.data)).toString();
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

    isValid() {
        for(let i=1;i<this.chain.length;i++) {
            let currentBlock = this.chain[i];
            let prevBlock = this.chain[i-1];

            if(currentBlock.previousHash != prevBlock.hash) {
                return false;
            }

            if(currentBlock.hash != currentBlock.generateHash()) {
                return false;
            }
        }
        return true;
    }
}

let nikBlock = new BlockChain();
nikBlock.addBlock(new Block(1,"Nikhil"));
nikBlock.addBlock(new Block(2,"Nischal"));

console.log(JSON.stringify(nikBlock,null,4));
console.log(nikBlock.isValid());
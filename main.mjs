import sha256 from 'crypto-js/sha256.js';

class Transaction {
    constructor(fromAccount,toAccount,amount) {
        this.fromAccount = fromAccount;
        this.toAccount = toAccount;
        this.amount = amount;
    }
}

class Block {
    constructor(transactions,previousHash='') {
        this.transactions = transactions;
        this.nonce = 0;
        this.previousHash = previousHash;
        this.hash = this.generateHash();
    }

    generateHash() {
        return sha256(this.index + this.previousHash + this.nonce + JSON.stringify(this.transactions)).toString();
    }

    mineBlock(level) {
        while(this.hash.substring(0,level) !== Array(level+1).join('0')) {
            this.nonce++;
            this.hash = this.generateHash();
        }
        console.log("Block is mined : " + this.hash);
    }
}

class BlockChain {
    constructor() {
        this.chain = [this.createGenesis()];
        this.level = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesis() {
        return new Block("Genesis Block","0");
    }

    getLastBlock() {
        return this.chain[this.chain.length-1];
    }

    // addBlock(newBlock) {
    //     newBlock.previousHash = this.getLastBlock().hash;
    //     newBlock.mineBlock(this.level);
    //     this.chain.push(newBlock);
    // }

    mPT(miningRewardAccount) {
        let block = new Block(this.pendingTransactions,this.getLastBlock().hash);
        block.mineBlock(this.level);

        console.log("Block successfully mined");
        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(null, miningRewardAccount, this.miningReward)
        ];
    }

    addTransaction(Transaction) {
        this.pendingTransactions.push(Transaction);
    }

    balanceOfAccount(account) {
        let balance = 0;

        for(const block of this.chain) {
            for(const transaction of block.transactions) {
                if(transaction.fromAccount === account) {
                    balance -= transaction.amount;
                }
                if(transaction.toAccount === account) {
                    balance += transaction.amount;
                }
            }
        }

        return balance;
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
nikBlock.addTransaction(new Transaction("Nikhil","Nischal",100));
nikBlock.addTransaction(new Transaction("Nischal","Nikhil",50));

console.log("\nMining...");
nikBlock.mPT("pp");

console.log("\nBalance of pp : " + nikBlock.balanceOfAccount("pp"));

console.log("\nMining...");
nikBlock.mPT("pp");

console.log("\nBalance of pp : " + nikBlock.balanceOfAccount("pp"));
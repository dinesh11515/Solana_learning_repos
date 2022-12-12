import { FC } from "react";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import * as Web3 from '@solana/web3.js'


export const SendSOL: FC = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const onClick = async () => {
        if (!connection || !publicKey) {
            alert("Please connect your wallet first lol")
            return
        }
        const receiver = (document.getElementById("receiver") as HTMLInputElement).value;
        const amount = (document.getElementById("amount") as HTMLInputElement).value;
        const transaction = new Web3.Transaction()
        const sendSolInstruction = Web3.SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: new Web3.PublicKey(receiver),
            lamports: Web3.LAMPORTS_PER_SOL * parseInt(amount)
        })
    
        transaction.add(sendSolInstruction);
        const sig = await sendTransaction(transaction,connection)
        console.log(`You can view your transaction on the Solana Explorer at:\nhttps://explorer.solana.com/tx/${sig}?cluster=devnet`);
    }


    return (
        <div>
            <input placeholder="Enter amount " id="amount"></input>
            <input placeholder="Enter address " id="receiver"></input>
            <button onClick={onClick}>Send SOL</button>
        </div>
    )
}
import { FC, useEffect } from 'react'
import { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import * as Web3 from '@solana/web3.js'


export const Balance: FC = () => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();

    const [balance, setBalance] = useState<Number>(0)

    useEffect (() => {
        if (!connection || !publicKey) {
            return
        }
        connection.getBalance(publicKey).then(balance => {
            setBalance(balance/Web3.LAMPORTS_PER_SOL)
        })
    }, [connection, publicKey])

    return (
        <div>
            <span>Balance : {balance}</span>
        </div>
    )
}
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState,useEffect } from 'react'


export default function Home() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [gifList, setGifList] = useState([]);
  const TEST_GIFS = [
    'https://i.giphy.com/media/eIG0HfouRQJQr1wBzz/giphy.webp',
    'https://media3.giphy.com/media/L71a8LW2UrKwPaWNYM/giphy.gif?cid=ecf05e47rr9qizx2msjucl1xyvuu47d7kf25tqt2lvo024uo&rid=giphy.gif&ct=g',
    'https://media4.giphy.com/media/AeFmQjHMtEySooOc8K/giphy.gif?cid=ecf05e47qdzhdma2y3ugn32lkgi972z9mpfzocjj6z1ro4ec&rid=giphy.gif&ct=g',
    'https://i.giphy.com/media/PAqjdPkJLDsmBRSYUp/giphy.webp',
  ]
  const connectWallet = async () => {
    const { solana } = window;
    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  const renderNotConnectedContainer = () => (
    walletAddress==null ? 
    <button
      className='text-white bg-blue-600 rounded-md p-3'
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
    : 
    <div className='flex flex-col items-center gap-4'>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          sendGif();
        }}
      >
        <input
          type="text"
          placeholder="Enter gif link!"
          value={inputValue}
          onChange={onInputChange}
          className="h-10 rounded-sm"
        />
        <button type="submit" className="ml-5 p-2 text-white bg-blue-600 rounded-md">
          Submit
        </button>
    </form>
    <div className="grid gap-6 grid-cols-4">
      {TEST_GIFS.map((gif) => (
        <div  key={gif}>
          <img className="rounded-xl" src={gif} alt={gif} />
        </div>
      ))}
    </div>
    </div>
  );
  const onInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };
  useEffect(() => {
    if (walletAddress) {
      console.log('Fetching GIF list...');
      
      // Call Solana program here.
  
      // Set state
      setGifList(TEST_GIFS);
    }
  }, [walletAddress]);

  return (
    <div className="bg-blue-100 h-screen p-10">
      <Head>
        <title>GIF Portal on Solana</title>
        <meta name="description" content="Developed by dinesh aitham" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='flex flex-col gap-4 items-center justify-center'>
        <div className='text-3xl	'>
          🖼 GIF Portal
        </div>
        <div className='text-xl'>
          View your GIF collection in the metaverse ✨
        </div>
        {renderNotConnectedContainer()}
      </div>
    </div>
  )
}

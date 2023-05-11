"use client"

import axios from 'axios';
import { useEffect, useState } from 'react';
import Chessboard from './components/ChessBoard';

export default function Home() {

  const [lastRoutes, setLastRoutes] = useState<any>([])

  const calculateRoute = async () =>{
    const {data} = await axios.post("/api/routing");
    console.log({data})
  }

  const getRoutes = async() =>{
    const {data} = await axios.get("/api/routing");
    console.log({data});
    setLastRoutes(data?.routes ??[]);
  }

  useEffect(()=>{
    getRoutes();
  },[])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          The Drone routing tool TEST
          <Chessboard/>
          
          <code className="font-mono font-bold">Start your route now</code>
        </div>
        <div className="flex flex-col items-center justify-center h-screen">
      
      <h1 className="text-3xl font-bold mb-6">Drone Delivery Route</h1>
      <div className="flex flex-col items-center justify-center space-y-4">
        <label htmlFor="start-input" className="text-xl">
          Start Input:
        </label>
        <input
          type="text"
          id="start-input"
          name="start-input"
          className="rounded-lg border-gray-400 text-black border-2 py-2 px-4 w-96 focus:outline-none focus:border-blue-400"
        />
        <label htmlFor="pickup-input" className="text-xl">
          Object Pickup Input:
        </label>
        <input
          type="text"
          id="pickup-input"
          name="pickup-input"
          className="rounded-lg border-gray-400 text-black border-2 py-2 px-4 w-96 focus:outline-none focus:border-blue-400"
        />
        <label htmlFor="delivery-input" className="text-xl">
          Delivery Object Input:
        </label>
        <input
          type="text"
          id="delivery-input"
          name="delivery-input"
          className="rounded-lg border-gray-400 text-black border-2 py-2 px-4 w-96 focus:outline-none focus:border-blue-400"
        />
        <button
          onClick={async () => {
            await calculateRoute();
            getRoutes()
          }}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Calculate Fastest Route
        </button>
        <div className="text-white">
          <h2>Last Deliveries</h2>
            {lastRoutes && lastRoutes?.map((el:any, index:number) =><div className='text-white' key={index}>Rota {el.routes}</div>)}
          </div>
      </div>
    </div>
      </div>
    </main>
  )
}

"use client";

import Chessboard from "./components/ChessBoard";
import Toast from "./components/Toast";
import useGetHome from "./hooks/useGetHome";
import Image from "next/image";
import { Route } from "./types";

export default function Home() {
  const {
    loading,
    resultRoute,
    statusError,
    getRoutes,
    toastShow,
    toastMessage,
    lastRoutes,
    setLastRoutes,
    startingPoint,
    setStartingPoint,
    pickupPoint,
    setPickupPoint,
    deliveryPoint,
    setDeliveryPoint,
    calculateRoute,
  } = useGetHome();

  return (
    <div className="grid grid-cols-12 md:grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-8">
        <Image
          width={200}
          height={200}
          className="mx-auto pt-4"
          alt="Amazonia"
          src="/logo.jpg"
        />
        <Chessboard onClick={(data) => console.log(data)} />
      </div>
      <div className="col-span-12 md:col-span-4">
        <Toast
          message={toastMessage}
          toastShow={toastShow}
          statusError={statusError}
        />
        <h1 className="text-3xl font-bold mb-6 text-center pt-4">
          Drone Delivery Route
        </h1>
        <div className="flex flex-col items-center space-y-4">
          <label htmlFor="start-input" className="text-xl">
            Start Input
          </label>
          <input
            type="text"
            id="start-input"
            name="start-input"
            value={startingPoint}
            onChange={(e: any) => setStartingPoint(e.target.value)}
            className="rounded-lg border-gray-400 text-black border-2 py-2 px-4 w-full md:w-96 focus:outline-none focus:border-blue-400"
          />
          <label htmlFor="pickup-input" className="text-xl">
            Object Pickup Input
          </label>
          <input
            type="text"
            id="pickup-input"
            name="pickup-input"
            value={pickupPoint}
            onChange={(e: any) => setPickupPoint(e.target.value)}
            className="rounded-lg border-gray-400 text-black border-2 py-2 px-4 w-full md:w-96 focus:outline-none focus:border-blue-400"
          />
          <label htmlFor="delivery-input" className="text-xl">
            Delivery Object Input
          </label>
          <input
            type="text"
            id="delivery-input"
            name="delivery-input"
            value={deliveryPoint}
            onChange={(e: any) => setDeliveryPoint(e.target.value)}
            className="rounded-lg border-gray-400 text-black border-2 py-2 px-4 w-full md:w-96 focus:outline-none focus:border-blue-400"
          />
          {!loading ? (
            <button
              onClick={async () => {
                await calculateRoute(startingPoint, pickupPoint, deliveryPoint);
                getRoutes();
              }}
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600 w-full md:w-auto"
            >
              Calculate Fastest Route
            </button>
          ) : (
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 border-t-4 border-blue-500 rounded-full animate-spin"></div>
            </div>
          )}

          <div className="text-white">
            <h2>Current Delivery</h2>
            {resultRoute.route} {" "} { resultRoute.totalTime + " "}seconds
            <h2>Last Deliveries</h2>
            {lastRoutes &&
              lastRoutes.map((el: Route, index: number) => (
                <div className="text-white" key={index}>
                  Route {el.route}{" "}
                  {el.totalTime + " "} seconds
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

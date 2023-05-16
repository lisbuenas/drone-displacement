import { useEffect, useState } from "react";
import axios from "axios";

const useGetHome = () => {
  const [lastRoutes, setLastRoutes] = useState<any>([]);
  const [startingPoint, setStartingPoint] = useState("");
  const [pickupPoint, setPickupPoint] = useState("");
  const [deliveryPoint, setDeliveryPoint] = useState("");
  const [toastShow, setToastShow] = useState(false);
  const [toastMessage, setToastMessage] = useState("")

  const calculateRoute = async (
    startingPoint: string,
    pickupPoint: string,
    deliveryPoint: string
  ) => {
    const { data } = await axios.post("/api/routing", {
      startingPoint,
      pickupPoint,
      deliveryPoint,
    });
    console.log({ data });
  };

  const getRoutes = async () => {
    const { data } = await axios.get("/api/routing");
    console.log({ data });
    setLastRoutes(data?.routes ?? []);

    setToastMessage("Resultado da rota")
    setToastShow(true);
    setTimeout(() =>{
        setToastShow(false)
    },3000)
  };

  useEffect(() => {
    getRoutes();
  }, []);

  return {
    lastRoutes,
    setLastRoutes,
    startingPoint,
    setStartingPoint,
    pickupPoint,
    setPickupPoint,
    deliveryPoint,
    setDeliveryPoint,
    calculateRoute,
    getRoutes,
    toastShow,
    toastMessage
  };
};

export default useGetHome;
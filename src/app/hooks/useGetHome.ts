import { useEffect, useState } from "react";
import axios from "axios";
import { Route } from "../types";

const useGetHome = () => {
  const [loading, setLoading] = useState(false);
  const [resultRoute, setResultRoute] = useState<Route>({} as Route);
  const [lastRoutes, setLastRoutes] = useState<any>([]);
  const [startingPoint, setStartingPoint] = useState("");
  const [pickupPoint, setPickupPoint] = useState("");
  const [deliveryPoint, setDeliveryPoint] = useState("");
  const [toastShow, setToastShow] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [statusError, setStatusError] = useState(false);

  const calculateRoute = async (
    startingPoint: string,
    pickupPoint: string,
    deliveryPoint: string
  ) => {
    try {
      setStatusError(false)
      setLoading(true);
      const { data } = await axios.post("/api/routing", {
        startingPoint,
        pickupPoint,
        deliveryPoint,
      });
      console.log({ data });
      setResultRoute(data);
      setToastMessage("Erro no calculo da rota!");
      setToastShow(true);
    } catch (error) {
      setStatusError(true)

    }finally{
      setLoading(false);
      setTimeout(() => {
        setToastShow(false);
      }, 3000);
    }
   
  
  };

  const getRoutes = async () => {
    setLoading(true);
    try{
      const { data } = await axios.get("/api/routing");
      console.log({ data });
      setLastRoutes(data?.routes ?? []);

      setToastShow(true);
   

    }catch(e){

    }finally{
      setTimeout(() => {
        setLoading(false);
      }, 2000);    }
   

    setToastMessage("Resultado da rota");
    setToastShow(true);
    setTimeout(() => {
      setToastShow(false);
    }, 3000);
  };

  useEffect(() => {
    getRoutes();
  }, []);

  return {
    loading,
    resultRoute,
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
    toastMessage,
    statusError
  };
};

export default useGetHome;

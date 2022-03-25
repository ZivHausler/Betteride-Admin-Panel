import NavBar from './src/components/NavBar'
import MapComponent from './src/components/MapComponent'
import { useState, useEffect } from 'react';
import initFirebase from '../firebase/initFirebase'
import { getVehiclesFromDatabase, createListenersOnVehicles } from '../firebase/vehicle_functions';

export default function Home() {
  const db = initFirebase();
  const [isOpen, setIsOpen] = useState(false)
  const [vehicles, setVehicles] = useState({})

  useEffect(() => {
    (async () => {
      try {
        // console.log((await getVehiclesFromDatabase(db)).length);
        await setVehicles(await getVehiclesFromDatabase(db));
      } catch (e) {
        console.error(e);
      }
    })();
  }, [])

  useEffect(() => {
    (async () => {
      for (let vehicle in vehicles) {
        let change = await createListenersOnVehicles(db, vehicle);
      }
    })();
  }, [])

  return (
    <div className='w-full h-screen'>
      <NavBar isOpen={isOpen} setIsOpen={setIsOpen} />
      <MapComponent isOpen={isOpen} />
    </div>
  )
}

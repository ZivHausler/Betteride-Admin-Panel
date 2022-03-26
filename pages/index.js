import NavBar from './src/components/NavBar'
import MapComponent from './src/components/MapComponent'
import { useState, useEffect } from 'react';
import initFirebase from '../firebase/initFirebase'
import { getVehiclesFromDatabase, createListenersOnVehicles } from '../firebase/vehicle_functions';

export default function Home() {
  const db = initFirebase();
  const [isOpen, setIsOpen] = useState(false)
  const [vehicles, setVehicles] = useState(null)

  // init vehicle listener
  useEffect(() => {
    (async () => {
        await createListenersOnVehicles(db, setVehicles);
    }) ();
  }, [])

return (
  <div className='w-full h-screen'>
    <NavBar isOpen={isOpen} setIsOpen={setIsOpen}/>
    <MapComponent isOpen={isOpen} vehicles={vehicles} db={db}/>
  </div>
)
}

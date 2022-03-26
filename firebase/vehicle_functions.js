import { ref, get, child, onValue } from "firebase/database";

export async function createListenersOnVehicles(db,setVehicles) {
    // loop throught the vehicles and create listeners to them
    await onValue(ref(db, '/vehicles/'), (snapshot) => {
        setVehicles(snapshot.val());
    })
}

export async function getVehiclesFromDatabase(db) {
    let vehicles;
    await get(child(ref(db), `vehicles/`)).then((snapshot) => {
        if (snapshot.val()) {
            vehicles = snapshot.val();
        }
        else {
            console.log('vehicle_functions; getVehiclesFromDatabase: could not find vehicles in your database.');
        }
    })
    return vehicles;
}




import { ref, get, child, onValue } from "firebase/database";

export async function createListenersOnVehicles(db, setVehicles) {
    // loop throught the vehicles and create listeners to them
    onValue(ref(db, `vehicles/`), (snapshot) => {
        // let vehicles = snapshot.val();
        // let tempVehicles = Object.values(vehicles).map(vehicle => {
        //     vehicle['stats'] = vehicle['state']; // Assign new key
        //     delete vehicle['state']; // Delete old key
        //     return vehicle;
        // });
        // let tempObject = {};
        // tempVehicles.forEach(vehicle => {
        //     tempObject[vehicle.plateNumber] = vehicle;
        // })
        // setVehicles(tempObject);
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




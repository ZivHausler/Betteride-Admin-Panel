import React, { useEffect, useState } from 'react'
import Filter from './Filter'
import GoogleMapReact from 'google-map-react';
import Image from 'next/image'

const VehicleMarker = ({ text, color }) => {

    return <div style={{ cursor: 'pointer' }} className={`relative  h-[40px] w-[40px] rounded-full -translate-x-1/2 -translate-y-full`}>
        <Image src={`/${color}_vehicle_pin.png`} layout='fill' />
    </div>;
}

const Map = ({ isOpen, vehicles }) => {
    const [isAutomated, setIsAutomated] = useState(false);
    const [counter, setCounter] = useState(0);
    const [isAlgorithmDemo, setIsAlgorithmDemo] = useState(0);
    const [polylines, setPolylines] = useState([])
    const [map, setMap] = useState(null);
    const [maps, setMaps] = useState(null);
    const [mapCenter, setMapCenter] = useState({ lat: 32.07, lng: 34.80 });

    const toggleAutomation = () => {
        setIsAutomated(!isAutomated)
        fetch(`http://${process.env.IP_ADDRESS}:3002/api/setAutomation`, { method: "PUT" })
            .then(response => setIsAutomated(!isAutomated))
            .catch(e => alert(e))
    }

    const toggleAlgorithmDemo = (state) => {
        fetch(`http://${process.env.IP_ADDRESS}:3002/api/setAlgorithmExample${state === 0 ? '?state=0' : ''}`, { method: "PUT" })
            .then(response => setIsAlgorithmDemo(state))
            .catch(e => alert(e))
    }
    const resetDatabase = (state) => {
        fetch(`http://${process.env.IP_ADDRESS}:3002/api/resetDatabase`, { method: "PUT" })
            .catch(e => alert(e))
    }

    const setRefs = (map, maps) => {
        setMap(map);
        setMaps(maps);
    }

    const stepsToPath = (steps) => {
        const path = []
        steps.forEach(step => {
            path.push(step.start_location)
            path.push(step.end_location)
        });
        return path
    }

    useEffect(() => {
        if (vehicles && map && maps) {
            Object.keys(vehicles).forEach(plateNumber => {
                // if vehicle has new route to display -> render it on map
                if (!polylines[plateNumber] && vehicles[plateNumber]?.route?.steps && vehicles[plateNumber]?.state?.type) {
                    const tempPolylines = { ...polylines }
                    const lineSymbol = {
                        path: "M 0,-1 0,1",
                        strokeOpacity: 1,
                        scale: 4,
                    };
                    tempPolylines[plateNumber] = {
                        polyline: new maps.Polyline({
                            path: stepsToPath(vehicles[plateNumber].route.steps),
                            geodesic: true,
                            strokeColor: vehicles[plateNumber].color,
                            strokeOpacity: vehicles[plateNumber].state.type === "TOWARDS_USER" ? 0 : 1.0,
                            strokeWeight: 4,
                            icons: vehicles[plateNumber].state.type === "TOWARDS_USER" ? [
                                {
                                    icon: lineSymbol,
                                    offset: "0",
                                    repeat: "20px",
                                },
                            ] : null,
                        }),
                        state: vehicles[plateNumber].state.type,
                        userID: vehicles[plateNumber].state.assigned,
                    }
                    setPolylines(tempPolylines)
                    tempPolylines[plateNumber].polyline.setMap(map)
                    console.log("new route added to vehicle platenumber " + plateNumber)
                }
                // check if there has been a reassigned to an already generated polyline
                else if (polylines[plateNumber] && polylines[plateNumber].userID != vehicles[plateNumber]?.state?.assigned && vehicles[plateNumber]?.route?.steps && vehicles[plateNumber]?.state?.type){
                    alert('reassigned', plateNumber);
                    const tempPolylines = { ...polylines }
                    tempPolylines[plateNumber].polyline.setMap(null);
                    const lineSymbol = {
                        path: "M 0,-1 0,1",
                        strokeOpacity: 1,
                        scale: 4,
                    };
                    tempPolylines[plateNumber] = {
                        polyline: new maps.Polyline({
                            path: stepsToPath(vehicles[plateNumber].route.steps),
                            geodesic: true,
                            strokeColor: vehicles[plateNumber].color,
                            strokeOpacity: vehicles[plateNumber].state.type === "TOWARDS_USER" ? 0 : 1.0,
                            strokeWeight: 4,
                            icons: vehicles[plateNumber].state.type === "TOWARDS_USER" ? [
                                {
                                    icon: lineSymbol,
                                    offset: "0",
                                    repeat: "20px",
                                },
                            ] : null,
                        }),
                        state: vehicles[plateNumber].state.type,
                        userID: vehicles[plateNumber].state.assigned,
                    }
                    setPolylines(tempPolylines)
                    tempPolylines[plateNumber].polyline.setMap(map)
                }
                // if route is displayed but the vehicle has already finished it -> remove the polyline from map
                else if (polylines[plateNumber] && vehicles[plateNumber].state?.type != polylines[plateNumber].state) {
                    console.log("vehicle platenumber " + plateNumber + ", finished his route, route has been removed")
                    const tempPolylines = { ...polylines }
                    tempPolylines[plateNumber].polyline.setMap(null);
                    delete tempPolylines[plateNumber]
                    setPolylines(tempPolylines)
                }
            });
        }
    }, [vehicles])

    return (
        <div className='relative w-full h-full'>
            <GoogleMapReact
                onGoogleApiLoaded={({ map, maps }) => setRefs(map, maps)}
                bootstrapURLKeys={{ key: 'AIzaSyB9mAs9XA7wtN9RdKMKRig7wlHBfUtjt1g' }}
                defaultCenter={mapCenter}
                defaultZoom={11}
                center={mapCenter}
                options={{
                    styles: [
                        {
                            "featureType": "administrative",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "administrative.land_parcel",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "administrative.neighborhood",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "poi",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "poi",
                            "elementType": "labels.text",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "road",
                            "elementType": "labels",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "road",
                            "elementType": "labels.icon",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "road.arterial",
                            "elementType": "labels",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "road.highway",
                            "elementType": "labels",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "road.local",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "transit",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "water",
                            "elementType": "labels.text",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        }
                    ]
                }}
            >
                {vehicles && Object.values(vehicles).map((vehicle, index) => <VehicleMarker
                    key={index}
                    color={vehicle.color}
                    lat={vehicle?.currentLocation?.location.lat}
                    lng={vehicle?.currentLocation?.location.lng}
                    text={vehicle?.plateNumber}
                />)}
            </GoogleMapReact>
            <Filter setMapCenter={setMapCenter} isOpen={isOpen} vehicles={vehicles} />
            <div className={`${isOpen ? 'translate-x-0' : '-translate-x-[150%] '} rounded-xl absolute bottom-0 bg-gray-500/80 backdrop-blur-[3px] w-[325px] h-[22%] mb-1.5 ml-2  shadow-md flex flex-col items-center justify-center transition ease-in-out duration-300`}>
                {isAlgorithmDemo > 0 && isAlgorithmDemo < 3 &&
                    <div onClick={() => toggleAlgorithmDemo(isAlgorithmDemo + 1)} className={`my-2 shadow-lg hover:scale-110 transition ease-in-out duration-100 select-none cursor-pointer w-52 h-12 px-4 rounded-full bg-green-500 flex items-center justify-center`}>
                        <p className='font-black uppercase'>continue</p>
                    </div>}
                {!isAutomated &&
                    <div onClick={() => toggleAlgorithmDemo(isAlgorithmDemo ? 0 : 1)} className={`my-2 shadow-lg hover:scale-110 transition ease-in-out duration-100 select-none cursor-pointer w-52 h-12 px-4 rounded-full ${isAlgorithmDemo ? 'bg-red-500' : 'bg-cyan-600 text-gray-100'} flex items-center justify-center`}>
                        <p className='font-black uppercase'>{isAlgorithmDemo ? 'stop demo' : 'start demo'}</p>
                    </div>
                }
                {!isAlgorithmDemo &&
                    <div onClick={() => toggleAutomation()} className={`my-2  shadow-lg hover:scale-110 transition ease-in-out duration-100 select-none cursor-pointer w-52 h-12 px-4 rounded-full ${isAutomated ? 'bg-red-500' : 'bg-emerald-700 text-gray-100'} flex items-center justify-center`}>
                        <p className='font-black uppercase'>{isAutomated ? 'stop automation' : 'run automation'}</p>
                    </div>
                }
                {!isAlgorithmDemo && !isAutomated &&
                    <div onClick={() => resetDatabase()} className={`my-2  shadow-lg hover:scale-110 transition ease-in-out duration-100 select-none cursor-pointer w-52 h-12 px-4 rounded-full bg-yellow-600 text-gray-100 flex items-center justify-center`}>
                        <p className='font-black uppercase'>reset db</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default Map
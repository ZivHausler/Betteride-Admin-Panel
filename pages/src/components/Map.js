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
    const [onGoing, setOngoing] = useState(false);
    const [polylines, setPolylines] = useState([])
    const [map, setMap] = useState(null);
    const [maps, setMaps] = useState(null);
    const [mapCenter, setMapCenter] = useState({lat: 32.07,lng: 34.80});

    const toggleAutomation = () => {
        fetch(`http://${process.env.IP_ADDRESS}:3002/api/setAutomation`, { method: "PUT" })
            .then(response => setOngoing(!onGoing))
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
                        state: vehicles[plateNumber].state.type
                    }
                    setPolylines(tempPolylines)
                    tempPolylines[plateNumber].polyline.setMap(map)
                    console.log("new route added to vehicle platenumber " + plateNumber)
                }
                else if (polylines[plateNumber] && vehicles[plateNumber].state?.type != polylines[plateNumber].state) {
                    // if route is displayed but the vehicle has already finished it -> remove the polyline from map
                    console.log("vehicle platenumber " + plateNumber + ", finished his route, route has been removed")
                    const tempPolylines = { ...polylines }
                    tempPolylines[plateNumber].polyline.setMap(null);
                    delete tempPolylines[plateNumber]
                    setPolylines(tempPolylines)
                }
            });
        }
    }, [vehicles, map, maps])

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
            <div className={`${isOpen ? 'translate-x-0' : '-translate-x-[150%] '} rounded-xl absolute bottom-0 pt-3 bg-gray-500/80 backdrop-blur-[3px] w-[325px] h-[22%] mb-1.5 ml-2  shadow-md flex flex-col items-center justify-center transition ease-in-out duration-300`}>
                <div onClick={() => toggleAutomation()} className={`shadow-lg hover:scale-110 transition ease-in-out duration-100 select-none cursor-pointer h-32 w-32 rounded-full ${onGoing ? 'bg-red-500' : 'bg-green-500'} flex items-center justify-center`}>
                    <p className='font-black uppercase'>{onGoing ? 'end now' : 'start now'}</p>
                </div>
            </div>
        </div>
    )
}

export default Map
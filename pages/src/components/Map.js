import React, { useState } from 'react'
import Filter from './Filter'
import GoogleMapReact from 'google-map-react';

const VehicleMarker = ({ text, color }) => {
    return <div className={`h-6 w-6 rounded-full border-2 border-white text-center bg-black`} style={{ cursor: 'pointer' }}></div>;
}

const Map = ({ isOpen, vehicles }) => {
    const [onGoing, setOngoing] = useState(false);

    const toggleAutomation = () => {
        fetch(`http://${process.env.IP_ADDRESS}:3002/api/setAutomation`)
            .then(response => setOngoing(onGoing))
            .catch(e => alert(e))
    }

    return (
        <div className='relative w-full h-full'>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyB9mAs9XA7wtN9RdKMKRig7wlHBfUtjt1g' }}
                defaultCenter={{
                    lat: 32.07,
                    lng: 34.80
                }}
                defaultZoom={11}
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
                    color={vehicle?.color}
                    lat={vehicle?.currentLocation?.location.lat}
                    lng={vehicle?.currentLocation?.location.lng}
                    text={vehicle?.plateNumber}
                />)}
            </GoogleMapReact>
            <Filter isOpen={isOpen} vehicles={vehicles} />
            <div className='rounded-xl absolute bottom-0 pt-3 bg-gray-500/80 backdrop-blur-[3px] w-[325px] h-[22%] mb-1.5 ml-2  shadow-md flex flex-col items-center justify-center transition ease-in-out duration-300'>
                <div onClick={() => toggleAutomation()} className={`shadow-lg hover:scale-110 transition ease-in-out duration-100 select-none cursor-pointer h-32 w-32 rounded-full bg-${onGoing ? 'red' : 'green'}-500 flex items-center justify-center`}>
                    <p className='font-black uppercase'>{onGoing ? 'end now' : 'start now'}</p>
                </div>
            </div>
        </div>
    )
}

export default Map
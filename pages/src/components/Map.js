import React from 'react'
import Filter from './Filter'
import GoogleMapReact from 'google-map-react';



const VehicleMarker = ({ text, color }) => {
    return <div className={`h-6 w-6 rounded-full border-2 border-white text-center bg-black`} style={{ cursor: 'pointer'}}></div>;
}

const Map = ({ isOpen, vehicles }) => {

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
        </div>
    )
}

export default Map
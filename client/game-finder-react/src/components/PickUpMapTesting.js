import {GoogleMap, LoadScript, Marker, InfoWindow} from '@react-google-maps/api';
import { useCallback, useEffect, useRef, useState } from 'react';
import Game from './PickUp';

const PickUpMapTesting = () => {

    // const [pickups, setPickups] = useState([]);

  //   const [selected, setSelected] = useState([]);

    // const onSelect = item => {
    //     setSelected(item);
    // }

    const mapStyles = {
        height: "90vh",
        width: "100%"
    };
    const defaultCenter = {
        lat: 41.3851, lng: 2.1734
    }

  //   const locations = [
  //       {
  //           name: "Location 1",
  //           location: { 
  //             lat: 41.3954,
  //             lng: 2.162 
  //           },
  //         },
  //         {
  //           name: "Location 2",
  //           location: { 
  //             lat: 41.3917,
  //             lng: 2.1649
  //           },
  //         },
  //         {
  //           name: "Location 3",
  //           location: { 
  //             lat: 41.3773,
  //             lng: 2.1585
  //           },
  //         },
  //         {
  //           name: "Location 4",
  //           location: { 
  //             lat: 41.3797,
  //             lng: 2.1682
  //           },
  //         },
  //         {
  //           name: "Location 5",
  //           location: { 
  //             lat: 41.4055,
  //             lng: 2.1915
  //           },
  //         }
  //   ];

  //   return (
  //     <LoadScript googleMapsApiKey='AIzaSyB0CymM4J0zG7roy04odflwRmwvDz5MOfg'>
  //             <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter}>
  //                 {
  //                     locations.map(item => {
  //                         return (
  //                             <Marker draggable="true" key={item.name} position={item.location} onClick={() => onSelect(item)}/>
  //                         )
  //                     })
  //                 }
  //                 {
  //                     selected.location &&
  //                     (
  //                         <InfoWindow position={selected.location} clickable={true} onCloseClick={() => setSelected({})} >
  //                             <p>{selected.name}</p>
  //                         </InfoWindow>
  //                     )
  //                 }
  //             </GoogleMap>
  //     </LoadScript>
  // )

  const [currentPosition, setCurrentPosition] = useState([]);

  const success = position => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
    setCurrentPosition(currentPosition);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  })

  const onMarkerDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCurrentPosition({lat, lng})
  };

  return (
    <LoadScript googleMapsApiKey='AIzaSyB0CymM4J0zG7roy04odflwRmwvDz5MOfg'>
            <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={currentPosition}>
              {
                currentPosition.lat ?
                  <Marker position={currentPosition} onDragEnd={(e) => onMarkerDragEnd(e)} draggable={true} /> : null 
              }
            </GoogleMap>
    </LoadScript>
)
}

export default PickUpMapTesting;
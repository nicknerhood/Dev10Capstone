import {GoogleMap, LoadScript, Marker, InfoWindow} from '@react-google-maps/api';
import { useCallback, useEffect, useRef, useState } from 'react';
import Game from './PickUp';

const PickUpMapTesting = () => {

    const [pickups, setPickups] = useState([]);

    const [selected, setSelected] = useState([]);

    const onSelect = item => {
        setSelected(item);
    }

    const mapStyles = {
        height: "90vh",
        width: "100%"
    };
    const defaultCenter = {
        lat: 30.5057586, lng: -97.6169318
    }

    const locations = [
        {
            name: "Location 1",
            location: { 
              lat: 30.500120,
              lng: -97.624291 
            },
          },
    ];

  return (
    <LoadScript googleMapsApiKey='AIzaSyB0CymM4J0zG7roy04odflwRmwvDz5MOfg'>
            <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter}>
              {
                locations.map(item => {
                  return (
                    <Marker key={item.name} position={item.location} onClick={() => onSelect(item)}/>
                  )
                })
              }
              {
                selected.location &&
                  (
                    <InfoWindow position={selected.location} clickable={true} onCloseClick={() => setSelected({})} >
                      <p>{selected.name}</p>
                    </InfoWindow>
                  )
              }
            </GoogleMap>
    </LoadScript>
)
}

export default PickUpMapTesting;
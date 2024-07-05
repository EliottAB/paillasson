import React, { Dispatch, useCallback, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Circle } from 'react-leaflet';
import L, { LatLngTuple } from 'leaflet';
import { FaMapMarkerAlt } from "react-icons/fa";
import Loader from '../Loader';

function DraggableMarker({position, setPosition}: {position: LatLngTuple, setPosition: Dispatch<LatLngTuple>}) {

  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    }
  });

  return (
    <>
      <Marker position={position} >
        {/* <Popup>
          ok
        </Popup> */}
      </Marker>
      <Circle
        center={position}
        radius={300}
        pathOptions={{
          weight: 0,
          fillOpacity: .3,
        }}
      />
    </>
  );
}

function Map({needGeoLocation=false, position, setPosition}: {needGeoLocation: boolean, position: LatLngTuple, setPosition: Dispatch<LatLngTuple>}) {
  
  const [isPositionSet, setIsPositionSet] = useState(false);
  const [loadingAskPos, setLoadingAskPos] = useState(true);

  const giveLocation = useCallback((position: GeolocationPosition) => {
    setPosition([position.coords.latitude, position.coords.longitude]);
    setIsPositionSet(true);
    setLoadingAskPos(false);
  }, [setPosition, setIsPositionSet, setLoadingAskPos]);
  
  const dontGiveLocation = ()=> {
    setLoadingAskPos(false);
  }

  useEffect(() => {
    if(!(navigator.geolocation)) return;
    navigator.geolocation.getCurrentPosition(giveLocation, dontGiveLocation);

    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      tileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    });
  }, [giveLocation]);

  if (needGeoLocation && !isPositionSet) {
    return (
      <div className='relative flex flex-col justify-center items-center gap-5 pt-8 text-gray-200 h-full'>
        { !loadingAskPos &&
          <>
            <FaMapMarkerAlt className='text-7xl'/>
            <p className='text-gray-400 text-md text-center px-1'>{"Paillasson a besoin de la localisation"}</p>
          </>
        }
        { loadingAskPos &&
          <Loader/>
        }
      </div>
    )
  }

  return (
    <>
    <p className='text-gray-400 text-xs'>{"Déterminez d'où le voisinage sera visible"}</p>
    <p className='text-amber-500 text-xs font-semibold mb-4'>{"⚠️Évitez celui de votre domicile"}</p>
    <MapContainer center={[position[0], position[1]]} zoom={14.5}  style={{ height: '20em', width: '100%' }} attributionControl={false} className='rounded-lg overflow-hidden'>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DraggableMarker position={position} setPosition={setPosition}/>
    </MapContainer>
    </>
  );
}

export default Map
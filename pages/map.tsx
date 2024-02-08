import React, { useEffect, useState } from "react";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { MyMap } from "../components/MyMap";
import { Marker } from "../components/Marker";

const render = (status: Status) => {
  return <h1>{status}</h1>;
};
const MapComponent: React.FC = () => {
  const [clicks, setClicks] = React.useState<google.maps.LatLng>();
  const [zoom, setZoom] = React.useState(12); // initial zoom
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: 35.62743363056163,
    lng: 139.78275654246818,
  });
  const initialValue = {
    lat: 35.62743363056163,
    lng: 139.78275654246818,
  };
  const [location, setLocation] = useState<{ lat: number; lng: number }>();

  useEffect(() => {
    if (initialValue) {
      setCenter(initialValue);
    }
  }, []);

  const onClick = (e: google.maps.MapMouseEvent) => {
    // avoid directly mutating state
    setClicks(e.latLng!);
    setLocation(e.latLng!.toJSON());
  };

  const onIdle = (m: google.maps.Map) => {
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };

  const render = (status: Status) => {
    return <h1>{status}</h1>;
  };
  return (
    <div className="mb-4">
      <div className={`mb-2`}>
        <label className="text-sm font-normal text-gray-9 text-start">
          {"Mark your Location"}
        </label>
      </div>
      <div style={{ display: "flex", height: "400px" }}>
        <Wrapper
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!}
          render={render}
        >
          <MyMap
            center={center}
            onClick={onClick}
            onIdle={onIdle}
            zoom={zoom}
            style={{ flexGrow: "1", height: "100%", background: "green" }}
          >
            <Marker position={clicks ? clicks : initialValue} />
          </MyMap>
        </Wrapper>
      </div>
      {location?.lat && location?.lng && (
        <h2>
          You're marked at : {location?.lat} {location?.lng}
        </h2>
      )}
    </div>
  );
};
export default MapComponent;

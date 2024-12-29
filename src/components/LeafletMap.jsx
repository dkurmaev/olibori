import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Установка иконки по умолчанию
const defaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconAnchor: [12, 41], // Якорная точка иконки
});
L.Marker.prototype.options.icon = defaultIcon;

const LeafletMap = () => {
  const position = [50.657457, 7.963847]; 

  return (
    <div className="mt-6 overflow-hidden rounded-lg shadow-lg h-[300px] w-full">
      <MapContainer
        center={position}
        zoom={15}
        style={{ height: "300px", width: "100%" }}
        className="rounded-lg"
      >
        
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        <Marker position={position}>
          <Popup>
            Sellwigsweg 1, 56470 Bad Marienberg
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LeafletMap;

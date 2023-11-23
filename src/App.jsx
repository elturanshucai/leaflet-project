import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { Icon } from "leaflet"

function App() {
  const [map, setMap] = useState(null)
  const [position, setPosition] = useState({
    lat: null,
    lng: null
  })
  const [currentLoc, setCurrentLoc] = useState(null)

  const mapRef = useRef()

  const customIcon = new Icon({
    iconUrl: "/marker-icon.png",
    iconSize: [38, 38]
  })

  const handleClick = (e) => {
    setPosition({
      lat: e.latlng.lat,
      lng: e.latlng.lng
    })
  }

  useEffect(() => {
    if (map) {
      map.target.addEventListener("click", handleClick)

      return () => {
        map.target.removeEventListener("click", handleClick)
      }
    }
  }, [map])

  const findMe = () => {
    setCurrentLoc(currentLoc ? false : true)
    navigator.geolocation.getCurrentPosition((location) => {
      setPosition({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      })
      flyToLocation(location.coords.latitude, location.coords.longitude)
    },
      (error) => {
        console.log(error)
      })
  }

  const flyToLocation = (lat, lng) => {
    if (mapRef.current) {
      mapRef.current.flyTo([lat, lng], mapRef.current.getZoom())
    }
  }
  return (
    <>
      <MapContainer
        center={[48.86, 2.3522]}
        zoom={13}
        whenReady={(map) => setMap(map)}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={{ lat: position.lat, lng: position.lng }} icon={customIcon}>
          <Popup>Selected Location</Popup>
        </Marker>
      </MapContainer>
      <button className="myLocate" onClick={findMe}></button>
    </>
  )
}

export default App;
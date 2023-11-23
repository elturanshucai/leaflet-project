import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "Leaflet/dist/leaflet.css"

function LocationMarker({ position, setPosition }) {
  const currentLoc = useMapEvents({
    mouseover() {
      currentLoc.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      currentLoc.flyTo(e.latlng, currentLoc.getZoom())
    },
  })
  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}

function App() {
  const [map, setMap] = useState(null)
  const [position, setPosition] = useState({
    lat: null,
    lng: null
  })
  const [currentLoc, setCurrentLoc] = useState(null)

  const mapRef = useRef()

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
        scrollWheelZoom={false}
        whenReady={(map) => setMap(map)}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={{ lat: position.lat, lng: position.lng }}>
          <Popup>Selected Location</Popup>
        </Marker>
      </MapContainer>
      <button className="myLocate" onClick={findMe}></button>
    </>
  )
}

export default App;
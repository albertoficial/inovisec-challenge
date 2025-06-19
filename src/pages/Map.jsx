import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import CasePanelSection from "../components/CasePanelSection";

//Marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Inovisec locations data
const inovisecLocations = [
  {
    id: 1,
    name: "Inovisec AG",
    description: "Sede principal",
    location: "Basilea y Zug, Suiza",
    coordinates: [47.3769, 8.5417],
    images: [
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    details:
      "Inovisec AG es nuestra sede principal en Suiza, ubicada estratégicamente en Basilea y Zug. Desde aquí coordinamos nuestras operaciones globales y desarrollamos nuestras soluciones de ciberseguridad más avanzadas.",
    type: "headquarters",
    address: "Bahnhofstrasse 1, 8001 Zürich",
    phone: "+41 44 123 4567",
    hours: "Lun-Vie: 9:00 - 18:00",
    employees: "50-100",
    founded: "2015",
  },
  {
    id: 2,
    name: "Inovisec Spain S.L.",
    description: "Oficina en España",
    location: "Madrid, España",
    coordinates: [40.4168, -3.7038],
    images: [
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    details:
      "Nuestra oficina en Madrid es el centro de operaciones para el mercado español y europeo, ofreciendo servicios de ciberseguridad adaptados a las necesidades específicas de la región.",
    type: "office",
    address: "Paseo de la Castellana 200, 28046 Madrid",
    phone: "+34 91 123 4567",
    hours: "Lun-Vie: 9:00 - 18:00",
    employees: "20-50",
    founded: "2018",
  },
  {
    id: 3,
    name: "Inovisec – Mejjority Ltd.",
    description: "Oficina en Reino Unido",
    location: "Londres, Reino Unido",
    coordinates: [51.5074, -0.1278],
    images: [
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    details:
      "A través de nuestra asociación con Mejjority Ltd., expandimos nuestra presencia en el mercado británico, brindando soluciones de ciberseguridad innovadoras para empresas del Reino Unido.",
    type: "partnership",
    address: "30 St Mary Axe, London EC3A 8BF",
    phone: "+44 20 1234 5678",
    hours: "Lun-Vie: 9:00 - 17:30",
    employees: "10-20",
    founded: "2019",
  },
  {
    id: 4,
    name: "Inovisec – BSW Colombia",
    description: "Oficina en Colombia",
    location: "Bogotá, Colombia",
    coordinates: [4.711, -74.0721],
    images: [
      "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    details:
      "Nuestra presencia en Bogotá, en colaboración con BSW Colombia, nos permite atender el mercado latinoamericano con soluciones de ciberseguridad adaptadas a las necesidades regionales.",
    type: "partnership",
    address: "Calle 100 # 8A-55, Bogotá",
    phone: "+57 601 123 4567",
    hours: "Lun-Vie: 8:00 - 17:00",
    employees: "15-30",
    founded: "2020",
  },
];

const Map = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const mapRef = useRef();

  const bounds = L.latLngBounds(
    inovisecLocations.map((loc) => loc.coordinates)
  );

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.fitBounds(bounds, { padding: [40, 40], maxZoom: 5 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setCurrentImageIndex(0);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedLocation.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === selectedLocation.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="map-container">
      <div className={`map-section ${selectedLocation ? "with-details" : ""}`}>
        <MapContainer
          ref={mapRef}
          bounds={bounds}
          zoom={2}
          minZoom={2}
          maxZoom={5}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          dragging={false}
          zoomControl={false}
          className="leaflet-container"
          style={{ pointerEvents: "none" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {inovisecLocations.map((location) => (
            <Marker
              key={location.id}
              position={location.coordinates}
              eventHandlers={{
                click: () => handleLocationSelect(location),
              }}
            />
          ))}
        </MapContainer>
      </div>

      <div
        className={`case-panel ${selectedLocation ? "active" : ""} ${
          isMobile ? "mobile" : ""
        }`}
      >
        {selectedLocation ? (
          <>
            <div className="case-panel-header">
              <h2>{selectedLocation.name}</h2>
              <button
                className="close-button"
                onClick={() => setSelectedLocation(null)}
              >
                ×
              </button>
            </div>
            <div className="case-panel-content">
              <div className="image-carousel">
                <img
                  src={selectedLocation.images[currentImageIndex]}
                  alt={`${selectedLocation.name} - Image ${
                    currentImageIndex + 1
                  }`}
                  className="carousel-image"
                />
                <button
                  className="carousel-arrow prev"
                  onClick={handlePrevImage}
                >
                  ‹
                </button>
                <button
                  className="carousel-arrow next"
                  onClick={handleNextImage}
                >
                  ›
                </button>
              </div>

              <CasePanelSection
                title="Ubicación"
                subtitle={selectedLocation.location}
                description={selectedLocation.address}
              />

              <CasePanelSection
                title="Descripción"
                subtitle={selectedLocation.description}
              />

              <CasePanelSection
                title="Detalles"
                subtitle={selectedLocation.details}
              >
                <div className="contact-info">
                  <p className="description">
                    Teléfono: {selectedLocation.phone}
                  </p>
                  <p className="description">
                    Horario: {selectedLocation.hours}
                  </p>
                </div>
              </CasePanelSection>

              <CasePanelSection
                title="Información Adicional"
                subtitle="Datos de la empresa"
              >
                <div className="company-info">
                  <p className="description">
                    Empleados: {selectedLocation.employees}
                  </p>
                  <p className="description">
                    Fundado en: {selectedLocation.founded}
                  </p>
                </div>
              </CasePanelSection>
            </div>
          </>
        ) : (
          <div className="case-panel-empty">
            <p>Selecciona una ubicación en el mapa para ver sus detalles</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Map;

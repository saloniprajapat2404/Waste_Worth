import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Phone, Mail, Clock, Filter, ShieldCheck, Star } from 'lucide-react';
import API from '../services/api';

// Custom Map Marker Icons using SVG Data URLs
const createCustomIcon = (color) => {
  return new L.DivIcon({
    className: 'custom-leaflet-marker',
    html: `<div style="background-color: ${color}; width: 28px; height: 28px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 15px ${color}; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">♻️</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14]
  });
};

export default function NearbyCentersPage() {
  const [centers, setCenters] = useState([]);
  const [selectedType, setSelectedType] = useState('ALL');
  const [selectedMaterial, setSelectedMaterial] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCenters();
  }, [selectedType, selectedMaterial]);

  const fetchCenters = async () => {
    try {
      const res = await API.get('/centers/nearby', {
        params: { type: selectedType, material: selectedMaterial }
      });
      if (res.data.success) {
        setCenters(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load centers:', err);
    } finally {
      setLoading(false);
    }
  };

  const centerPosition = [28.5800, 77.2200]; // New Delhi Map Center

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-eco-400 uppercase tracking-widest bg-emerald-950/60 px-3.5 py-1 rounded-full border border-emerald-500/20">
          Interactive Map Discovery
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Nearby Recyclers, NGOs & Centers
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
          Find verified recycling hubs, NGO donation drop-off locations, and scrap centers near your city.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="glass-card p-4 rounded-2xl border border-emerald-500/20 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
          <Filter className="w-4 h-4" /> Filter Locations:
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs">
          
          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-dark-input border border-emerald-500/20 text-white rounded-xl px-3 py-2 outline-none"
          >
            <option value="ALL">All Center Types</option>
            <option value="RECYCLER">Recycling Hubs</option>
            <option value="NGO">NGO & Donation Centers</option>
            <option value="SCRAP_COLLECTOR">Scrap Collectors</option>
          </select>

          {/* Material Filter */}
          <select
            value={selectedMaterial}
            onChange={(e) => setSelectedMaterial(e.target.value)}
            className="bg-dark-input border border-emerald-500/20 text-white rounded-xl px-3 py-2 outline-none"
          >
            <option value="ALL">All Materials Accepted</option>
            <option value="Paper">Paper & Cardboard</option>
            <option value="Plastic">Plastics</option>
            <option value="E-Waste">E-Waste</option>
            <option value="Clothes">Clothes & Textiles</option>
            <option value="Books">Books</option>
            <option value="Metal">Scrap Metal</option>
          </select>

        </div>
      </div>

      {/* Grid: Map + List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEAFLET MAP CONTAINER */}
        <div className="lg:col-span-2 glass-card rounded-3xl border border-emerald-500/30 overflow-hidden h-[500px] relative z-10">
          <MapContainer center={centerPosition} zoom={12} scrollWheelZoom={false} className="w-full h-full">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {centers.map((center) => (
              <Marker
                key={center.id}
                position={[center.latitude || 28.5800, center.longitude || 77.2200]}
                icon={createCustomIcon(center.type === 'NGO' ? '#0d9488' : '#16a34a')}
              >
                <Popup className="custom-leaflet-popup">
                  <div className="p-2 space-y-1 text-xs">
                    <span className="font-bold text-emerald-600 block">{center.type}</span>
                    <h4 className="font-bold text-slate-900 text-sm">{center.organizationName}</h4>
                    <p className="text-slate-600">{center.address}</p>
                    <p className="text-slate-500 font-semibold mt-1">Accepts: {center.acceptedMaterials}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* CENTER CARDS LIST */}
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
          {centers.length === 0 ? (
            <div className="glass-card p-8 rounded-3xl text-center text-xs text-slate-400">
              No centers matching filters found.
            </div>
          ) : (
            centers.map((c) => (
              <div key={c.id} className="glass-card p-5 rounded-2xl border border-emerald-500/20 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-md">
                      {c.type}
                    </span>
                    <h4 className="text-base font-bold text-white mt-1">{c.organizationName}</h4>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded-full">
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> {c.rating}
                  </span>
                </div>

                <p className="text-xs text-slate-300 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-eco-400 shrink-0" /> {c.address}, {c.city}
                </p>

                <div className="text-[11px] text-slate-400 space-y-1 bg-dark-input/60 p-2.5 rounded-xl">
                  <div><strong>Materials:</strong> {c.acceptedMaterials}</div>
                  <div className="flex items-center gap-1"><Clock className="w-3 h-3 text-slate-400" /> {c.operatingHours}</div>
                </div>

                <div className="flex items-center justify-between pt-1 text-[11px]">
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified Center
                  </span>
                  <a href={`tel:${c.phone}`} className="text-eco-400 font-bold hover:underline flex items-center gap-1">
                    <Phone className="w-3 h-3" /> Call Center
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

      </div>

    </div>
  );
}

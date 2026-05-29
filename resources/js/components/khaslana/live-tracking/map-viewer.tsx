import axios from 'axios';
import L from 'leaflet';
import { MapPin } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { renderToString } from 'react-dom/server';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface RouteNode {
    latitude: number;
    longitude: number;
    total_mangkal: number;
}

interface Props {
    nodes: RouteNode[];
    onPinClick: (node: RouteNode) => void;
}

// Bikin Pin Pake Ikon Lucide
const LucidePinIcon = L.divIcon({
    className: '',
    html: renderToString(
        <MapPin size={38} color="white" fill="#EA4335" strokeWidth={2} />
    ),
    iconSize: [38, 38],
    iconAnchor: [19, 38],
});

// Komponen ajaib buat nge-zoom peta otomatis biar semua pin kelihatan
function FitBounds({ nodes }: { nodes: RouteNode[] }) {
    const map = useMap();
    useEffect(() => {
        if (nodes.length > 0) {
            const bounds = L.latLngBounds(nodes.map(n => [n.latitude, n.longitude]));
            map.fitBounds(bounds, { padding: [50, 50], maxZoom: 17 });
        }
    }, [nodes, map]);
    return null;
}

export default function MapViewer({ nodes, onPinClick }: Props) {
    // Array ini nyimpen koordinat array [lat, lng]
    const [routePath, setRoutePath] = useState<[number, number][]>([]);

    // Tembak OSRM buat bikin garis belok-belok ngikutin jalan raya
    useEffect(() => {
        if (nodes.length < 2) return;

        const fetchRoute = async () => {
            try {
                const coordinatesString = nodes.map(n => `${n.longitude},${n.latitude}`).join(';');
                const url = `https://router.project-osrm.org/route/v1/driving/${coordinatesString}?overview=full&geometries=geojson`;
                
                const res = await axios.get(url);
                if (res.data.routes && res.data.routes.length > 0) {
                    // 1. Ambil koordinat aspal dari OSRM (format Lat, Lng)
                    // FIX ESLINT: Ganti (c: any) jadi (c: [number, number])
                    const osrmCoords = res.data.routes[0].geometry.coordinates.map((c: [number, number]) => [c[1], c[0]]);
                    
                    // 2. AMBIL KOORDINAT PIN ASLI (Awal dan Akhir)
                    const firstNodeCoord: [number, number] = [nodes[0].latitude, nodes[0].longitude];
                    const lastNodeCoord: [number, number] = [nodes[nodes.length - 1].latitude, nodes[nodes.length - 1].longitude];
                    
                    // 3. JAHIT MANUAL BIAR GARIS NEMPEL KE PIN!
                    const finalPath = [
                        firstNodeCoord, 
                        ...osrmCoords, 
                        lastNodeCoord
                    ];
                    
                    setRoutePath(finalPath as [number, number][]);
                }
            } catch (error) {
                console.error("Gagal memuat rute jalan dari OSRM", error);
            }
        };

        fetchRoute();
    }, [nodes]);

    // Center default kalau gada data (Cibiru UPI area)
    const defaultCenter: [number, number] = [-6.9272, 107.7471];

    return (
        <div className="w-full h-[400px] lg:h-[450px] bg-[#242424] rounded-xl overflow-hidden border-2 border-[#99FF33]/10 z-0 relative">
            <MapContainer 
                center={nodes.length > 0 ? [nodes[0].latitude, nodes[0].longitude] : defaultCenter} 
                zoom={15} 
                scrollWheelZoom={true} 
                zoomControl={true}
                className="w-full h-full"
                attributionControl={false}
            >
                <TileLayer
                    url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                    subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                />

                {/* <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
                /> */}

                {/* <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
                /> */}
                
                <FitBounds nodes={nodes} />

                {/* Cetak Garis Ngikut Jalan (Google Maps Style) */}
                {routePath.length > 0 && (
                    <>
                        {/* GLOW (biar soft & nyala dikit) */}
                        <Polyline 
                            positions={routePath} 
                            pathOptions={{ 
                                color: '#4285F4',
                                weight: 20,
                                opacity: 0.15
                            }} 
                        />

                        {/* OUTLINE (border jalan) */}
                        <Polyline 
                            positions={routePath} 
                            pathOptions={{ 
                                color: '#2b2b2b',
                                weight: 16,
                                opacity: 0.9,
                                lineCap: 'round',
                                lineJoin: 'round'
                            }} 
                        />

                        {/* MAIN ROUTE (inti warna Google Maps) */}
                        <Polyline 
                            positions={routePath} 
                            pathOptions={{ 
                                color: '#99FF33',
                                weight: 10,
                                opacity: 1,
                                lineCap: 'round',
                                lineJoin: 'round'
                            }} 
                        />
                    </>
                )}

                {/* Cetak Pin Lucide Merah */}
                {nodes.map((node, index) => (
                    <Marker 
                        key={index} 
                        position={[node.latitude, node.longitude]} 
                        icon={LucidePinIcon}
                        eventHandlers={{
                            click: () => onPinClick(node), // Lempar data pin ke Induk saat diklik
                        }}
                    />
                ))}
            </MapContainer>
        </div>
    );
}
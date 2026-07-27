'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Phone, Clock, Locate, X } from 'lucide-react';
import { BRANCHES_DATA, SERVICE_TYPES } from '@/lib/constants';
import { haversineDistance, cn } from '@/lib/utils';

interface UserLocation {
  lat: number;
  lng: number;
}

declare global {
  interface Window {
    google: typeof google;
    initMap?: () => void;
  }
}

export default function BranchLocatorPage() {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const [locationError, setLocationError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);
  const userMarkerRef = useRef<google.maps.Marker | null>(null);

  const sortedBranches = [...BRANCHES_DATA].sort((a, b) => {
    if (!userLocation) return 0;
    const distA = haversineDistance(userLocation.lat, userLocation.lng, a.latitude, a.longitude);
    const distB = haversineDistance(userLocation.lat, userLocation.lng, b.latitude, b.longitude);
    return distA - distB;
  });

  const getDistance = (lat: number, lng: number) => {
    if (!userLocation) return null;
    return haversineDistance(userLocation.lat, userLocation.lng, lat, lng);
  };

  const initMap = useCallback(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const center = userLocation || { lat: 6.5244, lng: 3.3792 };

    const map = new google.maps.Map(mapRef.current, {
      center,
      zoom: 12,
      disableDefaultUI: true,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      styles: [
        { featureType: 'poi', stylers: [{ visibility: 'off' }] },
        { featureType: 'transit', stylers: [{ visibility: 'off' }] },
        { elementType: 'labels', stylers: [{ visibility: 'simplified' }] },
        { featureType: 'road', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
      ],
    });

    mapInstanceRef.current = map;

    BRANCHES_DATA.forEach((branch) => {
      const marker = new google.maps.Marker({
        map,
        position: { lat: branch.latitude, lng: branch.longitude },
        title: branch.name,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: '#1e3a5f',
          fillOpacity: 1,
          strokeColor: '#d4a017',
          strokeWeight: 3,
        },
        label: {
          text: 'CA',
          color: '#ffffff',
          fontSize: '9px',
          fontWeight: 'bold',
        },
      });

      marker.addListener('click', () => {
        setSelectedBranch(branch.id);
        map.panTo({ lat: branch.latitude, lng: branch.longitude });
        map.setZoom(15);
      });

      markersRef.current.push(marker);
    });

    if (userLocation) {
      userMarkerRef.current = new google.maps.Marker({
        map,
        position: userLocation,
        title: 'Your Location',
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 12,
          fillColor: '#3b82f6',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 4,
        },
      });
    }

    directionsRendererRef.current = new google.maps.DirectionsRenderer({
      map,
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: '#1e3a5f',
        strokeWeight: 5,
        strokeOpacity: 0.8,
      },
    });

    setMapLoaded(true);
  }, [userLocation]);

  const loadGoogleMaps = useCallback(() => {
    if (typeof window !== 'undefined' && window.google && window.google.maps) {
      initMap();
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    script.async = true;
    script.defer = true;

    window.initMap = initMap;
    document.head.appendChild(script);
  }, [initMap]);

  const requestLocation = () => {
    setLoading(true);
    setLocationError('');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLoading(false);
        },
        () => {
          setLocationError('Location access denied. Showing default location.');
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      setLocationError('Geolocation not supported by your browser.');
      setLoading(false);
    }
  };

  const getDirections = (branch: (typeof BRANCHES_DATA)[0]) => {
    if (!userLocation || !mapInstanceRef.current || !directionsRendererRef.current) return;

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: userLocation,
        destination: { lat: branch.latitude, lng: branch.longitude },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === 'OK' && result) {
          directionsRendererRef.current!.setDirections(result);
        }
      }
    );
  };

  const clearDirections = () => {
    if (directionsRendererRef.current) {
      directionsRendererRef.current.setDirections(null as unknown as google.maps.DirectionsResult);
    }
  };

  useEffect(() => {
    requestLocation();
  }, []);

  useEffect(() => {
    if (userLocation) {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.panTo(userLocation);
        if (userMarkerRef.current) {
          userMarkerRef.current.setPosition(userLocation);
        } else {
          userMarkerRef.current = new google.maps.Marker({
            map: mapInstanceRef.current,
            position: userLocation,
            title: 'Your Location',
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 12,
              fillColor: '#3b82f6',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 4,
            },
          });
        }
      } else {
        loadGoogleMaps();
      }
    }
  }, [userLocation, loadGoogleMaps]);

  const selectedBranchData = BRANCHES_DATA.find((b) => b.id === selectedBranch);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-primary text-white p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Find a Branch</h1>
            <p className="text-slate-300 text-sm mt-1">Locate the nearest CACGM branch and get directions</p>
          </div>
          <a href="/dashboard" className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-sm font-medium hover:bg-white/20 transition-colors">
            Dashboard
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row gap-6" style={{ height: 'calc(100vh - 180px)' }}>
          <div className="lg:w-[380px] flex-shrink-0 overflow-y-auto space-y-3">
            <div className="bg-white rounded-2xl p-4 border border-slate-200 sticky top-0 z-10">
              <button
                onClick={requestLocation}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                <Locate size={18} />
                {loading ? 'Locating...' : userLocation ? 'Update Location' : 'Use My Location'}
              </button>
              {locationError && (
                <p className="text-xs text-amber-600 mt-2 text-center">{locationError}</p>
              )}
            </div>

            <div className="space-y-3">
              {sortedBranches.map((branch, i) => {
                const distance = getDistance(branch.latitude, branch.longitude);
                const isSelected = selectedBranch === branch.id;
                return (
                  <motion.div
                    key={branch.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => {
                      setSelectedBranch(branch.id);
                      if (mapInstanceRef.current) {
                        mapInstanceRef.current.panTo({ lat: branch.latitude, lng: branch.longitude });
                        mapInstanceRef.current.setZoom(15);
                      }
                    }}
                    className={cn(
                      'bg-white rounded-2xl p-4 border cursor-pointer transition-all hover:shadow-md',
                      isSelected ? 'border-primary shadow-md ring-1 ring-primary/20' : 'border-slate-200'
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center flex-shrink-0">
                        <MapPin size={18} className="text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-slate-800">{branch.name}</h3>
                        <p className="text-xs text-slate-500 mt-0.5">{branch.pastorName}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{branch.address}</p>

                        {distance !== null && (
                          <div className="flex items-center gap-1 mt-2">
                            <Navigation size={12} className="text-primary" />
                            <span className="text-xs font-medium text-primary">{distance.toFixed(1)} km away</span>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2 mt-3">
                          <div className="flex items-center gap-1 text-xs text-slate-500">
                            <Phone size={11} /> {branch.contactPhone}
                          </div>
                        </div>

                        <div className="mt-3 space-y-1">
                          {SERVICE_TYPES.slice(0, 3).map((service) => (
                            <div key={service} className="flex items-center gap-1.5 text-xs text-slate-500">
                              <Clock size={10} className="text-slate-400" />
                              {service}: {service === 'First Service' ? '7:00 AM' : service === 'Second Service' ? '9:30 AM' : '5:00 PM'}
                            </div>
                          ))}
                        </div>

                        {isSelected && userLocation && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-3 pt-3 border-t border-slate-100"
                          >
                            <button
                              onClick={(e) => { e.stopPropagation(); getDirections(branch); }}
                              className="w-full py-2 bg-primary text-white rounded-lg text-xs font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                            >
                              <Navigation size={14} />
                              Get Directions
                            </button>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="flex-1 relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
            <div ref={mapRef} className="w-full h-full min-h-[500px]" />

            {!mapLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto" />
                  <p className="text-sm text-slate-500 mt-4">Loading map...</p>
                </div>
              </div>
            )}

            <AnimatePresence>
              {selectedBranchData && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  className="absolute bottom-4 left-4 right-4 lg:left-4 lg:right-auto lg:w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-10"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-sm font-bold text-slate-800">{selectedBranchData.name}</h3>
                    <button onClick={() => { setSelectedBranch(null); clearDirections(); }} className="p-1 rounded-lg hover:bg-slate-100">
                      <X size={14} className="text-slate-400" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 mb-1">{selectedBranchData.address}</p>
                  <p className="text-xs text-slate-500 mb-1">Pastor: {selectedBranchData.pastorName}</p>
                  <p className="text-xs text-slate-500 mb-3">Contact: {selectedBranchData.contactPhone}</p>

                  {userLocation && (
                    <>
                      <p className="text-xs text-primary font-medium mb-3">
                        {getDistance(selectedBranchData.latitude, selectedBranchData.longitude)?.toFixed(1)} km from your location
                      </p>
                      <button
                        onClick={() => getDirections(selectedBranchData)}
                        className="w-full py-2 bg-primary text-white rounded-xl text-xs font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                      >
                        <Navigation size={14} />
                        Get Directions
                      </button>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

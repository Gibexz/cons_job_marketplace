'use client';
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import { apiFetch } from '@/lib/api';
import JobInviteModal from './job-invite-modal';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export default function MapView() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [3.38, 6.52],
      zoom: 11,
    });

    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    mapInstance.current = map;

    loadJobs(map);
    loadWorkers(map);

    return () => map.remove();
  }, []);

  async function loadJobs(map: mapboxgl.Map) {
    try {
      const jobs = await apiFetch('/jobs/map');
      jobs.forEach((job: any) => {
        // Styled job marker
        const el = document.createElement('div');
        el.className = 'flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-blue-600 text-white shadow-md text-sm border-2 border-white';
        el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>`;
        el.onclick = () => setSelectedJob(job);
        new mapboxgl.Marker(el).setLngLat([job.lng, job.lat]).addTo(map);
      });
    } catch (e) {
      console.error('Failed to load jobs:', e);
    }
  }

  async function loadWorkers(map: mapboxgl.Map) {
    try {
      const workers = await apiFetch('/workers/map');
      workers.forEach((worker: any) => {
        // Styled worker marker
        const el = document.createElement('div');
        el.className = 'flex h-8 w-8 items-center justify-center rounded-full bg-[#ff6600] text-white shadow-md text-sm border-2 border-white';
        el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>`;
        new mapboxgl.Marker(el).setLngLat([worker.lng, worker.lat]).addTo(map);
      });
    } catch (e) {
      console.error('Failed to load workers:', e);
    }
  }

  return (
    <>
      <div ref={mapRef} className="h-full w-full" />
      {selectedJob && (
        <JobInviteModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </>
  );
}
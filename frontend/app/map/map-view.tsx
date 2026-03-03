"use client";

import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import { apiFetch } from "@/lib/api";
import JobInviteModal from "./job-invite-modal";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export default function MapView() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);

  const [selectedJob, setSelectedJob] = useState<any>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [3.38, 6.52], // Lagos
      zoom: 11,
    });

    mapInstance.current = map;

    loadJobs(map);
    loadWorkers(map);

    return () => map.remove();
  }, []);

  async function loadJobs(map: mapboxgl.Map) {
    const jobs = await apiFetch("/jobs/map");

    jobs.forEach((job: any) => {
      const el = document.createElement("div");
      el.innerText = "🧰";
      el.style.cursor = "pointer";

      el.onclick = () => setSelectedJob(job);

      new mapboxgl.Marker(el).setLngLat([job.lng, job.lat]).addTo(map);
    });
  }

  async function loadWorkers(map: mapboxgl.Map) {
    const workers = await apiFetch("/workers/map");

    workers.forEach((worker: any) => {
      const el = document.createElement("div");
      el.innerText = "👷";

      new mapboxgl.Marker(el).setLngLat([worker.lng, worker.lat]).addTo(map);
    });
  }

  return (
    <>
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />

      {selectedJob && (
        <JobInviteModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </>
  );
}

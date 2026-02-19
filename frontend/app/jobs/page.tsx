"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadJobs();
  }, []);

  async function loadJobs() {
    try {
      const data = await apiFetch("/jobs");
      setJobs(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p>Loading jobs...</p>;

  return (
    <div>
      <h1>Jobs</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {jobs.map((job) => (
        <div
          key={job.id}
          style={{ border: "1px solid #ccc", marginBottom: 12, padding: 10 }}
        >
          <h3>{job.title}</h3>
          <p>
            Status: <b>{job.active ? "Active" : "Inactive"}</b>
          </p>

          <Link href={`/jobs/${job.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
}

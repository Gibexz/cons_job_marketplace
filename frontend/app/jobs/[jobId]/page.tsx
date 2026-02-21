"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import InviteWorkerModal from "./invite-modal";
import { apiFetch } from "@/lib/api";

export default function JobDetailPage() {
  const { jobId } = useParams();
  const [job, setJob] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJob();
  }, []);

  async function loadJob() {
    try {
      const data = await apiFetch(`/jobs/${jobId}`);
      setJob(data);
    } catch (err: any) {
      setError(err.message);
      console.log("Error fetching job details:", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p>Loading job...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!job) return <p>Job not found</p>;

  return (
    <div>
      <h1>{job.title}</h1>
      <p>{job.description}</p>

      {job.company && (
        <p>
          <b>Company:</b> {job.company}
        </p>
      )}

      <p>
        <b>Posted by:</b> {job.postedBy?.name}
      </p>

      {/* Workers assigned to this job */}
      {job.workers && job.workers.length > 0 && (
        <div>
          <h3>Workers</h3>
          {job.workers.map((jw: any) => (
            <div key={jw.id} style={{ marginBottom: 8 }}>
              <p>
                {jw.worker.user.name} — Status: <b>{jw.status}</b>
              </p>
              <p>Skills: {jw.worker.skills.join(", ")}</p>
            </div>
          ))}
        </div>
      )}

      <button onClick={() => setShowModal(true)}>Invite Worker</button>

      {showModal && (
        <InviteWorkerModal job={job} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
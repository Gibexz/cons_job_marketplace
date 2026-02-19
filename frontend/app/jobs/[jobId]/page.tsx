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

  useEffect(() => {
    loadJob();
  }, []);

  async function loadJob() {
    try {
      const data = await apiFetch(`/jobs/${jobId}`);
      setJob(data);
    } catch (err: any) {
      setError(err.message);
    }
  }

  if (!job) return <p>Loading job...</p>;

  return (
    <div>
      <h1>{job.title}</h1>
      <p>{job.description}</p>
      <p>
        <b>Required Skills:</b> {job.skills.join(", ")}
      </p>

      <button onClick={() => setShowModal(true)}>Invite Worker</button>

      {showModal && (
        <InviteWorkerModal job={job} onClose={() => setShowModal(false)} />
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { inviteWorker } from "@/lib/invites";

export default function JobInviteModal({
  job,
  onClose,
}: {
  job: any;
  onClose: () => void;
}) {
  const [workers, setWorkers] = useState<any[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadMatchingWorkers();
  }, []);

  async function loadMatchingWorkers() {
    try {
      const skills = job.skills.join(",");
      const data = await apiFetch(`/workers/match?skills=${skills}`);
      setWorkers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function toggle(workerId: string) {
    setSelected((prev) =>
      prev.includes(workerId)
        ? prev.filter((id) => id !== workerId)
        : [...prev, workerId],
    );
  }

  async function sendInvites() {
    try {
      for (const workerId of selected) {
        await inviteWorker(job.id, workerId);
      }
      alert("Invites sent successfully");
      onClose();
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <div style={modalStyle}>
      <h2>{job.title}</h2>
      <p>{job.description}</p>

      <h3>Invite Workers</h3>

      {loading && <p>Loading workers...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {workers.map((worker) => (
        <div key={worker.id}>
          <label>
            <input
              type="checkbox"
              checked={selected.includes(worker.id)}
              onChange={() => toggle(worker.id)}
            />
            {worker.user.name} — {worker.skills.join(", ")}
          </label>
        </div>
      ))}

      <button disabled={selected.length === 0} onClick={sendInvites}>
        Send Invites ({selected.length})
      </button>

      <button onClick={onClose}>Close</button>
    </div>
  );
}

const modalStyle: React.CSSProperties = {
  position: "fixed",
  top: "10%",
  left: "50%",
  transform: "translateX(-50%)",
  background: "#fff",
  padding: 20,
  border: "1px solid #ccc",
  zIndex: 1000,
  maxHeight: "80vh",
  overflowY: "auto",
};

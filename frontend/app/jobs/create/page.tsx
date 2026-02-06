'use client';
import { useState } from 'react';
import { apiFetch } from '@/lib/api';

export default function CreateJobPage() {
  const [job, setJob] = useState({ title: '', description: '' });

  async function submit() {
    await apiFetch('/jobs', {
      method: 'POST',
      body: JSON.stringify(job),
    });
    alert('Job created');
  }

  return (
    <div>
      <h1>Create Job</h1>
      <input placeholder="Title" onChange={e => setJob({ ...job, title: e.target.value })} />
      <textarea placeholder="Description" onChange={e => setJob({ ...job, description: e.target.value })} />
      <button onClick={submit}>Create</button>
    </div>
  );
}

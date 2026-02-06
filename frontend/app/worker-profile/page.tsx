'use client';
import { useState } from 'react';
import { apiFetch } from '@/lib/api';

export default function WorkerProfilePage() {
  const [form, setForm] = useState({
    skills: '',
    experience: 'BEGINNER',
    available: true,
    bio: '',
  });

  async function save() {
    await apiFetch('/worker-profile', {
      method: 'POST',
      body: JSON.stringify({
        ...form,
        skills: form.skills.split(',').map(s => s.trim()),
      }),
    });
    alert('Profile saved');
  }

  return (
    <div>
      <h1>Worker Profile</h1>

      <input placeholder="Skills (comma separated)"
        onChange={e => setForm({ ...form, skills: e.target.value })} />

      <select onChange={e => setForm({ ...form, experience: e.target.value })}>
        <option>BEGINNER</option>
        <option>INTERMEDIATE</option>
        <option>PROFESSIONAL</option>
        <option>EXPERT</option>
      </select>

      <textarea placeholder="Bio"
        onChange={e => setForm({ ...form, bio: e.target.value })} />

      <button onClick={save}>Save</button>
    </div>
  );
}

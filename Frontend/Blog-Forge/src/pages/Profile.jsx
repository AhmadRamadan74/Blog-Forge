import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { id } = useParams();
  const { profile, loading, error, getProfile, updateProfile, deleteUser } = useUser();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isOwner = user && String(user.u_id) === String(id);

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ firstName: "", DOB: "" });
  const [updateMsg, setUpdateMsg] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    getProfile(id);
  }, [id]);

  useEffect(() => {
    if (profile) {
      setForm({
        firstName: profile.fullName?.split(" ")[0] || "",
        DOB: "",
      });
    }
  }, [profile]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const result = await updateProfile(id, form);
    if (result.success) {
      setUpdateMsg("Profile updated successfully");
      setEditing(false);
      getProfile(id);
      setTimeout(() => setUpdateMsg(null), 3000);
    }
  };

  const handleDelete = async () => {
    const result = await deleteUser(id);
    if (result.success) {
      if (isOwner) {
        logout();
        navigate("/");
      } else {
        navigate("/");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <span className="w-5 h-5 border border-paper-400/20 border-t-ink-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center">
        <p className="font-display text-4xl text-paper-400/20 italic mb-3">User not found</p>
        <p className="text-sm text-paper-400/40 font-body">{error}</p>
      </div>
    );
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-12 animate-fade-up">
      {/* Header */}
      <div className="mb-10">
        <p className="label mb-3">Author</p>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-ink-800 border border-ink-600/40 flex items-center justify-center">
            <span className="font-display text-2xl text-ink-400 font-bold">
              {profile.fullName?.[0]?.toUpperCase() || "?"}
            </span>
          </div>
          <div>
            <h1 className="font-display text-4xl font-bold text-paper-100 leading-none">
              {profile.fullName}
            </h1>
            <p className="text-sm font-body text-paper-400/50 mt-1">{profile.u_email}</p>
          </div>
        </div>
        <div className="mt-6 h-px bg-gradient-to-r from-ink-600/60 via-paper-400/20 to-transparent" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="card p-5">
          <p className="label mb-1">Age</p>
          <p className="font-display text-3xl font-semibold text-paper-100">
            {profile.age ?? "—"}
          </p>
        </div>
        <div className="card p-5">
          <p className="label mb-1">Member ID</p>
          <p className="font-mono text-2xl text-paper-400/60">#{profile.u_id}</p>
        </div>
      </div>

      {/* Success Message */}
      {updateMsg && (
        <div className="border border-green-500/30 bg-green-500/10 px-4 py-3 mb-6">
          <p className="text-xs font-body text-green-400">{updateMsg}</p>
        </div>
      )}

      {/* Owner Actions */}
      {isOwner && !editing && (
        <div className="flex gap-3 mb-8">
          <button onClick={() => setEditing(true)} className="btn-primary">
            Edit profile
          </button>
          <button
            onClick={() => setConfirmDelete(true)}
            className="border border-red-500/30 text-red-400 hover:bg-red-500/10 px-6 py-2.5 text-sm font-body transition-all duration-200"
          >
            Delete account
          </button>
        </div>
      )}

      {/* Edit Form */}
      {editing && (
        <div className="card p-6 mb-6">
          <h2 className="label mb-5">Update profile</h2>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="label block mb-2">First Name</label>
              <input
                type="text"
                value={form.firstName}
                onChange={(e) => setForm((p) => ({ ...p, firstName: e.target.value }))}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="label block mb-2">Date of Birth</label>
              <input
                type="date"
                value={form.DOB}
                onChange={(e) => setForm((p) => ({ ...p, DOB: e.target.value }))}
                className="input-field"
              />
            </div>
            <div className="flex gap-3 pt-1">
              <button type="submit" disabled={loading} className="btn-primary">
                {loading ? "Saving..." : "Save changes"}
              </button>
              <button type="button" onClick={() => setEditing(false)} className="btn-ghost">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Confirmation */}
      {confirmDelete && (
        <div className="border border-red-500/30 bg-red-500/5 p-5">
          <p className="text-sm font-body text-paper-200 mb-4">
            Are you sure? This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleDelete}
              disabled={loading}
              className="border border-red-500/50 bg-red-500/20 text-red-300 hover:bg-red-500/30 px-5 py-2 text-sm font-body transition-all"
            >
              {loading ? "Deleting..." : "Yes, delete"}
            </button>
            <button onClick={() => setConfirmDelete(false)} className="btn-ghost">
              Cancel
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

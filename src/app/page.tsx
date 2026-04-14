"use client";

import { useEffect, useState, useCallback } from "react";
import { Task, Deliverable, TaskStatus, DELIVERABLES, STATUSES } from "@/lib/types";

// ── Helpers ──
function getWeekNumber(d: Date): number {
  const oneJan = new Date(d.getFullYear(), 0, 1);
  const days = Math.floor((d.getTime() - oneJan.getTime()) / 86400000);
  return Math.ceil((days + oneJan.getDay() + 1) / 7);
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const STATUS_CONFIG: Record<TaskStatus, { label: string; bg: string; border: string; badge: string; badgeText: string }> = {
  completed: {
    label: "Completed",
    bg: "bg-emerald-100/40",
    border: "border-emerald-500",
    badge: "bg-emerald-100",
    badgeText: "text-emerald-600",
  },
  ongoing: {
    label: "Ongoing",
    bg: "bg-amber-50/40",
    border: "border-amber-600",
    badge: "bg-amber-100",
    badgeText: "text-amber-600",
  },
  expected: {
    label: "Expected Impact",
    bg: "bg-violet-50/40",
    border: "border-violet-600",
    badge: "bg-violet-100",
    badgeText: "text-violet-600",
  },
};

const COLUMN_COLORS: Record<string, { header: string; accent: string }> = {
  "Search performance": { header: "bg-teal-700", accent: "border-t-teal-700" },
  "Website performance": { header: "bg-slate-700", accent: "border-t-slate-700" },
  "Data management": { header: "bg-teal-600", accent: "border-t-teal-600" },
  "Lead ops & revenue mapping": { header: "bg-slate-800", accent: "border-t-slate-800" },
};

// ── Task Card ──
function TaskCard({
  task,
  onUpdate,
  onDelete,
}: {
  task: Task;
  onUpdate: (t: Partial<Task> & { id: string }) => void;
  onDelete: (id: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(task.text);
  const [note, setNote] = useState(task.note);
  const [showNote, setShowNote] = useState(false);
  const isCompleted = task.status === "completed";

  function save() {
    onUpdate({ id: task.id, text, note });
    setEditing(false);
  }

  function moveToCompleted() {
    onUpdate({ id: task.id, status: "completed" });
  }

  return (
    <div className={`group relative rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition hover:shadow-md ${isCompleted ? "opacity-80" : ""}`}>
      {editing ? (
        <div className="flex flex-col gap-2">
          <textarea
            className="w-full rounded border border-slate-300 p-2 text-sm focus:border-teal-600 focus:outline-none resize-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={2}
          />
          <textarea
            className="w-full rounded border border-slate-200 p-2 text-xs text-slate-500 focus:border-teal-600 focus:outline-none resize-none"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={1}
            placeholder="Add a note..."
          />
          <div className="flex gap-2">
            <button onClick={save} className="rounded bg-teal-700 px-3 py-1 text-xs text-white hover:bg-teal-600">
              Save
            </button>
            <button onClick={() => { setEditing(false); setText(task.text); setNote(task.note); }} className="rounded border border-slate-300 px-3 py-1 text-xs text-slate-600 hover:bg-slate-50">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-start gap-2">
            {task.status !== "expected" && (
              <button
                onClick={moveToCompleted}
                className={`mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border transition ${
                  isCompleted
                    ? "border-emerald-500 bg-emerald-500 text-white"
                    : "border-slate-300 hover:border-teal-600"
                }`}
                title={isCompleted ? "Completed" : "Mark as completed"}
              >
                {isCompleted && (
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            )}
            <p className={`text-sm leading-snug ${isCompleted ? "line-through text-slate-400" : "text-slate-700"}`}>
              {task.text}
            </p>
          </div>
          {task.note && (
            <div className="mt-1 ml-6">
              <button
                onClick={() => setShowNote(!showNote)}
                className="text-xs text-slate-400 hover:text-slate-600"
              >
                {showNote ? "hide note" : "note"}
              </button>
              {showNote && <p className="mt-1 text-xs text-slate-500 italic">{task.note}</p>}
            </div>
          )}
          <div className="absolute right-2 top-2 hidden gap-1 group-hover:flex">
            <button onClick={() => setEditing(true)} className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600" title="Edit">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
            <button onClick={() => onDelete(task.id)} className="rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-500" title="Delete">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// ── Add Task Form ──
function AddTaskForm({
  deliverable,
  status,
  onAdd,
}: {
  deliverable: Deliverable;
  status: TaskStatus;
  onAdd: (t: { deliverable: string; status: TaskStatus; text: string; note: string }) => void;
}) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [note, setNote] = useState("");

  function submit() {
    if (!text.trim()) return;
    onAdd({ deliverable, status, text: text.trim(), note: note.trim() });
    setText("");
    setNote("");
    setOpen(false);
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full rounded-lg border border-dashed border-slate-300 py-1.5 text-xs text-slate-400 hover:border-slate-400 hover:text-slate-500 transition"
      >
        + Add task
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-white p-3">
      <textarea
        className="w-full rounded border border-slate-300 p-2 text-sm focus:border-teal-600 focus:outline-none resize-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={2}
        placeholder="What did you work on?"
        autoFocus
      />
      <textarea
        className="w-full rounded border border-slate-200 p-2 text-xs text-slate-500 focus:border-teal-600 focus:outline-none resize-none"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={1}
        placeholder="Optional note..."
      />
      <div className="flex gap-2">
        <button onClick={submit} className="rounded bg-teal-700 px-3 py-1 text-xs text-white hover:bg-teal-600">
          Add
        </button>
        <button onClick={() => { setOpen(false); setText(""); setNote(""); }} className="rounded border border-slate-300 px-3 py-1 text-xs text-slate-600 hover:bg-slate-50">
          Cancel
        </button>
      </div>
    </div>
  );
}

// ── Status Section ──
function StatusSection({
  deliverable,
  status,
  tasks,
  onUpdate,
  onDelete,
  onAdd,
}: {
  deliverable: Deliverable;
  status: TaskStatus;
  tasks: Task[];
  onUpdate: (t: Partial<Task> & { id: string }) => void;
  onDelete: (id: string) => void;
  onAdd: (t: { deliverable: string; status: TaskStatus; text: string; note: string }) => void;
}) {
  const config = STATUS_CONFIG[status];
  return (
    <div className={`rounded-lg border-l-2 ${config.border} ${config.bg} p-3`}>
      <div className="mb-2 flex items-center gap-2">
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${config.badge} ${config.badgeText}`}>
          {config.label}
        </span>
        <span className="text-xs text-slate-400">{tasks.length}</span>
      </div>
      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onUpdate={onUpdate} onDelete={onDelete} />
        ))}
        <AddTaskForm deliverable={deliverable} status={status} onAdd={onAdd} />
      </div>
    </div>
  );
}

// ── Deliverable Column ──
function DeliverableColumn({
  deliverable,
  tasks,
  onUpdate,
  onDelete,
  onAdd,
}: {
  deliverable: Deliverable;
  tasks: Task[];
  onUpdate: (t: Partial<Task> & { id: string }) => void;
  onDelete: (id: string) => void;
  onAdd: (t: { deliverable: string; status: TaskStatus; text: string; note: string }) => void;
}) {
  const colors = COLUMN_COLORS[deliverable];
  return (
    <div className={`flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm border-t-4 ${colors.accent} overflow-hidden`}>
      <div className={`${colors.header} px-4 py-3`}>
        <h2 className="text-sm font-semibold text-white">{deliverable}</h2>
      </div>
      <div className="flex flex-col gap-4 p-4">
        {STATUSES.map((status) => (
          <StatusSection
            key={status}
            deliverable={deliverable}
            status={status}
            tasks={tasks.filter((t) => t.status === status)}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onAdd={onAdd}
          />
        ))}
      </div>
    </div>
  );
}

// ── Main Page ──
export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const now = new Date();
  const weekNum = getWeekNumber(now);

  const fetchTasks = useCallback(async () => {
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  async function addTask(t: { deliverable: string; status: TaskStatus; text: string; note: string }) {
    setSaving(true);
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(t),
    });
    const newTask = await res.json();
    setTasks((prev) => [...prev, newTask]);
    setSaving(false);
  }

  async function updateTask(t: Partial<Task> & { id: string }) {
    setSaving(true);
    const res = await fetch("/api/tasks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(t),
    });
    const updated = await res.json();
    setTasks((prev) => prev.map((task) => (task.id === updated.id ? updated : task)));
    setSaving(false);
  }

  async function deleteTask(id: string) {
    setSaving(true);
    await fetch(`/api/tasks?id=${id}`, { method: "DELETE" });
    setTasks((prev) => prev.filter((t) => t.id !== id));
    setSaving(false);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white px-6 py-5">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl font-bold text-slate-900">Divya Pariti — Work Tracker</h1>
              <p className="text-sm text-slate-500">Marketing Technology Graduate, Intuition</p>
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <div className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5">
                <span className="font-medium text-slate-700">Week {weekNum}</span>
                <span className="text-slate-300">|</span>
                <span>{formatDate(now)}</span>
              </div>
              {saving && (
                <span className="text-xs text-teal-600 animate-pulse">Saving...</span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Board */}
      <main className="mx-auto max-w-[1600px] p-6">
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="text-sm text-slate-400">Loading your tracker...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {DELIVERABLES.map((d) => (
              <DeliverableColumn
                key={d}
                deliverable={d}
                tasks={tasks.filter((t) => t.deliverable === d)}
                onUpdate={updateTask}
                onDelete={deleteTask}
                onAdd={addTask}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

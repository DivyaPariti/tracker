import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { Task } from "@/lib/types";
import { buildSeedTasks } from "@/lib/seed";
import { v4 as uuid } from "uuid";

const KEY = "tracker:tasks";

// GET — return all tasks (seed if empty)
export async function GET() {
  let tasks = await redis.get<Task[]>(KEY);
  if (!tasks || tasks.length === 0) {
    tasks = buildSeedTasks();
    await redis.set(KEY, tasks);
  }
  return NextResponse.json(tasks);
}

// POST — add a new task
export async function POST(req: NextRequest) {
  const body = await req.json();
  const tasks = (await redis.get<Task[]>(KEY)) ?? [];
  const task: Task = {
    id: uuid(),
    deliverable: body.deliverable,
    status: body.status,
    text: body.text,
    note: body.note ?? "",
    createdAt: new Date().toISOString(),
  };
  tasks.push(task);
  await redis.set(KEY, tasks);
  return NextResponse.json(task, { status: 201 });
}

// PUT — update a task (by id in body)
export async function PUT(req: NextRequest) {
  const body = await req.json();
  const tasks = (await redis.get<Task[]>(KEY)) ?? [];
  const idx = tasks.findIndex((t) => t.id === body.id);
  if (idx === -1) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }
  tasks[idx] = { ...tasks[idx], ...body };
  await redis.set(KEY, tasks);
  return NextResponse.json(tasks[idx]);
}

// DELETE — delete a task (id in query param)
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  let tasks = (await redis.get<Task[]>(KEY)) ?? [];
  tasks = tasks.filter((t) => t.id !== id);
  await redis.set(KEY, tasks);
  return NextResponse.json({ ok: true });
}

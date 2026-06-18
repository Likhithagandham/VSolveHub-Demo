import { NextRequest, NextResponse } from "next/server";

const jobStatuses = new Map<string, string>();

export async function GET() {
  return NextResponse.json({
    items: [
      { id: "job-1", status: jobStatuses.get("job-1") ?? "assigned" },
      { id: "job-2", status: jobStatuses.get("job-2") ?? "assigned" },
    ],
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { jobId, action } = body;
  if (!jobId || !action) {
    return NextResponse.json({ error: "jobId and action required" }, { status: 400 });
  }
  jobStatuses.set(jobId, action);
  return NextResponse.json({ jobId, status: action });
}

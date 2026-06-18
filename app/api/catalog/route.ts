import { NextRequest, NextResponse } from "next/server";
import { MOCK_CATEGORIES, MOCK_SERVICES, searchServices } from "@/lib/catalog/mock";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q");
  const type = req.nextUrl.searchParams.get("type");

  if (type === "categories") {
    return NextResponse.json({ categories: MOCK_CATEGORIES });
  }

  if (q) {
    return NextResponse.json({ services: searchServices(q) });
  }

  return NextResponse.json({
    categories: MOCK_CATEGORIES,
    services: MOCK_SERVICES,
    popular: MOCK_SERVICES.filter((s) => s.isPopular),
  });
}

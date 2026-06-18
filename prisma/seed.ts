import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding VSolveHub database...");

  // Users
  const customer = await prisma.user.upsert({
    where: { phone: "9876543210" },
    update: {},
    create: { phone: "9876543210", name: "Demo Customer" },
  });

  const providerUser = await prisma.user.upsert({
    where: { phone: "9876543211" },
    update: {},
    create: { phone: "9876543211", name: "Ravi Captain" },
  });

  // Provider
  const captain = await prisma.provider.upsert({
    where: { userId: providerUser.id },
    update: {},
    create: {
      userId: providerUser.id,
      providerType: "captain",
      isOnline: false,
      kycStatus: "verified",
    },
  });

  // Categories
  const homeServices = await prisma.category.upsert({
    where: { slug: "home-services" },
    update: {},
    create: { slug: "home-services", name: "Home Services", icon: "🏠", description: "Cleaning, repairs" },
  });

  const cleaning = await prisma.category.upsert({
    where: { slug: "cleaning" },
    update: {},
    create: { slug: "cleaning", name: "Cleaning", icon: "✨", parentId: homeServices.id },
  });

  const events = await prisma.category.upsert({
    where: { slug: "events" },
    update: {},
    create: { slug: "events", name: "Events", icon: "🎉" },
  });

  const photography = await prisma.category.upsert({
    where: { slug: "photography" },
    update: {},
    create: { slug: "photography", name: "Photography", icon: "📸", parentId: events.id },
  });

  const staffing = await prisma.category.upsert({
    where: { slug: "staffing" },
    update: {},
    create: { slug: "staffing", name: "Staffing", icon: "👥" },
  });

  const rentals = await prisma.category.upsert({
    where: { slug: "rentals" },
    update: {},
    create: { slug: "rentals", name: "Rentals", icon: "📦" },
  });

  // Services
  const services = [
    { slug: "deep-cleaning", name: "Deep Home Cleaning", archetype: "A", pricePaise: 249900, categoryId: cleaning.id, isPopular: true },
    { slug: "ac-repair", name: "AC Repair & Service", archetype: "A", pricePaise: 49900, categoryId: homeServices.id, isPopular: true },
    { slug: "moving-crew", name: "Moving Crew (4 people)", archetype: "B", pricePaise: 499900, categoryId: homeServices.id, isPopular: true },
    { slug: "event-staff", name: "Event Staffing", archetype: "C", pricePaise: 150000, categoryId: staffing.id, isPopular: false },
    { slug: "projector-rental", name: "Projector Rental", archetype: "D", pricePaise: 350000, categoryId: rentals.id, isPopular: false },
    { slug: "pg-room", name: "PG Room — Koramangala", archetype: "E", pricePaise: 1200000, categoryId: rentals.id, isPopular: true },
    { slug: "wedding-photo", name: "Wedding Photography Package", archetype: "F", pricePaise: 7500000, categoryId: photography.id, isPopular: true },
  ];

  const createdServices = [];
  for (const svc of services) {
    const s = await prisma.service.upsert({
      where: { slug_categoryId: { slug: svc.slug, categoryId: svc.categoryId } },
      update: {},
      create: { ...svc, providerId: captain.id, description: `${svc.name} — seeded service` },
    });
    createdServices.push(s);
  }

  // Address
  await prisma.address.upsert({
    where: { id: "seed-addr-1" },
    update: {},
    create: {
      id: "seed-addr-1",
      userId: customer.id,
      label: "Home",
      line1: "42 Indiranagar 100ft Road",
      city: "Bangalore",
      pincode: "560038",
      isDefault: true,
    },
  });

  // Bookings
  const booking1 = await prisma.booking.upsert({
    where: { ref: "VSH-SEED-001" },
    update: {},
    create: {
      ref: "VSH-SEED-001",
      userId: customer.id,
      serviceId: createdServices[0].id,
      archetype: "A",
      status: "dispatching",
      payload: JSON.stringify({ slot: "2026-06-20T10:00", address: "42 Indiranagar" }),
      totalPaise: 249900,
    },
  });

  await prisma.booking.upsert({
    where: { ref: "VSH-SEED-002" },
    update: {},
    create: {
      ref: "VSH-SEED-002",
      userId: customer.id,
      serviceId: createdServices[2].id,
      archetype: "B",
      status: "pending",
      payload: JSON.stringify({ slot: "2026-06-25", address: "Whitefield", headcount: 4, days: 2 }),
      totalPaise: 999800,
    },
  });

  // Offer
  await prisma.offer.create({
    data: {
      providerId: captain.id,
      bookingId: booking1.id,
      status: "pending",
      expiresAt: new Date(Date.now() + 30000),
    },
  });

  // Provider request (Phase-2 stub data)
  await prisma.providerRequest.create({
    data: {
      providerId: captain.id,
      type: "staffing",
      status: "pending",
      slaHours: 24,
      payload: JSON.stringify({ role: "waiter", eventDate: "2026-07-01" }),
    },
  });

  // Earnings
  await prisma.earning.createMany({
    data: [
      { providerId: captain.id, amountPaise: 249900, source: "Deep cleaning", status: "paid" },
      { providerId: captain.id, amountPaise: 49900, source: "AC repair", status: "pending" },
    ],
  });

  // Saved service
  await prisma.savedService.upsert({
    where: { userId_serviceId: { userId: customer.id, serviceId: createdServices[6].id } },
    update: {},
    create: { userId: customer.id, serviceId: createdServices[6].id },
  });

  console.log("✅ Seed complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

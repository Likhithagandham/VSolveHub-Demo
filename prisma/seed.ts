import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding VSolveHub database...");

  const homeRepair = await prisma.serviceCategory.upsert({
    where: { slug: "home-repair" },
    update: {},
    create: { slug: "home-repair", name: "Home Repair", icon: "🔧" },
  });

  const cleaning = await prisma.serviceCategory.upsert({
    where: { slug: "cleaning" },
    update: {},
    create: { slug: "cleaning", name: "Cleaning", icon: "✨" },
  });

  const beauty = await prisma.serviceCategory.upsert({
    where: { slug: "beauty" },
    update: {},
    create: { slug: "beauty", name: "Beauty", icon: "💅" },
  });

  const applianceRepair = await prisma.serviceCategory.upsert({
    where: { slug: "appliance-repair" },
    update: {},
    create: { slug: "appliance-repair", name: "Appliance Repair", icon: "🔌" },
  });

  const serviceDefs = [
    {
      slug: "plumbing",
      name: "Plumbing",
      categoryId: homeRepair.id,
      description: "Leak fixes, tap installation, pipe repairs, and general plumbing work at your doorstep.",
      price: 299,
      duration: 60,
      tags: ["leak", "tap", "pipe", "plumber", "water"],
    },
    {
      slug: "electrician",
      name: "Electrician",
      categoryId: homeRepair.id,
      description: "Wiring, switchboard fixes, fan installation, and electrical safety checks by certified pros.",
      price: 349,
      duration: 90,
      tags: ["wiring", "switch", "fan", "electrical", "power"],
    },
    {
      slug: "ac-repair",
      name: "AC Repair",
      categoryId: homeRepair.id,
      description: "AC servicing, gas refill, cooling issues, and seasonal maintenance for all brands.",
      price: 499,
      duration: 120,
      tags: ["ac", "cooling", "service", "air conditioner", "hvac"],
    },
    {
      slug: "deep-cleaning",
      name: "Deep Cleaning",
      categoryId: cleaning.id,
      description: "Full-home deep cleaning including kitchen, bathrooms, floors, and hard-to-reach areas.",
      price: 1999,
      duration: 240,
      tags: ["cleaning", "home", "sanitize", "deep clean", "maid"],
    },
    {
      slug: "home-salon",
      name: "Home Salon",
      categoryId: beauty.id,
      description: "Haircut, facial, waxing, and grooming services at home by trained beauticians.",
      price: 999,
      duration: 90,
      tags: ["salon", "beauty", "haircut", "facial", "grooming"],
    },
    {
      slug: "washing-machine-repair",
      name: "Washing Machine Repair",
      categoryId: applianceRepair.id,
      description: "Diagnosis and repair for front-load and top-load washing machines of all major brands.",
      price: 399,
      duration: 90,
      tags: ["washing machine", "appliance", "laundry", "repair", "washer"],
    },
  ];

  const services = [];
  for (const svc of serviceDefs) {
    const created = await prisma.service.upsert({
      where: { slug_categoryId: { slug: svc.slug, categoryId: svc.categoryId } },
      update: {},
      create: {
        ...svc,
        tags: JSON.stringify(svc.tags),
      },
    });
    services.push(created);
  }

  const customer = await prisma.user.upsert({
    where: { phone: "9876543210" },
    update: {},
    create: { phone: "9876543210", name: "Demo Customer" },
  });

  const customer2 = await prisma.user.upsert({
    where: { phone: "9123456789" },
    update: {},
    create: { phone: "9123456789", name: "Priya Sharma" },
  });

  await prisma.address.upsert({
    where: { id: "seed-addr-home" },
    update: {},
    create: {
      id: "seed-addr-home",
      userId: customer.id,
      label: "Home",
      fullAddress: "42, 100ft Road, Indiranagar, Bangalore — 560038",
      isDefault: true,
    },
  });

  await prisma.address.upsert({
    where: { id: "seed-addr-work" },
    update: {},
    create: {
      id: "seed-addr-work",
      userId: customer.id,
      label: "Work",
      fullAddress: "WeWork Galaxy, Residency Road, Bangalore — 560025",
      isDefault: false,
    },
  });

  await prisma.address.upsert({
    where: { id: "seed-addr-priya" },
    update: {},
    create: {
      id: "seed-addr-priya",
      userId: customer2.id,
      label: "Home",
      fullAddress: "15, Koramangala 5th Block, Bangalore — 560095",
      isDefault: true,
    },
  });

  await prisma.savedService.upsert({
    where: { userId_serviceId: { userId: customer.id, serviceId: services[0].id } },
    update: {},
    create: { userId: customer.id, serviceId: services[0].id },
  });

  await prisma.savedService.upsert({
    where: { userId_serviceId: { userId: customer.id, serviceId: services[3].id } },
    update: {},
    create: { userId: customer.id, serviceId: services[3].id },
  });

  const existingBooking = await prisma.booking.findUnique({
    where: { bookingRef: "VSH-DEMO-001" },
  });

  if (!existingBooking) {
    const booking = await prisma.booking.create({
      data: {
        bookingRef: "VSH-DEMO-001",
        userId: customer.id,
        serviceId: services[2].id,
        addressId: "seed-addr-home",
        slot: new Date(Date.now() + 86400000).toISOString(),
        status: "ASSIGNED",
        quotedAmount: services[2].price,
      },
    });

    await prisma.bookingStatusLog.createMany({
      data: [
        { bookingId: booking.id, status: "SEARCHING" },
        { bookingId: booking.id, status: "ASSIGNED" },
      ],
    });
  }

  console.log("Seed complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

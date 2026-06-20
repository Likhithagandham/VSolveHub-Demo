import type { ScaffoldPageData, ScaffoldPageKey } from "./types";

type ModeKey = "professional" | "vendor" | "host" | "studio";

const PAGES: Record<ModeKey, Record<ScaffoldPageKey, ScaffoldPageData>> = {
  professional: {
    dashboard: {
      stats: [
        { label: "New requests", value: "4" },
        { label: "Scheduled", value: "6" },
        { label: "This week", value: "₹3,850" },
        { label: "Rating", value: "4.8 ★" },
      ],
      sections: [
        {
          title: "Requests inbox",
          description: "Recent service requests from customers near you.",
          rows: [
            { title: "AC gas refill", subtitle: "Gachibowli · Tomorrow, 10:00 AM", badge: "New", amount: "₹850" },
            { title: "Modular kitchen quote", subtitle: "Madhapur · Flexible slot", badge: "New", amount: "₹2,400" },
            { title: "Plumbing — kitchen leak", subtitle: "Kondapur · Today, 4:30 PM", badge: "Urgent", amount: "₹650" },
          ],
        },
        {
          title: "Weekly schedule",
          description: "Your confirmed appointments for this week.",
          rows: [
            { title: "Mon 24 Jun", subtitle: "3 visits · 9:00 AM – 6:00 PM", meta: "Gachibowli, HITEC City" },
            { title: "Wed 26 Jun", subtitle: "2 visits · 11:00 AM – 5:00 PM", meta: "Madhapur, Jubilee Hills" },
            { title: "Sat 28 Jun", subtitle: "1 visit · 10:00 AM – 12:00 PM", meta: "Financial District" },
          ],
        },
        {
          title: "Engagements",
          description: "Jobs currently in progress.",
          rows: [
            { title: "Electrical wiring check", subtitle: "Ananya R. · In progress", badge: "Active", amount: "₹1,200" },
            { title: "Bathroom tile repair", subtitle: "Rahul M. · Awaiting parts", badge: "On hold", amount: "₹950" },
          ],
        },
      ],
    },
    leads: {
      sections: [
        {
          title: "Requests inbox",
          description: "Respond within 2 hours to keep your response rate high.",
          rows: [
            { title: "AC gas refill", subtitle: "Gachibowli · Tomorrow, 10:00 AM", badge: "New", amount: "₹850" },
            { title: "Modular kitchen quote", subtitle: "Madhapur · Site visit needed", badge: "New", amount: "₹2,400" },
            { title: "Plumbing — kitchen leak", subtitle: "Kondapur · Today, 4:30 PM", badge: "Urgent", amount: "₹650" },
            { title: "CCTV installation", subtitle: "Banjara Hills · Sat, 9:00 AM", badge: "New", amount: "₹1,800" },
          ],
        },
      ],
    },
    work: {
      sections: [
        {
          title: "Engagements",
          description: "Active and upcoming jobs assigned to you.",
          rows: [
            { title: "Electrical wiring check", subtitle: "Ananya R. · Started 2h ago", badge: "In progress", amount: "₹1,200" },
            { title: "Bathroom tile repair", subtitle: "Rahul M. · Parts ordered", badge: "On hold", amount: "₹950" },
            { title: "Water purifier install", subtitle: "Priya S. · Tomorrow, 11:00 AM", badge: "Scheduled", amount: "₹600" },
          ],
        },
      ],
    },
    workDetail: {
      sections: [
        {
          title: "Engagement detail",
          rows: [
            { title: "Electrical wiring check", subtitle: "Ref VSH-PRO-1042", badge: "In progress", amount: "₹1,200" },
            { title: "Customer", subtitle: "Ananya Reddy · +91 98765 43210" },
            { title: "Address", subtitle: "Flat 302, My Home Avatar, Gachibowli, Hyderabad 500032" },
            { title: "Scheduled slot", subtitle: "Today, 2:00 PM – 4:00 PM" },
            { title: "Scope", subtitle: "Check main panel, replace faulty MCB, test all circuits." },
          ],
        },
      ],
    },
    calendar: {
      sections: [
        {
          title: "Weekly schedule",
          description: "Tap a day to adjust availability.",
          rows: [
            { title: "Monday", subtitle: "9:00 AM – 6:00 PM", badge: "Available", meta: "3 slots booked" },
            { title: "Tuesday", subtitle: "9:00 AM – 6:00 PM", badge: "Available", meta: "2 slots booked" },
            { title: "Wednesday", subtitle: "11:00 AM – 5:00 PM", badge: "Available", meta: "2 slots booked" },
            { title: "Thursday", subtitle: "Day off", badge: "Leave" },
            { title: "Friday", subtitle: "9:00 AM – 3:00 PM", badge: "Available", meta: "1 slot booked" },
            { title: "Saturday", subtitle: "10:00 AM – 2:00 PM", badge: "Available", meta: "1 slot booked" },
          ],
        },
      ],
    },
    earnings: {
      stats: [
        { label: "Today", value: "₹850" },
        { label: "This week", value: "₹3,850" },
        { label: "This month", value: "₹18,200" },
        { label: "Commission", value: "₹1,820" },
      ],
      sections: [
        {
          title: "Engagement payouts",
          description: "Recent completed jobs and payout status.",
          rows: [
            { title: "AC service — Gachibowli", subtitle: "20 Jun · Paid to UPI", badge: "Paid", amount: "₹850" },
            { title: "Plumbing fix — Kondapur", subtitle: "18 Jun · Paid to UPI", badge: "Paid", amount: "₹650" },
            { title: "Electrical check — Madhapur", subtitle: "15 Jun · Processing", badge: "Pending", amount: "₹1,200" },
          ],
        },
      ],
    },
    profile: {
      sections: [
        {
          title: "Professional profile",
          rows: [
            { title: "Rajesh Kumar", subtitle: "Electrician & AC technician · Hyderabad" },
            { title: "Experience", subtitle: "8 years · 240+ jobs completed" },
            { title: "Skills", subtitle: "Electrical, AC repair, Plumbing basics, CCTV" },
            { title: "Rating", subtitle: "4.8 ★ · 96% response rate" },
            { title: "Verification", subtitle: "Aadhaar verified · Skill certificate on file", badge: "Verified" },
          ],
        },
      ],
    },
  },

  vendor: {
    dashboard: {
      stats: [
        { label: "Items in stock", value: "128" },
        { label: "Out on rent", value: "34" },
        { label: "This week", value: "₹12,400" },
        { label: "Pending returns", value: "5" },
      ],
      sections: [
        {
          title: "Inventory overview",
          description: "Fast-moving rental items this week.",
          rows: [
            { title: "Projector — Epson EB-X06", subtitle: "12 units · 8 rented", badge: "Popular", amount: "₹800/day" },
            { title: "Office chairs (set of 10)", subtitle: "6 sets · 4 rented", badge: "Low stock", amount: "₹1,200/day" },
            { title: "PA system — 500W", subtitle: "4 units · 2 rented", amount: "₹2,500/day" },
          ],
        },
        {
          title: "Stock calendar",
          description: "Upcoming pickups and returns.",
          rows: [
            { title: "Today", subtitle: "3 pickups · 2 returns", meta: "Madhapur, Gachibowli" },
            { title: "Tomorrow", subtitle: "5 pickups · 1 return", meta: "HITEC City, Kondapur" },
          ],
        },
        {
          title: "Deliveries",
          description: "Active delivery runs.",
          rows: [
            { title: "Chair set → WeWork HITEC", subtitle: "Out for delivery · ETA 3:30 PM", badge: "En route", amount: "₹1,200" },
            { title: "Projector return ← Gachibowli", subtitle: "Pickup scheduled · 5:00 PM", badge: "Return", amount: "₹800" },
          ],
        },
      ],
    },
    leads: {
      sections: [
        {
          title: "Rental enquiries",
          description: "New quotes and availability checks.",
          rows: [
            { title: "Projector for office event", subtitle: "HITEC City · 22–24 Jun", badge: "New", amount: "₹2,400" },
            { title: "50 chairs + 10 tables", subtitle: "Gachibowli · 28 Jun", badge: "New", amount: "₹4,800" },
            { title: "Sound system — wedding", subtitle: "Banjara Hills · 5 Jul", badge: "Quote sent", amount: "₹7,500" },
          ],
        },
      ],
    },
    work: {
      sections: [
        {
          title: "Deliveries & returns",
          rows: [
            { title: "Office chairs → WeWork HITEC", subtitle: "Delivery · ETA 3:30 PM", badge: "En route", amount: "₹1,200" },
            { title: "Projector pickup ← Gachibowli", subtitle: "Return · 5:00 PM today", badge: "Return", amount: "₹800" },
            { title: "PA system → Jubilee Hills", subtitle: "Delivery · Tomorrow 9:00 AM", badge: "Scheduled", amount: "₹2,500" },
          ],
        },
      ],
    },
    workDetail: {
      sections: [
        {
          title: "Delivery detail",
          rows: [
            { title: "Office chairs (set of 10)", subtitle: "Ref VSH-RNT-8821", badge: "En route", amount: "₹1,200" },
            { title: "Customer", subtitle: "TechStart Pvt Ltd · +91 91234 56789" },
            { title: "Drop address", subtitle: "WeWork Vaishnavi, HITEC City, Hyderabad 500081" },
            { title: "Rental period", subtitle: "20 Jun – 27 Jun (7 days)" },
            { title: "Driver", subtitle: "Suresh · MH 12 AB 4521 · +91 99887 76655" },
          ],
        },
      ],
    },
    calendar: {
      sections: [
        {
          title: "Stock calendar",
          description: "Reserved units by date.",
          rows: [
            { title: "20 Jun", subtitle: "Projectors: 8/12 · Chairs: 4/6 rented", badge: "Today" },
            { title: "21 Jun", subtitle: "Projectors: 9/12 · PA systems: 2/4 rented" },
            { title: "22 Jun", subtitle: "Chairs: fully booked · Tables: 3/8 rented", badge: "Busy" },
            { title: "23 Jun", subtitle: "Projectors: 6/12 · Maintenance slot 2–4 PM" },
          ],
        },
      ],
    },
    earnings: {
      stats: [
        { label: "Today", value: "₹2,100" },
        { label: "This week", value: "₹12,400" },
        { label: "This month", value: "₹48,600" },
        { label: "Commission", value: "₹4,860" },
      ],
      sections: [
        {
          title: "Rental payouts",
          rows: [
            { title: "Projector rental — 3 days", subtitle: "18 Jun · Paid", badge: "Paid", amount: "₹2,400" },
            { title: "Chair set — 7 days", subtitle: "15 Jun · Paid", badge: "Paid", amount: "₹8,400" },
            { title: "PA system — 1 day", subtitle: "12 Jun · Processing", badge: "Pending", amount: "₹2,500" },
          ],
        },
      ],
    },
    profile: {
      sections: [
        {
          title: "Business profile",
          rows: [
            { title: "Hyderabad Event Rentals", subtitle: "Equipment rental · Est. 2016" },
            { title: "Warehouse", subtitle: "Plot 14, IDA Uppal, Hyderabad 500039" },
            { title: "Fleet", subtitle: "3 delivery vans · 2 pickup trucks" },
            { title: "Catalog", subtitle: "128 SKUs · AV, furniture, tents, decor" },
            { title: "Verification", subtitle: "GST · Business proof verified", badge: "Verified" },
          ],
        },
      ],
    },
  },

  host: {
    dashboard: {
      stats: [
        { label: "Listings", value: "3" },
        { label: "Occupancy", value: "78%" },
        { label: "This month", value: "₹42,500" },
        { label: "Check-ins today", value: "2" },
      ],
      sections: [
        {
          title: "Listings",
          description: "Your active properties on V Solve Hub.",
          rows: [
            { title: "PG — Single room, Gachibowli", subtitle: "12 beds · 9 occupied", badge: "Live", amount: "₹8,500/mo" },
            { title: "Flat share — Madhapur", subtitle: "3 BHK · 2 rooms available", badge: "Live", amount: "₹12,000/mo" },
            { title: "Studio — HITEC City", subtitle: "Fully furnished · 1 vacancy", badge: "Live", amount: "₹15,000/mo" },
          ],
        },
        {
          title: "Room occupancy",
          rows: [
            { title: "Gachibowli PG", subtitle: "75% occupied · 3 beds free", meta: "Updated today" },
            { title: "Madhapur flat", subtitle: "67% occupied · 1 room free", meta: "Updated today" },
            { title: "HITEC studio", subtitle: "100% occupied · waitlist: 2", badge: "Full" },
          ],
        },
        {
          title: "Booking inbox",
          rows: [
            { title: "New enquiry — Gachibowli PG", subtitle: "Arjun K. · Move-in 1 Jul", badge: "New", amount: "₹8,500" },
            { title: "Extension request — Madhapur", subtitle: "Sneha P. · +3 months", badge: "Review", amount: "₹12,000" },
          ],
        },
      ],
    },
    leads: {
      sections: [
        {
          title: "Booking inbox",
          rows: [
            { title: "Gachibowli PG — single bed", subtitle: "Arjun K. · Move-in 1 Jul · 6 months", badge: "New", amount: "₹8,500/mo" },
            { title: "Madhapur flat — private room", subtitle: "Sneha P. · Extension +3 months", badge: "Review", amount: "₹12,000/mo" },
            { title: "HITEC studio — full unit", subtitle: "Vikram S. · From 15 Jul", badge: "New", amount: "₹15,000/mo" },
          ],
        },
      ],
    },
    work: {
      sections: [
        {
          title: "Active stays",
          rows: [
            { title: "Gachibowli PG — Bed 4", subtitle: "Kiran M. · Since 1 May", badge: "Active", amount: "₹8,500/mo" },
            { title: "Madhapur — Room B", subtitle: "Divya L. · Since 15 Apr", badge: "Active", amount: "₹12,000/mo" },
            { title: "HITEC studio", subtitle: "Rohit & Anjali · Since 10 Jun", badge: "Active", amount: "₹15,000/mo" },
          ],
        },
      ],
    },
    workDetail: {
      sections: [
        {
          title: "Stay detail",
          rows: [
            { title: "Gachibowli PG — Bed 4", subtitle: "Ref VSH-STY-3301", badge: "Active", amount: "₹8,500/mo" },
            { title: "Guest", subtitle: "Kiran Mehta · +91 97654 32108" },
            { title: "Property", subtitle: "My Home Road, Gachibowli, Hyderabad 500032" },
            { title: "Lease period", subtitle: "1 May 2026 – 30 Apr 2027" },
            { title: "Next payment", subtitle: "Due 1 Jul · UPI autopay enabled", badge: "Due soon" },
          ],
        },
      ],
    },
    calendar: {
      sections: [
        {
          title: "Beds availability",
          rows: [
            { title: "Jul 2026", subtitle: "Gachibowli: 3 free · Madhapur: 1 free · HITEC: full", badge: "Open" },
            { title: "Aug 2026", subtitle: "Gachibowli: 2 free · Madhapur: 2 free · HITEC: 1 free" },
            { title: "Blocked", subtitle: "15–18 Aug — Deep cleaning (all listings)", badge: "Blocked" },
          ],
        },
      ],
    },
    earnings: {
      stats: [
        { label: "This month", value: "₹42,500" },
        { label: "Collected", value: "₹38,000" },
        { label: "Pending", value: "₹4,500" },
        { label: "Occupancy", value: "78%" },
      ],
      sections: [
        {
          title: "Stay payouts",
          rows: [
            { title: "Gachibowli PG — June rent", subtitle: "5 tenants · Collected 4 Jun", badge: "Paid", amount: "₹42,500" },
            { title: "Madhapur flat — Room B", subtitle: "Divya L. · Due 1 Jul", badge: "Due", amount: "₹12,000" },
            { title: "HITEC studio", subtitle: "Rohit & Anjali · Paid 10 Jun", badge: "Paid", amount: "₹15,000" },
          ],
        },
      ],
    },
    profile: {
      sections: [
        {
          title: "Host profile",
          rows: [
            { title: "Srinivas Reddy", subtitle: "Property host · Hyderabad" },
            { title: "Listings", subtitle: "3 properties · 18 total beds/rooms" },
            { title: "Average occupancy", subtitle: "78% over last 90 days" },
            { title: "Guest rating", subtitle: "4.7 ★ · 89 reviews" },
            { title: "Verification", subtitle: "Aadhaar · Ownership proof verified", badge: "Verified" },
          ],
        },
      ],
    },
  },

  studio: {
    dashboard: {
      stats: [
        { label: "Packages", value: "8" },
        { label: "Enquiries", value: "6" },
        { label: "This month", value: "₹1.2L" },
        { label: "Events booked", value: "4" },
      ],
      sections: [
        {
          title: "Packages",
          description: "Your most booked event packages.",
          rows: [
            { title: "Birthday basic", subtitle: "Decor + cake table · 4h", badge: "Popular", amount: "₹18,000" },
            { title: "Corporate meetup", subtitle: "AV + catering liaison · 6h", amount: "₹45,000" },
            { title: "Wedding sangeet", subtitle: "Stage + lighting + DJ · 8h", badge: "Premium", amount: "₹85,000" },
          ],
        },
        {
          title: "Portfolio",
          description: "Recent events from your gallery.",
          rows: [
            { title: "TechCorp annual day", subtitle: "HITEC City · 120 guests · 15 Jun", meta: "12 photos" },
            { title: "Sharma wedding sangeet", subtitle: "Banjara Hills · 250 guests · 8 Jun", meta: "24 photos" },
          ],
        },
        {
          title: "Enquiries",
          rows: [
            { title: "Birthday — 50 guests", subtitle: "Gachibowli · 6 Jul", badge: "New", amount: "₹22,000" },
            { title: "Product launch", subtitle: "Madhapur · 20 Jul", badge: "New", amount: "₹55,000" },
          ],
        },
      ],
    },
    leads: {
      sections: [
        {
          title: "Enquiries inbox",
          rows: [
            { title: "Birthday party — 50 guests", subtitle: "Gachibowli · 6 Jul · Decor + catering", badge: "New", amount: "₹22,000" },
            { title: "Product launch event", subtitle: "Madhapur · 20 Jul · AV + stage", badge: "New", amount: "₹55,000" },
            { title: "Engagement ceremony", subtitle: "Jubilee Hills · 2 Aug · Full package", badge: "Follow-up", amount: "₹68,000" },
          ],
        },
      ],
    },
    work: {
      sections: [
        {
          title: "Active events",
          rows: [
            { title: "TechCorp annual day", subtitle: "HITEC City · Today, 4:00 PM", badge: "Live", amount: "₹45,000" },
            { title: "Birthday — Mehta family", subtitle: "Gachibowli · 28 Jun, 6:00 PM", badge: "Confirmed", amount: "₹18,000" },
            { title: "Corporate offsite", subtitle: "Shamirpet · 5 Jul, 10:00 AM", badge: "Confirmed", amount: "₹62,000" },
          ],
        },
      ],
    },
    workDetail: {
      sections: [
        {
          title: "Event detail",
          rows: [
            { title: "TechCorp annual day", subtitle: "Ref VSH-EVT-7710", badge: "Live", amount: "₹45,000" },
            { title: "Client", subtitle: "TechCorp India · Priya Nair · +91 93456 78901" },
            { title: "Venue", subtitle: "Novotel HITEC City, Hyderabad 500081" },
            { title: "Schedule", subtitle: "Today · Setup 12 PM · Event 4–10 PM" },
            { title: "Crew", subtitle: "6 staff · Stage, AV, decor, coordination" },
          ],
        },
      ],
    },
    calendar: {
      sections: [
        {
          title: "Blackout calendar",
          rows: [
            { title: "20 Jun", subtitle: "TechCorp annual day — fully booked", badge: "Booked" },
            { title: "28 Jun", subtitle: "Mehta birthday — crew assigned", badge: "Booked" },
            { title: "5 Jul", subtitle: "Corporate offsite — Shamirpet", badge: "Booked" },
            { title: "12 Jul", subtitle: "Maintenance — equipment service", badge: "Blocked" },
          ],
        },
      ],
    },
    earnings: {
      stats: [
        { label: "This month", value: "₹1.2L" },
        { label: "Collected", value: "₹95,000" },
        { label: "Pending", value: "₹25,000" },
        { label: "Events done", value: "12" },
      ],
      sections: [
        {
          title: "Event payouts",
          rows: [
            { title: "Sharma wedding sangeet", subtitle: "8 Jun · Paid", badge: "Paid", amount: "₹85,000" },
            { title: "TechCorp annual day", subtitle: "20 Jun · Processing", badge: "Pending", amount: "₹45,000" },
            { title: "Birthday basic — Mehta", subtitle: "28 Jun · Advance received", badge: "Partial", amount: "₹9,000" },
          ],
        },
      ],
    },
    profile: {
      sections: [
        {
          title: "Studio profile",
          rows: [
            { title: "Celebrations by VS", subtitle: "Event planning & production · Hyderabad" },
            { title: "Services", subtitle: "Decor, AV, lighting, coordination, catering liaison" },
            { title: "Team", subtitle: "14 full-time · 20+ vendor partners" },
            { title: "Rating", subtitle: "4.9 ★ · 156 events completed" },
            { title: "Verification", subtitle: "GST · Portfolio verified", badge: "Verified" },
          ],
        },
      ],
    },
  },
};

export function getScaffoldPageData(modeKey: ModeKey, page: ScaffoldPageKey): ScaffoldPageData {
  return PAGES[modeKey][page];
}

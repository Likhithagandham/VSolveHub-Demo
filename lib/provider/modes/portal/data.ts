import type { ModePortalType } from "@/lib/provider/mode-config";

export type PortalStat = { label: string; value: string };
export type PortalRequest = {
  id: string;
  customer: string;
  title: string;
  detail: string;
  duration?: string;
  frequency?: string;
  salary?: string;
  schedule?: string;
  budget?: string;
  guests?: string;
  venue?: string;
  amount: string;
  status: "pending" | "accepted" | "declined" | "negotiating";
  badge?: string;
};

export type PortalItem = {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  amount?: string;
  meta?: string;
  qty?: number;
  status?: string;
};

export type PortalData = {
  availability: string;
  todaySchedule: string;
  stats: PortalStat[];
  requests: PortalRequest[];
  workItems: PortalItem[];
  calendarRows: PortalItem[];
  earnings: { stats: PortalStat[]; rows: PortalItem[] };
  profile: { skills: string[]; certs: string[]; reviews: { name: string; rating: number; text: string }[] };
};

export const PORTAL_DATA: Record<ModePortalType, PortalData> = {
  PROFESSIONAL: {
    availability: "Available today",
    todaySchedule: "3 visits · 9:00 AM – 6:00 PM",
    stats: [
      { label: "Pending requests", value: "4" },
      { label: "Active clients", value: "12" },
      { label: "Upcoming", value: "6" },
      { label: "Weekly hours", value: "32h" },
      { label: "Monthly earn", value: "₹18.2k" },
      { label: "Rating", value: "4.8 ★" },
    ],
    requests: [
      { id: "p1", customer: "Priya Sharma", title: "Maid — deep clean", detail: "3BHK, Gachibowli", duration: "4 hrs", frequency: "Weekly", salary: "₹6,000/mo", schedule: "Mon & Thu, 9 AM", amount: "₹6,000", status: "pending", badge: "New" },
      { id: "p2", customer: "Rajesh Kumar", title: "Cook — vegetarian", detail: "Family of 4, Madhapur", duration: "3 hrs", frequency: "Daily", salary: "₹12,000/mo", schedule: "7–10 AM daily", amount: "₹12,000", status: "pending", badge: "New" },
      { id: "p3", customer: "Anita Reddy", title: "Tutor — Class 8 maths", detail: "Jubilee Hills", duration: "1.5 hrs", frequency: "3×/week", salary: "₹8,000/mo", schedule: "Tue, Thu, Sat 5 PM", amount: "₹8,000", status: "pending" },
      { id: "p4", customer: "Suresh Naidu", title: "Home nurse — elderly care", detail: "Banjara Hills", duration: "8 hrs", frequency: "Daily", salary: "₹22,000/mo", schedule: "8 AM – 4 PM", amount: "₹22,000", status: "pending", badge: "Urgent" },
    ],
    workItems: [
      { id: "w1", title: "Maid — Meera Homes", subtitle: "Active · 6 months", badge: "Active", amount: "₹5,500/mo" },
      { id: "w2", title: "Babysitter — Kondapur", subtitle: "Today shift · 2–8 PM", badge: "On shift", amount: "₹800/day" },
      { id: "w3", title: "Driver — school pickup", subtitle: "Mon–Fri · 7:30 AM", badge: "Scheduled", amount: "₹10,000/mo" },
    ],
    calendarRows: [
      { id: "c1", title: "Monday", subtitle: "9:00 AM – 6:00 PM", badge: "Available", meta: "3 bookings" },
      { id: "c2", title: "Tuesday", subtitle: "9:00 AM – 6:00 PM", badge: "Available", meta: "2 bookings" },
      { id: "c3", title: "Wednesday", subtitle: "11:00 AM – 5:00 PM", badge: "Available", meta: "2 bookings" },
      { id: "c4", title: "Thursday", subtitle: "Day off", badge: "Leave" },
      { id: "c5", title: "Friday", subtitle: "9:00 AM – 3:00 PM", badge: "Available", meta: "1 booking" },
    ],
    earnings: {
      stats: [{ label: "Today", value: "₹850" }, { label: "Week", value: "₹3,850" }, { label: "Month", value: "₹18,200" }],
      rows: [
        { id: "e1", title: "Maid service — Gachibowli", subtitle: "20 Jun · Paid", badge: "Paid", amount: "₹850" },
        { id: "e2", title: "Cook — Madhapur", subtitle: "18 Jun · Paid", badge: "Paid", amount: "₹1,200" },
      ],
    },
    profile: {
      skills: ["Deep cleaning", "Cooking", "Child care", "Tutoring"],
      certs: ["Police verification", "First aid", "Food safety"],
      reviews: [{ name: "Priya S.", rating: 5, text: "Very punctual and thorough." }],
    },
  },
  RENTAL_VENDOR: {
    availability: "Warehouse open",
    todaySchedule: "2 deliveries · 1 return due",
    stats: [
      { label: "Total stock", value: "248" },
      { label: "Rented", value: "86" },
      { label: "Available", value: "162" },
      { label: "Pending", value: "5" },
      { label: "Overdue", value: "2" },
      { label: "Revenue", value: "₹42k" },
    ],
    requests: [
      { id: "v1", customer: "Event Co.", title: "50 chairs + tables", detail: "Outdoor wedding", schedule: "28 Jun delivery", amount: "₹8,500", status: "pending", badge: "New" },
      { id: "v2", customer: "BuildRight", title: "2× 5KVA generators", detail: "Site backup 7 days", schedule: "25 Jun pickup", amount: "₹14,000", status: "pending" },
      { id: "v3", customer: "Cool Air HVAC", title: "10 ton AC rental", detail: "Office event hall", schedule: "30 Jun – 2 Jul", amount: "₹6,200", status: "pending", badge: "Urgent" },
    ],
    workItems: [
      { id: "i1", title: "5KVA Generator", subtitle: "12 units · 4 rented", qty: 12, status: "available", amount: "₹800/day" },
      { id: "i2", title: "Plastic chairs", subtitle: "200 units · 50 rented", qty: 200, status: "available", amount: "₹25/day" },
      { id: "i3", title: "Power drill set", subtitle: "15 units · maintenance", qty: 15, status: "maintenance", amount: "₹150/day" },
      { id: "i4", title: "2 ton split AC", subtitle: "8 units · 6 rented", qty: 8, status: "available", amount: "₹1,200/day" },
    ],
    calendarRows: [
      { id: "vc1", title: "Generators", subtitle: "4 booked this week", meta: "High demand" },
      { id: "vc2", title: "Chairs & tables", subtitle: "Sat wedding block", meta: "28 Jun" },
      { id: "vc3", title: "AC units", subtitle: "3 returns due Fri", meta: "Maintenance slot" },
    ],
    earnings: {
      stats: [{ label: "Today", value: "₹2,400" }, { label: "Week", value: "₹12,800" }, { label: "Month", value: "₹42,000" }],
      rows: [
        { id: "ve1", title: "Generator rental — HITEC City", subtitle: "19 Jun · Paid", badge: "Paid", amount: "₹5,600" },
        { id: "ve2", title: "Chair set — Gachibowli", subtitle: "17 Jun · Pending", badge: "Pending", amount: "₹2,200" },
      ],
    },
    profile: { skills: ["Generators", "Event furniture", "HVAC"], certs: ["GST registered", "Safety compliance"], reviews: [] },
  },
  PROPERTY_HOST: {
    availability: "Accepting enquiries",
    todaySchedule: "1 viewing · 1 move-in",
    stats: [
      { label: "Total rooms", value: "24" },
      { label: "Occupied", value: "19" },
      { label: "Available beds", value: "5" },
      { label: "Enquiries", value: "7" },
      { label: "Move-ins", value: "2" },
      { label: "Revenue", value: "₹1.2L" },
    ],
    requests: [
      { id: "h1", customer: "Arjun Patel", title: "PG single room", detail: "Near HITEC City office", schedule: "Move-in 1 Jul", amount: "₹9,500/mo", status: "pending", badge: "New" },
      { id: "h2", customer: "Divya Menon", title: "2BHK apartment", detail: "Family · 6 month lease", schedule: "Viewing Sat 11 AM", amount: "₹28,000/mo", status: "pending" },
      { id: "h3", customer: "College group", title: "Hostel 4-sharing", detail: "4 students · Kukatpally", schedule: "Move-in 15 Jul", amount: "₹6,000/bed", status: "pending" },
    ],
    workItems: [
      { id: "l1", title: "Sunrise PG — Gachibowli", subtitle: "12 beds · 10 occupied", badge: "83%", amount: "₹9,500/bed" },
      { id: "l2", title: "Lake View Apartments", subtitle: "4 units · 3 occupied", badge: "75%", amount: "₹28,000/mo" },
      { id: "l3", title: "Student Hostel KPHB", subtitle: "8 beds · 6 occupied", badge: "75%", amount: "₹6,000/bed" },
    ],
    calendarRows: [
      { id: "hc1", title: "1 Jul", subtitle: "Move-in — Arjun (PG)", badge: "Move-in" },
      { id: "hc2", title: "5 Jul", subtitle: "Move-out — Room 204", badge: "Move-out" },
      { id: "hc3", title: "12 Jul", subtitle: "Blocked — maintenance", badge: "Blocked" },
    ],
    earnings: {
      stats: [{ label: "Today", value: "₹4,200" }, { label: "Week", value: "₹28,500" }, { label: "Month", value: "₹1,24,000" }],
      rows: [
        { id: "he1", title: "PG rent — Room 12", subtitle: "1 Jul · Received", badge: "Paid", amount: "₹9,500" },
        { id: "he2", title: "Apartment 3B — June", subtitle: "28 Jun · Received", badge: "Paid", amount: "₹28,000" },
      ],
    },
    profile: { skills: ["PG management", "Tenant screening"], certs: ["Property ownership", "Fire NOC"], reviews: [] },
  },
  EVENT_VENDOR: {
    availability: "Taking enquiries",
    todaySchedule: "2 site visits · 1 event Sat",
    stats: [
      { label: "Enquiries", value: "8" },
      { label: "Confirmed", value: "3" },
      { label: "Upcoming", value: "2" },
      { label: "Month earn", value: "₹85k" },
      { label: "Top package", value: "Gold wed" },
      { label: "Rating", value: "4.9 ★" },
    ],
    requests: [
      { id: "s1", customer: "Rohit & Ananya", title: "Wedding photography", detail: "500 guests", venue: "Taj Krishna", guests: "500", budget: "₹1.5L", schedule: "15 Dec 2026", amount: "₹1,50,000", status: "pending", badge: "Priority" },
      { id: "s2", customer: "TechCorp", title: "Corporate DJ + decor", detail: "Annual day", venue: "HITEC City", guests: "200", budget: "₹45k", schedule: "20 Jul", amount: "₹45,000", status: "pending" },
      { id: "s3", customer: "Sneha Reddy", title: "Birthday catering", detail: "50 guests home", venue: "Jubilee Hills", guests: "50", budget: "₹18k", schedule: "8 Aug", amount: "₹18,000", status: "pending" },
    ],
    workItems: [
      { id: "ev1", title: "Gold wedding package", subtitle: "Photo + video + album", badge: "Popular", amount: "₹1,20,000" },
      { id: "ev2", title: "DJ night package", subtitle: "4 hrs + sound", badge: "Active", amount: "₹35,000" },
      { id: "ev3", title: "Floral decor premium", subtitle: "Stage + entrance", badge: "Seasonal", amount: "₹55,000" },
    ],
    calendarRows: [
      { id: "sc1", title: "20 Jul", subtitle: "TechCorp annual day", badge: "Booked" },
      { id: "sc2", title: "8 Aug", subtitle: "Birthday event", badge: "Tentative" },
      { id: "sc3", title: "15 Dec", subtitle: "Wedding — hold", badge: "Blackout" },
    ],
    earnings: {
      stats: [{ label: "Today", value: "₹0" }, { label: "Week", value: "₹12,000" }, { label: "Month", value: "₹85,000" }],
      rows: [
        { id: "se1", title: "Corporate event deposit", subtitle: "15 Jun · Received", badge: "Paid", amount: "₹15,000" },
        { id: "se2", title: "Quote — wedding photo", subtitle: "Pending approval", badge: "Quote", amount: "₹1,50,000" },
      ],
    },
    profile: { skills: ["Photography", "Videography", "DJ", "Decor"], certs: ["Portfolio verified"], reviews: [{ name: "Rohit K.", rating: 5, text: "Amazing wedding coverage!" }] },
  },
};

export function getPortalData(type: ModePortalType): PortalData {
  return PORTAL_DATA[type];
}

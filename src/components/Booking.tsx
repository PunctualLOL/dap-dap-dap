import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarCheck, CheckCircle, XCircle } from "lucide-react";

const SUPABASE_URL = "https://szdcljeyjzxosjnzbbgy.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6ZGNsamV5anp4b3NqbnpiYmd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyMDQ5MjUsImV4cCI6MjA5Mjc4MDkyNX0.6G1fCM7xTTxbHVEQbHNm8fG_itYm6Lp0WA-Y_WsmQQA";
const MAX_CAPACITY = 40;

const OPENING_HOURS: Record<number, { open: string; close: string } | null> = {
  0: { open: "12:00", close: "20:00" }, // Sunday
  1: null,                               // Monday closed
  2: null,                               // Tuesday closed
  3: { open: "17:00", close: "21:00" }, // Wednesday
  4: { open: "17:00", close: "21:00" }, // Thursday
  5: { open: "17:00", close: "21:00" }, // Friday
  6: { open: "17:00", close: "22:00" }, // Saturday
};

function getTimesForDate(dateStr: string): string[] {
  if (!dateStr) return [];
  const day = new Date(dateStr).getDay();
  const hours = OPENING_HOURS[day];
  if (!hours) return [];
  const slots: string[] = [];
  const [openH, openM] = hours.open.split(":").map(Number);
  const [closeH, closeM] = hours.close.split(":").map(Number);
  let h = openH, m = openM;
  const lastH = closeH - 1;
  const lastM = closeM;
  while (h < lastH || (h === lastH && m <= lastM)) {
    slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    m += 30;
    if (m >= 60) { m -= 60; h += 1; }
  }
  return slots;
}

// Returns a map of time -> total guests already booked
async function getCapacityByTime(date: string): Promise<Record<string, number>> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/bookings?date=eq.${date}&select=time,guests`,
    { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` } }
  );
  if (!res.ok) return {};
  const data: { time: string; guests: string }[] = await res.json();
  const capacity: Record<string, number> = {};
  for (const row of data) {
    const g = row.guests === "9+" ? 9 : parseInt(row.guests, 10);
    capacity[row.time] = (capacity[row.time] || 0) + g;
  }
  return capacity;
}

async function createBooking(form: Record<string, string>): Promise<boolean> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/bookings`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      name: form.name,
      email: form.email,
      phone: form.phone,
      date: form.date,
      time: form.time,
      guests: form.guests,
      notes: form.notes || null,
    }),
  });
  return res.ok;
}

export const Booking = () => {
  const today = new Date().toISOString().split("T")[0];
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [capacityMap, setCapacityMap] = useState<Record<string, number>>({});
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", date: "", time: "", guests: "", notes: "",
  });

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  // Reload slots when date changes
  useEffect(() => {
    if (!form.date) return;
    setLoadingSlots(true);
    setForm((f) => ({ ...f, time: "" }));
    const slots = getTimesForDate(form.date);
    if (slots.length === 0) {
      setIsClosed(true);
      setAvailableSlots([]);
      setLoadingSlots(false);
      return;
    }
    setIsClosed(false);
    getCapacityByTime(form.date).then((cap) => {
      setCapacityMap(cap);
      setAvailableSlots(slots);
      setLoadingSlots(false);
    });
  }, [form.date]);

  // Re-check capacity when party size changes (so dropdown updates)
 const partySize = parseInt(form.guests || "0", 10);

  const getSlotStatus = (slot: string) => {
    const booked = capacityMap[slot] || 0;
    const remaining = MAX_CAPACITY - booked;
    if (remaining <= 0) return { available: false, label: "Fully booked" };
    if (partySize > 0 && partySize > remaining) return { available: false, label: `Only ${remaining} spaces left` };
    if (remaining <= 10) return { available: true, label: `${remaining} spaces left` };
    return { available: true, label: "Available" };
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.time || !form.guests) return;
    // Final capacity check before submitting
    const status = getSlotStatus(form.time);
    if (!status.available) return;
    setSubmitting(true);
    const ok = await createBooking(form);
    if (ok) setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <section id="book" className="py-24 md:py-32 bg-gradient-warm">
      <div className="container">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-2">
            <p className="uppercase tracking-[0.3em] text-primary text-xs mb-4">Reservations</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light mb-6 text-balance">
              Book your table at District 45
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Pick a date and party size — only times with enough space for your group will be available to book.
            </p>
            <div className="space-y-4 text-sm border-t border-border pt-8">
              <div>
                <p className="uppercase tracking-widest text-xs text-muted-foreground mb-1">By phone</p>
                <a href="tel:02879300333" className="text-lg hover:text-primary transition-colors">028 7930 0333</a>
              </div>
              <div>
                <p className="uppercase tracking-widest text-xs text-muted-foreground mb-1">By email</p>
                <a href="mailto:info@district45.co.uk" className="text-lg hover:text-primary transition-colors">info@district45.co.uk</a>
              </div>
              <div>
                <p className="uppercase tracking-widest text-xs text-muted-foreground mb-1">Address</p>
                <p>7 Garden Street, Magherafelt, BT45 5DD</p>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="uppercase tracking-widest text-xs text-muted-foreground mb-2">Opening Hours</p>
                <ul className="space-y-1 text-sm">
                  <li className="flex justify-between"><span>Sunday</span><span>12pm – 8pm</span></li>
                  <li className="flex justify-between text-muted-foreground"><span>Monday – Tuesday</span><span>Closed</span></li>
                  <li className="flex justify-between"><span>Wednesday – Friday</span><span>5pm – 9pm</span></li>
                  <li className="flex justify-between"><span>Saturday</span><span>5pm – 10pm</span></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 bg-card shadow-elegant border border-border p-8 md:p-10">
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-16 gap-4">
                <CheckCircle className="h-14 w-14 text-primary" />
                <h3 className="font-serif text-3xl">Booking confirmed!</h3>
                <p className="text-muted-foreground max-w-xs">
                  Thanks {form.name.split(" ")[0]}! Your table for {form.guests} guest{Number(form.guests) !== 1 ? "s" : ""} on {form.date} at {form.time} is reserved.
                </p>
                <Button variant="outline" className="mt-4" onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", date: "", time: "", guests: "", notes: "" }); }}>
                  Make another booking
                </Button>
              </div>
            ) : (
              <form onSubmit={onSubmit}>
                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-border">
                  <CalendarCheck className="h-6 w-6 text-primary" />
                  <h3 className="font-serif text-2xl">Reserve a table</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <Label htmlFor="name">Full name</Label>
                    <Input id="name" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Jane Doe" required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" required />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="07000 000000" required />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="guests">Party size</Label>
                    <Select value={form.guests} onValueChange={(v) => update("guests", v)} required>
                      <SelectTrigger id="guests"><SelectValue placeholder="How many guests?" /></SelectTrigger>
                      <SelectContent>
                        {{Array.from({length: 40}, (_, i) => i + 1).map((n) => (
                          <SelectItem key={n} value={String(n)}>{n} {Number(n) === 1 ? "guest" : "guests"}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" value={form.date} min={today} onChange={(e) => update("date", e.target.value)} required />
                    {form.date && isClosed && (
                      <p className="text-sm text-destructive mt-2 flex items-center gap-1">
                        <XCircle className="h-4 w-4" /> We're closed on this day. Please pick another date.
                      </p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="time">Time</Label>
                    {loadingSlots ? (
                      <p className="text-sm text-muted-foreground mt-2">Checking availability...</p>
                    ) : (
                      <Select value={form.time} onValueChange={(v) => update("time", v)} disabled={availableSlots.length === 0}>
                        <SelectTrigger id="time">
                          <SelectValue placeholder={form.date && !isClosed ? "Select an available time" : "Pick a date first"} />
                        </SelectTrigger>
                        <SelectContent>
                          {availableSlots.map((t) => {
                            const { available, label } = getSlotStatus(t);
                            return (
                              <SelectItem key={t} value={t} disabled={!available}>
                                {t} — {label}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="notes">Special requests <span className="text-muted-foreground">(optional)</span></Label>
                    <Textarea id="notes" value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Allergies, occasions, seating preferences..." rows={3} />
                  </div>
                </div>
                <Button type="submit" size="lg" className="w-full mt-8" disabled={submitting || !form.time || !form.guests}>
                  {submitting ? "Confirming..." : "Confirm reservation"}
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-4">
                  For same-day reservations please call us directly.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

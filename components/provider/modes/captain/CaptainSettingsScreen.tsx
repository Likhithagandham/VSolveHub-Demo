"use client";

import { useState } from "react";

export function CaptainSettingsScreen() {
  const [pushOffers, setPushOffers] = useState(true);
  const [pushEarnings, setPushEarnings] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [language, setLanguage] = useState("en");
  const [saved, setSaved] = useState(false);

  function save() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="rapido-page">
      <h1 className="rapido-page-title">Settings</h1>

      <section className="rapido-card">
        <h3 className="rapido-card-head">Notifications</h3>
        <label className="rapido-setting-row">
          <span>Live offer alerts</span>
          <input type="checkbox" checked={pushOffers} onChange={(e) => setPushOffers(e.target.checked)} />
        </label>
        <label className="rapido-setting-row">
          <span>Earnings & payouts</span>
          <input type="checkbox" checked={pushEarnings} onChange={(e) => setPushEarnings(e.target.checked)} />
        </label>
        <label className="rapido-setting-row">
          <span>SMS alerts</span>
          <input type="checkbox" checked={smsAlerts} onChange={(e) => setSmsAlerts(e.target.checked)} />
        </label>
      </section>

      <section className="rapido-card">
        <h3 className="rapido-card-head">Language</h3>
        <select className="form-input" value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="te">Telugu</option>
        </select>
      </section>

      <section className="rapido-card">
        <h3 className="rapido-card-head">Privacy</h3>
        <p className="rapido-muted">Location is shared only while you are online for dispatch matching.</p>
        <button type="button" className="rapido-btn rapido-btn-secondary rapido-btn-block">
          Privacy policy
        </button>
      </section>

      {saved && <p className="rapido-success">Preferences saved</p>}
      <button type="button" className="rapido-btn rapido-btn-accept rapido-btn-block" onClick={save}>
        Save preferences
      </button>
    </div>
  );
}

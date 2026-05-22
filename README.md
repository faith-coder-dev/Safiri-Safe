# Safiri-Safe

> **"Safiri"** (Swahili verb: *to travel / to move*) + **"Safe"** (English adjective: *protected from danger*). 
> **SafiriSafe** literally translates to **"Travel Safely"** — a lightweight, web-first, real-time geolocation tracking framework engineered to provide an instant safety blanket for commuters, solo travelers, and families across East Africa.

---

## The Core Problem & Innovation (The "No-Download" Edge)
Existing personal safety platforms (like Life360) suffer from high adoption friction—they require *both* the sender and the receiver to install native mobile applications, register accounts, and run heavy background data daemons. 

**SafiriSafe solves this by operating as a Web-First, One-Sided Architecture:**
* **The Traveler (User A)** logs into a secure progressive web dashboard, sets a destination, and activates streaming tracking via native browser HTML5 APIs.
* **The Trusted Contact (User B)** receives an encrypted, single-use web link via WhatsApp or SMS. Tapping the link opens an instant, interactive Leaflet map interface directly within their native mobile browser. **Zero downloads. Zero setups. Immediate visibility.**

---

## The Tech Stack
* **Frontend:** React.js, React-Leaflet, TailwindCSS, Vite
* **Backend:** Python, Flask-RESTful, Flask-SQLAlchemy, PyJWT
* **Database:** PostgreSQL (Production) / SQLite (Local Development)
* **APIs & Tools:** OpenStreetMap (OSM/Nominatim via Leaflet GeoSearch), Safaricom Daraja API (M-Pesa Express STK Push) / Flutterwave SDK

---

## System Directory Structure

```text
safirisafe/
│
├── backend/                  # Flask Engine
│   ├── app/
│   │   ├── __init__.py       # Factory pattern initialization
│   │   ├── models.py         # SQLAlchemy Database Schema 
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   ├── auth.py       # Authentication, JWT, HttpOnly Cookies
│   │   │   ├── tracking.py   # Token generation, Geolocation POST streams
│   │   │   └── payments.py   # M-Pesa / Flutterwave Webhook endpoints
│   │   └── utils.py          # Cryptographic hashing & helper functions
│   ├── config.py             # Server Environment Variable mapping
│   ├── run.py                # WSGI entry point
│   └── requirements.txt      # Python package configurations
│
├── frontend/                 # React Application
│   ├── public/
│   └── src/
│       ├── assets/           # Geolocation pins, iconography vectors
│       ├── components/
│       │   ├── MapViewer.jsx # Leaflet map container component
│       │   ├── Navbar.jsx
│       │   └── PrivateRoute.jsx
│       ├── views/
│       │   ├── Login.jsx
│       │   ├── Dashboard.jsx # Traveler dashboard (Start Journey / Autocomplete)
│       │   └── LiveTrace.jsx # Lightweight viewer map (Shared link interface)
│       ├── App.jsx           # Global route definitions
│       └── main.jsx          # Virtual DOM anchor
│
└── README.md
Relational Database Architecture (The 5 Core Tables)
To manage multi-tenancy, subscription states, and temporary spatial streams without data overlap, SafiriSafe utilizes a highly decoupled database schema:
1.	Users Table: Tracks central accounts, billing tiers, authentication signatures, and premium limits.
2.	Profiles Table: Implements a Netflix-style sub-tier layout. A single account can host up to 3 isolated tracking profiles (e.g., Parent, Child 1, Child 2) to facilitate independent tracking workflows.
3.	Trips Table: Stores unique journeys. Every trip generates a completely random cryptographic string (tracking_token) instead of exposing static user IDs.
4.	Locations Table: Keeps a lightweight historical stream of time-stamped coordinates (latitude, longitude, battery_percentage) mapped to an active trip.
5.	Payments Table: Audits incoming M-Pesa/Flutterwave transactions, receipts, and web-hook verification payloads to dynamically adjust expiry_date matrices.
________________________________________
 Security Hardening & Threat Modeling
SafiriSafe is explicitly designed to undergo aggressive black-box penetration testing:
•	Session Piracy Prevention: Shareable web links are bound via backend session validation. If an unauthorized 3rd party grabs a leaked tracking URL, the Flask backend flags anomalous browser fingerprints and blocks the view, firing an automatic push alert to the traveler.
•	XSS Mitigation: System authorization relies on dual-token mechanics. Access tokens are kept in short-lived memory, while long-term session validation relies on a Refresh Token encapsulated within an httpOnly, Secure, and SameSite=Strict cookie wrapper, isolating the session from client-side script manipulation.
•	Link Demolition: The moment a traveler clicks "End Journey", the associated tracking_token is flagged as Completed in the database. Historical location tracking instantly unbinds, rendering the link permanently dead.
________________________________________
Local Installation & Setup
Prerequisites
•	Python 3.10+
•	Node.js v18+
•	Ubuntu terminal environment (or equivalent WSL shell configuration)
Backend Configuration
Bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python run.py
Frontend Configuration
Bash
cd frontend
npm install
npm run dev


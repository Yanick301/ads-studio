
# Kwik Influencer Ads 🚀

A complete automated local advertising platform connecting merchants with micro-influencers.

## 🌟 Features

- **Automated Campaign Management**: Merchants create ads, system handles the rest.
- **Smart Matching**: AI-driven selection of micro-influencers based on package and platform.
- **WhatsApp Automation**: Cloud API integration to send briefs to influencers instantly.
- **Payment Integration**: Ready for Stripe, PayTech, and MTN Mobile Money.
- **Admin Dashboard**: Real-time analytics and user management.

## 🛠 Tech Stack

- **Frontend**: React 18, Tailwind CSS, Lucide Icons, Recharts.
- **Backend**: Node.js, Express.
- **Database**: MongoDB (Mongoose).
- **Integrations**: Meta WhatsApp Cloud API.

## 🚀 Installation & Setup

### 1. Database Connection (MongoDB)
To make the backend work, you need a MongoDB database.
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free account.
2. Create a new Cluster (Free Tier).
3. In "Database Access", create a user (e.g., `admin`) and password.
4. In "Network Access", allow access from anywhere (`0.0.0.0/0`).
5. Click "Connect" -> "Drivers" and copy the **Connection String**.
6. Paste it into your `.env` file as `MONGO_URI`.

### 2. Backend Setup

```bash
cd backend
npm install
# Rename the example file
cp ../.env.example .env
# Edit .env and paste your MongoDB URI
npm run dev
```

The server will start on `http://localhost:5000`.

### 3. Frontend Setup

In the root directory:

```bash
npm install
npm start
```

The React app will start on `http://localhost:3000`.

## 🤖 Automation Logic

1. **Merchant** pays for a campaign.
2. `payments/webhook` endpoint receives confirmation.
3. `matcher.js` finds `N` active influencers matching the platform (e.g., WhatsApp Status).
4. `whatsapp.js` sends a template message with the ad image and text to all selected influencers.
5. Influencers post the content and get paid (manual payout in this version).

## 📄 License
MIT

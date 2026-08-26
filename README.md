# TexTrace AI — Full-Stack Verification & Circularity Credit SaaS

> **AI-Powered Textile Waste Verification & Digital Circularity Credit Registry**

TexTrace AI operates with **Zero CapEx and Zero Inventory Handling**, converting fragmented supply chain documents (invoices, weighbridge slips, lab certificates, scope certs) into verified digital chains of custody and minting tamper-evident **Textile Recycling Credits (TRCs)**.

---

## 🚀 Live Cloud Deployment on Render

### Option A: 1-Click Render Blueprint
1. Push this repository to GitHub or GitLab.
2. Log in to [dashboard.render.com](https://dashboard.render.com).
3. Click **New +** → **Blueprint**.
4. Select this repository. Render will automatically read `render.yaml` and configure:
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
   - **Auto-assigned Live URL**: `https://textrace-ai.onrender.com`

---

### Option B: Manual Web Service on Render
1. In Render Dashboard, click **New +** → **Web Service**.
2. Select your repository.
3. Configure the following fields:
   - **Name**: `textrace-ai`
   - **Runtime**: `Node`
   - **Branch**: `main`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
4. Add Environment Variables:
   - `NODE_VERSION`: `20.17.0`
   - `NODE_ENV`: `production`
   - `GEMINI_API_KEY`: *(Optional: for live Gemini API document parsing)*
5. Click **Create Web Service**. Your app is live!

---

## 📡 Live Backend REST API Endpoints

Once deployed on Render (e.g. `https://textrace-ai.onrender.com`), all backend endpoints are live:

### 1. Document AI Extraction
```bash
curl -X POST https://textrace-ai.onrender.com/api/documents/extract \
  -H "Content-Type: application/json" \
  -d '{
    "fileName": "SGS_Test_Certificate.pdf",
    "content": "78.4% Cotton, 21.6% Polyester. GSM: 220. Net Quantity: 10,000 kg. Standard: RCS v2.0",
    "fileSize": "1.4 MB"
  }'
```

### 2. Automated Material Audit & Mass Reconciliation
```bash
curl -X POST https://textrace-ai.onrender.com/api/audit/reconcile \
  -H "Content-Type: application/json" \
  -d '{
    "batchId": "BATCH-2026-IND-8842",
    "vcrId": "TX-000184",
    "documents": [...]
  }'
```

### 3. Mint Recycling Credits (TRCs)
```bash
curl -X POST https://textrace-ai.onrender.com/api/credits \
  -H "Content-Type: application/json" \
  -d '{
    "batchId": "BATCH-2026-IND-8842",
    "vcrId": "TX-000184",
    "materialType": "Pre-Consumer Combed Cotton/Poly",
    "fiberComposition": "78.4% Cotton / 21.6% PET",
    "verifiedYieldKg": 8200,
    "issuerEntity": "EcoSpin Reclaimers Pvt Ltd",
    "sourceMill": "Sri Lakshmi Garment Mills Ltd"
  }'
```

### 4. Retire / Burn Recycling Credits
```bash
curl -X POST https://textrace-ai.onrender.com/api/credits/retire \
  -H "Content-Type: application/json" \
  -d '{
    "creditId": "TRC-2026-IND-TLM-8842",
    "retiredBy": "Nordic EcoWear Global",
    "beneficiaryBrand": "Nordic EcoWear Global",
    "productLine": "Autumn/Winter 2026 Circular Jersey Line",
    "orderReference": "PO #NW-4819-EU",
    "complianceMandate": "EU Digital Product Passport (DPP) & CSRD Scope 3"
  }'
```

### 5. Fetch Batches & DPP Records
```bash
curl https://textrace-ai.onrender.com/api/batches?vcrId=TX-000184
```

---

## 🛠 Local Development
```bash
npm install
npm run dev
# Open http://localhost:3000
```

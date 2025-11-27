# Stripe Payment Integration Guide for CSRMS Donor Portal

## 🎯 Overview
The CSRMS donation system now includes Stripe payment integration for secure credit card donations. Donors can make one-time donations using Stripe Checkout.

## 🔧 Setup Instructions

### 1. Get Stripe API Keys

For **DEMO/TESTING** (recommended for school projects):
1. Go to [https://stripe.com](https://stripe.com) and create a free account
2. Navigate to **Developers > API Keys**
3. Copy your **Test Mode** keys:
   - **Publishable key**: `pk_test_...` (for frontend - not used in current setup)
   - **Secret key**: `sk_test_...` (for backend)

### 2. Update Backend Environment Variables

Edit `csrms-backend/.env` and replace the demo keys with your actual Stripe test keys:

```env
# Stripe (Use test keys for demo)
STRIPE_SECRET_KEY=sk_test_YOUR_ACTUAL_TEST_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_test_YOUR_WEBHOOK_SECRET_HERE
```

> **Note**: The webhook secret is optional for local development. You'll need it for production webhooks.

### 3. Test Cards for Demo Donations

Use these test card numbers in Stripe Checkout (test mode):

| Card Number | Description | Expected Result |
|-------------|-------------|-----------------|
| `4242 4242 4242 4242` | Visa | ✅ Success |
| `5555 5555 5555 4444` | Mastercard | ✅ Success |
| `4000 0025 0000 3155` | Visa (requires authentication) | ✅ Success with 3D Secure |
| `4000 0000 0000 9995` | Visa | ❌ Declined |

**Additional test details:**
- **Expiry Date**: Any future date (e.g., 12/34)
- **CVC**: Any 3 digits (e.g., 123)
- **ZIP Code**: Any valid format (e.g., 12345)

## 🚀 How It Works

### Donation Flow

1. **Donor selects "Credit Card" payment method** in Make Donation form
2. **Clicks "Complete Donation"** button
3. **Redirected to Stripe Checkout** (secure Stripe-hosted page)
4. **Enters card details** and completes payment
5. **Redirected back** to donor dashboard with success message
6. **Donation record created** automatically via webhook
7. **Dashboard updates** to reflect new donation

### Backend Flow

```
Frontend → /api/donations/create-checkout-session → Stripe Checkout
                                                           ↓
Stripe Payment Complete → Webhook → /api/donations/webhook → Create Donation Record
                                                                        ↓
                                                              Update Dashboard Stats
```

## 📁 Files Modified

### Backend
- ✅ `csrms-backend/.env` - Added Stripe API keys
- ✅ `csrms-backend/src/routes/donations.js` - Added checkout session and webhook endpoints
- ✅ `csrms-backend/package.json` - Added stripe dependency

### Frontend
- ✅ `csrms-frontend/src/pages/donor/MakeDonation.jsx` - Integrated Stripe redirect
- ✅ `csrms-frontend/src/pages/donor/DonorDashboard.jsx` - Added success/cancel modals
- ✅ `csrms-frontend/src/services/api.js` - Added createStripeCheckoutSession method
- ✅ `csrms-frontend/package.json` - Added @stripe/stripe-js dependency

## 🧪 Testing the Integration

### Step 1: Start Both Servers

**Terminal 1 - Backend:**
```bash
cd csrms-backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd csrms-frontend
npm run dev
```

### Step 2: Make a Test Donation

1. Login as a donor user
2. Navigate to "Make Donation" tab
3. Select an amount (e.g., 10000 RWF)
4. Choose "One-time" donation
5. Select a category
6. Choose "Credit Card" as payment method
7. Click "Complete Donation"
8. You'll be redirected to Stripe Checkout
9. Use test card: `4242 4242 4242 4242`
10. Complete the payment
11. You'll be redirected back with success message

### Step 3: Verify Donation

1. Check the success modal appears
2. Go to "Dashboard" to see updated total
3. Go to "Donation History" to see the new donation
4. Check backend console for webhook logs

## 🔐 Security Notes

### For Development/Demo
- ✅ Using test mode keys (safe to commit to school projects)
- ✅ Stripe Checkout handles all payment security
- ✅ No card data touches your server
- ✅ PCI compliance handled by Stripe

### For Production (Future)
- ⚠️ Switch to live mode keys
- ⚠️ Store keys in secure environment variables
- ⚠️ Set up proper webhook endpoint with HTTPS
- ⚠️ Configure webhook signing secret
- ⚠️ Add error handling and logging
- ⚠️ Implement proper receipt generation

## 🌐 Webhook Setup (Optional for Production)

### Local Testing with Stripe CLI
```bash
# Install Stripe CLI
# Download from: https://stripe.com/docs/stripe-cli

# Login to your Stripe account
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:5000/api/donations/webhook

# This will give you a webhook signing secret
# Add it to your .env file as STRIPE_WEBHOOK_SECRET
```

### Production Webhook Setup
1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://yourdomain.com/api/donations/webhook`
3. Select events: `checkout.session.completed`, `payment_intent.payment_failed`
4. Copy the signing secret to your production `.env`

## 💡 Features Implemented

✅ **Stripe Checkout Integration** - Secure hosted payment page  
✅ **One-time Donations** - Support for single donations  
✅ **Multiple Currencies** - RWF, USD, EUR support  
✅ **Webhook Handling** - Automatic donation record creation  
✅ **Success/Cancel Flow** - User-friendly redirect handling  
✅ **Dashboard Updates** - Real-time stats refresh  
✅ **Donation History** - Complete transaction tracking  
✅ **Test Mode** - Safe testing with test cards  

## 🎓 For School Demonstration

**What to show:**
1. ✅ Secure payment flow with Stripe Checkout
2. ✅ Test card payment (4242 4242 4242 4242)
3. ✅ Success redirect and confirmation
4. ✅ Dashboard updates with new donation
5. ✅ Donation history showing completed transaction
6. ✅ Backend webhook logs showing payment processing

**What to mention:**
- 🔒 PCI compliant - no card data stored on our server
- 🌍 Production-ready - used by companies worldwide
- 🎯 Educational purposes - using test mode safely
- 💳 Real-world payment flow simulation

## 📚 Additional Resources

- [Stripe Testing Docs](https://stripe.com/docs/testing)
- [Stripe Checkout Guide](https://stripe.com/docs/checkout/quickstart)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)
- [Test Cards](https://stripe.com/docs/testing#cards)

## 🐛 Troubleshooting

### "Payment failed" in Stripe
- ✅ Make sure you're using test card numbers in test mode
- ✅ Check that expiry date is in the future
- ✅ Verify amount is greater than 0

### Webhook not working
- ✅ Check STRIPE_WEBHOOK_SECRET in .env
- ✅ Verify webhook signature in console logs
- ✅ Use Stripe CLI for local testing

### Donation not appearing
- ✅ Check backend console for webhook logs
- ✅ Verify MongoDB connection
- ✅ Check donation status in Stripe Dashboard

## ✨ Future Enhancements

Possible additions for the future:
- 🔄 Recurring donations (monthly subscriptions)
- 📧 Email receipts via Stripe
- 💰 Multiple currency support with conversion
- 📊 Advanced analytics integration
- 🎁 Donation matching campaigns
- 📱 Mobile Money integration (MTN, Airtel)

---

**Made for CSRMS - Child Support and Resource Management System**  
*Educational project demonstrating modern payment integration*

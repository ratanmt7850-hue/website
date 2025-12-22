# Analytics Setup Guide

This project now includes both Google Analytics and Facebook Pixel tracking. Follow these steps to configure them:

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Google Analytics
# Get this from Google Analytics Admin > Data Streams > Web Stream > Measurement ID
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Facebook Pixel
# Get this from Facebook Business Manager > Events Manager > Data Sources > Pixels
NEXT_PUBLIC_FB_PIXEL_ID=1052464643713026
```

## Setup Instructions

### Google Analytics Setup

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property or use an existing one
3. Go to Admin > Data Streams > Web Stream
4. Create a new web stream for your website
5. Copy the Measurement ID (starts with "G-")
6. Add it to your `.env.local` file

### Facebook Pixel Setup

1. Go to [Facebook Business Manager](https://business.facebook.com/)
2. Navigate to Events Manager > Data Sources
3. Create a new Pixel or use an existing one
4. Copy the Pixel ID (numeric value)
5. Add it to your `.env.local` file

## Usage

The analytics are automatically loaded on all pages. You can also track custom events using the utility functions:

```typescript
import {
  trackButtonClick,
  trackFormSubmission,
  trackPurchase
} from "@/app/utils/analytics";

// Track button clicks
trackButtonClick("signup_button", "homepage");

// Track form submissions
trackFormSubmission("contact_form");

// Track purchases
trackPurchase(1000, "INR");
```

## Available Tracking Functions

- `trackGAEvent(action, category, label?, value?)` - Track custom Google Analytics events
- `trackFbEvent(eventName, parameters?)` - Track custom Facebook Pixel events
- `trackPageView(url)` - Track page views
- `trackButtonClick(buttonName, page)` - Track button clicks
- `trackFormSubmission(formName)` - Track form submissions
- `trackPurchase(value, currency)` - Track purchases

## Testing

1. Start your development server: `npm run dev`
2. Open your website
3. Check the browser console for any errors
4. Verify tracking in Google Analytics Real-Time reports
5. Verify tracking in Facebook Pixel Helper browser extension

## Privacy Compliance

Make sure to:

- Update your privacy policy to mention analytics tracking
- Implement cookie consent if required by your jurisdiction
- Consider implementing analytics opt-out functionality for users

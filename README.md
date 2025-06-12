# Swarnbhoomi

Swarnbhoomi is an AI-powered agriculture platform that empowers India’s small and marginal farmers with actionable insights, real-time market intelligence, and a collaborative digital community. With both web and mobile apps, Swarnbhoomi delivers expert guidance, transparent pricing, and peer support—making farming more profitable, adaptive, and sustainable.

_Submission for Google Solution Challenge 2025_

_Backend repository: [Swarnbhoomi Backend](https://github.com/santtun1/swarnbhoomi-backend.git)_

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation & Setup](#installation--setup)
  - [Web Application](#web-application)
  - [Mobile Application](#mobile-application)
- [Usage](#usage)
- [Demo](#demo)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Swarnbhoomi addresses the key challenges of Indian agriculture—like unpredictable weather, limited advisory services, volatile mandi prices, and fragmented community support. By blending AI-powered advisory, NDVI crop health tracking, live market prices, and a knowledge-sharing forum, Swarnbhoomi helps farmers make better decisions and build resilient, connected rural communities.

---

## Features

- **Smart Crop Advisory:** Personalized advice for crops, irrigation, and fertilizers using NDVI, weather, and field data.
- **NDVI & Health Monitoring:** Track field-wise crop health trends with Google Earth Engine data.
- **Mandi Price Filter:** Check and compare real-time commodity prices by crop, mandi, and region.
- **Equipment Rental Platform:** Rent or lend farm machinery within your village or district.
- **Soil & Crop Planner:** Fertilizer and crop suggestions based on Soil Health Card and forecast data.
- **FPO Locator:** Discover and connect with local Farmer Producer Organizations via interactive map.
- **Learning & Community Hub:** Share experiences, access guides, and discuss with fellow farmers.
- **Voice & Multilingual Chatbot:** Ask questions and get answers in your local language—by text or voice.
- **Push Alerts:** Receive instant weather updates and reminders.
- **Farm Location Manager:** Mark, save, and monitor multiple farm fields for tailored insights.

---

## Tech Stack

**Frontend:**  
- React.js (Web)  
- React Native + Expo (Mobile)  
- Tailwind CSS  
- Ionic Framework (for mobile UI)  
- Framer Motion, Lucide Icons  

**Backend & APIs:**  
- Node.js, Express.js  
- Gemini API (Google Generative AI)  
- Google Earth Engine  
- WeatherAPI.com  

**Authentication, Database, Storage:**  
- Firebase Authentication  
- Firestore Database  
- Firebase Storage  

**Notifications & Communication:**  
- Firebase Cloud Messaging  
- Twilio (for IVR, phone alerts)  

**Cloud & Hosting:**  
- Google Cloud Platform  
- Vercel or Render (for web hosting)  

---

## Installation & Setup

### Web Application

1. **Clone the repository:**
    ```sh
    git clone https://github.com/santtun1/swarnabhoomi.git
    cd swarnbhoomi
    ```
2. **Install dependencies:**
    ```sh
    npm install
    ```
3. **Add environment variables:**  
   Create a `.env` file in the root directory and add your API keys (Firebase, Gemini, Weather, Google Maps, etc).

4. **Run the app:**
    ```sh
    npm run dev
    ```

---

### Mobile Application

Built using React Native and Expo for cross-platform support.

1. **Prerequisites:**  
   - Node.js >= 16.x  
   - Expo CLI (`npm install -g expo-cli`)
2. **Clone the mobile app repo:**  
    ```sh
    git clone https://github.com/santtun1/swarnbhoomi-mobile.git
    cd swarnbhoomi-mobile
    ```
3. **Install dependencies:**  
    ```sh
    npm install
    ```
4. **Configure your `.env` file** with all required API keys.
5. **Start the Expo development server:**  
    ```sh
    npx expo start
    ```
   - Scan the QR code with Expo Go (Android/iOS) to try the app instantly.
   - For Android, an APK build is available for direct installation.

---

## Usage

- **Register/Login** to access your personalized dashboard.
- **Mark your fields** on the map for location-based insights and NDVI monitoring.
- **Get advisory, track trends,** and check live mandi prices.
- **Use the rental marketplace** for equipment sharing.
- **Connect with FPOs** and participate in the farmer community.

---

## Demo

- **APK & Demo Video:**  
  [Google Drive Demo Link](#) <!-- ← Replace with your actual Google Drive link -->

- _For a quick look at the app’s features and workflow, watch the video or install the APK from the above link._

---

## Contributing

We are currently not accepting external contributions.  
If you have suggestions or wish to report issues, please open an issue on this repository.

_Internal collaborators: Fork, create a feature branch, commit, push, and submit a Pull Request as usual._

---

## License

[MIT License](LICENSE)

---

## Learn More

- [React Documentation](https://react.dev/)
- [React Native / Expo](https://docs.expo.dev/)
- [Firebase Docs](https://firebase.google.com/docs)
- [Google Cloud Docs](https://cloud.google.com/docs)
- [Ionic Docs](https://ionicframework.com/docs)

---

_Questions? Open an issue or contact the Swarnbhoomi team for support._

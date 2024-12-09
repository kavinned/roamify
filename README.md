# Travel Planner Project Overview (Roamify)

## Goal
Develop a web application where users can manage travel itineraries, search destinations, view recommended attractions and hotels, and perform CRUD operations on their plans.

## Features

1. **Authentication**:
   - User sign-in using Google (via Clerk).
   - Route protection for authenticated users.

2. **Itinerary Management**:
   - Create, read, update, and delete travel itineraries.
   - Plan itineraries with destinations, dates, and selected activities.

3. **Destination Search**:
   - Search and display city details using the Amadeus API.

4. **Destination Info**:
   - Show detailed information about selected cities, including top attractions.

5. **Recommended Attractions & Activities**:
   - Fetch and display recommended activities and points of interest for destinations using Amadeus's Points of Interest and Activities API.

6. **Hotel Listings**:
   - Provide hotel search and display options for selected destinations using the Amadeus Hotel Search API.

7. **Dark Mode**:
   - Support dark mode with user preferences stored locally.

## Tech Stack

- **Frontend**: 
  - React with TypeScript, Vite, TailwindCSS (ShadCN/Origin/TailwindUI)
  
- **Routing**:
  - React-Router
  
- **State Management**: 
  - Redux Toolkit.
  
- **Authentication**: 
  - Clerk (with Google Sign-In integration).
  
- **Backend**: 
  - Node.js with Express, using MongoDB for data storage.

- **API**: 
  - Air Scrapper (RapidAPI)
    - Search destinations and hotels.
  - TrueWay Places (RapidAPI)
    - Get top attractions and activities for destinations.
  - Wikipedia 
    - Get city information.

## Deployment

- **Frontend**: Vercel or Netlify.
- **Backend**: Bun with Express on Render or Vercel.
- **Database**: MongoDB Atlas.

## Planned Enhancements

- Notifications for itineraries.
- Social sharing for travel plans.
- Offline viewing for itineraries.

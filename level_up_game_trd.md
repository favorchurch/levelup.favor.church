# Level Up: Technical Requirements Document (TRD)

## Project Overview
**Level Up** is a gamified 21-day spiritual challenge app built for Favor Church (YTH CAMP). It facilitates daily scripture reading, reflection, and community engagement through a high-energy, "Duolingo-style" progression system.

## Core Gameplay Mechanics

### 1. The 21-Day Journey
- **Vertical Path**: A linear progression from Day 1 to Day 21.
- **Unlock Logic**: 
    - **Day 1**: Accessible immediately upon login.
    - **Days 2–21**: Unlocked sequentially based on the calendar date (May 30 = Day 1, May 31 = Day 2, etc.).
- **Content Structure**: 
    - **Theme**: Weekly themes (Abide, Renewed, Battle).
    - **Scripture**: Daily John 15, Romans 12, or Ephesians 6 verses.
    - **Reflection**: Open-ended journaling prompt.
    - **Mission/Challenge**: Actionable task to share with a connect group.

### 2. Avatar Progression System
- **Leveling**: Users gain XP by completing daily reflections and challenges.
- **Upgrades**: Upon completing a day, users choose one permanent daily upgrade. 
    - **Categories**: Weapon (e.g., Steel Sword), Armor (e.g., Starter Jacket), Companion (e.g., Loyal Dog).
    - **Constraint**: Once a daily upgrade is chosen, it is permanent for that day and adds to the user's "Armory."
- **Avatar Armory**: A profile section showcasing the equipped items, current level, and progress to the next level.

### 3. Gamification & Mini-Games
- **Mystery Chests**: Unlocked every 3–7 days (randomized milestones). 
    - **Rewards**: Rare badges, bonus XP, or tokens.
- **Easter Egg**: A floating "bolt" icon on devotion screens that triggers a simple, interactive Flappy Bird-style mini-game.
- **Streaks**: Visual indicators of consecutive days completed to drive retention.

### 4. Community & Social Features
- **Hall of Faith (Leaderboard)**: A public ranking based on XP and completion streaks.
- **Who's Online**: Real-time social proof showing first names and last initials of other active users.
- **Connect Integration**: Quick actions to "Contact Leader" or "Post to Group" for daily challenges.

## Technical Specifications

### Authentication
- **Provider**: Supabase.
- **Method**: Email-based login (passwordless/direct entry).
- **Onboarding**: Captures Full Name and Email Address during the "Are You Ready?" flow.

### Navigation
- **Footer Tabs**: Home (The Journey), Leaderboard (Hall of Faith), Badges (Rewards/Armory).
- **Day Cycling**: Sequential navigation (left/right arrows) on devotion screens to revisit previous content.

### Visual Identity
- **Design System**: Level Up Design System (Dark Mode).
- **Primary Color**: YTH CAMP Orange (#FF5500).
- **Typography**: Montserrat (Bold, straight typography for headlines).
- **Aesthetic**: High-contrast, gaming-inspired UI with bold utility-focused components.

## Content Roadmap
- **Week 01**: Abide in Christ (John 15)
- **Week 02**: Renewed and Equipped (Romans 12)
- **Week 03**: Ready for Battle and Mission (Ephesians 6)
- **Final Milestone**: Day 21 "The Summit" unlock and final reward.
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

## CONTENT STRUCTURE
WEEK 01 // ABIDE IN CHRIST
Theme: Staying connected to Jesus and bearing fruit.
Chapter: John 15
Day 1
Scripture: John 15:1–3
Reflection: What areas of my life need pruning?
Challenge: Identify 1 distraction or habit that pulls you away from God and share it with your connect leader via PM.
Day 2
Scripture: John 15:4–6
Reflection: What does “abiding” look like for me daily?
Challenge: Share a 3 minute voice note prayer to your connect group chat or connect leader.
Day 3
Scripture: John 15:7–8
Reflection: How is my prayer life connected to abiding?
Challenge: Write down 3 prayer requests and send it in your connect group chat.
Day 4
Scripture: John 15:9–11
Reflection: Am I obeying from love or obligation?
Challenge: Set the atmosphere and worship for 5 mins, then spend the next 5 minutes writing down whatever God drops in your heart. Share it with your connect leader or group chat if you feel comfortable.
Day 5
Scripture: John 15:12–14
Reflection: How can I love others like Jesus?
Challenge: Do 1 intentional act of kindness without sharing it to anyone. Let it be between you and Jesus.
Day 6
Scripture: John 15:15–17
Reflection: What does it mean to be chosen and appointed?
Challenge: Encourage 1 friend through a prayer, with a voice message, or conversation.
Day 7
Scripture: John 15:18–27
Reflection: How do I stay faithful when my faith is challenged in school?
Challenge: Share on IG or FB 1 takeaway from camp or this week’s devotion.
WEEK 02 // RENEWED AND EQUIPPED
Theme: Transformation, identity, and practical Christian living.
Chapter: Romans 12
Day 8
Scripture: Romans 12:1–2
Reflection: Where am I fitting in instead of creating change?
Challenge: Fast from social media & games and replace that time with prayer or reading.
Day 9
Scripture: Romans 12:3–5
Reflection: How do I view myself in the body of Christ?
Challenge: Message in your Connect group and ask how you can pray for them. Send a voice note prayer to everyone that responds.
Day 10
Scripture: Romans 12:6–8
Reflection: What gifts has God given me?
Challenge: Use your gifts or talents to serve someone today. Take a video or selfie and share it on social media. Tag @favor.youth with #Day10
Day 11
Scripture: Romans 12:9–10
Reflection: Is my love genuine?
Challenge: Give sincere encouragement to 3 people via voice note or message.
Day 12
Scripture: Romans 12:11–13
Reflection: How can I stay spiritually passionate?
Challenge: Do all the house chores today and tell the person who usually does it that they can rest today.
Day 13
Scripture: Romans 12:14–18
Reflection: How do I respond to difficult people?
Challenge: Think of one person who has hurt you. Share that to your connect leader ONLY. Pray together.
Day 14
Scripture: Romans 12:19–21
Reflection: How can I overcome evil with good this week?
Challenge: If something annoying or frustrating happens today, respond with kindness.
WEEK 03 // READY FOR BATTLE AND MISSION
Theme: Spiritual warfare, prayer, and bold evangelism.
Chapter: Ephesians 6
Day 15
Scripture: Ephesians 6:1–4
Reflection: How do I honor authority well?
Challenge: Honor your parents/guardians today by writing them a letter or getting a gift. Send and celebrate it in your connect group chats.
Day 16
Scripture: Ephesians 6:5–9
Reflection: How can I serve with excellence at school?
Challenge: Invite someone to serve someone in your school/community today.
Day 17
Scripture: Ephesians 6:10–13
Reflection: Where do I need God’s strength?
Challenge: Start your morning by praying for strength and protection. Send a 5 minute voice note to your connect group chat.
Day 18
Scripture: Ephesians 6:14–15
Reflection: Am I walking in truth and peace?
Challenge: Share a bible verse or encouraging message with 1 friend or classmate you are not close to. Send a selfie to your connect group chat.
Day 19
Scripture: Ephesians 6:16–17
Reflection: Which part of God’s armor do I need most right now?
Challenge: Memorize this bible verse this week.
Day 20
Scripture: Ephesians 6:18–20
Reflection: How can I grow in prayer and boldness?
Challenge: Pray for 3 friends who need Jesus. Take a picture with them and tag them on social media.
Day 21
Scripture: Ephesians 6:21–24
Reflection: What will I carry forward after these 21 days?
Challenge: Invite 1 person who has never come to youth service this Saturday.

## BUILD
Database schema for this content (MongoDB Atlas)
Seed files for all 21 days
UI for daily challenge cards
Locked/unlocked states
Completion tracking
Reflection submission system
Leaderboard mechanics
Progress/streak systems
Notification scheduling
Admin dashboard for editing these devotionals
Mobile-first responsive design
Beautiful onboarding flow
Reward system and badges

## IMPORTANT UX REQUIREMENTS
The app should feel:
addictive in a healthy way
spiritually warm
community-centered
rewarding
modern and premium

## Include
animations
streak visuals
progress rings
XP/gamification
badges
confetti/reward moments
locked mystery cards for future days

## Priority
Focus first on:
Daily unlock system
Challenge completion flow
Reflections
Leaderboards
Admin content management

## Gamify Notes for Avatar / Rewards
During John, they will have capability to change base avatar, earn coins etc.
During Romans, they should be able to fix their face, etc.
During Ephesians, the rewards equip advanced pieces of the armor of God. They can equip actual armor here.

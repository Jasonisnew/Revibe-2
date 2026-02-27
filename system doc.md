# Revibe MVP Core Flow Documentation

## Persona & Context

**Persona**: A motivated athlete or knowledge worker recovering from a physical injury. They juggle daily responsibilities while following a rehab plan prescribed by their therapist. Their primary goal is to regain strength and mobility through consistent, structured exercises and to monitor progress toward full recovery.

**Triggers & Motivations**:

- Feeling pain, stiffness, or weakness during daily activities
- Reminder from a therapist to perform rehab exercises
- Desire to track rehab progress and avoid re-injury
- Seeing progress metrics such as “days till recovery” and streaks

**High-level Goal**: Use Revibe to structure, perform, and track rehabilitation exercises, build a sustainable daily habit, and ultimately recover.

## User Journey Narrative

1. **Trigger – Feeling the need to rehab**  
   The user experiences discomfort or receives a reminder from their therapist and realizes it’s time to perform rehab exercises. They want reassurance and guidance to stay on track.

2. **Entry – Opening Revibe**  
   They open the Revibe app. The home dashboard greets them with a friendly mascot, shows days until recovery, and displays their daily completion progress. This reduces anxiety by providing context.

3. **Exploration – Browsing plans and movements**  
   From the dashboard they review their daily plan. If nothing is scheduled they explore the “Movements” library by tapping the lightning icon. A body diagram helps them pick the correct muscle group (e.g. shoulders or quads). They scan short descriptions and choose suitable exercises.

4. **Planning – Organizing a session**  
   Back on the “Daily Plans” screen, they schedule a session: they set a title, date, duration, and select movements to include. They may also use quick-filter buttons (Shoulders, Chest, Arms, Thighs) to choose categories and then press **Save session**.

5. **Decision – Starting exercises**  
   Ready to train, they press **Start All Exercises** or **Start** for an individual movement. They commit to performing the plan and prepare their camera and environment.

6. **Execution – Performing the exercise**  
   The camera view opens with positioning tips. They follow the movement instructions and keep themselves in frame. A progress card shows the exercise name, cue text, and a timer. They tap **Complete** when done and move to the next exercise.

7. **Reflection – Reviewing progress**  
   After finishing, they return to the dashboard. The progress bar updates, daily completion percentage increases, and their streak and total hours adjust. They feel a sense of satisfaction and may log notes or chat with the AI Agent for additional guidance.

8. **Habit Loop – Returning consistently**  
   Encouraged by the updated metrics and motivational messages, they return the next day or when pain returns. Over time this loop builds a daily rehab habit, making recovery sustainable.

### User Journey Table

| Step | Stage        | User Context / Action      | User Thought / Emotion      | Product Responsibility        |
|-----:|--------------|----------------------------|-----------------------------|------------------------------|
| 1    | Trigger      | Pain or reminder prompts use | “I should rehab” – anxious | Be available & reassuring    |
| 2    | Entry        | Opens app, sees dashboard  | “This looks encouraging” – relief | Reduce friction & show status |
| 3    | Exploration  | Browses daily plan & movement library | “What exercises suit me?” – curiosity | Provide clear categories & search |
| 4    | Planning     | Schedules session & selects movements | “How do I organize my rehab?” – need structure | Offer simple forms & smart defaults |
| 5    | Decision     | Presses Start session      | “I’m ready to begin” – commitment | Surface next action clearly |
| 6    | Execution    | Performs exercises with camera view | “Am I doing this correctly?” – focused | Guide, instruct & track progress |
| 7    | Reflection   | Returns to dashboard, sees updated progress | “That felt productive” – satisfaction | Reinforce progress & update metrics |
| 8    | Habit Loop   | Returns next day or when needed | “This is helping me recover” – trust | Encourage streaks & build habit |

## Key Screen Wireframes

### Dashboard (Home)

- **Purpose**: Provide an overview of recovery progress and quick access to daily tasks.
- **Primary user intent**: Check current completion percentage and select where to go next.
- **Layout structure**:  
  - **Top bar**: Device time indicator.  
  - **Main content**: Mascot & days until recovery, progress bar (percentage complete), daily plans section with date selector, a card summarizing lower/upper body completion, quick access cards (e.g. Find a suitable recovery workout, AI Agent).  
  - **Bottom navigation**: Home, Movements, Start Session, Chat, Profile.
- **Primary actions**: Navigate to daily plan, open body part categories, start a session.
- **Secondary actions**: View all upcoming sessions, chat with AI agent.
- **Key states**:  
  - **Loading**: Show skeleton loaders & disable navigation.  
  - **Ready**: Show progress metrics and daily plan.  
  - **Empty**: If no sessions are scheduled show an encouragement message & call-to-action to schedule.  
  - **Error**: Display error banner and retry button.
- **Success outcome**: User understands their progress and knows what to do next.
- **Next step**: Tap a daily plan item, navigate to Movements, or open AI agent.

### Movements Library

- **Purpose**: Help users discover rehab movements and choose exercises by body region.
- **Primary user intent**: Browse and select exercises for specific muscle groups.
- **Layout structure**:  
  - **Top bar**: Search field, front/back view toggle.  
  - **Main content**: Body diagram with clickable regions (shoulder, chest, quadriceps, arms, etc.). List of exercise cards with thumbnail, name, targeted muscle group, difficulty, description, and **Start/Schedule** buttons.  
  - **Bottom navigation**: Same as dashboard.
- **Primary actions**: Filter by body region, start an exercise, schedule an exercise.
- **Secondary actions**: Read exercise description, view movement tips.
- **Key states**: Loading, Ready (list populated), Empty (no exercises match search), Error (failed to load).
- **Success outcome**: User finds suitable exercises and can start or schedule them.
- **Next step**: Start exercise or return to planning.

### Daily Plans / Scheduler

- **Purpose**: Allow users to view, create, and manage sessions for a given day.
- **Primary user intent**: Organize rehab sessions and review progress for the day.
- **Layout structure**:  
  - **Top bar**: Date & time display.  
  - **Main content**: Today’s progress bar; list of upcoming sessions; **Schedule a session** form with title, date, time, duration, movement dropdown, notes field; quick filters for body parts; list of selected exercises with progress indicators; **Start All Exercises** button.  
  - **Bottom navigation**: Same as dashboard.
- **Primary actions**: Schedule a session, save session, start all exercises, start individual exercises.
- **Secondary actions**: Edit or delete a session, filter by body region.
- **Key states**: Empty (no sessions yet), Editing (form open), Ready (sessions listed), Error.
- **Success outcome**: User creates or edits a session and knows exactly what exercises to perform.
- **Next step**: Tap Start or return to dashboard.

### Exercise Player (Camera)

- **Purpose**: Guide users through each exercise with real-time feedback.
- **Primary user intent**: Perform a rehab movement correctly.
- **Layout structure**:  
  - **Top bar**: Back arrow.  
  - **Main content**: Camera view (video preview with tips overlay). Positioning tips card (center yourself, good light, etc.). Exercise card with name, cue text, duration; navigation arrows to previous/next exercise; **Complete** button.  
  - **Bottom area**: Minimal controls to avoid distraction.
- **Primary actions**: Follow exercise, tap **Complete** to proceed.
- **Secondary actions**: Navigate to previous/next exercise using arrows.
- **Key states**:  
  - **Camera Permission Needed**: Show overlay instructing user to allow camera.  
  - **Ready**: Camera stream on, instructions visible.  
  - **Completed**: Exercise completed; auto-advance or manual.  
  - **Error**: Show error if camera fails.
- **Success outcome**: User completes movement with proper form.
- **Next step**: Start next exercise or return to dashboard.

### AI Agent (Chat)

- **Purpose**: Provide personalized guidance and answer rehab questions.
- **Primary user intent**: Ask for help or clarification about exercises or rehab progress.
- **Layout structure**:  
  - **Top bar**: “AI Agent” heading.  
  - **Main content**: Chat conversation history; messages alternate between AI and user; input field at bottom with send button.  
  - **Bottom navigation**: Same as dashboard.
- **Primary actions**: Type and send a message.
- **Secondary actions**: Read previous messages.
- **Key states**: Empty (no conversation yet), Active (messages loaded), Loading (waiting for reply), Error (failed to send).
- **Success outcome**: User receives helpful advice or encouragement.
- **Next step**: Continue chatting or return to dashboard.

### Profile

- **Purpose**: Let users view stats and manage account settings.
- **Primary user intent**: Check workout streaks and edit personal information.
- **Layout structure**:  
  - **Top bar**: “Profile” heading with edit icon.  
  - **Main content**: Stats card (workouts completed, day streak, total hours); settings list (personal information, notifications, privacy & security); profile form fields (name, email).  
  - **Bottom navigation**: Same as dashboard.
- **Primary actions**: View stats, update profile fields.
- **Secondary actions**: Navigate to settings pages.
- **Key states**: Ready, Editing (form active), Error.
- **Success outcome**: User updates their details and sees progress metrics.
- **Next step**: Navigate to other screens.

## State Documentation

The Revibe app is built around state-driven design. For each screen, the UI responds to a finite set of states and transitions between them.

### Dashboard (Home) States

| State  | What the UI Shows                         | Notes                            |
|-------:|-------------------------------------------|----------------------------------|
| LOADING | Placeholder cards and progress loader    | Data fetch in progress           |
| READY   | Progress bar, mascot, daily plan list    | Default working state            |
| EMPTY   | Message encouraging session creation     | Shown when no sessions exist     |
| ERROR   | Error message with retry option          | Data fetch failed                |

**State transitions**:

| From   | Trigger                 | To     |
|-------:|-------------------------|-------:|
| LOADING | Data loaded            | READY  |
| LOADING | Error                 | ERROR  |
| READY   | User deletes all sessions | EMPTY |
| EMPTY   | User schedules session | READY |
| ERROR   | Retry                 | LOADING |

### Movements Library States

| State  | UI Display                              | Notes                          |
|-------:|-----------------------------------------|--------------------------------|
| LOADING | Skeleton list or spinner               | Loading exercise catalogue     |
| READY   | Body diagram & exercise cards          | Default state                  |
| EMPTY   | “No movements found” message           | Search returned no results     |
| ERROR   | Error banner & retry button            | API failed                     |

**Transitions**:

| From    | Trigger           | To      |
|--------:|-------------------|--------:|
| LOADING  | Data loaded      | READY   |
| LOADING  | Error           | ERROR   |
| READY    | Search yields none | EMPTY  |
| EMPTY    | New search results | READY  |
| ERROR    | Retry           | LOADING |

### Daily Plans / Scheduler States

| State     | UI Display                               | Notes                                      |
|----------:|------------------------------------------|--------------------------------------------|
| LOADING    | Loading spinner/skeleton cards          | Fetching sessions                          |
| EMPTY      | “No sessions yet” & call-to-action      | First-time use or all sessions deleted     |
| EDITING    | Session form fields active              | User is creating or updating a session     |
| READY      | Progress bar, session list, Start button| Normal state with sessions scheduled       |
| ERROR      | Error banner & retry                    | Data fetch failed                          |

**Transitions**:

| From    | Trigger                     | To      |
|--------:|-----------------------------|--------:|
| LOADING | Data loaded                 | READY   |
| LOADING | Error                      | ERROR   |
| READY   | User taps “Schedule session”| EDITING |
| EDITING | Save session                | READY   |
| READY   | All sessions deleted        | EMPTY   |
| EMPTY   | User saves first session    | READY   |
| ERROR   | Retry                      | LOADING |

### Exercise Player States

| State             | UI Display                                           | Notes                                  |
|------------------:|------------------------------------------------------|----------------------------------------|
| PERMISSION        | Overlay prompting camera permission                  | Browser camera access not granted      |
| READY             | Live camera feed, positioning tips, exercise card    | User performing exercise               |
| COMPLETED         | Summary for completed movement and next arrow        | After user taps **Complete**           |
| ERROR             | Error message (e.g. camera failure)                  | Cannot access camera                   |

**Transitions**:

| From       | Trigger                   | To        |
|-----------:|---------------------------|---------:|
| PERMISSION | User grants permission    | READY     |
| READY      | User taps “Complete”      | COMPLETED |
| COMPLETED  | Move to next movement     | READY     |
| READY      | Camera error             | ERROR     |
| ERROR      | Retry                    | PERMISSION |

### AI Agent States

| State   | UI Display                              | Notes                          |
|--------:|-----------------------------------------|--------------------------------|
| EMPTY    | Intro message & empty chat             | No prior conversation          |
| ACTIVE   | Message history & input field          | Normal chat state              |
| LOADING  | Spinner after message send             | Awaiting response              |
| ERROR    | Error sending or loading messages      | Display retry option           |

**Transitions**:

| From    | Trigger                 | To     |
|--------:|-------------------------|------:|
| EMPTY   | User sends first message | LOADING |
| LOADING | Response received         | ACTIVE |
| ACTIVE  | User sends message        | LOADING |
| LOADING | Error                    | ERROR  |
| ERROR   | Retry                   | LOADING |

### Profile States

| State    | UI Display                                 | Notes                     |
|---------:|--------------------------------------------|---------------------------|
| READY     | Stats card, settings list, form fields    | Normal state              |
| EDITING   | Name/email fields focused                 | User editing details      |
| SAVING    | Spinner on save action                    | Sending data to server    |
| ERROR     | Error message on failure                  | Could not save or fetch   |

**Transitions**:

| From   | Trigger         | To      |
|-------:|-----------------|--------:|
| READY   | User edits      | EDITING |
| EDITING | User saves      | SAVING  |
| SAVING  | Save success    | READY   |
| SAVING  | Save error      | ERROR   |
| ERROR   | Retry          | SAVING  |



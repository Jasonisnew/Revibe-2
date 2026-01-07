// Lightweight in-browser data layer to simulate a backend/database.
// All methods return Promises to mirror network calls and keep the UI decoupled.
(function () {
  const DB_KEY = 'revibe-db-v1';
  const defaultData = {
    profile: {
      name: 'Athlete',
      email: '',
      goals: 'Rebuild strength and mobility',
      injuryFocus: 'Knee',
      notifications: {
        reminders: true,
        marketing: false,
      },
      progress: 60,
    },
    movements: [
      {
        id: 'standing-w',
        name: 'Standing W',
        category: 'shoulders',
        difficulty: 'Beginner',
        targetArea: 'Shoulders / Scapular control',
        instructions: 'Elbows at 90°, squeeze shoulder blades, pause at top.',
        asset: '../../assets/images/shoulder-standingW.jpg',
        cameraSupported: true,
      },
      {
        id: 'standing-y',
        name: 'Standing Y',
        category: 'shoulders',
        difficulty: 'Beginner',
        targetArea: 'Shoulders / Upper back',
        instructions: 'Raise arms into Y while keeping ribs down.',
        asset: '../../assets/images/shoulder-standingY.jpg',
        cameraSupported: true,
      },
      {
        id: 'side-arm-raise',
        name: 'Side Arm Raise',
        category: 'arms',
        difficulty: 'Beginner',
        targetArea: 'Arms / Delts',
        instructions: 'Lift to shoulder height with soft elbows.',
        asset: '../../assets/images/arms-standingT.jpg',
        cameraSupported: true,
      },
      {
        id: 'chest-opener',
        name: 'Chest Opener',
        category: 'chest',
        difficulty: 'Beginner',
        targetArea: 'Chest / Anterior shoulder',
        instructions: 'Open arms wide, gentle stretch across chest.',
        asset: '../../assets/images/chest-chestopener.jpg',
        cameraSupported: true,
      },
      {
        id: 'seated-knee-extension',
        name: 'Seated Knee Extension',
        category: 'thighs',
        difficulty: 'Beginner',
        targetArea: 'Quadriceps',
        instructions: 'Extend knee slowly, control on the way down.',
        asset: '../../assets/images/Quadriceps-seatedkneextesion.jpg',
        cameraSupported: true,
      },
      {
        id: 'mini-squat',
        name: 'Mini Squat',
        category: 'thighs',
        difficulty: 'Intermediate',
        targetArea: 'Quads / Glutes',
        instructions: 'Hips back, knees track toes, stop before pain.',
        asset: '../../assets/images/hamstring-minisquat.jpg',
        cameraSupported: true,
      },
      {
        id: 'cat-cow',
        name: 'Cat-Cow Stretch',
        category: 'back',
        difficulty: 'Beginner',
        targetArea: 'Spine mobility',
        instructions: 'Alternate flexion/extension with slow breathing.',
        asset: '../../assets/images/图片/back1/cat-cow stretch1.jpg',
        cameraSupported: true,
      },
      {
        id: 'thread-needle',
        name: 'Thread the Needle',
        category: 'back',
        difficulty: 'Intermediate',
        targetArea: 'Thoracic rotation',
        instructions: 'Reach under, rotate gently, keep hips stable.',
        asset: '../../assets/images/图片/back3/Thread-the-Needle Pose1.jpg',
        cameraSupported: true,
      },
      {
        id: 'lateral-raise',
        name: 'Lateral Raise',
        category: 'shoulders',
        difficulty: 'Intermediate',
        targetArea: 'Shoulders',
        instructions: 'Not supported yet—use other movements.',
        asset: '../../assets/images/shoulder.jpg',
        cameraSupported: false,
        unsupported: true,
      },
    ],
    calendar: [],
    sessions: [],
    chatHistory: [],
  };

  function readDb() {
    const raw = localStorage.getItem(DB_KEY);
    if (!raw) {
      localStorage.setItem(DB_KEY, JSON.stringify(defaultData));
      return { ...defaultData };
    }
    try {
      return { ...defaultData, ...JSON.parse(raw) };
    } catch (e) {
      console.error('Failed to parse DB; resetting', e);
      localStorage.setItem(DB_KEY, JSON.stringify(defaultData));
      return { ...defaultData };
    }
  }

  function persist(data) {
    localStorage.setItem(DB_KEY, JSON.stringify(data));
    return data;
  }

  function simulateNetwork(result) {
    return new Promise((resolve) => setTimeout(() => resolve(result), 120));
  }

  function uid() {
    return crypto.randomUUID ? crypto.randomUUID() : `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  const store = {
    async getProfile() {
      const db = readDb();
      return simulateNetwork(db.profile);
    },
    async saveProfile(profile) {
      const db = readDb();
      db.profile = { ...db.profile, ...profile };
      persist(db);
      return simulateNetwork(db.profile);
    },
    async listMovements(filters = {}) {
      const db = readDb();
      const term = (filters.term || '').toLowerCase();
      const category = filters.category || 'all';
      const items = db.movements.filter((m) => {
        if (m.unsupported) return false; // lateral raise excluded
        const matchTerm =
          !term ||
          m.name.toLowerCase().includes(term) ||
          m.targetArea.toLowerCase().includes(term) ||
          m.instructions.toLowerCase().includes(term);
        const matchCategory = category === 'all' || m.category === category;
        return matchTerm && matchCategory;
      });
      return simulateNetwork(items);
    },
    async getMovementById(id) {
      const db = readDb();
      return simulateNetwork(db.movements.find((m) => m.id === id));
    },
    async listCalendar() {
      const db = readDb();
      const sorted = [...db.calendar].sort(
        (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
      );
      return simulateNetwork(sorted);
    },
    async upsertCalendar(event) {
      const db = readDb();
      const existingIndex = db.calendar.findIndex((c) => c.id === event.id);
      const record = {
        id: event.id || uid(),
        title: event.title || 'Session',
        movementId: event.movementId || null,
        start: event.start,
        durationMinutes: event.durationMinutes || 30,
        notes: event.notes || '',
      };
      if (existingIndex >= 0) {
        db.calendar[existingIndex] = { ...db.calendar[existingIndex], ...record };
      } else {
        db.calendar.push(record);
      }
      persist(db);
      return simulateNetwork(record);
    },
    async deleteCalendar(id) {
      const db = readDb();
      db.calendar = db.calendar.filter((c) => c.id !== id);
      persist(db);
      return simulateNetwork(true);
    },
    async saveSession(session) {
      const db = readDb();
      const record = { id: session.id || uid(), ...session, completedAt: new Date().toISOString() };
      db.sessions.push(record);
      persist(db);
      return simulateNetwork(record);
    },
    async listSessions() {
      const db = readDb();
      return simulateNetwork(db.sessions);
    },
    async saveChatMessage(message) {
      const db = readDb();
      db.chatHistory.push({ ...message, id: uid(), at: new Date().toISOString() });
      persist(db);
      return simulateNetwork(true);
    },
    async listChatHistory() {
      const db = readDb();
      return simulateNetwork(db.chatHistory.slice(-50));
    },
    async saveProgress(progress) {
      const db = readDb();
      db.profile.progress = progress;
      persist(db);
      return simulateNetwork(progress);
    },
  };

  window.RevibeStore = store;
})();


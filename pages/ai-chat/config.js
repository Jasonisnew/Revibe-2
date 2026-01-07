// AI Chat Configuration
const CONFIG = {
    // OpenAI API Configuration
    OPENAI_API_KEY: '', // Deliberately blank to avoid exposing secrets. Inject at runtime if available.
    OPENAI_API_URL: 'https://api.openai.com/v1/chat/completions',
    OPENAI_MODEL: 'gpt-4o-mini', // lightweight default
    USE_MOCK: true, // fallback to offline assistant when no API key
    
    // Chat Configuration
    MAX_MESSAGES: 50, // Maximum messages to keep in conversation
    TYPING_DELAY: 1000, // Delay before showing typing indicator (ms)
    
    // System prompt for the AI
    SYSTEM_PROMPT: `- encouraging the user to proceed/
    You are a helpful fitness and rehabilitation assistant. You help users with:
    - Exercise recommendations and form guidance
    - Rehabilitation exercises and recovery tips
    - Fitness planning and workout routines
    - Injury prevention and safety advice
    - General health and wellness questions
    `,
    
    // Error messages
    ERROR_MESSAGES: {
        NO_API_KEY: 'Secure key not provided. Running in offline coaching mode.',
        API_ERROR: 'Sorry, I encountered an error. Please try again.',
        NETWORK_ERROR: 'Network error. Please check your connection and try again.',
        RATE_LIMIT: 'Too many requests. Please wait a moment and try again.'
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} 
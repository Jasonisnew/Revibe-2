// AI Chat Configuration
const CONFIG = {
    // OpenAI API Configuration
    OPENAI_API_KEY: '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', // Add your OpenAI API key here
    OPENAI_API_URL: 'https://api.openai.com/v1/chat/completions',
    OPENAI_MODEL: 'gpt-3.5-turbo', // or 'gpt-4' for better responses
    
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
        NO_API_KEY: 'OpenAI APxxI key not configured. Please add your API key to config.js',
        API_ERROR: 'Sorry, I encountered an error. Please try again.',
        NETWORK_ERROR: 'Network error. Please check your connection and try again.',
        RATE_LIMIT: 'Too many requests. Please wait a moment and try again.'
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} 
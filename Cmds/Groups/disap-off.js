const middleware = require('../../utility/botUtil/middleware');

module.exports = async (context) => {
    try {
        // Apply middleware to the context
        await middleware(context, async () => {
            // Log the context to understand its structure
            console.log('Context:', context);

            // Destructure necessary properties from the context object
            const { client, m, bot } = context;

            // Check if the required properties are present in the context
            if (!client || !m || !bot) {
                return m.reply('Error: Missing required data (client, message, or bot). Please try again later.');
            }

            // Attempt to disable disappearing messages
            try {
                await client.groupToggleEphemeral(bot, 0); // 0 to turn off ephemeral messages
                m.reply('Disappearing messages successfully turned off!');
            } catch (error) {
                // Handle any errors that occur when turning off ephemeral messages
                console.error('Error disabling disappearing messages:', error);
                m.reply('Failed to turn off disappearing messages. Please try again later.');
            }
        });
    } catch (error) {
        // Handle errors that might occur during middleware execution
        console.error('Middleware execution error:', error);
        context.m.reply('An unexpected error occurred. Please try again later.');
    }
};
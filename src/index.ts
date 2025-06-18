import { authenticateUser } from './auth';
import { handleChatRequest } from './chat';

async function main() {
  const user = await authenticateUser();
  if (!user) {
    console.error('Authentication failed.');
    return;
  }

  while (true) {
    const response = await handleChatRequest(user);
    console.log('Bot:', response.reply);
  }
}

main().catch(console.error);

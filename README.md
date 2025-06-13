# Azure OpenAI Chatbot with Microsoft Entra ID Authentication

## Project Description
This is a TypeScript + JavaScript chatbot application built in Visual Studio Code. It integrates with Azure OpenAI services and uses Microsoft Entra ID for secure authentication.

## Features
- Chatbot powered by Azure OpenAI
- Microsoft Entra ID (formerly Azure AD) authentication
- Built with TypeScript and JavaScript
- Easily deployable and GitHub-ready

## Prerequisites
- Node.js and npm installed
- Azure subscription with OpenAI resource
- Microsoft Entra ID tenant
- App registration in Entra ID with appropriate permissions

## Setup Instructions
1. **Clone the repository**
   ``` git clone https://github.com/your-username/your-repo-name.git ```

2. **Install Dependencies**
   ``` npm install ```

3. **Create .env file**
 ```   
 AZURE_OPENAI_ENDPOINT=your-endpoint
AZURE_OPENAI_DEPLOYMENT=your-deployment-name
AZURE_OPENAI_API_VERSION=2024-10-21
AZURE_TENANT_ID=your-tenant-id
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
```

4. **Run the Build**
   ``` npx tsc ```

5. **Run the App**
   ``` npm start ```

## Authentication with Entra ID

- This app uses the ```@azure/identity``` package with ```DefaultAzureCredential``` to authenticate users via Microsoft Entra ID. Make sure your app is registered in Entra ID and has the correct API permissions.

## Usage 
- Once the app is running, users can interact with the chatbot through the frontend interface. Authentication is handled automatically via Entra ID.

## License 
- This project is licensed under the MIT license.
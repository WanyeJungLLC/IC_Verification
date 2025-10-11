import { AuthClient } from "@dfinity/auth-client";
import { Actor, HttpAgent } from "@dfinity/agent";

let authClient: AuthClient | null = null;

export async function getAuthClient(): Promise<AuthClient> {
  if (authClient) return authClient;
  
  authClient = await AuthClient.create();
  return authClient;
}

export async function login(): Promise<boolean> {
  const client = await getAuthClient();
  
  return new Promise((resolve) => {
    client.login({
      identityProvider: import.meta.env.VITE_II_URL || "https://identity.ic0.app",
      onSuccess: () => resolve(true),
      onError: () => resolve(false),
    });
  });
}

export async function logout(): Promise<void> {
  const client = await getAuthClient();
  await client.logout();
}

export async function isAuthenticated(): Promise<boolean> {
  const client = await getAuthClient();
  return await client.isAuthenticated();
}

export async function getPrincipal(): Promise<string | null> {
  const client = await getAuthClient();
  const identity = client.getIdentity();
  return identity.getPrincipal().toString();
}

export async function getAgent(): Promise<HttpAgent> {
  const client = await getAuthClient();
  const identity = client.getIdentity();
  
  const agent = new HttpAgent({
    identity,
    host: import.meta.env.VITE_IC_HOST || "https://ic0.app",
  });

  // Fetch root key for local development
  if (import.meta.env.DEV) {
    await agent.fetchRootKey();
  }

  return agent;
}

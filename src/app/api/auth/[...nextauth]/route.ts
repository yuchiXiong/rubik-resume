import NextAuth from "next-auth"
import { getServerSession } from "next-auth/next"
import { Session } from "next-auth"
import { authOptions } from "@/utils/auth-config"

declare module "next-auth" {
  interface Session {
    accessToken?: string
    expires: string
  }
}

export async function getSession(): Promise<Session | null> {
  const session = await getServerSession(authOptions) as Session | null
  if (!session) {
    console.log('No session found')
    return null
  }
  if (!session.accessToken) {
    console.log('Session found, but no access token')
  } else {
    console.log('Session found with access token')
  }
  return session
}


const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
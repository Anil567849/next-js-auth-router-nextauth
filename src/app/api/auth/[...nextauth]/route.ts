import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { AuthOptions } from 'next-auth';

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      async profile(profile: any, token: any) {
        // console.log('profile', profile);
        // console.log('tokens', token);
        return {
          id: profile.id.toString(),
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
        };
      }
    }),

    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        try {
            /*
            // you can save or check user in the database there
            const res = await fetch("/your/endpoint", {
              method: 'POST',
              body: JSON.stringify(credentials),
              headers: { "Content-Type": "application/json" }
            })
            const user = await res.json()
          
            // If no error and we have user data, return it
            if (res.ok && user) {
              return user
            }
            */


            // Just for testing 
            if(!credentials){
              return null;
            }
            return {
              id: credentials.username,
              name: credentials.username,
            };
        } catch (error) {
            console.error('error credentials', error);
            // Return null if user data could not be retrieved
            return null
        }


      }
    })
    // ...add more providers here
  ],
  // pages: {
  //   signIn: '/auth/signin'
  // },
  callbacks: {

    // This callback is called whenever a JSON Web Token is created or updated
    jwt({ token, user }: { token: any; user: any }) {
      /*
      1. Initial Sign-In: When a user signs in for the first time, the jwt callback is called with both token and user populated. You typically merge the user info into the token at this stage.

      2. Subsequent Requests: In subsequent requests, only the token is available, not the user. This is because the user info is already stored in the token from the initial sign-in.
      */
      // console.log('jwt token', token);
      // console.log('jwt user', user);
        if (user) {
            token.id = user.id;
        }
        return token;
    },

      /*
    The session callback is called whenever a session is checked. 
    By default, only a subset of the token is returned for increased security. 
    If you want to make something available you added to the token (like access_token and user.id from above) via the jwt() callback, you have to explicitly forward it here to make it available to the client.

    e.g. getSession(), useSession(), /api/auth/session
    */
    session(data: any) {
      return data;
    },

  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs'
import { connectToDB } from "@/lib/mongoDB"
import User from "@/lib/models/User"

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                    placeholder: 'Enter your email',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                    placeholder: 'Enter your password',
                },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid email or password')
                }

                await connectToDB();
                try {
                    const user = await User.findOne({ email: credentials?.email });
                    if (user) {
                        const isPasswordCorrect = await bcrypt.compare(
                            credentials?.password,
                            user.password
                        );
                        if (isPasswordCorrect) {
                            // if (user.emailVerified) {
                            //     return user;
                            // } else {
                            //     // Handle unverified email, possibly redirect to a verification page
                            //     throw new Error("Email not verified");
                            // }
                            return user;
                        } else {
                            throw new Error("Incorrect password");
                        }
                    } else {
                        throw new Error("No user found with this email");
                    }
                } catch (err:any) {
                    throw new Error(err);
                }
            }
        })
    ],
    pages: {
        signIn: '/login'
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
}

// export const { handlers, auth, signIn, signOut } = NextAuth({
export default NextAuth(authOptions)
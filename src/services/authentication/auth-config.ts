// import type {NextAuthConfig} from 'next-auth'
// import ResendProvider from 'next-auth/providers/resend'
// import {Resend} from 'resend'
// import {DrizzleAdapter} from '@auth/drizzle-adapter'
// import db from '@/data/db/client'
// import {MagicLinkMail} from '../../../react-email-starter/emails/magic-link-email'
// const resend = new Resend(process.env.RESEND_API_KEY)

// export const authConfig = {
//   trustHost: true,
//   callbacks: {
//     async redirect({url, baseUrl}) {
//       return `${baseUrl}/dashboard`
//     },
//   },
//   providers: [
//     ResendProvider({
//       apiKey: process.env.RESEND_API_KEY,
//       sendVerificationRequest: async ({identifier: email, url}) => {
//         const fromEmail = process.env.EMAIL_FROM

//         if (!fromEmail) {
//           throw new Error('EMAIL_FROM is not set')
//         }
//         const {error} = await resend.emails.send({
//           //to: email,
//           to: 'delivered@resend.dev',
//           subject: 'Connexion sur la plateforme Tracker Entrepeneur',
//           from: fromEmail,
//           react: MagicLinkMail({url}),
//         })
//         if (error) {
//           console.error('Error sending email', error)
//           throw error
//         }
//       },
//     }),
//   ],
//   secret: process.env.AUTH_SECRET,
//   session: {
//     strategy: 'database',
//   },
//   adapter: DrizzleAdapter(db),
// } satisfies NextAuthConfig


import type { NextAuthConfig } from "next-auth";
import ResendProvider from "next-auth/providers/resend";
import GoogleProvider from "next-auth/providers/google"; // Ajout du provider Google
import { Resend } from "resend";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import db from "@/src/data/db/client";
import { MagicLinkMail } from "../../../react-email-starter/emails/magic-link-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export const authConfig = {
  trustHost: true,
  callbacks: {
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/dashboard`;
    },
  },
  providers: [
    ResendProvider({
      apiKey: process.env.RESEND_API_KEY,
      sendVerificationRequest: async ({ identifier: email, url }) => {
        const fromEmail = process.env.EMAIL_FROM;

        if (!fromEmail) {
          throw new Error("EMAIL_FROM is not set");
        }

        const { error } = await resend.emails.send({
          // to: email,
          to: "delivered@resend.dev",
          subject: "Connexion sur la plateforme Tracker Entrepeneur",
          from: fromEmail,
          react: MagicLinkMail({ url }),
        });

        if (error) {
          console.error("Error sending email", error);
          throw error;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "database",
  },
  adapter: DrizzleAdapter(db),
} satisfies NextAuthConfig;

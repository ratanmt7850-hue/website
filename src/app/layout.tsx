import Head from "next/head";
import "./globals.css";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics, FacebookPixel } from "./components/analytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RATAN MATKA- Leading Satta Matka Platform",
  description:
    "RATAN MATKA is one of the leading and most trusted websites in the satta matka industry. Play a variety of satta matka games and access comprehensive game charts and results.",
  keywords:
    "RATAN MATKA, Satta Matka, Kalyan Matka, ratan matka, Satta King, Rajdhani Matka, Madhur Matka, Milan Day & Night, Mumbai Matka, Tara Matka, Satta Matka Games, Online Matka Results",
  author: "RATAN MATKA",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content="URL_to_image" />{" "}
        {/* Replace with actual URL to an image representing Kalyan Jackpot */}
        <meta property="og:url" content="https://www.ratanmatkas.com" />{" "}
        {/* Replace with the actual URL of the website */}
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content="URL_to_image" />{" "}
        {/* Replace with actual URL to an image representing Kalyan Jackpot */}
        <meta name="twitter:url" content="https://www.ratanmatkas.com" />{" "}
        {/* Replace with the actual URL of the website */}
        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1052464643713026');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1052464643713026&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </Head>
      <body
        className={`bg-gray-900 ${inter.className}`}
        style={{ scrollBehavior: "smooth" }}
      >
        {children}
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics
          GA_MEASUREMENT_ID={
            process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-XXXXXXXXXX"
          }
        />
        <FacebookPixel
          FB_PIXEL_ID={
            process.env.NEXT_PUBLIC_FB_PIXEL_ID || "1052464643713026"
          }
        />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import { Provider } from "@/provider";
import GlobalContext from "@/context";

const ubuntu = Ubuntu({
  subsets: ["latin-ext"],
  weight: "500",
});

export const metadata: Metadata = {
  title: "Netflix | @rof1yev",
  description:
    "You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!",
  authors: [
    { name: "Dilshod Rofiyev", url: "https://www.instagram.com/rof1yev/" },
  ],
  applicationName: "Movie Application",
  keywords:
    "Netflix, Online streaming, Movies and TV shows, Original series, Watch online, HD streaming, Binge-watch, On-demand content, Subscription service, Entertainment, Documentaries, Netflix originals, Family movies, Drama series, Action movies, Comedy shows, Streaming platform, TV series, Popular shows, Netflix subscription, New releases, Watch anywhere, Ad-free streaming, Movie recommendations, Exclusive content",
  verification: {
    google: "google",
    yandex: "yandex",
    yahoo: "yahoo",
    other: {
      me: ["rofiyevdilshod@gmail.com", "https://www.instagram.com/rof1yev/"],
    },
  },
  icons: [
    {
      url: "/netflix-icon.svg",
      href: "/netflix-icon.svg",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="TWhx17k6Q6zi64nwcE1mT0QBcnOPl-ARF1TRx_lWQVA"
        />
      </head>
      <body className={ubuntu.className}>
        <Provider attribute="class" defaultTheme="dark">
          <GlobalContext>{children}</GlobalContext>
        </Provider>
      </body>
    </html>
  );
}

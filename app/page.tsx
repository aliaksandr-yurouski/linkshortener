import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Link2, BarChart2, Pencil, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const features = [
  {
    icon: Link2,
    title: "Short Links",
    description:
      "Turn any long URL into a compact, shareable link in seconds.",
  },
  {
    icon: BarChart2,
    title: "Click Analytics",
    description:
      "See how many times each link has been clicked and track performance over time.",
  },
  {
    icon: Pencil,
    title: "Custom Slugs",
    description:
      "Choose a memorable keyword for your short URL instead of a random string.",
  },
  {
    icon: LayoutDashboard,
    title: "Link Dashboard",
    description:
      "Manage, edit, and delete all your shortened links from one place.",
  },
];

export default function HomePage() {
  return (
    <main className="flex flex-col items-center">
      {/* Hero */}
      <section className="w-full max-w-5xl px-4 py-24 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Shorten links. Track clicks.
          <br />
          Stay in control.
        </h1>
        <p className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground">
          LinkShortener helps you create compact, memorable URLs and gives you
          the analytics you need to understand your audience.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <SignedOut>
            <SignUpButton mode="modal">
              <Button size="lg">Get started for free</Button>
            </SignUpButton>
            <SignInButton mode="modal">
              <Button variant="outline" size="lg">
                Sign in
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Button asChild size="lg">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </SignedIn>
        </div>
      </section>

      {/* Features */}
      <section className="w-full max-w-5xl px-4 pb-24">
        <h2 className="mb-10 text-center text-2xl font-semibold tracking-tight">
          Everything you need to manage your links
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description }) => (
            <Card key={title}>
              <CardHeader>
                <Icon className="mb-1 size-6 text-primary" />
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}

import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Link2, BarChart2, Pencil, LayoutDashboard, MousePointerClick, Sparkles, TrendingUp } from "lucide-react";
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

const steps = [
  {
    icon: Link2,
    step: "1",
    title: "Paste Your Link",
    description:
      "Copy any long URL and paste it into our shortener. Works with any web address.",
  },
  {
    icon: Sparkles,
    step: "2",
    title: "Customize & Shorten",
    description:
      "Choose a custom slug or let us generate one for you. Click create and your short link is ready.",
  },
  {
    icon: TrendingUp,
    step: "3",
    title: "Share & Track",
    description:
      "Share your short link anywhere. Monitor clicks and performance in real-time from your dashboard.",
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

      {/* How It Works */}
      <section className="w-full max-w-5xl px-4 pb-24">
        <h2 className="mb-4 text-center text-2xl font-semibold tracking-tight">
          How It Works
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-center text-muted-foreground">
          Get started in three simple steps. No complex setup required.
        </p>
        <div className="grid gap-8 sm:grid-cols-3">
          {steps.map(({ icon: Icon, step, title, description }) => (
            <div key={step} className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="size-8 text-primary" />
                </div>
                <div className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {step}
                </div>
              </div>
              <h3 className="mb-2 text-lg font-semibold">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          ))}
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

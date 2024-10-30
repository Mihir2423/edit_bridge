import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ChevronRight, Edit3, Zap, CreditCard, Check } from "lucide-react";

export default function LandingPage() {
  const [userType, setUserType] = useState("creator");

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen">
      <header className="flex justify-between items-center mx-auto px-4 py-6 w-full max-w-6xl">
        <div className="flex items-center space-x-2">
          <Edit3 className="w-6 h-6" />
          <span className="font-bold text-xl">Edit Bridge</span>
        </div>
        <Button variant="outline">Log In</Button>
      </header>

      <main className="flex flex-col flex-grow justify-center items-center px-4 text-center">
        <div className="space-y-8 mb-16 w-full max-w-3xl">
          <div className="flex justify-center space-x-2">
            <Switch
              id="user-type"
              checked={userType === "editor"}
              onCheckedChange={() =>
                setUserType(userType === "creator" ? "editor" : "creator")
              }
            />
            <Label htmlFor="user-type">
              {userType === "creator" ? "Creator" : "Editor"}
            </Label>
          </div>

          <h1 className="font-bold text-5xl tracking-tight">
            {userType === "creator"
              ? "Hire talented editors for your content vision"
              : "Craft high-quality content for creators"}
          </h1>

          <p className="mx-auto max-w-2xl text-gray-600 text-xl">
            Edit Bridge connects creators and editors for seamless content
            collaboration. Streamline your workflow and focus on what matters
            most - creating great content.
          </p>

          <Button size="lg" className="text-lg">
            Get Started <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </div>

        <section className="mx-auto px-4 py-16 w-full max-w-6xl">
          <h2 className="mb-12 font-bold text-3xl text-center">How It Works</h2>
          <div className="space-y-24">
            <HowItWorksStep
              step={1}
              title="Create Your Profile"
              description="Set up your account as a creator or editor. Showcase your skills, experience, and portfolio to attract the right collaborators."
              videoSrc="/placeholder.svg?height=300&width=500"
            />
            <HowItWorksStep
              step={2}
              title="Connect and Collaborate"
              description="Creators can browse and hire editors, while editors can apply for projects. Use our intuitive platform to communicate and share files seamlessly."
              videoSrc="/placeholder.svg?height=300&width=500"
              reverse
            />
            <HowItWorksStep
              step={3}
              title="Review and Approve"
              description="Creators can easily review edited content, provide feedback, and approve final versions. Our streamlined process ensures quick turnaround times."
              videoSrc="/placeholder.svg?height=300&width=500"
            />
            <HowItWorksStep
              step={4}
              title="Publish and Grow"
              description="Once approved, publish your content directly to various platforms. Track performance and build long-term relationships with your favorite collaborators."
              videoSrc="/placeholder.svg?height=300&width=500"
              reverse
            />
          </div>
        </section>

        <section className="mx-auto px-4 py-16 w-full max-w-6xl">
          <h2 className="mb-8 font-bold text-3xl text-center">Key Features</h2>
          <div className="gap-8 grid md:grid-cols-3">
            <FeatureCard
              icon={<Edit3 className="w-8 h-8" />}
              title="Effortless Collaboration"
              description="Hire editors directly and review content with a user-friendly approval process."
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="Streamlined Posting"
              description="Once approved, content is ready for direct posting across platforms like YouTube, Twitter, and Instagram."
            />
            <FeatureCard
              icon={<CreditCard className="w-8 h-8" />}
              title="Flexible Plans"
              description="Choose between Basic and Personal plans to suit your needs and budget."
            />
          </div>
        </section>

        <section className="mx-auto px-4 py-16 w-full max-w-6xl">
          <h2 className="mb-12 font-bold text-3xl text-center">Testimonials</h2>
          <div className="gap-8 grid md:grid-cols-2">
            <TestimonialCard
              quote="Edit Bridge has revolutionized my content creation process. I can focus on ideas while talented editors bring my vision to life."
              author="Sarah J., YouTube Creator"
            />
            <TestimonialCard
              quote="As a freelance editor, Edit Bridge has connected me with amazing creators and steady work. The platform is intuitive and a joy to use."
              author="Mark T., Professional Editor"
            />
          </div>
        </section>

        <section className="mx-auto px-4 py-16 w-full max-w-6xl">
          <h2 className="mb-12 font-bold text-3xl text-center">
            Pricing Plans
          </h2>
          <div className="gap-8 grid md:grid-cols-2">
            <PricingCard
              title="Basic Plan"
              price="$19"
              period="per month"
              features={[
                "Up to 5 active projects",
                "Basic collaboration tools",
                "Direct messaging",
                "Standard support",
              ]}
            />
            <PricingCard
              title="Personal Plan"
              price="$49"
              period="per month"
              features={[
                "Unlimited active projects",
                "Advanced collaboration tools",
                "Priority support",
                "Analytics dashboard",
                "Custom branding",
              ]}
              recommended
            />
          </div>
        </section>

        <section className="bg-primary mx-auto px-4 py-16 rounded-lg w-full max-w-6xl text-primary-foreground">
          <div className="space-y-4 text-center">
            <h2 className="font-bold text-3xl">
              Ready to streamline your content creation?
            </h2>
            <p className="text-xl">
              Join Edit Bridge today and experience seamless collaboration.
            </p>
            <Button size="lg" variant="secondary" className="mt-4">
              Get Started Now <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-gray-200 mx-auto px-4 py-8 border-t w-full max-w-6xl text-center text-gray-500">
        <div className="gap-8 grid md:grid-cols-4 mb-8">
          <div>
            <h3 className="mb-2 font-semibold">Product</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-700">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-700">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-700">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-700">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-700">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-700">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-700">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-700">
                  Tutorials
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-700">
                  Support
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-700">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-700">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-700">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p>© {new Date().getFullYear()} Edit Bridge. All rights reserved.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: any) {
  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="mb-2 font-semibold text-xl">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function HowItWorksStep({
  step,
  title,
  description,
  videoSrc,
  reverse = false,
}: any) {
  return (
    <div
      className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8`}
    >
      <div className="w-full md:w-1/2">
        <video
          className="shadow-lg rounded-lg w-full h-auto"
          src={videoSrc}
          controls
          poster="/placeholder.svg?height=300&width=500"
        >
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="w-full md:w-1/2 text-left">
        <div className="inline-block bg-primary mb-2 px-3 py-1 rounded-full font-semibold text-primary-foreground text-sm">
          Step {step}
        </div>
        <h3 className="mb-4 font-bold text-2xl">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}

function TestimonialCard({ quote, author }: any) {
  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <p className="mb-4 text-lg">&quot;{quote}&quot;</p>
      <p className="font-semibold text-gray-700">- {author}</p>
    </div>
  );
}

function PricingCard({ title, price, period, features, recommended = false }: any) {
  return (
    <div
      className={`bg-white p-6 rounded-lg shadow-md ${recommended ? "border-2 border-primary" : ""}`}
    >
      {recommended && (
        <div className="mb-2 font-semibold text-primary text-sm">
          Recommended
        </div>
      )}
      <h3 className="mb-4 font-bold text-2xl">{title}</h3>
      <div className="mb-4">
        <span className="font-bold text-4xl">{price}</span>
        <span className="text-gray-600">/{period}</span>
      </div>
      <ul className="space-y-2 mb-6">
        {features.map((feature: any, index: any) => (
          <li key={index} className="flex items-center">
            <Check className="mr-2 w-5 h-5 text-primary" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button className="w-full" variant={recommended ? "default" : "outline"}>
        Choose Plan
      </Button>
    </div>
  );
}

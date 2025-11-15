import { APP_NAME, APP_DESCRIPTION } from "@/config";

export function Hero() {
  return (
    <section className="from-background via-background to-primary/10 flex h-screen items-center justify-center bg-gradient-to-b">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        {/* Heading */}
        <h1 className="from-primary to-primary/60 mb-6 bg-gradient-to-r bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
          {APP_NAME}
        </h1>

        {/* Description */}
        <p className="text-muted-foreground mb-10 max-w-2xl text-lg leading-relaxed sm:text-xl md:text-2xl">
          {APP_DESCRIPTION}
        </p>
      </div>

      {/* Decorative gradient orbs */}
      <div className="bg-primary/20 absolute top-0 left-1/4 -z-10 h-72 w-72 rounded-full opacity-20 blur-3xl" />
      <div className="bg-primary/10 absolute right-1/4 bottom-0 -z-10 h-96 w-96 rounded-full opacity-20 blur-3xl" />
    </section>
  );
}

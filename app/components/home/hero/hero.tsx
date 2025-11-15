import { APP_NAME, APP_DESCRIPTION } from "@/config";

export function Hero() {
  return (
    <section className="from-background via-background to-primary/10 relative h-screen bg-gradient-to-b">
      <div className="container mx-auto px-4 py-24 sm:py-32 lg:py-40">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          {/* Badge */}
          <div className="bg-primary/5 border-primary/20 text-primary mb-8 inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium">
            <span className="mr-2">🚀</span>
            AI駆動のLPビルダー
          </div>

          {/* Heading */}
          <h1 className="from-primary to-primary/60 mb-6 bg-gradient-to-r bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
            {APP_NAME}
          </h1>

          {/* Description */}
          <p className="text-muted-foreground mb-10 max-w-2xl text-lg leading-relaxed sm:text-xl md:text-2xl">
            {APP_DESCRIPTION}
          </p>

          {/* CTA Buttons */}
          <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary inline-flex items-center justify-center rounded-lg px-8 py-3 text-base font-semibold shadow-lg transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none">
              今すぐ始める
              <svg
                className="ml-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
            <button className="border-input bg-background hover:bg-accent hover:text-accent-foreground focus:ring-primary inline-flex items-center justify-center rounded-lg border px-8 py-3 text-base font-semibold shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none">
              デモを見る
              <svg
                className="ml-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Decorative gradient orbs */}
      <div className="bg-primary/20 absolute top-0 left-1/4 -z-10 h-72 w-72 rounded-full opacity-20 blur-3xl" />
      <div className="bg-primary/10 absolute right-1/4 bottom-0 -z-10 h-96 w-96 rounded-full opacity-20 blur-3xl" />
    </section>
  );
}

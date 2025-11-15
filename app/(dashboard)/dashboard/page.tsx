import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card/card";
import type { LP } from "@/app/components/lp/schemas";
import { PageHeader } from "@/app/components/shared";
import Link from "next/link";

// Mock data (in actual project, fetch from API)
const mockLPs: LP[] = [
  {
    id: "1",
    title: "Product Launch LP",
    slug: "product-launch",
    description: "Landing page for new product launch campaign",
    sections: [],
    createdAt: "2025-01-10T10:00:00.000Z",
    updatedAt: "2025-01-15T14:30:00.000Z",
    publishedAt: "2025-01-15T14:30:00.000Z",
    status: "published",
  },
  {
    id: "2",
    title: "Campaign LP",
    slug: "campaign-2025",
    description: "2025 Spring Campaign Landing Page",
    sections: [],
    createdAt: "2025-01-12T09:00:00.000Z",
    updatedAt: "2025-01-14T16:00:00.000Z",
    status: "draft",
  },
  {
    id: "3",
    title: "Service Introduction LP",
    slug: "service-introduction",
    description: "Landing page introducing service features",
    sections: [],
    createdAt: "2025-01-08T11:00:00.000Z",
    updatedAt: "2025-01-13T10:00:00.000Z",
    publishedAt: "2025-01-13T10:00:00.000Z",
    status: "published",
  },
];

function formatDate(dateString?: string): string {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function getStatusLabel(status?: string): string {
  switch (status) {
    case "published":
      return "Published";
    case "draft":
      return "Draft";
    case "archived":
      return "Archived";
    default:
      return "-";
  }
}

function getStatusColor(status?: string): string {
  switch (status) {
    case "published":
      return "bg-green-100 text-green-800";
    case "draft":
      return "bg-yellow-100 text-yellow-800";
    case "archived":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export default function DashboardPage() {
  return (
    <div className="px-12">
      <PageHeader
        title="Dashboard"
        description="View and manage your landing pages"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockLPs.map((lp) => (
          <Card key={lp.id} className="flex flex-col">
            <CardHeader>
              <div className="mb-2 flex items-center justify-between">
                <CardTitle className="text-xl">{lp.title}</CardTitle>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(lp.status)}`}
                >
                  {getStatusLabel(lp.status)}
                </span>
              </div>
              {lp.description && (
                <CardDescription>{lp.description}</CardDescription>
              )}
            </CardHeader>

            <CardContent className="flex-1">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Slug:</span>
                  <span className="font-mono text-xs">{lp.slug}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created:</span>
                  <span className="text-xs">{formatDate(lp.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Updated:</span>
                  <span className="text-xs">{formatDate(lp.updatedAt)}</span>
                </div>
                {lp.publishedAt && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Published:</span>
                    <span className="text-xs">
                      {formatDate(lp.publishedAt)}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex gap-2">
              <Link
                href={`/lp/${lp.id}`}
                className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors"
              >
                Edit
              </Link>
              <Link
                href={`/lp/${lp.id}/preview`}
                className="border-border bg-background hover:bg-accent flex-1 rounded-md border px-4 py-2 text-sm font-medium transition-colors"
              >
                Preview
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {mockLPs.length === 0 && (
        <div className="border-border rounded-lg border border-dashed p-12 text-center">
          <p className="text-muted-foreground">No landing pages created yet</p>
          <button className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 rounded-md px-6 py-2 text-sm font-medium transition-colors">
            Create New
          </button>
        </div>
      )}
    </div>
  );
}

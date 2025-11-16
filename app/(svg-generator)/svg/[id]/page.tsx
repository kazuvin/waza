import { SvgEditor } from "@/app/components/svg-generator";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SvgEditorPage({ params }: PageProps) {
  const { id } = await params;

  return <SvgEditor id={id} />;
}

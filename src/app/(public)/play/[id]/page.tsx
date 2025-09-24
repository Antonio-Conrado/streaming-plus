import PlayStreaming from "@/shared/components/PlayStreaming";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PlayStreamingPage({ params }: Props) {
  const { id } = await params;
  if (!id) return redirect("/404");
  return <PlayStreaming id={id} />;
}

import { playVideo } from "@/shared/data/const";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PlayStreamingPage({ params }: Props) {
  const { id } = await params;

  return (
    <iframe
      src={`${playVideo}/${id}`}
      className="w-full h-[90vh] "
      allowFullScreen
      frameBorder={0}
    />
  );
}

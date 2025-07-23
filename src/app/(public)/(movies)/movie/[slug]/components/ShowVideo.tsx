import Link from 'next/link';
export default function ShowVideo({ id }: { id: string }) {
  return (
    <Link href={`/play/${id}`}>
      <button className="btn btn-accent rounded-md">
        Ver movie
      </button>
    </Link>
  );
}

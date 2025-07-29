import { cookies } from "next/headers";
import SidebarItems from "./SidebarItems";
import { User } from "@/shared/interfaces/user";

export default async function Sidebar() {
  const cookieStore = await cookies();
  const userObj = cookieStore.get("streaming-user")?.value;
  const user: User = userObj ? JSON.parse(userObj) : null;

  return (
    <>
      <SidebarItems user={user} />
    </>
  );
}

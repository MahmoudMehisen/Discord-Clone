import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Middleware() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  } else {
    redirect("/channels");
  }
}

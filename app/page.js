
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {

  const logged_user = cookies().get("sid")?.value
  
  if(logged_user) redirect  ("/chatbot")

  return (
    <div className="grid items-center justify-items-center h-[calc(100svh-80px)] p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h2 className="text-center font-bold text-4xl text-white">
        AMAZING CHATBOT TESTING SYSTEM
      </h2>

      <ul className="justify-center mb-12 items-center flex gap-4 text-xl font-serif">
        <li>
          <Link href={"/login"} className="hover:underline mx-5 bg-blue-200 p-2 rounded-lg">
            Login
          </Link>
          <Link href={"/signup"} className="hover:underline bg-blue-200 p-2 rounded-lg">
            Signup
          </Link>
        </li>
      </ul>
    </div>
  );
}

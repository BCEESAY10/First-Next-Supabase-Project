import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h2 className="text-center font-bold text-2xl">
        Welcome Bamfa
      </h2>

      <ul className="justify-center items-center flex gap-4">
        <li>
          <Link href={"/signup"} className="p-1">
            Login
          </Link>
          <Link href={"/signup"} className="p-1">
            Signup
          </Link>
        </li>
      </ul>
    </div>
  );
}

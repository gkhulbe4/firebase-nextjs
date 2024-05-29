import { getLinks, getLogo } from "@/db/firebase";
import { initAdmin } from "@/db/firebaseAdmin";
import Button from "@mui/material/Button";
import Image from "next/image";

export default async function Home() {
  await initAdmin();
  const links = await getLinks()
  const logo = await getLogo()
  return (
    <div>
      <Image
      height={50}
      width={50}
      src={logo ?? "/vercel.svg"}
      alt="Logo"
      />

      {links?.map((link) => (
        <div>
          <h1 className="text-3xl font-bold">{link.title}</h1>
          <h1 className="text-sm text-gray-400">{link.desc}</h1>
          <a className="underline text-sm text-blue-700" href={link.url}>Click on this link</a>
        </div>
      ))}
      <Button sx={{backgroundColor: "blueviolet" , color: "white" , border: "1px solid black"}}>Contained</Button>
      <div className="flex gap-4 mt-3">
      </div>
    </div>
  );
}

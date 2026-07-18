"use client";

import dynamic from "next/dynamic";

const NexusChat = dynamic(() => import("./NexusChat"), { ssr: false });

export default function NexusChatWrapper() {
  return <NexusChat />;
}

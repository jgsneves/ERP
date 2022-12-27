import Image from "next/image";
import Button from "./button";
import brandLogo from "../../public/lysimed.png";
import { VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Menu() {
  const router = useRouter();

  return (
    <VStack
      borderRight="4px"
      borderColor="gray.200"
      h="100vh"
      p={3}
      spacing={5}
      alignItems="start"
    >
      <Image src={brandLogo} alt="LysiMed" />
      <Button selected={router.route === "/"} href="/" content="Métricas" />
      <Button
        selected={router.route.includes("socios")}
        href="/socios"
        content="Sócios"
      />
      <Button
        selected={router.route.includes("empregados")}
        href="/empregados"
        content="Empregados"
      />
      <Button
        selected={router.route.includes("financeiro")}
        href="/financeiro"
        content="Financeiro"
      />
    </VStack>
  );
}

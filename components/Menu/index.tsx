import Image from "next/image";
import MenuButton from "./button";
import brandLogo from "public/lysimed.png";
import { Button, Flex, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Menu() {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const handleLogoutOnClick = async () => {
    await supabaseClient.auth.signOut();
  };

  return (
    <VStack
      borderRight="4px"
      borderColor="gray.200"
      flex="1"
      w="300px"
      h="100vh"
      p={3}
      spacing={5}
      alignItems="start"
      position="fixed"
      top="0"
      left="0"
    >
      <Image src={brandLogo} alt="LysiMed" priority />
      <MenuButton selected={router.route === "/"} href="/" content="Métricas" />
      <MenuButton
        selected={router.route.includes("socios")}
        href="/socios"
        content="Sócios"
      />
      <MenuButton
        selected={router.route.includes("empregados")}
        href="/empregados"
        content="Empregados"
      />
      <MenuButton
        selected={router.route.includes("financeiro")}
        href="/financeiro"
        content="Financeiro"
      />
      <MenuButton
        selected={router.route.includes("empresas-medicas")}
        href="/empresas-medicas"
        content="Empresas Médicas"
      />
      <MenuButton
        selected={router.route.includes("medicos")}
        href="/medicos"
        content="Médicos"
      />

      <Flex width="100%" flex={1} alignItems="flex-end">
        <Button colorScheme="green" width="100%" onClick={handleLogoutOnClick}>
          sair
        </Button>
      </Flex>
    </VStack>
  );
}

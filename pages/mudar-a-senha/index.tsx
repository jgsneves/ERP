import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import MainContent from "components/Containers/MainContent";

export default function MudarSenha() {
  const [formData, setFormData] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const supabaseClient = useSupabaseClient();
  const toast = useToast();
  const router = useRouter();

  const handleInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFormData(event.target.value);

  const handleOnClick = async () => {
    setIsLoading(true);

    const { data, error } = await supabaseClient.auth.updateUser({
      password: formData,
    });

    if (error) {
      toast({
        duration: 9000,
        title: "Não foi possível atualizar sua senha.",
        isClosable: true,
        status: "error",
      });
      setIsLoading(false);
    }

    if (data) {
      toast({
        duration: 5000,
        title: "Senha atualizada com sucesso",
        isClosable: true,
        status: "success",
      });
      setIsLoading(false);
      router.push("/");
    }
  };

  return (
    <MainContent>
      <Text fontSize="5xl" fontWeight={600}>
        Cadastre uma nova senha
      </Text>
      <FormControl>
        <FormLabel>
          Senha:
          <Input
            type="password"
            id="password"
            value={formData}
            onChange={handleInputOnChange}
          />
        </FormLabel>
        <Button
          colorScheme="green"
          onClick={handleOnClick}
          isLoading={isLoading}
        >
          Salvar
        </Button>
      </FormControl>
    </MainContent>
  );
}

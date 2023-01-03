import React, { Dispatch, SetStateAction, useState } from "react";

import { Button, Input, Text, useToast } from "@chakra-ui/react";

import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { State } from ".";
import { server } from "../../config/server";

interface Props {
  setState: Dispatch<SetStateAction<State>>;
}

export default function ResetPassword({ setState }: Props) {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const supabaseClient = useSupabaseClient();
  const toast = useToast();

  const handleInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);

  const handleSendEmailOnClick = async () => {
    if (email) {
      setIsLoading(true);

      const { data, error } = await supabaseClient.auth.resetPasswordForEmail(
        email,
        { redirectTo: `${server}/mudar-a-senha` }
      );

      if (error) {
        toast({
          duration: 9000,
          title: "Não foi possível enviar e-mail",
          isClosable: true,
          status: "error",
        });
        setIsLoading(false);
      }

      if (data) {
        toast({
          duration: 9000,
          title: "Verifique o e-mail cadastrado para a mudança de senha",
          isClosable: true,
          status: "success",
        });
        setIsLoading(false);
        setState(State.LOGIN);
      }
    }
  };

  const handleGoBackOnClick = () => setState(State.LOGIN);

  return (
    <>
      <Text fontSize="larger" alignSelf="flex-start">
        Informe seu e-mail para resetar a senha
      </Text>
      <Input
        type="email"
        width="100%"
        id="email"
        value={email}
        onChange={handleInputOnChange}
      />
      <Button
        width="100%"
        colorScheme="green"
        onClick={handleSendEmailOnClick}
        isLoading={isLoading}
      >
        Enviar e-mail
      </Button>
      <Button variant="ghost" onClick={handleGoBackOnClick}>
        Voltar
      </Button>
    </>
  );
}

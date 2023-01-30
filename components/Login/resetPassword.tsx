import React, { Dispatch, SetStateAction, useState } from "react";

import { Button, Input, Text, useToast } from "@chakra-ui/react";

import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { State } from ".";
import { server } from "../../config/server";
import { ErrorHandler } from "../../utils/ErrorHandler";

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

  const handleSendEmailOnClick = () => {
    if (email) {
      setIsLoading(true);

      supabaseClient.auth
        .resetPasswordForEmail(email, { redirectTo: `${server}/mudar-a-senha` })
        .then(
          () => {
            toast({
              duration: 9000,
              title: "Verifique o e-mail cadastrado para a mudança de senha",
              isClosable: true,
              status: "success",
            });
            setState(State.LOGIN);
          },
          () =>
            toast({
              duration: 9000,
              title: "Não foi possível enviar e-mail",
              isClosable: true,
              status: "error",
            })
        )
        .catch((error) => ErrorHandler.logResetPasswordSupabaseError(error))
        .finally(() => setIsLoading(false));
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

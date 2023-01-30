import React, { Dispatch, SetStateAction, useState } from "react";

import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";

import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { State } from ".";
import { useRouter } from "next/router";
import { ErrorHandler } from "../../utils/ErrorHandler";

interface Props {
  setState: Dispatch<SetStateAction<State>>;
}

interface FormData {
  email: string;
  password: string;
}

export default function Form({ setState }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const supabaseClient = useSupabaseClient();
  const toast = useToast();
  const router = useRouter();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((state) => {
      const { id, value } = event.target;
      return {
        ...state,
        [id]: value,
      };
    });

  const handleForgetPasswordOnClick = () => setState(State.RESET_PASSWORD);

  const handleLoginOnClick = () => {
    setIsLoading(true);
    supabaseClient.auth
      .signInWithPassword({
        email: formData.email,
        password: formData.password,
      })
      .then(
        (res) => {
          console.log(res);
          router.push("/");
        },
        () => {
          toast({
            duration: 9000,
            title: "Não foi fazer login",
            isClosable: true,
            status: "error",
          });
          setIsLoading(false);
        }
      )
      .catch((error) => ErrorHandler.logSigInSupabaseError(error))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Text fontSize="4xl">Bem vindo</Text>
      <FormControl>
        <FormLabel width="100%">
          Email:
          <Input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleOnChange}
          />
        </FormLabel>
        <FormLabel width="100%">
          Senha:
          <Input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleOnChange}
          />
        </FormLabel>
      </FormControl>
      <Button
        variant="link"
        alignSelf="flex-start"
        onClick={handleForgetPasswordOnClick}
      >
        Esqueci minha senha
      </Button>
      <Button
        width="100%"
        colorScheme="green"
        onClick={handleLoginOnClick}
        isLoading={isLoading}
      >
        Entrar
      </Button>
    </>
  );
}

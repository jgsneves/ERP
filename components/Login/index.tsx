import Image from "next/image";
import { useState } from "react";

import { Flex, VStack } from "@chakra-ui/react";

import Lysi from "../../public/lysi.jpg";
import Form from "./form";
import ResetPassword from "./resetPassword";

export enum State {
  LOGIN = "LOGIN",
  RESET_PASSWORD = "RESET_PASSWORD",
}

export default function Login() {
  const [state, setState] = useState<State>(State.LOGIN);

  const render = (stage: State) => {
    const components = {
      LOGIN: <Form setState={setState} />,
      RESET_PASSWORD: <ResetPassword setState={setState} />,
    };
    return components[stage];
  };

  return (
    <Flex maxH="100vh">
      <VStack minW="400px" p={5} justifyContent="center">
        {render(state)}
      </VStack>
      <Image alt="Lysi" src={Lysi} />
    </Flex>
  );
}

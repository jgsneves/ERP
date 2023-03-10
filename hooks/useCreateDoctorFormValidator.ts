import { isValidEmail, isValidCPF } from "@brazilian-utils/brazilian-utils";
import { Pessoas } from "@prisma/client";
import { useState } from "react";

export default function useCreateDoctorFormValidator(formData: Pessoas) {
  const [isCpfValid, setIsCpfValid] = useState<boolean>(true);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [isNomeValid, setIsNomeValid] = useState<boolean>(true);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  function verifyEmail() {
    if (isValidEmail(formData.Email)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  }

  function verifyCpf() {
    if (isValidCPF(formData.Cpf)) {
      setIsCpfValid(true);
    } else {
      setIsCpfValid(false);
    }
  }

  function verifyName() {
    if (formData.Nome === "") {
      setIsNomeValid(false);
    } else {
      setIsNomeValid(true);
    }
  }

  function verifyForm() {
    verifyCpf();
    verifyEmail();
    verifyName();

    if (isCpfValid && isEmailValid && isNomeValid) {
      setIsFormValid(true);
    } else {
      setIsFormValid(true);
    }
  }

  return {
    isNomeValid,
    isCpfValid,
    isEmailValid,
    verifyCpf,
    verifyEmail,
    verifyName,
    isFormValid,
    verifyForm,
  };
}

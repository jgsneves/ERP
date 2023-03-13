import { Flex } from "@chakra-ui/react";
import { DoctorEntity } from "pages/medicos/[id]";
import { useState } from "react";
import DoctorCompany from "./DoctorCompany";
import DoctorEditPersonalData from "./DoctorEditPersonalData";
import DoctorPersonalData from "./DoctorPersonalData";

interface Props {
  doctor: DoctorEntity;
}

export default function DoctorSummary({ doctor }: Props) {
  const [isEditState, setIsEditState] = useState<boolean>(false);
  return (
    <Flex wrap="wrap" gap={8}>
      {isEditState ? (
        <DoctorEditPersonalData
          doctor={doctor}
          setIsEditState={setIsEditState}
        />
      ) : (
        <DoctorPersonalData doctor={doctor} setIsEditState={setIsEditState} />
      )}
      <DoctorCompany doctor={doctor} />
    </Flex>
  );
}

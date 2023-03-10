import { Flex } from "@chakra-ui/react";
import { DoctorEntity } from "pages/medicos/[id]";
import { useState } from "react";
import DoctorEditPersonalData from "./DoctorEditPersonalData";
import DoctorPersonalData from "./DoctorPersonalData";

interface Props {
  doctor: DoctorEntity;
}

export default function DoctorSummary({ doctor }: Props) {
  const [isEditState, setIsEditState] = useState<boolean>(false);
  return (
    <Flex>
      {isEditState ? (
        <DoctorEditPersonalData
          doctor={doctor}
          setIsEditState={setIsEditState}
        />
      ) : (
        <DoctorPersonalData doctor={doctor} setIsEditState={setIsEditState} />
      )}
    </Flex>
  );
}

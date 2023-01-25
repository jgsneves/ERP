import { Grid, Avatar } from "@chakra-ui/react";
import Link from "next/link";
import { Text } from "@chakra-ui/react";

interface Props {
  name: string;
  id: string;
  CRM: string | null;
  medicalCompany: string;
}

export default function DoctorCard({ id, name, CRM, medicalCompany }: Props) {
  return (
    <Link href={`/medicos/${id}`}>
      <Grid
        borderRadius="lg"
        padding={2}
        cursor="pointer"
        _hover={{
          backgroundColor: "gray.200",
        }}
      >
        <Avatar name={name} src={undefined} />
        <Text>Nome: {name}</Text>
        <Text>CRM: {CRM}</Text>
        <Text>Empresa médica: {medicalCompany}</Text>
      </Grid>
    </Link>
  );
}

import { Flex, Divider, Text } from "@chakra-ui/react";

interface Props {
  title: string;
}

export default function ContentTitle({ title }: Props) {
  return (
    <Flex width="100%" alignItems="center" py={3}>
      <Text as="b" minW="fit-content" mr={2}>
        {title}
      </Text>
      <Divider />
    </Flex>
  );
}

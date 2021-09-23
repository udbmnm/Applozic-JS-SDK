import { Center, HStack, Text } from "@chakra-ui/layout";
import React from "react";
import { EditableText } from "../ChatDetails/EditableText";

export interface IApplicationID {
  applicationId: string;
  onApplicationIdUpdate: (id: string) => void;
}

function ApplicationID({
  applicationId,
  onApplicationIdUpdate,
}: IApplicationID) {
  return (
    <Center mb="8">
      <HStack>
        <Text fontWeight="black">Application ID:</Text>
        <EditableText
          defaultValue={applicationId}
          onSubmit={(newValue) => onApplicationIdUpdate(newValue)}
        />
      </HStack>
    </Center>
  );
}

export default ApplicationID;

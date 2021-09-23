import React from "react";
import { useQueryClient } from "react-query";
import ApplicationID from "./ApplicationID";

export interface IApplicationIDWired {
  applicationId: string;
}

function ApplicationIDWired({ applicationId }: IApplicationIDWired) {
  const queryClient = useQueryClient();

  return (
    <ApplicationID
      applicationId={applicationId}
      onApplicationIdUpdate={(id) =>
        queryClient.setQueryData(["application_id"], id)
      }
    />
  );
}

export default ApplicationIDWired;

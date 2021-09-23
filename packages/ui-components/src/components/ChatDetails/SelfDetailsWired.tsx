import React from "react";
import { getNameFromUser } from "@applozic/core-sdk";
import useGetUserInfo from "../../hooks/queries/useGetUserInfo";
import { useApplozicClient } from "../../providers/useApplozicClient";
import SelfDetails from "./SelfDetails";
import { useSidebar } from "../../providers/useSidebar";
import useUserLogout from "../../hooks/mutations/useUserLogout";
import useGetSelfDetails from "../../hooks/queries/useGetSelfDetails";
import useUpdateSelfInfo from "../../hooks/mutations/useUpdateUserInfo";

export interface SelfDetailsWiredProps {}

const SelfDetailsWired = () => {
  const user = useGetSelfDetails();
  const { setShowUserDetails } = useSidebar();
  const { mutate: updateSelf } = useUpdateSelfInfo();
  const { mutate: logoutUser } = useUserLogout();
  return (
    <SelfDetails
      name={user ? getNameFromUser(user) : ""}
      imageUrl={user?.imageLink}
      onCloseClicked={() => setShowUserDetails && setShowUserDetails(false)}
      onLogOutClicked={() =>
        logoutUser(undefined, {
          onSuccess: () => setShowUserDetails && setShowUserDetails(false),
        })
      }
      onUpdateValue={(key, value) => {
        console.log("onUpdateValue", { [key]: value });
        updateSelf({ [key]: value });
      }}
    />
  );
};

export default SelfDetailsWired;

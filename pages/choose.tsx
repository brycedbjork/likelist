import getUser from "@/db/getUser";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import styled from "styled-components";

const InputWrapper = styled.div``;
const Input = styled.input``;
const LoadingInput = styled.div``;

const ChoosePage: NextPage = () => {
  const router = useRouter();
  const uid = router.query.uid as string;

  const userQuery = useQuery(["user", uid], getUser(uid));

  return (
    <>
      {userQuery.isLoading && <LoadingInput></LoadingInput>}
      {!userQuery.isLoading && userQuery.data && (
        <InputWrapper>
          <Input value={userQuery.data.name.split(" ")[0].toLowerCase()} />
          .likelist.xyz
        </InputWrapper>
      )}
    </>
  );
};

export default ChoosePage;

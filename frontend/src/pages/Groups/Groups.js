import React, { useEffect, useState } from "react";
import GenericPage from "../../templates/GenericPage/GenericPage";
import { useAuthContext } from "../../store/contexts/AuthContext";
import useFetch from "../../hooks/useFetch";
import GroupTile from "../../components/organisms/GroupTile/GroupTile";
import { API } from "../../api/urls";
import PlusButton from "../../components/atoms/PlusButton/PlusButton";
import { useModalContext } from "../../store/contexts/ModalContext";
import { GroupModal } from "../../components/organisms/modals/GroupModal/GroupModal";

const Groups = () => {
  const { data, setData, isLoading, callAPI } = useFetch();

  const { handleModal } = useModalContext();

  useEffect(() => {
    callAPI(`${API.GROUP}`);
  }, []);

  return (
    <GenericPage>
      {data &&
        !isLoading &&
        data.map((group) => (
          <GroupTile
            key={group.id}
            id={group.id}
            name={group.name}
            childrenCount={group.children_count}
            teacher={group.teacher}
            type={group.type}
            update={callAPI}
          />
        ))}

      <PlusButton onClick={() => handleModal(<GroupModal />)} />
    </GenericPage>
  );
};

export default Groups;

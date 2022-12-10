import ConfirmModal from "#components/ConfirmModal/ConfirmModal";
import { RecruitDetail } from "#types/RecruitDetail";
import { Dispatch, SetStateAction, useCallback } from "react";
import useDeleteJoinMutation from "../../hooks/queries/useDeleteJoinMutation";
import useDeleteRecruitMutation from "../../hooks/queries/useDeleteRecruitMutation";
import useJoinMutation from "../../hooks/queries/useJoinMutation";
interface ModalArgs {
    text: string;
    onClick: () => void;
}

interface RecruitConfirmModalProps {
    data: RecruitDetail;
    id: number;
    toggleModal: Dispatch<SetStateAction<boolean>>;
}

const RecruitConfirmModal = ({ id, toggleModal, data }: RecruitConfirmModalProps) => {
    const { mutate: mutateDeleteJoin } = useDeleteJoinMutation(Number(id));
    const { mutate: mutateDeleteRecruit } = useDeleteRecruitMutation(Number(id));
    const { mutate: mutateJoin } = useJoinMutation(Number(id));
    const toggleModalVisible = () => toggleModal((prev) => !prev);

    const getModalArgs = useCallback((recruit: RecruitDetail): ModalArgs => {
        const { isParticipating, isAuthor } = recruit;
        if (isAuthor) return { text: "모집 취소하시겠습니까", onClick: mutateDeleteRecruit };
        if (isParticipating) return { text: "참여 취소하시겠습니까?", onClick: mutateDeleteJoin };
        return { text: "참여하시겠습니까?", onClick: mutateJoin };
    }, []);

    const onClickConfirm = useCallback(
        (recruit: RecruitDetail) => () => {
            getModalArgs(recruit).onClick();
            toggleModalVisible();
        },
        [],
    );

    return (
        <ConfirmModal
            text={getModalArgs(data).text}
            handleToggleModal={toggleModalVisible}
            confirmOnClick={onClickConfirm(data)}
        ></ConfirmModal>
    );
};

export default RecruitConfirmModal;

import { Recruit } from "#types/Recruit";
import { getDisplayPaceString } from "#utils/stringtils";
import Card from "../Card";
import styled from "styled-components";
import { LOCATION_ICON, RULER_ICON, RUNNING_ICON } from "#assets/icons";
import { CardTitle, SummaryBody, UserIdLabel } from "../Card.styles";

const Participants = styled.div``;

interface RecruitCardProps {
    data: Recruit;
}

const RecruitCard = ({ data }: RecruitCardProps) => {
    return (
        <Card img={data.course.img} to={`/recruit/${data.recruitId}`}>
            <CardTitle>{data.title}</CardTitle>
            <SummaryBody>
                <div>
                    <img src={LOCATION_ICON} />
                    <span>{data.course.hCode}</span>
                    <img src={RULER_ICON} />
                    <span>{`${(data.course.pathLength / 1000).toFixed(1)}km`}</span>
                    <img src={RUNNING_ICON} />
                    <span>{getDisplayPaceString(data.pace)}</span>
                </div>
                <UserIdLabel>{data.authorId}</UserIdLabel>
            </SummaryBody>
        </Card>
    );
};

export default RecruitCard;

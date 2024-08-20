import { CardComponentProps } from "@/types";
import { Card, CardHeader, CardBody } from "@nextui-org/card";

const ReasonCard = ({ Icon, title, description }: CardComponentProps) => {
  return (
    <Card
      shadow="lg"
    >
      <CardHeader className="flex items-center justify-start">
        <Icon size={48} className="p-1" />
      </CardHeader>
      <CardBody className="text-left">
        <h3 className="text-lg font-bold text-[#FF1CF7]">{title}</h3>
        <p>{description}</p>
      </CardBody>
    </Card>
  );
};

export default ReasonCard;
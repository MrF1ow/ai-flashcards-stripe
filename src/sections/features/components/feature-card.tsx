import { Card, CardHeader, CardBody } from "@nextui-org/card";

import { CardComponentProps } from "@/types";

const FeatureCard = ({ Icon, title, description }: CardComponentProps) => {
  return (
    <Card shadow="lg">
      <CardHeader className="flex items-center justify-center">
        <Icon size={48} />
      </CardHeader>
      <CardBody className="text-center">
        <h3 className="text-lg font-bold text-[#FF1CF7]">{title}</h3>
        <p>{description}</p>
      </CardBody>
    </Card>
  );
};

export default FeatureCard;

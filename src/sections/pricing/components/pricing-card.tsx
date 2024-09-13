import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

import getStripe from "@/utils/get-stripe";
import { PricingPlanProps } from "@/types";

const PricingCard = ({ type, name, price, features }: PricingPlanProps) => {
  const router = useRouter();

  const handleSubmit = async () => {
    if (type === "free") {
      router.push("/sign-up");

      return;
    } else if (type === "pro") {
      const checkoutSession = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { origin: window.location.origin },
      });
      const checkoutSessionData = await checkoutSession.json();

      const stripe = await getStripe();

      if (!stripe) {
        return;
      }
      const { error } = await stripe.redirectToCheckout({
        sessionId: checkoutSessionData.id,
      });

      if (error) {
        console.error(error);
      }
    }
  };

  return (
    <Card shadow="lg">
      <CardHeader className="flex flex-col items-start justify-start pb-4">
        <h3 className="text-lg font-bold text-[#FF1CF7]">{name}</h3>
        <span className="text-lg font-bold ml-1">{price}</span>
      </CardHeader>
      <CardBody className="text-left">
        <ul className="list-disc list-inside pb-4">
          {features.map((feature, index) => (
            <li key={index} className="mb-2 whitespace-normal break-words">
              {feature}
            </li>
          ))}
        </ul>
      </CardBody>
      <CardFooter className="flex justify-start">
        <Button color="secondary" variant="solid" onClick={handleSubmit}>
          {type === "free" ? "Sign Up" : "Subscribe"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;

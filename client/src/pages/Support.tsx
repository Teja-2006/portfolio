import { Card, CardContent } from "@/components/ui/card";

const supportOptions = [
  {
    icon: "/figmaAssets/card.svg",
    alt: "Card",
    value: "4149500120690030",
  },
  {
    icon: "/figmaAssets/bitcoin.svg",
    alt: "Bitcoin",
    value: "3E8ociqZa9mZUSwGdSmAEMAoAxBK3FNDcd",
  },
];

export const Support = (): JSX.Element => {
  return (
    <Card className="inline-flex flex-col items-start gap-4 p-4 bg-app-background border border-solid border-[#abb2bf]">
      <CardContent className="p-0 flex flex-col gap-4">
        <h2 className="[font-family:'Fira_Code',Helvetica] font-medium text-white text-base">
          Support me here
        </h2>

        <div className="flex flex-col gap-2">
          {supportOptions.map((option, index) => (
            <div key={index} className="flex items-center gap-[5px]">
              <img className="w-8 h-8" alt={option.alt} src={option.icon} />
              <span className="[font-family:'Fira_Code',Helvetica] font-normal text-gray text-base">
                {option.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

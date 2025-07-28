import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="w-64 h-full bg-white border-r border-border px-2">
      <div className="border-b py-2">
        <Card>
          <CardHeader className="flex flex-row items-center">
            <Avatar>
              <AvatarImage src="/assets/logo.png" />
            </Avatar>
            <CardTitle>MXLAB</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <div className="flex flex-row gap-2">
                <div className="font-semibold text-gray-600">홍길동</div>
                <div className="text-sm text-gray-500">시스템 관리자</div>
              </div>
            </CardDescription>
          </CardContent>
        </Card>
      </div>
      <div className="py-2 border-b">
        <Button className="bg-gray-200 text-black hover:bg-gray-200">
          Menu
        </Button>
      </div>
      <div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="settings">
            <AccordionTrigger className="text-base font-semibold">
              설정
            </AccordionTrigger>
            <AccordionContent
              className="cursor-pointer inline-block"
              onClick={() => navigate("/")}
            >
              콘텐츠 관리
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </aside>
  );
};

export default Sidebar;

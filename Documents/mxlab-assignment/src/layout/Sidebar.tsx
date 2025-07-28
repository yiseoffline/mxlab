import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
    <aside className="w-64 bg-white border-r border-border px-2">
      <div className="border-b py-2">
        <Card>
          <CardHeader>
            <CardTitle>MXLAB</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <div className="flex items-center">
                <div>홍길동</div>
                <div>시스템 관리자</div>
              </div>
            </CardDescription>
          </CardContent>
        </Card>
      </div>
      <div className="py-2 border-b">
        <Button className="bg-gray-300 text-black">Menu</Button>
      </div>
      <div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="settings">
            <AccordionTrigger className="text-base font-semibold">
              설정
            </AccordionTrigger>
            <AccordionContent onClick={() => navigate("/")}>
              콘텐츠 관리
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </aside>
  );
};

export default Sidebar;

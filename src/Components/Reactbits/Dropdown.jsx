import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BadgeDollarSign } from "lucide-react";

function DropDown({ selectedCategory, setSelectCategory }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Select
            value={selectedCategory}
            onValueChange={(value) => setSelectCategory(value)}
          >
            <SelectTrigger
              id="select-category"
              className="relative ps-9  text-[#4b5563]"
              aria-label="Select Category"
            >
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-[#4b5563]">
                <BadgeDollarSign size={16} strokeWidth={2} aria-hidden="true" />
              </div>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent  className="text-black backdrop-blur" >
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default DropDown;

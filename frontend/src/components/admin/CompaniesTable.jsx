import React, { useMemo } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "../ui/table.jsx";
import { Avatar, AvatarImage } from "../ui/avatar.jsx";
import { Edit2, View } from "lucide-react";
import { Button } from "../ui/button.jsx";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover.jsx";
import { Trash2 } from "lucide-react";
import {  useSelector } from "react-redux";

import Job from "../Job.jsx";

const CompaniesTable = () => {
  const companies = useSelector((store) => store.company.companies) || [];
  const searchCompanyByText =
    useSelector((store) => store.company.searchCompanyByText) || "";

  const filteredCompanies = useMemo(() => {
    const q = searchCompanyByText.trim().toLowerCase();
    if (!q) return companies;
    return companies.filter((company) =>
      String(company?.name ?? "").toLowerCase().includes(q)
    );
  }, [companies, searchCompanyByText]);

  return (
    <Table>
      <TableCaption>A list of your recent registered companies.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Logo</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {companies.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              No companies registered yet.
            </TableCell>
          </TableRow>
        ) : filteredCompanies.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              No matching companies.
            </TableCell>
          </TableRow>
        ) : (
          filteredCompanies.map((company) => (
            <TableRow key={company?._id || company?.id || company?.name}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={company?.logo || "https://github.com/shadcn.png"} />
                </Avatar>
              </TableCell>

              <TableCell>{company?.name}</TableCell>
              <TableCell>
                {company?.createdAt
                  ? new Date(company.createdAt).toLocaleDateString()
                  : "-"}
              </TableCell>

              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                      Actions
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-40">
                    <div className="flex flex-col">
                      <Button type="button" variant="ghost" size="sm" >
                        View  <View className="ml-2 w-4 h-4" />
                      </Button>
                      <Button type="button" variant="ghost" size="sm">
                        Edit <Edit2 className="ml-2 w-4 h-4" />
                      </Button>
                      <Button type="button" variant="ghost" size="sm">
                        Delete <Trash2 className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default CompaniesTable;

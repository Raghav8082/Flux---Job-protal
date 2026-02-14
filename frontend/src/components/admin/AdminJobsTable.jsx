import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Users, View } from "lucide-react";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "../ui/table.jsx";
import { Button } from "../ui/button.jsx";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover.jsx";

const AdminJobsTable = () => {
  const navigate = useNavigate();

  const jobs = useSelector((store) => store.job.alljobs) || [];
  const searchText =
    useSelector((store) => store.company.searchCompanyByText) || "";

  const filteredJobs = useMemo(() => {
    const q = searchText.trim().toLowerCase();
    if (!q) return jobs;

    return jobs.filter((job) => {
      const title = String(job?.title ?? "").toLowerCase();
      const company = String(job?.company?.name ?? "").toLowerCase();
      const location = String(job?.location ?? "").toLowerCase();
      return (
        title.includes(q) ||
        company.includes(q) ||
        location.includes(q)
      );
    });
  }, [jobs, searchText]);

  return (
    <Table>
      <TableCaption>A list of your posted jobs.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Salary</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {jobs.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center">
              No jobs posted yet.
            </TableCell>
          </TableRow>
        ) : filteredJobs.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center">
              No matching jobs.
            </TableCell>
          </TableRow>
        ) : (
          filteredJobs.map((job) => (
            <TableRow key={job?._id || job?.id}>
              <TableCell className="font-medium">{job?.title || "-"}</TableCell>
              <TableCell>{job?.company?.name || "-"}</TableCell>
              <TableCell>{job?.location || "-"}</TableCell>
              <TableCell>{job?.jobtype || "-"}</TableCell>
              <TableCell>{job?.salary || "-"}</TableCell>
              <TableCell>
                {job?.createdAt ? new Date(job.createdAt).toLocaleDateString() : "-"}
              </TableCell>

              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                      Actions
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-44">
                    <div className="flex flex-col">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => job?._id && navigate(`/admin/job/${job._id}/applicants`)}
                        disabled={!job?._id}
                      >
                        Applicants <Users className="ml-2 w-4 h-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => job?._id && navigate(`/description/${job._id}`)}
                        disabled={!job?._id}
                      >
                        Details <View className="ml-2 w-4 h-4" />
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

export default AdminJobsTable;

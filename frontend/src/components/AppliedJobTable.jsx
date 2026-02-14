import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "./ui/table.jsx";
import { Badge } from "./ui/badge.jsx";
import { APPLICATION_API_ENDPOINT } from "../../utils/content.js";

const statusVariant = (status) => {
  const s = String(status || "").toLowerCase();
  if (s === "accepted") return "default";
  if (s === "rejected") return "destructive";
  return "secondary";
};

const AppliedJobsTable = () => {
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState([]);

  const rows = useMemo(() => applications || [], [applications]);

  const fetchAppliedJobs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${APPLICATION_API_ENDPOINT}/appliedjobs`, {
        withCredentials: true,
      });

      if (res.data?.success) {
        setApplications(res.data?.applications || []);
        return;
      }

      toast.error(res.data?.message || "Failed to fetch applied jobs");
    } catch (error) {
      const msg =
        error?.response?.data?.message || error?.message || "Failed to fetch applied jobs";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  return (
    <Table>
      <TableCaption>Your applied jobs.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Applied On</TableHead>
          <TableHead>Job Role</TableHead>
          <TableHead>Company</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              Loading...
            </TableCell>
          </TableRow>
        ) : rows.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              No applications yet.
            </TableCell>
          </TableRow>
        ) : (
          rows.map((app) => {
            const appliedOn = app?.createdAt
              ? new Date(app.createdAt).toLocaleDateString()
              : "-";
            const jobTitle = app?.job?.title || app?.job?.position || "-";
            const companyName = app?.job?.company?.name || "-";
            const status = app?.status || "pending";

            return (
              <TableRow key={app?._id}>
                <TableCell>{appliedOn}</TableCell>
                <TableCell>{jobTitle}</TableCell>
                <TableCell>{companyName}</TableCell>
                <TableCell className="text-right">
                  <Badge variant={statusVariant(status)}>
                    {String(status).toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
};

export default AppliedJobsTable;

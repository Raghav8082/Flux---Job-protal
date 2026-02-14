import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

import Navbar from "../shared/navbar.jsx";
import { APPLICATION_API_ENDPOINT } from "../../../utils/content.js";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "../ui/table.jsx";
import { Badge } from "../ui/badge.jsx";
import { Button } from "../ui/button.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar.jsx";

const statusVariant = (status) => {
  const s = String(status || "").toLowerCase();
  if (s === "accepted") return "default";
  if (s === "rejected") return "destructive";
  return "secondary";
};

const Applicants = () => {
  const { id: jobId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);

  const applicants = useMemo(() => applications || [], [applications]);

  const fetchApplicants = async () => {
    if (!jobId) return;
    try {
      setLoading(true);
      const res = await axios.get(
        `${APPLICATION_API_ENDPOINT}/getapplications/${jobId}`,
        { withCredentials: true }
      );

      if (res.data?.success) {
        setJob(res.data.job || null);
        setApplications(res.data.applications || []);
        return;
      }

      toast.error(res.data?.message || "Failed to fetch applicants");
    } catch (error) {
      const msg =
        error?.response?.data?.message || error?.message || "Failed to fetch applicants";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobId]);

  const updateStatus = async (applicationId, nextStatus) => {
    if (!applicationId) return;
    try {
      const res = await axios.post(
        `${APPLICATION_API_ENDPOINT}/status/${applicationId}/update`,
        { status: nextStatus },
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );

      if (res.data?.success) {
        setApplications((prev) =>
          (prev || []).map((a) =>
            a?._id === applicationId ? { ...a, status: nextStatus } : a
          )
        );
        toast.success("Status updated");
        return;
      }
      toast.error(res.data?.message || "Failed to update status");
    } catch (error) {
      const msg =
        error?.response?.data?.message || error?.message || "Failed to update status";
      toast.error(msg);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Applicants</h1>
            <p className="text-sm text-gray-600">
              {job?.title ? `Job: ${job.title}` : "Job applicants list"}
              {typeof applicants.length === "number" ? ` • ${applicants.length} total` : ""}
            </p>
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => navigate("/admin/jobs")}>
              Back
            </Button>
            <Button type="button" onClick={fetchApplicants} disabled={loading}>
              {loading ? "Refreshing..." : "Refresh"}
            </Button>
          </div>
        </div>

        <Table>
          <TableCaption>All applicants for this job.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Applicant</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Resume</TableHead>
              <TableHead>Applied On</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : applicants.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No applicants yet.
                </TableCell>
              </TableRow>
            ) : (
              applicants.map((app) => {
                const applicant = app?.applicant;
                const name = applicant?.fullname || "Unknown";
                const email = applicant?.email || "-";
                const phone = applicant?.phoneNumber || "-";
                const resumeUrl = applicant?.profile?.resume || "";
                const resumeName =
                  applicant?.profile?.resumeOriginalName ||
                  (resumeUrl ? "Resume" : "-");
                const appliedOn = app?.createdAt
                  ? new Date(app.createdAt).toLocaleDateString()
                  : "-";
                const status = app?.status || "pending";

                const initials =
                  String(name)
                    .split(" ")
                    .filter(Boolean)
                    .slice(0, 2)
                    .map((w) => w[0]?.toUpperCase())
                    .join("") || "AP";

                return (
                  <TableRow key={app?._id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar size="sm">
                          <AvatarImage src={applicant?.profile?.profilePhoto || ""} alt={name} />
                          <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{email}</TableCell>
                    <TableCell>{phone}</TableCell>
                    <TableCell>
                      {resumeUrl ? (
                        <a
                          className="text-blue-600 hover:underline"
                          href={resumeUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {resumeName}
                        </a>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>{appliedOn}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant(status)}>{String(status).toUpperCase()}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => updateStatus(app?._id, "accepted")}
                          disabled={!app?._id || loading}
                        >
                          Accept
                        </Button>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => updateStatus(app?._id, "rejected")}
                          disabled={!app?._id || loading}
                        >
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default Applicants;

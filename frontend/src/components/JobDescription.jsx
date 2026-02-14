import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge.jsx";
import { Button } from "./ui/button.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_ENDPOINT, Job_API_ENDPOINT } from "../../utils/content.js";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "../redux/jobslice.js";
import Navbar from "./shared/navbar.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar.jsx";
import { Briefcase, Building2, CalendarDays, MapPin, Users, Wallet } from "lucide-react";

const statusVariant = (status) => {
  const s = String(status || "").toLowerCase();
  if (s === "accepted") return "default";
  if (s === "rejected") return "destructive";
  return "secondary";
};

const statusDotClass = (status) => {
  const s = String(status || "").toLowerCase();
  if (s === "accepted") return "bg-green-500";
  if (s === "rejected") return "bg-red-500";
  return "bg-gray-400";
};

const formatDate = (iso) => {
  if (!iso) return "-";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString();
};

const JobDescription = () => {
  const { id: jobId } = useParams();
  const navigate = useNavigate();
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [appliedNow, setAppliedNow] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [isLoadingJob, setIsLoadingJob] = useState(false);
  const userId = user?._id ?? user?.id;

  const myApplication = React.useMemo(() => {
    if (!userId) return null;
    const applications = singleJob?.application;
    if (!Array.isArray(applications)) return null;
    return (
      applications.find((application) => {
        if (!application) return false;
        const applicantId = application?.applicant?._id ?? application?.applicant;
        return String(applicantId) === String(userId);
      }) || null
    );
  }, [singleJob?.application, userId]);

  const hasUserApplied = React.useMemo(() => {
    if (!userId) return false;
    const applications = singleJob?.application;
    if (!Array.isArray(applications)) return false;

    return applications.some((application) => {
      if (!application) return false;
      const applicantId = application?.applicant?._id ?? application?.applicant;
      return String(applicantId) === String(userId);
    });
  }, [singleJob?.application, userId]);

  const isApplied = appliedNow || hasUserApplied;

  const applyJobHandler = async () => {
    if (isApplied || isApplying) return;
    if (!userId) {
      toast.error("Please login to apply.");
      return;
    }

    setIsApplying(true);
    try {
      const res = await axios.get(`${APPLICATION_API_ENDPOINT}/apply/${jobId}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setAppliedNow(true);

        const newApplication = res.data.application;
        const existingApplications = Array.isArray(singleJob?.application)
          ? singleJob.application.filter(Boolean)
          : [];

        const newApplicationId = newApplication?._id;
        const alreadyInList =
          newApplicationId &&
          existingApplications.some(
            (application) =>
              String(application?._id ?? application) === String(newApplicationId)
          );

        const nextApplications =
          newApplication && !alreadyInList
            ? [...existingApplications, newApplication]
            : existingApplications;

        const nextSingleJob = {
          ...(singleJob ?? {}),
          application: nextApplications,
        };
        dispatch(setSingleJob(nextSingleJob));
      }
    } catch (error) {
      const status = error?.response?.status;
      const message =
        error?.response?.data?.message ?? "Failed to apply for this job.";

      toast.error(message);
      if (status === 400 && /already applied/i.test(message)) {
        setAppliedNow(true);
      }
    } finally {
      setIsApplying(false);
    }
  };


  useEffect(() => {
    setAppliedNow(false);
    setIsApplying(false);

    const fetchSingleJobs = async () => {
      try {
        setIsLoadingJob(true);
        const res = await axios.get(
          `${Job_API_ENDPOINT}/get/${jobId}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setIsLoadingJob(false);
      }
    };

    fetchSingleJobs();
  }, [jobId, dispatch, userId]);

  const jobTitle = singleJob?.title || "Job Details";
  const companyName = singleJob?.company?.name || "Company";
  const companyLogo = singleJob?.company?.logo || "";
  const location = singleJob?.location || "-";
  const jobType = singleJob?.jobtype || "-";
  const position = singleJob?.position || "-";
  const salary = singleJob?.salary || "-";
  const experience = singleJob?.experience ? `${singleJob.experience} Years` : "-";
  const postedOn = formatDate(singleJob?.createdAt);
  const applicantCount =
    Array.isArray(singleJob?.application) ? singleJob.application.length : 0;

  const companyInitials =
    String(companyName)
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join("") || "CO";

  const requirements = Array.isArray(singleJob?.requirements)
    ? singleJob.requirements.filter(Boolean)
    : typeof singleJob?.requirements === "string"
      ? singleJob.requirements.split(",").map((r) => r.trim()).filter(Boolean)
      : [];

  const description = singleJob?.description || "";

  return(
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-72px)] bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="mb-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Back
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl border bg-gray-50 flex items-center justify-center overflow-hidden">
                  <Avatar className="w-12 h-12 rounded-lg">
                    {companyLogo ? (
                      <AvatarImage
                        src={companyLogo}
                        alt={`${companyName} logo`}
                        className="object-contain bg-white"
                      />
                    ) : null}
                    <AvatarFallback className="rounded-lg font-semibold">
                      {companyInitials}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
                      {jobTitle}
                    </h1>
                    {isLoadingJob ? (
                      <span className="text-xs font-medium text-gray-500">
                        Loading...
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                    <span className="inline-flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      <span className="font-medium text-gray-800">{companyName}</span>
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{location}</span>
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
                      {position}
                    </Badge>
                    <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
                      {jobType}
                    </Badge>
                    <Badge variant="outline" className="rounded-full px-3 py-1 text-xs">
                      {experience}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-start md:justify-end gap-3">
                {!isApplied ? (
                  <Button
                    disabled={isApplying}
                    className="rounded-xl px-6"
                    onClick={applyJobHandler}
                  >
                    {isApplying ? "Applying..." : "Apply Now"}
                  </Button>
                ) : (
                  <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${statusDotClass(myApplication?.status)}`}
                      aria-hidden="true"
                    />
                    <span className="text-xs text-gray-500">Application</span>
                    <Badge
                      variant={statusVariant(myApplication?.status)}
                      className="px-3 py-1 text-xs font-semibold rounded-lg"
                    >
                      {String(myApplication?.status || "pending").toUpperCase()}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <section className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-gray-900">About the role</h2>
              <p className="mt-3 text-gray-700 leading-relaxed">
                {description || "No description provided."}
              </p>

              <div className="mt-8">
                <h3 className="text-base font-semibold text-gray-900">Requirements</h3>
                {requirements.length ? (
                  <ul className="mt-3 space-y-2 text-gray-700">
                    {requirements.map((req, idx) => (
                      <li key={`${req}-${idx}`} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                        <span className="leading-relaxed">{req}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-gray-600">No requirements listed.</p>
                )}
              </div>
            </section>

            <aside className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-gray-900">Job overview</h3>
              <div className="mt-5 space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <CalendarDays className="w-4 h-4 mt-0.5 text-blue-600" />
                  <div>
                    <div className="text-gray-500">Posted</div>
                    <div className="font-medium text-gray-900">{postedOn}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Briefcase className="w-4 h-4 mt-0.5 text-blue-600" />
                  <div>
                    <div className="text-gray-500">Job type</div>
                    <div className="font-medium text-gray-900">{jobType}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 text-blue-600" />
                  <div>
                    <div className="text-gray-500">Location</div>
                    <div className="font-medium text-gray-900">{location}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Wallet className="w-4 h-4 mt-0.5 text-blue-600" />
                  <div>
                    <div className="text-gray-500">Salary</div>
                    <div className="font-medium text-gray-900">{salary}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-4 h-4 mt-0.5 text-blue-600" />
                  <div>
                    <div className="text-gray-500">Applicants</div>
                    <div className="font-medium text-gray-900">{applicantCount}</div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
};

export default JobDescription;
 

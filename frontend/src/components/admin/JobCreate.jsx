import React, { useMemo, useState } from "react";
import Navbar from "../shared/navbar.jsx";
import { Button } from "../ui/button.jsx";
import { Input } from "../ui/input.jsx";
import { Label } from "../ui/label.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Job_API_ENDPOINT } from "../../../utils/content.js";
import { toast } from "sonner";
import useGetAllCompany from "../hooks/useGetallCompany.jsx";
import { useSelector } from "react-redux";

const JobCreate = () => {
  const navigate = useNavigate();
  useGetAllCompany();
  const companies = useSelector((store) => store.company.companies);

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    salary: "",
    jobtype: "",
    experience: "",
    position: "",
    companyId: "",
  });

  const companyOptions = useMemo(() => companies || [], [companies]);

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.companyId) {
      toast.error("Please select a company");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${Job_API_ENDPOINT}/post`, form, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      if (res.data.success) {
        toast.success(res.data.message || "Job created");
        navigate("/admin/jobs");
        return;
      }
      toast.error(res.data?.message || "Failed to create job");
    } catch (error) {
      if (error?.response?.status === 401) {
        toast.error("Please login to create a job");
        navigate("/login");
        return;
      }
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create job";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-10">
        <form onSubmit={submit} className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Create Job</h2>
            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={() => navigate("/admin/jobs")}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>

          {companyOptions.length === 0 ? (
            <div className="text-sm text-gray-600">
              No companies found. Create a company first in{" "}
              <button
                type="button"
                className="underline"
                onClick={() => navigate("/admin/companies/create")}
              >
                Admin Companies
              </button>
              .
            </div>
          ) : null}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Title</Label>
              <Input name="title" value={form.title} onChange={onChange} placeholder="Frontend Developer" />
            </div>
            <div className="space-y-1">
              <Label>Company</Label>
              <select
                name="companyId"
                value={form.companyId}
                onChange={onChange}
                className="w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white"
              >
                <option value="">Select company</option>
                {companyOptions.map((c) => (
                  <option key={c?._id || c?.id} value={c?._id || c?.id}>
                    {c?.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1 md:col-span-2">
              <Label>Description</Label>
              <Input
                name="description"
                value={form.description}
                onChange={onChange}
                placeholder="Role summary..."
              />
            </div>

            <div className="space-y-1 md:col-span-2">
              <Label>Requirements (comma separated)</Label>
              <Input
                name="requirements"
                value={form.requirements}
                onChange={onChange}
                placeholder="React, Node, SQL"
              />
            </div>

            <div className="space-y-1">
              <Label>Location</Label>
              <Input name="location" value={form.location} onChange={onChange} placeholder="Remote / Bangalore" />
            </div>
            <div className="space-y-1">
              <Label>Salary</Label>
              <Input name="salary" value={form.salary} onChange={onChange} placeholder="12 LPA" />
            </div>

            <div className="space-y-1">
              <Label>Job Type</Label>
              <Input name="jobtype" value={form.jobtype} onChange={onChange} placeholder="Full-time" />
            </div>
            <div className="space-y-1">
              <Label>Experience</Label>
              <Input name="experience" value={form.experience} onChange={onChange} placeholder="2+ years" />
            </div>

            <div className="space-y-1">
              <Label>Position</Label>
              <Input name="position" value={form.position} onChange={onChange} placeholder="SDE-1" />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default JobCreate;

import React, { useState } from "react";

const Form = ({setIsFormModalClose , setIsSubmitted}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    first_name: "",
    last_name: "",
    date_of_birth: "",
    gender: "",
    blood_group: "",

    // Academic Information
    department_id: "",
    session:"",
    batch_id: "",
    registration_number: "",

    // Contact Information
    present_address: "",
    permanent_address: "",
    mobile_phone: "",
    email: "",

    // Additional Information
    current_status: "",
    occupation: "",
    work_location: "",
    work_role: "",
    company_name: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.first_name.trim())
        newErrors.first_name = "First name is required";
      if (!formData.last_name.trim())
        newErrors.last_name = "Last name is required";
      if (!formData.date_of_birth)
        newErrors.date_of_birth = "Date of birth is required";
      if (!formData.gender) newErrors.gender = "Gender is required";
      if (!formData.blood_group)
        newErrors.blood_group = "Blood group is required";
    }

    if (step === 2) {
      if (!formData.department_id)
        newErrors.department_id = "Department is required";
      if (!formData.session) newErrors.session = "Session is required";
      if (!formData.batch_id) newErrors.batch_id = "Batch is required";
      if (!formData.registration_number.trim())
        newErrors.registration_number = "Registration number is required";
    }

    if (step === 3) {
      if (!formData.present_address.trim())
        newErrors.present_address = "Present address is required";
      if (!formData.permanent_address.trim())
        newErrors.permanent_address = "Permanent address is required";
      if (!formData.mobile_phone.trim())
        newErrors.mobile_phone = "Mobile phone is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (formData.email && !emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }

      // Phone validation
      const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
      if (formData.mobile_phone && !phoneRegex.test(formData.mobile_phone)) {
        newErrors.mobile_phone = "Please enter a valid phone number";
      }
    }

    if (step === 4) {
      if (!formData.current_status)
        newErrors.current_status = "Current status is required";

      // If working, validate work-related fields
      if (formData.current_status === "Working") {
        if (!formData.work_location.trim())
          newErrors.work_location = "Job location is required";
        if (!formData.work_role.trim())
          newErrors.work_role = "Job role is required";
        if (!formData.company_name.trim())
          newErrors.company_name = "Company/institution name is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };
  
  const handleFormModalClose = () => {
    setIsFormModalClose(true);
    setFormData(null);
  }

  const handleFromSubmit = async () => {
    const response = await fetch("http://localhost:3000/students/create" , {
      method : "POST",
      body : JSON.stringify(formData) ,
      headers : {
        "Content-Type" : "application/json"
      }
    })
    const data = await response.json();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
    } , 3000)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      console.log("Form submitted:", formData);
      handleFromSubmit();
      handleFormModalClose();
    }
  };


  const renderStep1 = () => (
    <div className="space-y-4 px-1">
      <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 md:mb-6">
        Personal Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name <p className="text-red-500 inline">*</p>
          </label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            className={`w-full px-3 py-2.5 text-base border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              errors.first_name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your first name"
          />
          {errors.first_name && (
            <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>
          )}
        </div>

        <div>
          {" "}
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name <p className="text-red-500 inline">*</p>
          </label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            className={`w-full px-3 py-2.5 text-base border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              errors.last_name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your last name"
          />
          {errors.last_name && (
            <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth <p className="text-red-500 inline">*</p>
          </label>
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleInputChange}
            className={`w-full px-3 py-2.5 text-base border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              errors.date_of_birth ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.date_of_birth && (
            <p className="text-red-500 text-sm mt-1">{errors.date_of_birth}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender <p className="text-red-500 inline">*</p>
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className={`w-full px-3 py-2.5 text-base border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              errors.gender ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Blood Group <p className="text-red-500 inline">*</p>
          </label>
          <select
            name="blood_group"
            value={formData.blood_group}
            onChange={handleInputChange}
            className={`w-full px-3 py-2.5 text-base border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              errors.blood_group ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
          {errors.blood_group && (
            <p className="text-red-500 text-sm mt-1">{errors.blood_group}</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4 px-1">
      <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 md:mb-6">
        Academic Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Department <p className="text-red-500 inline">*</p>
          </label>
          <select
            name="department_id"
            value={formData.department_id}
            onChange={handleInputChange}
            className={`w-full px-3 py-2.5 text-base border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              errors.department_id ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Department</option>
            <option value="1">Computer Science And Engineering</option>
            <option value="2">Electrical And Electronic Engineering</option>
            <option value="3">Civil Engineering</option>
          </select>
          {errors.department_id && (
            <p className="text-red-500 text-sm mt-1">{errors.department_id}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Session <p className="text-red-500 inline">*</p>
          </label>
          <select
            name="session"
            value={formData.session}
            onChange={handleInputChange}
            className={`w-full px-3 py-2.5 text-base border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              errors.session ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Session <p className="text-red-500 inline">*</p></option>
            <option value="2029-30">2029-30</option>
            <option value="2028-29">2028-29</option>
            <option value="2027-28">2027-28</option>
            <option value="2026-27">2026-27</option>
            <option value="2025-26">2025-26</option>
            <option value="2024-25">2024-25</option>
            <option value="2023-24">2023-24</option>
            <option value="2022-23">2022-23</option>
            <option value="2021-22">2021-22</option>
            <option value="2020-21">2020-21</option>
            <option value="2019-20">2019-20</option>
            <option value="2018-19">2018-19</option>
            <option value="2017-18">2017-18</option>
            <option value="2016-17">2016-17</option>
            <option value="2015-16">2015-16</option>
            <option value="2013-14">2013-14</option>
            <option value="2012-13">2012-13</option>
          </select>
          {errors.session && (
            <p className="text-red-500 text-sm mt-1">{errors.session}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Batch <p className="text-red-500 inline">*</p>
          </label>
          <select
            name="batch_id"
            value={formData.batch_id}
            onChange={handleInputChange}
            className={`w-full px-3 py-2.5 text-base border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              errors.batch_id ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Batch <p className="text-red-500 inline">*</p></option>
            <option value="1">01</option>
            <option value="2">02</option>
            <option value="3">03</option>
            <option value="4">04</option>
            <option value="5">05</option>
            <option value="6">06</option>
            <option value="7">07</option>
            <option value="8">08</option>
            <option value="9">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
          {errors.batch_id && (
            <p className="text-red-500 text-sm mt-1">{errors.batch_id}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Registration Number <p className="text-red-500 inline">*</p>
          </label>
          <input
            type="text"
            name="registration_number"
            value={formData.registration_number}
            onChange={handleInputChange}
            className={`w-full px-3 py-2.5 text-base border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              errors.registration_number ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter registration number"
          />
          {errors.registration_number && (
            <p className="text-red-500 text-sm mt-1">
              {errors.registration_number}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4 px-1">
      <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 md:mb-6">
        Contact Information
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Present Address <p className="text-red-500 inline">*</p>
          </label>
          <textarea
            name="present_address"
            value={formData.present_address}
            onChange={handleInputChange}
            rows={2}
            className={`w-full px-3 py-2.5 text-base border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none ${
              errors.present_address ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your present address"
          />
          {errors.present_address && (
            <p className="text-red-500 text-sm mt-1">
              {errors.present_address}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Permanent Address <p className="text-red-500 inline">*</p>
          </label>
          <textarea
            name="permanent_address"
            value={formData.permanent_address}
            onChange={handleInputChange}
            rows={2}
            className={`w-full px-3 py-2.5 text-base border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none ${
              errors.permanent_address ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your permanent address"
          />
          {errors.permanent_address && (
            <p className="text-red-500 text-sm mt-1">
              {errors.permanent_address}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Phone <p className="text-red-500 inline">*</p>
            </label>
            <input
              type="tel"
              name="mobile_phone"
              value={formData.mobile_phone}
              onChange={handleInputChange}
              className={`w-full px-3 py-2.5 text-base border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                errors.mobile_phone ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter mobile phone number"
            />
            {errors.mobile_phone && (
              <p className="text-red-500 text-sm mt-1">{errors.mobile_phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address <p className="text-red-500 inline">*</p>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-3 py-2.5 text-base border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter email address"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-4 px-1">
      <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 md:mb-6">
        Current Status & Work Information
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Status <p className="text-red-500 inline">*</p>
          </label>
          <select
            name="current_status"
            value={formData.current_status}
            onChange={handleInputChange}
            className={`w-full px-3 py-2.5 text-base border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              errors.current_status ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Current Status</option>
            <option value="Active">Active</option>
            <option value="Graduated">Graduated</option>
            <option value="Dropped">Dropped</option>
            <option value="Suspended">Suspended</option>
            <option value="On Leave">On Leave</option>
            <option value="Employed">Employed</option>
            <option value="Unemployed">Unemployed</option>
          </select>
          {errors.current_status && (
            <p className="text-red-500 text-sm mt-1">{errors.current_status}</p>
          )}
        </div>

        {formData.current_status === "Working" && (
          <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="text-base font-medium text-blue-800 mb-3">
              Work Information
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company/Office/Institution Name <p className="text-red-500 inline">*</p>
                </label>
                <input
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2.5 text-base border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                    errors.company_name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter company or institution name"
                />
                {errors.company_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.company_name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Work Role/Position <p className="text-red-500 inline">*</p>
                </label>
                <input
                  type="text"
                  name="work_role"
                  value={formData.work_role}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2.5 text-base border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                    errors.work_role ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your role or position"
                />
                {errors.work_role && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.work_role}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Work Location <p className="text-red-500 inline">*</p>
              </label>
              <input
                type="text"
                name="work_location"
                value={formData.work_location}
                onChange={handleInputChange}
                className={`w-full px-3 py-2.5 text-base border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                  errors.work_location ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter work location (city, country)"
              />
              {errors.work_location && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.work_location}
                </p>
              )}
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            General Occupation/Field
          </label>
          <input
            type="text"
            name="occupation"
            value={formData.occupation}
            onChange={handleInputChange}
            className="w-full px-3 py-2.5 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter general occupation or field of work (optional)"
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="fixed inset-0 backdrop-blur-md bg-slate-500/50 pointer-events-auto z-40"></div>
      <div className="h-full md:h-[95%] w-full md:w-[55%] bg-white rounded-lg fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 shadow-2xl flex flex-col overflow-hidden z-50">
      <img
        className="-z-10 absolute left-1/2 top-2/3 -translate-1/2 w-xl aspect-auto opacity-15"
        src="./src/assets/form-body.svg"
        alt="fec-student-form"
      />

      {/* Form title section */}
      <div className="relative bg-linear-to-r from-indigo-600 to-indigo-800 text-white px-5 md:px-12 py-6 shrink-0">
        <img
          className="absolute right-4 top-2 w-35 md:w-45 aspect-auto"
          src="./src/assets/form_header_photo.svg"
          alt="FEC STUDENTS FORM"
        />
        <h2 className="md:text-2xl font-bold">Student Registration Form</h2>
        <p className="text-blue-100 md:text-md">Step {currentStep} of 4</p>
        <button onClick={handleFormModalClose} className="absolute right-5 top-5 p-1.5 transition-colors ease-in-out duration-300 rounded-full border-2 border-gray-500 hover:bg-red-500 cursor-pointer"><svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path className="fill-white hover:fill-gray-600" d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z"/></svg></button>
      </div>

      <div className="flex flex-col flex-1 min-h-0 px-5 md:px-12 py-6">
        {/* Progress Bar */}
        <div className="shrink-0 mb-3 md:mb-6">
          <div className="flex items-center justify-between mb-2">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              1
            </div>
            <div
              className={`flex-1 h-1.5 mx-2 ${
                currentStep >= 2 ? "bg-blue-600" : "bg-gray-300"
              }`}
            ></div>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 2
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              2
            </div>
            <div
              className={`flex-1 h-1.5 mx-2 ${
                currentStep >= 3 ? "bg-blue-600" : "bg-gray-300"
              }`}
            ></div>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 3
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              3
            </div>
            <div
              className={`flex-1 h-1.5 mx-2 ${
                currentStep >= 4 ? "bg-blue-600" : "bg-gray-300"
              }`}
            ></div>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 4
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              4
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Personal</span>
            <span>Academic</span>
            <span>Contact</span>
            <span>Status</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto min-h-0 pr-2">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
          </div>
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6 pt-4 border-t border-gray-200 shrink-0">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`cursor-pointer px-6 py-3 md:py-3.5 rounded-lg font-semibold transition-all duration-200 text-sm ${
                currentStep === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-600 text-white hover:bg-gray-700 transform hover:scale-102"
              }`}
            >
              ← Previous
            </button>

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="cursor-pointer px-6 py-3 md:py-3.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transform hover:scale-102 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 text-sm"
              >
                Next Step →
              </button>
            ) : (
              <button
                type="submit"
                className="cursor-pointer px-6 py-3 md:py-3.5 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transform hover:scale-102 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 text-sm"
              >
                ✓ Submit Form
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default Form;

import React, { useState } from "react";

const Result = ({ setIsResultModalClose, students = [] }) => {
  const [expandedStudent, setExpandedStudent] = useState(null);

  const handleModalClose = () => {
    setIsResultModalClose(true);
  };

  const toggleStudent = (index) => {
    setExpandedStudent(expandedStudent === index ? null : index);
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  //Helper function to format name
  const formatName = (name) =>{
    return name.split(" ").map(substr => substr.charAt(0).toUpperCase().concat(substr.substring(1).toLowerCase())).join(" ").substring(0 , 15);
  }
  
  // Helper function to get department name
  const getDepartmentName = (deptId) => {
    const departments = {
      1: "Computer Science And Engineering",
      2: "Electrical And Electronic Engineering",
      3: "Civil Engineering",
    };
    return departments[deptId] || deptId || "N/A";
  };

  // Helper function to format batch number
  const formatBatch = (batchId) => {
    if (!batchId) return "N/A";
    return String(batchId).padStart(2, "0");
  };

  // Student data to show
  const displayStudents = students.length > 0 ? students : [];

  return (
    <>
      <div className="fixed inset-0 backdrop-blur-md bg-slate-500/50 pointer-events-auto z-10"></div>
      <div className="h-full md:h-[95%] w-full md:w-[55%] bg-white rounded-lg fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 shadow-2xl flex flex-col overflow-hidden z-20">
        {/* Background ovelay */}
        <img
          className="z-10 absolute left-1/2 top-2/3 -translate-1/2 w-md aspect-auto opacity-40 pointer-events-none"
          src={
            displayStudents.length === 0
              ? "/no-result-found.svg"
              : "/searched-result-found.svg"
          }
          alt="search-modal-bg"
        />

        {/* Header */}
        <div className="relative bg-linear-to-r from-indigo-600 to-indigo-800 text-white px-5 md:px-10 py-5 z-30">
          <img
            className="absolute right-12 -top-2 w-25 md:w-35 aspect-auto opacity-80"
            src="/data-searching.png"
            alt="search-info"
          />
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl md:text-2xl font-bold">Search Results</h2>
              <p className="text-blue-100 text-sm mt-1">
                {displayStudents.length}{" "}
                {displayStudents.length === 1
                  ? "student found"
                  : "students found"}
              </p>
            </div>
            <button
              onClick={handleModalClose}
              className="absolute right-5 top-5 p-1.5 rounded-full border-2 border-white hover:bg-red-500 cursor-pointer transition-colors duration-200"
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
              >
                <path
                  className="fill-white"
                  d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Student List */}
        <div className="z-20 flex-1 overflow-y-auto py-4 px-5 md:px-10">
          {displayStudents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No students found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {displayStudents.map((student, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md"
                >
                  {/* Student Header */}
                  <div
                    onClick={() => toggleStudent(index)}
                    className="px-3 md:px-5 py-4 cursor-pointer flex items-center justify-between hover:bg-gray-100/80 transition-colors duration-150"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                        <span className="text-indigo-600 font-semibold text-lg">
                          {student.first_name?.[0]?.toUpperCase() || "S"}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-gray-900 truncate">
                          {formatName(student.full_name)}...
                        </h3>
                        <p className="text-sm text-gray-500 mt-0.5">
                          {student.registration_number || "N/A"} • Batch{" "}
                          {formatBatch(student.batch_id)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {student.current_status && (
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            student.current_status === "Employed"
                              ? "bg-green-100 text-green-800"
                              : student.current_status === "Active"
                              ? "bg-blue-100 text-blue-800"
                              : student.current_status === "Graduated"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {student.current_status}
                        </span>
                      )}
                      <svg
                        className={`w-5 h-5 transition-transform duration-200 shrink-0 ${
                          expandedStudent === index
                            ? "transform rotate-180"
                            : ""
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 640"
                      >
                        <path
                          className="fill-gray-400"
                          d="M297.4 438.6C309.9 451.1 330.2 451.1 342.7 438.6L502.7 278.6C515.2 266.1 515.2 245.8 502.7 233.3C490.2 220.8 469.9 220.8 457.4 233.3L320 370.7L182.6 233.4C170.1 220.9 149.8 220.9 137.3 233.4C124.8 245.9 124.8 266.2 137.3 278.7L297.3 438.7z"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedStudent === index && (
                    <div className="border-t border-gray-200 px-5 py-4 bg-gray-50">
                      <div className="space-y-4">
                        {/* Personal Information */}
                        <div>
                          <h4 className="text-sm font-semibold text-indigo-700 mb-3 flex items-center gap-2">
                            <svg
                              className="h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 640 640"
                            >
                              <path
                                className="fill-indigo-700"
                                d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z"
                              />
                            </svg>
                            Personal Information
                          </h4>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <span className="text-gray-500">
                                Name:
                              </span>
                              <p className="text-gray-900 font-medium">
                                {student.full_name}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-500">
                                Date of Birth:
                              </span>
                              <p className="text-gray-900 font-medium">
                                {formatDate(student.date_of_birth)}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-500">Gender:</span>
                              <p className="text-gray-900 font-medium">
                                {student.gender || "N/A"}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-500">
                                Blood Group:
                              </span>
                              <p className="text-gray-900 font-medium">
                                {student.blood_group || "N/A"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Academic Information */}
                        <div>
                          <h4 className="text-sm font-semibold text-indigo-700 mb-3 flex items-center gap-2">
                            <svg
                              className="h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 640 640"
                            >
                              <path
                                className="fill-indigo-700"
                                d="M320 205.3L320 514.6L320.5 514.4C375.1 491.7 433.7 480 492.8 480L512 480L512 160L492.8 160C450.6 160 408.7 168.4 369.7 184.6C352.9 191.6 336.3 198.5 320 205.3zM294.9 125.5L320 136L345.1 125.5C391.9 106 442.1 96 492.8 96L528 96C554.5 96 576 117.5 576 144L576 496C576 522.5 554.5 544 528 544L492.8 544C442.1 544 391.9 554 345.1 573.5L332.3 578.8C324.4 582.1 315.6 582.1 307.7 578.8L294.9 573.5C248.1 554 197.9 544 147.2 544L112 544C85.5 544 64 522.5 64 496L64 144C64 117.5 85.5 96 112 96L147.2 96C197.9 96 248.1 106 294.9 125.5z"
                              />
                            </svg>
                            Academic Information
                          </h4>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <span className="text-gray-500">Department:</span>
                              <p className="text-gray-900 font-medium">
                                {getDepartmentName(student.department_id)}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-500">Session:</span>
                              <p className="text-gray-900 font-medium">
                                {student.session || "N/A"}
                              </p>
                            </div>
                            <div className="col-span-2">
                              <span className="text-gray-500">
                                Registration Number:
                              </span>
                              <p className="text-gray-900 font-medium">
                                {student.registration_number || "N/A"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Contact Information */}
                        <div>
                          <h4 className="text-sm font-semibold text-indigo-700 mb-3 flex items-center gap-2">
                            <svg
                              className="w-4 h-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 640 640"
                            >
                              <path
                                className="fill-indigo-700"
                                d="M160 64C124.7 64 96 92.7 96 128L96 512C96 547.3 124.7 576 160 576L448 576C483.3 576 512 547.3 512 512L512 128C512 92.7 483.3 64 448 64L160 64zM272 352L336 352C380.2 352 416 387.8 416 432C416 440.8 408.8 448 400 448L208 448C199.2 448 192 440.8 192 432C192 387.8 227.8 352 272 352zM248 256C248 225.1 273.1 200 304 200C334.9 200 360 225.1 360 256C360 286.9 334.9 312 304 312C273.1 312 248 286.9 248 256zM576 144C576 135.2 568.8 128 560 128C551.2 128 544 135.2 544 144L544 208C544 216.8 551.2 224 560 224C568.8 224 576 216.8 576 208L576 144zM576 272C576 263.2 568.8 256 560 256C551.2 256 544 263.2 544 272L544 336C544 344.8 551.2 352 560 352C568.8 352 576 344.8 576 336L576 272zM560 384C551.2 384 544 391.2 544 400L544 464C544 472.8 551.2 480 560 480C568.8 480 576 472.8 576 464L576 400C576 391.2 568.8 384 560 384z"
                              />
                            </svg>
                            Contact Information
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="text-gray-500">
                                Present Address:
                              </span>
                              <p className="text-gray-900">
                                {student.present_address || "N/A"}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-500">
                                Permanent Address:
                              </span>
                              <p className="text-gray-900">
                                {student.permanent_address || "N/A"}
                              </p>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <span className="text-gray-500">Mobile:</span>
                                <p className="text-gray-900 font-medium">
                                  {"01*********" || "N/A"}
                                </p>
                              </div>
                              <div>
                                <span className="text-gray-500">Email:</span>
                                <p className="text-gray-900 font-medium wrap-break-word">
                                  {student.email || "N/A"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Current Status & Career */}
                        {student.current_status && (
                          <div>
                            <h4 className="text-sm font-semibold text-indigo-700 mb-3 flex items-center gap-2">
                              <svg
                                className="h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 640 640"
                              >
                                <path
                                  className="fill-indigo-700"
                                  d="M264 112L376 112C380.4 112 384 115.6 384 120L384 160L256 160L256 120C256 115.6 259.6 112 264 112zM208 120L208 160L128 160C92.7 160 64 188.7 64 224L64 320L576 320L576 224C576 188.7 547.3 160 512 160L432 160L432 120C432 89.1 406.9 64 376 64L264 64C233.1 64 208 89.1 208 120zM576 368L384 368L384 384C384 401.7 369.7 416 352 416L288 416C270.3 416 256 401.7 256 384L256 368L64 368L64 480C64 515.3 92.7 544 128 544L512 544C547.3 544 576 515.3 576 480L576 368z"
                                />
                              </svg>
                              Current Status & Career
                            </h4>
                            <div className="space-y-2 text-sm">
                              {student.occupation && (
                                <div>
                                  <span className="text-gray-500">
                                    Occupation:
                                  </span>
                                  <p className="text-gray-900 font-medium">
                                    {student.occupation}
                                  </p>
                                </div>
                              )}
                              {student.current_status === "Working" && (
                                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200 space-y-2">
                                  {student.company_name && (
                                    <div>
                                      <span className="text-gray-600">
                                        Company:
                                      </span>
                                      <p className="text-gray-900 font-medium">
                                        {student.company_name}
                                      </p>
                                    </div>
                                  )}
                                  {student.work_role && (
                                    <div>
                                      <span className="text-gray-600">
                                        Role:
                                      </span>
                                      <p className="text-gray-900 font-medium">
                                        {student.work_role}
                                      </p>
                                    </div>
                                  )}
                                  {student.work_location && (
                                    <div>
                                      <span className="text-gray-600">
                                        Location:
                                      </span>
                                      <p className="text-gray-900 font-medium">
                                        {student.work_location}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Result;

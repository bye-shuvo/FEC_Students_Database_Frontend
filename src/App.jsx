import { useEffect, useState } from "react";
import Form from "./Form";
import Result from "./Result";
import Toast from "./assets/Toast";

function App() {
  const [isFormModalClose, setIsFormModalClose] = useState(true);
  const [isResultModalClose, setIsResultModalClose] = useState(true);
  const [isSearchBtnActive, setIsSearchBtnActive] = useState(true);
  const [isSubmitted , setIsSubmitted] = useState(false);
  const [params, setParams] = useState({});
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async () => {
    const queryParams = new URLSearchParams();
    if (
      params.registration_number &&
      params.registration_number.trim() !== ""
    ) {
      queryParams.append("registration_number", params.registration_number);
    }
    if (params.department_id && params.department_id.trim() !== "") {
      queryParams.append("department_id", params.department_id);
    }
    if (params.batch_id && params.batch_id.trim() !== "") {
      queryParams.append("batch_id", params.batch_id);
    }
    const query = queryParams.toString();

    const response = await fetch(
      `https://fecsdb-backend.vercel.app/students/search?${query}`
    );
    const data = await response.json();
    setResult(data);
    setIsResultModalClose(false);
  };

  return (
    <>
      <div className={`flex items-center flex-col p-1 md:p-0`}>
        {isSubmitted && (
          <Toast
            type={"confirmation"}
            message={"Form Submitted Successfully"}
            bottom={20}
            right={10}
          />
        )}
        <header className="p-4 md:p-0">
          <h1 className="pb-1 bg-linear-to-r from-indigo-600 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-3 md:mb-5 font-extrabold text-3xl lg:text-6xl lg:mt-14 text-center tracking-tight">
            Welcome to the student database <br />
            of
            <br /> Faridpur Engineering College
          </h1>
          <h2 className="text-shadow-gray-900 text-gray-600 text-sm lg:text-xl text-center md:mb-5 font-semibold">
            Search for an existing student of our college{" "}
            <span className="bg-linear-to-r from-indigo-600 via-pink-500 to-orange-500 bg-clip-text text-transparent text-md lg:text-2xl">
              Or
            </span>{" "}
            Add a new student in the database
          </h2>
        </header>

        <div
          className={`lg:w-2/3 rounded-xl p-4 lg:p-10 mb-5 hover:shadow-md shadow-sm bg-slate-100 border ${
            isSearchBtnActive
              ? "border-emerald-600 shadow-emerald-500"
              : "border-indigo-600 shadow-indigo-600"
          } `}
        >
          {/* Tab section */}
          <section
            id="tab_section"
            className="w-full flex justify-evenly lg:justify-between mb-4 lg:mb-8"
          >
            <button
              id="search_section_btn"
              className={`cursor-pointer text-sm lg:text-lg text-center w-[45%] lg:w-[48%] py-3 lg:py-4 rounded-lg text-white ${
                isSearchBtnActive ? "bg-indigo-700" : "bg-gray-600"
              }`}
              onClick={() => setIsSearchBtnActive(true)}
            >
              Search a student
            </button>
            <button
              id="add_section_btn"
              className={`cursor-pointer text-sm lg:text-lg text-center w-[45%] lg:w-[48%] py-3 lg:py-4 rounded-md lg:rounded-lg text-white ${
                !isSearchBtnActive ? "bg-indigo-700" : "bg-gray-600"
              }`}
              onClick={() => setIsSearchBtnActive(false)}
            >
              Add a Student
            </button>
          </section>

          {/* Search section */}
          {isSearchBtnActive ? (
            <section id="search_student">
              <div className="w-full flex flex-col gap-3">
                {/* Header Section */}
                <div className="text-center mb-1">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <svg
                      className="h-6 w-6 md:h-8 md:w-8"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 640"
                    >
                      <path
                        className="fill-emerald-600"
                        d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z"
                      />
                    </svg>
                    <h2 className="text-xl lg:text-3xl text-emerald-600 font-bold">
                      Search Student Database
                    </h2>
                  </div>
                  <p className="text-sm md:text-base text-gray-600 lg:leading-relaxed max-w-2xl mx-auto">
                    Find and view information about students from Faridpur
                    Engineering College. Use the filters below to narrow down
                    your search by department and batch number.
                  </p>
                </div>

                {/* Search Form */}
                <div className="space-y-2 md:space-y-5">
                  {/* Registration Number Selection */}
                  <div className="bg-white rounded-lg p-3 md:p-4 shadow-sm border border-gray-200">
                    <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 640"
                      >
                        <path
                          className="fill-indigo-600"
                          d="M32 160C32 124.7 60.7 96 96 96L544 96C579.3 96 608 124.7 608 160L32 160zM32 208L608 208L608 480C608 515.3 579.3 544 544 544L96 544C60.7 544 32 515.3 32 480L32 208zM279.3 480C299.5 480 314.6 460.6 301.7 445C287 427.3 264.8 416 240 416L176 416C151.2 416 129 427.3 114.3 445C101.4 460.6 116.5 480 136.7 480L279.2 480zM208 376C238.9 376 264 350.9 264 320C264 289.1 238.9 264 208 264C177.1 264 152 289.1 152 320C152 350.9 177.1 376 208 376zM392 272C378.7 272 368 282.7 368 296C368 309.3 378.7 320 392 320L504 320C517.3 320 528 309.3 528 296C528 282.7 517.3 272 504 272L392 272zM392 368C378.7 368 368 378.7 368 392C368 405.3 378.7 416 392 416L504 416C517.3 416 528 405.3 528 392C528 378.7 517.3 368 504 368L392 368z"
                        />
                      </svg>
                      Registration Number
                      <span className="text-xs font-normal text-gray-500 ml-1">
                        (Optional)
                      </span>
                    </label>
                    <input
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 md:py-3 text-sm md:text-base border-2 border-gray-300 rounded-md md:rounded-lg focus:outline-none focus:border-emerald-500 transition-all duration-200 bg-white hover:border-gray-400 cursor-pointer [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      type="number"
                      name="registration_number"
                      id="reg_input"
                      min={0}
                    />
                    <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                      <svg
                        className="h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 640"
                      >
                        <path
                          className="fill-gray-500"
                          d="M320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576zM320 384C302.3 384 288 398.3 288 416C288 433.7 302.3 448 320 448C337.7 448 352 433.7 352 416C352 398.3 337.7 384 320 384zM320 192C301.8 192 287.3 207.5 288.6 225.7L296 329.7C296.9 342.3 307.4 352 319.9 352C332.5 352 342.9 342.3 343.8 329.7L351.2 225.7C352.5 207.5 338.1 192 319.8 192z"
                        />
                      </svg>
                      Enter registration number to search specific students
                    </p>
                  </div>

                  {/* Department Selection */}
                  <div className="bg-white rounded-lg p-3 md:p-4 shadow-sm border border-gray-200">
                    <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <svg
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 640"
                      >
                        <path
                          className="fill-indigo-600"
                          d="M192 64C156.7 64 128 92.7 128 128L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 128C512 92.7 483.3 64 448 64L192 64zM304 416L336 416C353.7 416 368 430.3 368 448L368 528L272 528L272 448C272 430.3 286.3 416 304 416zM224 176C224 167.2 231.2 160 240 160L272 160C280.8 160 288 167.2 288 176L288 208C288 216.8 280.8 224 272 224L240 224C231.2 224 224 216.8 224 208L224 176zM368 160L400 160C408.8 160 416 167.2 416 176L416 208C416 216.8 408.8 224 400 224L368 224C359.2 224 352 216.8 352 208L352 176C352 167.2 359.2 160 368 160zM224 304C224 295.2 231.2 288 240 288L272 288C280.8 288 288 295.2 288 304L288 336C288 344.8 280.8 352 272 352L240 352C231.2 352 224 344.8 224 336L224 304zM368 288L400 288C408.8 288 416 295.2 416 304L416 336C416 344.8 408.8 352 400 352L368 352C359.2 352 352 344.8 352 336L352 304C352 295.2 359.2 288 368 288z"
                        />
                      </svg>
                      Department
                      <span className="text-xs font-normal text-gray-500 ml-1">
                        (Optional)
                      </span>
                    </label>
                    <select
                      onChange={handleInputChange}
                      name="department_id"
                      className="w-full px-4 py-2 md:py-3 text-sm md:text-base border-2 border-gray-300 rounded-md md:rounded-lg focus:outline-none focus:border-emerald-500 transition-all duration-200 bg-white hover:border-gray-400 cursor-pointer"
                    >
                      <option value="">All Departments</option>
                      <option value="1">
                        Computer Science And Engineering
                      </option>
                      <option value="2">
                        Electrical And Electronic Engineering
                      </option>
                      <option value="3">Civil Engineering</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Leave blank to search across all departments
                    </p>
                  </div>

                  {/* Batch Selection */}
                  <div className="bg-white rounded-lg p-3 md:p-4 shadow-sm border border-gray-200">
                    <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 640"
                      >
                        <path
                          className="fill-indigo-600"
                          d="M334.3 51.4C325.3 46.9 314.7 46.9 305.7 51.4L49.7 179.4C33.9 187.3 27.5 206.5 35.4 222.3C43.3 238.1 62.5 244.5 78.3 236.6L320 115.8L561.7 236.6C577.5 244.5 596.7 238.1 604.6 222.3C612.5 206.5 606.1 187.3 590.3 179.4L334.3 51.4zM320 336C350.9 336 376 310.9 376 280C376 249.1 350.9 224 320 224C289.1 224 264 249.1 264 280C264 310.9 289.1 336 320 336zM320 384C267 384 224 427 224 480L224 512C224 529.7 238.3 544 256 544L384 544C401.7 544 416 529.7 416 512L416 480C416 427 373 384 320 384zM192 320C192 293.5 170.5 272 144 272C117.5 272 96 293.5 96 320C96 346.5 117.5 368 144 368C170.5 368 192 346.5 192 320zM544 320C544 293.5 522.5 272 496 272C469.5 272 448 293.5 448 320C448 346.5 469.5 368 496 368C522.5 368 544 346.5 544 320zM144 400C99.8 400 64 435.8 64 480L64 513.1C64 530.1 77.8 544 94.9 544L182.7 544C178.4 534.2 176 523.4 176 512L176 464C176 445.6 179.5 428 185.8 411.8C173.6 404.3 159.3 400 144 400zM457.4 544L545.2 544C562.2 544 576.1 530.2 576.1 513.1L576.1 480C576.1 435.8 540.3 400 496.1 400C480.8 400 466.5 404.3 454.3 411.8C460.6 428 464.1 445.6 464.1 464L464.1 512C464.1 523.4 461.7 534.2 457.4 544z"
                        />
                      </svg>
                      Batch Number
                      <span className="text-xs font-normal text-gray-500 ml-1">
                        (Optional)
                      </span>
                    </label>
                    <select
                      onChange={handleInputChange}
                      name="batch_id"
                      className="w-full px-4 py-2 md:py-3 text-sm md:text-base border-2 border-gray-300 rounded-md md:rounded-lg focus:outline-none focus:border-emerald-500 transition-all duration-200 bg-white hover:border-gray-400 cursor-pointer"
                    >
                      <option value="">Select Batch</option>
                      <option value="1">Batch 01</option>
                      <option value="2">Batch 02</option>
                      <option value="3">Batch 03</option>
                      <option value="4">Batch 04</option>
                      <option value="5">Batch 05</option>
                      <option value="6">Batch 06</option>
                      <option value="7">Batch 07</option>
                      <option value="8">Batch 08</option>
                      <option value="9">Batch 09</option>
                      <option value="10">Batch 10</option>
                      <option value="11">Batch 11</option>
                      <option value="12">Batch 12</option>
                      <option value="13">Batch 13</option>
                      <option value="14">Batch 14</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Select the batch to filter students by graduation year
                    </p>
                  </div>

                  {/* Search Button */}
                  <button
                    onClick={handleSearch}
                    className="cursor-pointer w-full px-6 py-3 md:py-4 bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 text-base md:text-lg transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    Search Students
                  </button>

                  {/* Quick Info */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                    <div className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-blue-600 shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="text-xs text-blue-800 leading-relaxed">
                        <strong>Tip:</strong> You can search without selecting
                        any filters to view all students, or combine filters for
                        more specific results. Click on any student in the
                        results to view their complete profile.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            // Add section
            <section id="add_student">
              <div className="w-full flex flex-col gap-3">
                {/* Header Section */}
                <div className="text-center mb-1">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <svg
                      className="h-6 md:h-8"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 640"
                    >
                      <path
                        className="fill-indigo-700"
                        d="M136 192C136 125.7 189.7 72 256 72C322.3 72 376 125.7 376 192C376 258.3 322.3 312 256 312C189.7 312 136 258.3 136 192zM48 546.3C48 447.8 127.8 368 226.3 368L285.7 368C384.2 368 464 447.8 464 546.3C464 562.7 450.7 576 434.3 576L77.7 576C61.3 576 48 562.7 48 546.3zM544 160C557.3 160 568 170.7 568 184L568 232L616 232C629.3 232 640 242.7 640 256C640 269.3 629.3 280 616 280L568 280L568 328C568 341.3 557.3 352 544 352C530.7 352 520 341.3 520 328L520 280L472 280C458.7 280 448 269.3 448 256C448 242.7 458.7 232 472 232L520 232L520 184C520 170.7 530.7 160 544 160z"
                      />
                    </svg>
                    <h2 className="text-xl md:text-3xl text-indigo-700 font-bold">
                      Register as a New Student
                    </h2>
                  </div>
                  <p className="text-sm md:text-base text-gray-600 md:leading-relaxed max-w-2xl mx-auto">
                    Join the Faridpur Engineering College student database.
                    Complete the registration form to add your information to
                    our official records and connect with our alumni network.
                  </p>
                </div>

                {/* Registration Card */}
                <div className="bg-white rounded-lg p-2 md:p-3 shadow-sm border border-gray-200">
                  {/* Welcome Message */}
                  <div className="flex flex-col md:flex-row items-center justify-center gap-3 p-2 md:p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                    <div className="flex justify-center items-start gap-3">
                      <svg
                        className="h-6 w-6 shrink-0"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 640"
                      >
                        <path
                          className="fill-indigo-900"
                          d="M320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576zM320 112C205.1 112 112 205.1 112 320C112 434.9 205.1 528 320 528C434.9 528 528 434.9 528 320C528 205.1 434.9 112 320 112zM390.7 233.9C398.5 223.2 413.5 220.8 424.2 228.6C434.9 236.4 437.3 251.4 429.5 262.1L307.4 430.1C303.3 435.8 296.9 439.4 289.9 439.9C282.9 440.4 276 437.9 271.1 433L215.2 377.1C205.8 367.7 205.8 352.5 215.2 343.2C224.6 333.9 239.8 333.8 249.1 343.2L285.1 379.2L390.7 234z"
                        />
                      </svg>
                      <div>
                        {" "}
                        <h3 className="text-base font-semibold text-indigo-900 mb-1">
                          Welcome to FEC
                        </h3>
                        <p className="text-sm text-indigo-700 leading-relaxed">
                          If you are a new student or alumni, please complete
                          the registration form to be added to our official
                          records and maintain accurate database information.
                        </p>
                      </div>
                    </div>
                    {/* Benefits Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full md:w-1/2 shrink-0">
                      <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <svg
                          className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                          />
                        </svg>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Alumni Network
                          </p>
                          <p className="text-xs text-gray-600">
                            Connect with fellow graduates
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <svg
                          className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Official Records
                          </p>
                          <p className="text-xs text-gray-600">
                            Update your information
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Register Button */}
                <button
                  className="cursor-pointer w-full px-6 py-3 md:py-4 bg-linear-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 text-base md:text-lg transform hover:scale-[1.02] active:scale-[0.98]"
                  onClick={() => {
                    setIsFormModalClose(false);
                  }}
                >
                  <svg
                    className="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                  >
                    <path
                      className="fill-white"
                      d="M136 192C136 125.7 189.7 72 256 72C322.3 72 376 125.7 376 192C376 258.3 322.3 312 256 312C189.7 312 136 258.3 136 192zM48 546.3C48 447.8 127.8 368 226.3 368L285.7 368C384.2 368 464 447.8 464 546.3C464 562.7 450.7 576 434.3 576L77.7 576C61.3 576 48 562.7 48 546.3zM544 160C557.3 160 568 170.7 568 184L568 232L616 232C629.3 232 640 242.7 640 256C640 269.3 629.3 280 616 280L568 280L568 328C568 341.3 557.3 352 544 352C530.7 352 520 341.3 520 328L520 280L472 280C458.7 280 448 269.3 448 256C448 242.7 458.7 232 472 232L520 232L520 184C520 170.7 530.7 160 544 160z"
                    />
                  </svg>
                  Register Now
                </button>

                {/* Quick Info */}
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-xs text-indigo-800 leading-relaxed">
                      <strong>Note:</strong> The registration form will guide
                      you through multiple steps to collect your personal,
                      academic, contact, and career information. All fields
                      marked with an asterisk (*) are required.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>

        {!isFormModalClose && (
          <Form setIsFormModalClose={setIsFormModalClose} setIsSubmitted={setIsSubmitted}/>
        )}
        {!isResultModalClose && (
          <Result
            students={result.data}
            setIsResultModalClose={setIsResultModalClose}
          />
        )}
      </div>
    </>
  );
}

export default App;

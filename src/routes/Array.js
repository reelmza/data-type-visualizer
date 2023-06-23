import { useState, useRef } from "react";
const Array = () => {
  const [activeModal, setActiveModal] = useState({
    state: null,
    title: "",
    description: "",
    buttonText: "",
    submitFunction: null,
  });
  const [uiArray, setUiArray] = useState([]);
  const [displayBox, setDisplayBox] = useState({ title: "", message: "" });
  const optionsRef = useRef();

  const create = (e) => {
    e.preventDefault();
    const input = Number(e.target[0].value);
    const mutableArray = [...uiArray];

    mutableArray[0] = input;
    optionsRef.current.selectedIndex = 0;

    setUiArray(mutableArray);
    setActiveModal((prev) => {
      const newModal = { ...prev, state: null };
      return newModal;
    });
    return;
  };

  const insert = (e) => {
    e.preventDefault();
    const input = Number(e.target[0].value);
    const mutableArray = [...uiArray];
    const nextFreeIndex = mutableArray.length;

    mutableArray[nextFreeIndex] = input;
    optionsRef.current.selectedIndex = 0;

    console.log(`Added ${input} to index ${nextFreeIndex}`);

    setUiArray(mutableArray);
    setActiveModal((prev) => {
      const newModal = { ...prev, state: null };
      return newModal;
    });
    return;
  };

  const read = (e) => {
    e.preventDefault();
    const input = Number(e.target[0].value);

    optionsRef.current.selectedIndex = 0;
    console.log(`Index ${input} contains ${uiArray[input]}`);

    setDisplayBox({
      title: `The item at index ${input} is: `,
      message: uiArray[input],
    });

    setActiveModal((prev) => {
      const newModal = { ...prev, state: null };
      return newModal;
    });
    return;
  };

  const update = (e) => {
    e.preventDefault();
    const index = e.target[0].value.split(",")[0];
    const value = e.target[0].value.split(",")[1];

    const mutableArray = [...uiArray];
    mutableArray[index] = value;

    optionsRef.current.selectedIndex = 0;
    setUiArray(mutableArray);
    setActiveModal((prev) => {
      const newModal = { ...prev, state: null };
      return newModal;
    });
  };

  const merge = (e) => {
    e.preventDefault();
    const arrayToMerge = e.target[0].value.split(",");
    let newArray = [...uiArray];
    let nextFreeIndex = newArray.length;

    for (let i = 0; i < arrayToMerge.length; i++) {
      newArray[nextFreeIndex] = Number(arrayToMerge[i]);
      nextFreeIndex += 1;
    }

    optionsRef.current.selectedIndex = 0;

    setUiArray(newArray);
    console.log(newArray);
    setActiveModal((prev) => {
      const newModal = { ...prev, state: null };
      return newModal;
    });
  };

  const sort = () => {
    var mutableArray = uiArray;

    var output = [];
    var inserted;

    for (var i = 0, ii = mutableArray.length; i < ii; i++) {
      inserted = false;
      for (var j = 0, jj = output.length; j < jj; j++) {
        if (mutableArray[i] < output[j]) {
          inserted = true;
          output.splice(j, 0, mutableArray[i]);
          break;
        }
      }

      if (!inserted) output.push(mutableArray[i]);
    }

    optionsRef.current.selectedIndex = 0;

    setUiArray(output);
  };

  const remove = (e) => {
    e.preventDefault();
    const input = Number(e.target[0].value);

    const mutableArray = [...uiArray];
    let newArray = [];
    let newCurrentIndex = 0;

    for (let i = 0; i < mutableArray.length; i++) {
      if (input !== mutableArray[i]) {
        newArray[newCurrentIndex] = mutableArray[i];
        newCurrentIndex += 1;
      }
    }

    optionsRef.current.selectedIndex = 0;
    console.log(newArray);

    setUiArray(newArray);
    setActiveModal((prev) => {
      const newModal = { ...prev, state: null };
      return newModal;
    });
  };

  // Call correct tree function
  const callArrayOps = (e) => {
    const opsToPerform = e?.target?.value;

    // Clear existing messages before
    // calling new function
    setDisplayBox({ title: "", message: "" });

    if (opsToPerform === "create") {
      setActiveModal((prev) => {
        const newModal = {
          ...prev,
          state: "array-create",
          title: "Create array",
          description:
            "Enter the first value. You can't use strings or special characters.",
          buttonText: "Create",
          submitFunction: create,
        };

        return newModal;
      });
    }

    if (opsToPerform === "insert") {
      setActiveModal((prev) => {
        const newModal = {
          ...prev,
          state: "array-insert",
          title: "Insert in array",
          description:
            "Enter a value add. You can't use strings or special characters.",
          buttonText: "Add",
          submitFunction: insert,
        };

        return newModal;
      });
    }

    if (opsToPerform === "remove") {
      setActiveModal((prev) => {
        const newModal = {
          ...prev,
          state: "array-remove",
          title: "Remove from array",
          description:
            "Enter a value to delete add. You can't use strings or special characters.",
          buttonText: "Remove",
          submitFunction: remove,
        };

        return newModal;
      });
    }

    if (opsToPerform === "read") {
      setActiveModal((prev) => {
        const newModal = {
          ...prev,
          state: "array-read",
          title: "Read an index",
          description: "Enter the index of an item to read in the array.",
          buttonText: "Read",
          submitFunction: read,
        };

        return newModal;
      });
    }

    if (opsToPerform === "update") {
      setActiveModal((prev) => {
        const newModal = {
          ...prev,
          state: "array-update",
          title: "Update an item",
          description:
            "Enter the index and the new value, separate entries with a coma e.g 0, 6",
          buttonText: "Update",
          submitFunction: update,
        };

        return newModal;
      });
    }

    if (opsToPerform === "sort") {
      return sort();
    }

    if (opsToPerform === "merge") {
      setActiveModal((prev) => {
        const newModal = {
          ...prev,
          state: "array-merge",
          title: "Merge array",
          description:
            "Define new array to merge, separate entries with a coma e.g 0, 6, 5, 7, 8",
          buttonText: "Merge",
          submitFunction: merge,
        };

        return newModal;
      });
    }
  };

  // Cancel modal
  const cancelModal = (e) => {
    e.preventDefault();
    optionsRef.current.selectedIndex = 0;

    setActiveModal((prev) => {
      const newModal = { ...prev, state: null };
      return newModal;
    });
  };

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center">
        {/* Array UI */}
        <div className={`w-[50%] md:w-[30%] lg:w-[20%] flex justify-center`}>
          <div className="w-fit flex items-center justify-center border-y-2 border-l-2">
            {uiArray.map((item) => {
              const index = uiArray.indexOf(item) + Math.random() * 10;
              return (
                <div
                  className={`border-r-2 w-10 h-10 flex items-center justify-center font-semibold`}
                  key={index}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>

        {/* Display Box */}
        <div className="h-12 w-[80%] md:w-[30%] lg:w-[20%] my-1 text-gray-600 flex items-center justify-center">
          <div className="font-semibold mr-2">{displayBox.title}</div>
          <div>{displayBox.message}</div>
        </div>

        {/* Controls */}
        <div className="h-12 w-[80%] md:w-[30%] lg:w-[20%] flex justify-center">
          <select
            className="h-full w-full border-2 rounded px-2 outline-none font-semibold text-gray-600 bg-white"
            onChange={callArrayOps}
            ref={optionsRef}
          >
            <option value="">Select an operation</option>

            {uiArray.length < 1 && <option value="create">Create Array</option>}
            {uiArray.length > 0 && (
              <>
                <option value="insert">Insert</option>
                {uiArray.length > 0 && <option value="remove">Delete</option>}
                <option value="read">Read</option>
                <option value="update">Update</option>
                <option value="sort">Sort</option>
                <option value="merge">Merge</option>
              </>
            )}
          </select>
        </div>
      </div>

      {/* Modal */}
      {activeModal?.state !== null && (
        <div className="absolute top-0 left-0 h-full w-full z-30 flex items-center justify-center">
          {/* Modal content */}
          <div className="z-20 w-[85%] md:w-[50%] lg:w-[30%] h-fit bg-white shadow-xl rounded-md flex flex-col">
            {/* Modal Title */}
            <div className="w-full border-b text-2xl font-semibold px-5 md:px-10 py-5 mb-5">
              {activeModal?.title}
            </div>

            {/* Modal description */}
            <div className="text-gray-600 px-5 md:px-10 pb-5">
              {activeModal?.description}
            </div>

            {/* Form  */}
            <form
              className="px-5 md:px-10"
              onSubmit={activeModal?.submitFunction}
            >
              <input
                type="text"
                className="w-full h-12 px-3 text-gray-600 border rounded-md mb-5"
                placeholder="Enter value"
              />

              <div className="flex items-center justify-between mb-10">
                <button
                  className="w-[48%] h-12 bg-gray-200 hover:bg-gray-300 text-black font-semibold rounded-md"
                  onClick={cancelModal}
                >
                  Cancel
                </button>
                <button
                  className="w-[48%] h-12 flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md shadow-md shadow-red-100"
                  type="submit"
                >
                  <span className="mr-2">{activeModal.buttonText}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 mt-[2px]"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>

          {/* Modal Overlay */}
          <div className="absolute top-0 left-0 bg-black h-full w-full opacity-75 z-10"></div>
        </div>
      )}
    </>
  );
};

export default Array;

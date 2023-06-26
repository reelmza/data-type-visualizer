import STACK from "../functions/STACK";
import { useState, useRef } from "react";

const Stack = () => {
  const [activeModal, setActiveModal] = useState({
    state: null,
    title: "",
    description: "",
    buttonText: "",
    submitFunction: null,
  });
  const [uiStack, setUiStack] = useState({ items: [], count: 0 });
  const [displayBox, setDisplayBox] = useState({ title: "", message: "" });
  const optionsRef = useRef();

  let mutableStack = new STACK();

  const insertToStack = (e) => {
    e.preventDefault();

    const input = Number(e.target[0].value);
    if (uiStack.items.length > 0) {
      mutableStack.items = uiStack.items;
      mutableStack.count = uiStack.count;
    }

    mutableStack.push(input);
    console.log(mutableStack);
    optionsRef.current.selectedIndex = 0;

    setUiStack(mutableStack);
    setActiveModal((prev) => {
      const newModal = { ...prev, state: null };
      return newModal;
    });
  };

  // Call correct tree function
  const callStackOps = (e) => {
    const opsToPerform = e?.target?.value;

    // Clear existing messages before
    // calling new function
    setDisplayBox({ title: "", message: "" });

    // Create stack
    if (opsToPerform === "create" || opsToPerform === "insert") {
      setActiveModal((prev) => {
        const newModal = {
          ...prev,
          state: "stack-create",
          title: "Add to stack",
          description: "Enter value of the item to ad to the tree.",
          buttonText: "Add",
          submitFunction: insertToStack,
        };

        return newModal;
      });
      return;
    }

    if (opsToPerform === "delete") {
      mutableStack.items = uiStack.items;
      mutableStack.count = uiStack.count;

      mutableStack.pop();
      console.log(mutableStack);
      optionsRef.current.selectedIndex = 0;

      setUiStack(mutableStack);
      return;
    }

    if (opsToPerform === "clear") {
      mutableStack.items = uiStack.items;
      mutableStack.count = uiStack.count;

      mutableStack.clear();
      console.log(mutableStack);

      setUiStack(mutableStack);
      return;
    }

    if (opsToPerform === "size") {
      mutableStack.items = uiStack.items;
      mutableStack.count = uiStack.count;

      optionsRef.current.selectedIndex = 0;

      setDisplayBox({
        title: "The size of the stack is:",
        message: mutableStack.size(),
      });

      console.log(mutableStack);
      return;
    }

    if (opsToPerform === "peek") {
      mutableStack.items = uiStack.items;
      mutableStack.count = uiStack.count;

      optionsRef.current.selectedIndex = 0;

      setDisplayBox({
        title: "The last items in the stack is:",
        message: mutableStack.peek(),
      });

      console.log(mutableStack);
      return;
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
        {/* Stack UI */}
        <div className="w-[50%] md:w-[30%] lg:w-[20%] flex flex-col items-center">
          {/* Stack Elements */}
          <div className="flex flex-col-reverse border-x-2 border-b-2 border-gray-800 shadow-lg rounded-b-md w-44 h-[21.8rem] px-5 pb-5">
            {uiStack.items.map((item) => {
              const index = uiStack.items.indexOf(item);
              return (
                <div
                  className={`h-12 w-full flex items-center justify-center bg-red-600 rounded-md text-white font-semibold ${
                    index !== 0 ? "mb-5" : ""
                  }`}
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
            onChange={callStackOps}
            ref={optionsRef}
          >
            <option value="">Select an operation</option>

            {uiStack.items.length < 1 && (
              <option value="create">Create Stack</option>
            )}
            {uiStack.items.length > 0 && (
              <>
                {uiStack.items.length > 0 && (
                  <option value="delete">Delete</option>
                )}
                <option value="insert">Insert</option>
                <option value="peek">Peek</option>
                <option value="clear">Clear</option>
                <option value="size">Size</option>
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

export default Stack;

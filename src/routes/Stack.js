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
          description: "Enter value to insert.",
          buttonText: "Create",
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

      setUiStack(mutableStack);
      return;
    }

    if (opsToPerform === "clear") {
      mutableStack.items = uiStack.items;
      mutableStack.count = uiStack.count;

      mutableStack.clear();

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
          <div className="flex flex-col-reverse border-x-2 border-b-2 border-gray-800 shadow-lg rounded-b-md w-44 h-80 p-5">
            {uiStack.items.map((item) => {
              const index = uiStack.items.indexOf(item);
              return (
                <div
                  className={`h-10 w-full flex items-center justify-center bg-red-600 rounded-md text-white font-semibold ${
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
        <div className="my-2 text-gray-600 flex items-center">
          <div className="font-semibold mr-2">{displayBox.title}</div>
          <div className="">{displayBox.message}</div>
        </div>

        {/* Controls */}
        <div className="h-10 w-[50%] md:w-[30%] lg:w-[20%] flex justify-center">
          <select
            className="h-full w-full border-2 rounded px-2 outline-none font-semibold text-gray-600"
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
          <div className="z-20 w-[75%] md:w-[50%] lg:w-[30%] h-fit bg-white shadow-xl rounded-md flex flex-col">
            {/* Modal Title */}
            <div className="w-full border-b text-2xl font-semibold px-10 py-5 mb-5">
              {activeModal?.title}
            </div>

            {/* Modal description */}
            <div className="text-gray-600 font-semibold italic text-lg px-10 pb-5">
              {activeModal?.description}
            </div>

            {/* Form  */}
            <form className="px-10 mb-2" onSubmit={activeModal?.submitFunction}>
              <input
                type="text"
                className="w-full h-10 px-3 font-semibold text-gray-600 border rounded-md mb-5"
              />

              <div className="flex items-center justify-between mb-10">
                <button
                  className="w-[48%] h-10 bg-gray-200 hover:bg-gray-300 text-black rounded-md"
                  onClick={cancelModal}
                >
                  Cancel
                </button>
                <button
                  className="w-[48%] h-10 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md shadow-md shadow-red-100"
                  type="submit"
                >
                  {activeModal.buttonText}
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

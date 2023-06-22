import BST from "../functions/BST";
import { useState, useRef } from "react";

const Tree = () => {
  const [activeModal, setActiveModal] = useState({
    state: null,
    title: "",
    description: "",
    buttonText: "",
    submitFunction: null,
  });
  const [uiBST, setUiBST] = useState({});
  const [displayBox, setDisplayBox] = useState({
    title: null,
    array: null,
  });

  let mutableBST = new BST(0);
  const optionsRef = useRef();

  // Create tree
  const createTree = (e) => {
    e.preventDefault();

    const input = Number(e.target[0].value);
    mutableBST.root.value = input;

    // Reset the action dropdown to default
    optionsRef.current.selectedIndex = 0;

    // Set UI to new BST state and
    // close modal
    setUiBST(mutableBST);
    setActiveModal((prev) => {
      const newModal = { ...prev, state: null };
      return newModal;
    });
  };

  // Insert to tree
  const insertToTree = (e) => {
    e.preventDefault();

    const input = Number(e.target[0].value);

    // Set mutableBST to current tree state
    // & insert new value
    mutableBST = uiBST;
    mutableBST.insert(input);

    // Reset the action dropdown to default
    optionsRef.current.selectedIndex = 0;

    // Set UI to new BST state and
    // close modal
    setUiBST(mutableBST);
    setActiveModal((prev) => {
      const newModal = { ...prev, state: null };
      return newModal;
    });
  };

  // Delete from tree
  const deleteFromTree = (e) => {
    e.preventDefault();

    const input = Number(e.target[0].value);

    // Set BST to current tree state
    // & remove value
    mutableBST = uiBST;
    mutableBST.remove(input);

    // Reset the action dropdown to default
    optionsRef.current.selectedIndex = 0;

    // Set UI to new BST state
    setUiBST(mutableBST);
    setActiveModal((prev) => {
      const newModal = { ...prev, state: null };
      return newModal;
    });
  };

  // Search in tree
  const searchInTree = (e) => {
    e.preventDefault();

    const input = Number(e.target[0].value);

    // Set BST to current tree state
    // & search value
    mutableBST = uiBST;
    const result = mutableBST.findNode(input);

    // Reset the action dropdown to default
    optionsRef.current.selectedIndex = 0;

    // Print search result and
    // close modal
    if (result) {
      setDisplayBox({ title: `${input} exists in the tree.`, array: null });
    } else {
      setDisplayBox({
        title: `${input} does not exists in the tree.`,
        array: null,
      });
    }

    setActiveModal((prev) => {
      const newModal = { ...prev, state: null };
      return newModal;
    });
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

  // Function to call
  // appropriate tree functions
  const callTreeOps = (e) => {
    const opsToPerform = e?.target?.value;

    // Function calls based on user input
    if (opsToPerform === "create") {
      setActiveModal((prev) => {
        const newModal = {
          ...prev,
          state: "tree-create",
          title: "Create tree",
          description:
            "Enter the node's value. You can't use strings or special characters.",
          buttonText: "Create",
          submitFunction: createTree,
        };

        return newModal;
      });
      return;
    }

    if (opsToPerform === "insert") {
      setActiveModal((prev) => {
        const newModal = {
          ...prev,
          state: "tree-insert",
          title: "Insert to tree",
          description:
            "Enter value to add, special characters and symbols are not valid entries.",
          buttonText: "Add",
          submitFunction: insertToTree,
        };

        return newModal;
      });
      return;
    }

    if (opsToPerform === "delete") {
      setActiveModal((prev) => {
        const newModal = {
          ...prev,
          state: "tree-delete",
          title: "Delete from tree",
          description: "Enter the value of the node to delete from the tree.",
          buttonText: "Delete",
          submitFunction: deleteFromTree,
        };

        return newModal;
      });
      return;
    }

    if (opsToPerform === "traverse") {
      mutableBST = uiBST;

      const traversalArray = mutableBST.dfsInorder();
      optionsRef.current.selectedIndex = 0;

      setDisplayBox({
        title: "The tree traversal is:",
        array: traversalArray,
        string: null,
      });
      return;
    }

    if (opsToPerform === "search") {
      setActiveModal((prev) => {
        const newModal = {
          ...prev,
          state: "tree-search",
          title: "Search in tree",
          description: "Enter value to find.",
          buttonText: "Search",
          submitFunction: searchInTree,
        };

        return newModal;
      });
      return;
    }
  };

  return (
    <>
      {/* Tree */}
      <div className="w-full flex flex-col items-center justify-center">
        {/* Tree */}
        <div className="w-[70%] md:w-[30%] lg:w-[20%] flex flex-col items-center">
          {/* Root Node */}
          <div className="relative row-1 mb-8 z-20">
            <div className="flex justify-center items-center text-center rounded-full h-12 w-12 border-2 border-gray-600 font-semibold bg-white">
              {uiBST?.root?.value || "?"}
            </div>
          </div>

          {/* Row 1*/}
          {(uiBST?.root?.left?.value || uiBST?.root?.right?.value) && (
            <div className="row-2 w-full flex mb-8">
              <div className="relative flex justify-center w-[50%]">
                {uiBST?.root?.left?.value && (
                  <>
                    <div className="flex items-center justify-center rounded-full h-12 w-12 border-2 border-gray-600 font-semibold z-20 bg-white">
                      {uiBST?.root?.left?.value}
                    </div>

                    <div
                      className={`arrow absolute h-20 w-[2px] bottom-[50%]  z-10 bg-gray-600 right-[25%] rotate-[40deg]`}
                    ></div>
                  </>
                )}
              </div>

              <div className="relative flex justify-center w-[50%]">
                {uiBST?.root?.right?.value && (
                  <>
                    <div className="flex items-center justify-center rounded-full h-12 w-12 border-2 border-gray-600 font-semibold z-20 bg-white">
                      {uiBST?.root?.right?.value}
                    </div>

                    <div
                      className={`arrow absolute h-20 w-[2px] bottom-[50%]  z-10 bg-gray-600 left-[25%] rotate-[-40deg]`}
                    ></div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Row 2 */}
          {(uiBST?.root?.left?.left?.value ||
            uiBST?.root?.left?.right?.value ||
            uiBST?.root?.right?.left?.value ||
            uiBST?.root?.right?.right?.value) && (
            <div className="row-3 w-full flex mb-10">
              <div className="relative w-[25%] flex justify-center">
                {uiBST?.root?.left?.left?.value && (
                  <>
                    <div className="flex items-center justify-center rounded-full h-12 w-12 border-2 border-gray-600 font-semibold z-20 bg-white">
                      {uiBST?.root?.left?.left?.value}
                    </div>

                    <div
                      className={`left-arrow absolute h-20  w-[2px] bottom-[50%]  z-10 bg-gray-600 right-[25%] rotate-[25deg]`}
                    ></div>
                  </>
                )}
              </div>

              <div className="relative w-[25%] flex justify-center">
                {uiBST?.root?.left?.right?.value && (
                  <>
                    <div className="flex items-center justify-center rounded-full h-12 w-12 border-2 border-gray-600 font-semibold z-20 bg-white">
                      {uiBST?.root?.left?.right?.value}
                    </div>

                    <div
                      className={`left-arrow absolute h-20  w-[2px] bottom-[50%]  z-10 bg-gray-600 left-[25%] rotate-[-25deg]`}
                    ></div>
                  </>
                )}
              </div>

              <div className="relative w-[25%] flex justify-center">
                {uiBST?.root?.right?.left?.value && (
                  <>
                    <div className="flex items-center justify-center rounded-full h-12 w-12 border-2 border-gray-600 font-semibold z-20 bg-white">
                      {uiBST?.root?.right?.left?.value}
                    </div>

                    <div
                      className={`left-arrow absolute h-20  w-[2px] bottom-[50%]  z-10 bg-gray-600 right-[25%] rotate-[25deg]`}
                    ></div>
                  </>
                )}
              </div>

              <div className="relative w-[25%] flex justify-center">
                {uiBST?.root?.right?.right?.value && (
                  <>
                    <div className="flex items-center justify-center rounded-full h-12 w-12 border-2 border-gray-600 font-semibold z-20 bg-white">
                      {uiBST?.root?.right?.right?.value}
                    </div>

                    <div
                      className={`left-arrow absolute h-20  w-[2px] bottom-[50%]  z-10 bg-gray-600 left-[25%] rotate-[-25deg]`}
                    ></div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Display Box */}
        {displayBox.title && (
          <div className="w-[80%] md:w-[30%] lg:w-[20%]">
            <div className="text-gray-600 mb-3 font-semibold">
              {displayBox?.title}
            </div>

            {/* Display box array for i.e traversal */}
            {displayBox.array && (
              <div className="flex items-center mb-5">
                {displayBox?.array.map((item) => {
                  return (
                    <div
                      className="border-2 h-8 w-8 mr-2 flex items-center justify-center font-semibold text-gray-600"
                      key={item}
                    >
                      {item}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Controls */}
        <div className="h-12 w-[80%] md:w-[30%] lg:w-[20%] flex justify-center">
          <select
            className="h-full w-full border-2 rounded px-2 outline-none font-semibold text-gray-600 bg-white"
            onChange={callTreeOps}
            ref={optionsRef}
          >
            <option value="">Select an operation</option>

            {!uiBST?.root?.value && <option value="create">Create Tree</option>}
            {uiBST?.root?.value && (
              <>
                <option value="insert">Insert</option>
                <option value="delete">Delete</option>
                <option value="traverse">Traverse</option>
                <option value="search">Search</option>
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

          {/* Overlay */}
          <div className="absolute top-0 left-0 bg-black h-full w-full opacity-75 z-10"></div>
        </div>
      )}
    </>
  );
};

export default Tree;

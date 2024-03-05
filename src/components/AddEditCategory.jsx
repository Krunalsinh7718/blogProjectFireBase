import { useState } from "react";
import Modal from "./Modal";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";
import Button from "./Button";

const Node = ({ category, handlePushRemoveFromArray }) => (
  <div className="node-content node-lv-1">
    <span>{category.id}</span>
    <div className="btn-box">
      <button
        onClick={() =>
          handlePushRemoveFromArray(
            category.id,
            { id: category.id + Math.random() },
            "add"
          )
        }
      >
        +
      </button>
      <button
        onClick={() =>
          handlePushRemoveFromArray(category.id, {
            id: category.id + Math.random(),
          })
        }
      >
        -
      </button>
    </div>
  </div>
);

function pushElementToChildById(arr, targetId, element) {
  const tempArr = [...arr];
  for (const item of tempArr) {
    if (item.id === targetId) {
      // If the item's ID matches the target ID, push the element into its children array
      if (!item.children) {
        item.children = [];
      }
      item.children.push(element);
      return tempArr;
    } else if (item.children) {
      // If the item has children, recursively search through them
      const childResult = pushElementToChildById(
        item.children,
        targetId,
        element
      );
      if (childResult) {
        return tempArr;
      }
    }
  }
  return false; // If the target ID is not found in the array
}

function removeElementToChildById(arr, targetId, element) {
  const tempArr = [...arr];
  for (const item of tempArr) {
    if (item.id === targetId) {
      // If the item's ID matches the target ID, push the element into its children array

      return tempArr.filter((ele) => ele.id !== targetId);
    } else if (item.children) {
      // If the item has children, recursively search through them
      const childResult = removeElementToChildById(
        item.children,
        targetId,
        element
      );
      if (childResult) {
        return tempArr;
      }
    }
  }
  return false; // If the target ID is not found in the array
}

function AddEditCategory() {
  const [category, setCategory] = useState([
    {
      id: "uncategorized",
      children: [
        {
          id: "Item A1",
          children: [
            { id: "Item A1-a1" },
            {
              id: "Item A1-a2",
              children: [
                { id: "Item A1-a2-#1" },
                { id: "Item A1-a2-#2" },
                { id: "Item A1-a2-#3" },
              ],
            },
          ],
        },
        { id: "Item A2" },
        { id: "Item A3" },
      ],
    },
  ]);

  const handlePushRemoveFromArray = (id, ele, action) => {
    setCategory(
      action === "add"
        ? pushElementToChildById(category, id, ele)
        : removeElementToChildById(category, id, ele)
    );
  };

  return (
    <>
      <div className="tree-view-main">
        <div className="node-container">
          {category.map((categoryl1) => (
            <div className="node-wrapper node-lv1-wrapper" key={categoryl1.id}>
              <Node
                category={categoryl1}
                handlePushRemoveFromArray={handlePushRemoveFromArray}
              />
              {categoryl1.children ? (
                <div className="node-container">
                  {categoryl1.children.map((categoryl2) => (
                    <div
                      className="node-wrapper node-lv2-wrapper"
                      key={categoryl2.id}
                    >
                      <Node
                        category={categoryl2}
                        handlePushRemoveFromArray={handlePushRemoveFromArray}
                      />
                      {categoryl2.children ? (
                        <div className="node-container">
                          {categoryl2.children.map((categoryl3) => (
                            <div
                              className="node-wrapper node-lv3-wrapper"
                              key={categoryl3.id}
                            >
                              <Node
                                category={categoryl3}
                                handlePushRemoveFromArray={
                                  handlePushRemoveFromArray
                                }
                              />

                              {categoryl3.children ? (
                                <div className="node-container">
                                  {categoryl3.children.map((categoryl4) => (
                                    <div
                                      className="node-wrapper node-lv3-wrapper"
                                      key={categoryl4.id}
                                    >
                                      <Node
                                        category={categoryl4}
                                        handlePushRemoveFromArray={
                                          handlePushRemoveFromArray
                                        }
                                      />
                                    </div>
                                  ))}
                                </div>
                              ) : null}
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AddEditCategory;

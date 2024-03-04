import { useState } from "react";
import Modal from "./Modal";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";
import Button from "./Button";

const animatedComponents = makeAnimated();

function AddEditCategory() {
  const handleOnchange = (value) => {
    const newCategories = value.map((cate) => cate.label);
  };

  return (
    <>
      <div className="tree-view-main">
        <div className="node-container">
          {/* BEGIN: level 1 */}
          <div className="node-lv1-wrapper">
            <div className="node-content node-lv-1">
              <input type="checkbox" id="chk1" />
              <label htmlFor="chk1">Item L1</label>
              <div className="btn-box">
                <button>+</button>
                <button>+ &gt;</button>
              </div>
            </div>
            {/* BEGIN: level 2 */}
            <div className="node-container">
              <div className="node-lv2-wrapper">
                <div className="node-content node-lv-2">
                  <input type="checkbox" id="chkl2a" />
                  <label htmlFor="chkl2a">Item L2</label>
                  <div className="btn-box">
                    <button>+</button>
                    <button>+ &gt;</button>
                  </div>
                </div>
              </div>
              <div className="node-lv2-wrapper">
                <div className="node-content node-lv-2">
                  <input type="checkbox" id="chkl2a" />
                  <label htmlFor="chkl2a">Item L2</label>
                  <div className="btn-box">
                    <button>+</button>
                    <button>+ &gt;</button>
                  </div>
                </div>
                {/* BEGIN: level 3 */}
                <div className="node-container">
                  <div className="node-lv3-wrapper">
                    <div className="node-content node-lv-3">
                      <input type="checkbox" id="chkl3a" />
                      <label htmlFor="chkl3a">Item L3</label>
                      <div className="btn-box">
                        <button>+</button>
                        <button>+ &gt;</button>
                      </div>
                    </div>
                  </div>
                  <div className="node-lv3-wrapper">
                    <div className="node-content node-lv-3">
                      <input type="checkbox" id="chkl3b" />
                      <label htmlFor="chkl3b">Item L3</label>
                      <div className="btn-box">
                        <button>+</button>
                        <button>+ &gt;</button>
                      </div>
                    </div>
                  </div>
                  <div className="node-lv3-wrapper">
                    <div className="node-content node-lv-3">
                      <input type="checkbox" id="chkl3c" />
                      <label htmlFor="chkl3c">Item L3</label>
                      <div className="btn-box">
                        <button>+</button>
                        <button>+ &gt;</button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* END: level 3 */}
              </div>
            </div>
            {/* END: level 2 */}
          </div>
          {/* END: level 1 */}
        </div>
      </div>
    </>
  );
}

export default AddEditCategory;

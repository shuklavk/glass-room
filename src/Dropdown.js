import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { BsFillCaretDownFill, BsFillCaretUpFill } from 'react-icons/bs';

function Dropdown({ title, items, multiSelect = false, state, setFunction }) {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState(state);
  const toggle = () => setOpen(!open);
  Dropdown.handleClickOutside = () => setOpen(false);
  const itemLength = items.length;

  async function handleOnClick(e, item) {
    if (!selection.some((current) => current === item)) {
      if(item === "All"){
        await setFunction(items);
        setSelection(items);
        return;
      }
      if (!multiSelect) {
        setSelection([item]);
      } else if (multiSelect) {
        await setFunction([...state, item]);
        setSelection([...selection, item]);
      }
    } else {
      if(item === "All"){
        await setFunction([]);
        setSelection([]);
        return;
      }
      let selectionAfterRemoval = selection;
      selectionAfterRemoval = selectionAfterRemoval.filter(
        (current) => current !== item
      );
      console.log(selectionAfterRemoval, itemLength);
      if(selectionAfterRemoval.length !== itemLength){
        const allIndex = selectionAfterRemoval.indexOf("All");
        if(allIndex > -1){
          selectionAfterRemoval.splice(allIndex,1);
        }
      }
      console.log("after", selectionAfterRemoval)
      await setFunction(state.filter((company) => company !== item));
      setSelection([...selectionAfterRemoval]);
    }
  }

  function isItemInSelection(item) {
    if (selection.some((current) => current === item)) {
      return true;
    }
    return false;
  }

  return (
    <div className="dd-wrapper container" style={{ paddingBottom: '20px' }}>
      <div
        tabIndex={0}
        className="dd-header"
        role="button"
        onKeyPress={() => toggle(!open)}
        onClick={() => toggle(!open)}
        style={{ paddingTop: '15px' }}
      >
        <div className="dd-header__title">
          <p className="dd-header__title--bold">{title}</p>
        </div>
        <div className="dd-header__action">
          <p>{open ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />}</p>
        </div>
      </div>
      {open && (
        <ul className="dd-list">
          {items.map((item) => {
            return (
              <li className="dd-list-item" key={item}>
                <button
                  type="button"
                  name={item}
                  onClick={(e) => handleOnClick(e, item)}
                >
                  <span>{item}</span>
                  <span>{isItemInSelection(item) && <FaCheckCircle />}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;

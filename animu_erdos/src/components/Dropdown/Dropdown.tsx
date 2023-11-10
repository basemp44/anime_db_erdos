import React from 'react';
import { useState, cloneElement } from 'react';
import './Dropdown.css'


interface IDropdown {
  trigger: React.ReactElement,
  menu: Array<React.ReactElement>
}


function Dropdown({
  trigger,
  menu
}: IDropdown) {
  const [open, setOpen] = useState(false);

  return (
    <div className="dropdown">
      {
        cloneElement(trigger, {
          onClick: () => setOpen(!open),
        })
      }
      {open ? (
        <ul className="menu">
          {menu.map((menuItem, index) => (
            <li key={index} className="menu-item">
              {
                cloneElement(menuItem, {
                  onClick: () => {
                    menuItem.props.onClick();
                    setOpen(false);
                  },
                })
              }
            </li>
          ))}
        </ul>
      ) : <></>}
    </div>
  );
};

export {
  Dropdown
}
import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
  ArrowUturnLeftIcon,
} from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";
import Auth from "../utils/auth.js";
import React, { useState } from "react";
import PropTypes from 'prop-types';
import JoinRoom from '../components/JoinRoom.js';

function Modal({ showModal, onClose }) {
  return (
    showModal && (
      <aside className="fixed bottom-4 end-4 z-50 flex items-center justify-center gap-4 rounded-lg bg-black px-5 py-3 text-white">
        {/* Feature not available modal content */}
        <a href="/new-thing" target="_blank" rel="noreferrer" className="text-sm font-medium hover:opacity-75">
          Feature currently not available! 🤖
        </a>

        <button className="rounded bg-white/20 p-1 hover:bg-white/10" onClick={onClose}>
          <span className="sr-only">Close</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </aside>
    )
  );
}

Modal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default function SideBar() {
  const [showModal, setShowModal] = useState(false);
  
  const featureModal = () => {
    setShowModal(!showModal);
  };

    const handleRefreshClick = () => {
      window.location.reload();
    };

  return (
    <div>
      <Card className="absolute bg-slate-800 flex top-0 left-0  h-[calc(100vh-2rem)] w-full max-w-[20rem] xl:max-w-[15rem] lg:max-w-[10rem] md:max-w-[10rem] sm:max-w-[7rem] xs:max-w-[5rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <List>
          <ListItem className="text-white" onClick={featureModal}>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5 text-white" />
            </ListItemPrefix>
            <p className="sm:opacity-100 xs:opacity-0">Profile</p>
            <Modal showModal={showModal} onClose={featureModal} />
          </ListItem>

          <ListItem className="text-white" onClick={featureModal}>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5 text-white" />
            </ListItemPrefix>
            <p className="sm:opacity-100 xs:opacity-0">Settings</p>
            <Modal showModal={showModal} onClose={featureModal} />
          </ListItem>

          <ListItem className="text-white">
            <ListItemPrefix>
              <ArrowUturnLeftIcon onClick={handleRefreshClick} className="h-5 w-5 text-white" />
            </ListItemPrefix>
            <NavLink
              onClick={handleRefreshClick}
              className="sm:opacity-100 xs:opacity-0"
            >
              Find A Room
            </NavLink>
          </ListItem>

          <ListItem className="text-white">
            <ListItemPrefix>
              <PowerIcon onClick={Auth.logout} className="h-5 w-5 text-white" />
            </ListItemPrefix>
            <NavLink
              onClick={Auth.logout}
              className="sm:opacity-100 xs:opacity-0"
            >
              Logout
            </NavLink>
          </ListItem>
        </List>
      </Card>
    </div>
  );
}

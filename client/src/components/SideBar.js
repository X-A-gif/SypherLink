import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";
import Auth from "../utils/auth.js";

export default function Example() {
  return (
    <div>
      <Card className="bg-slate-800 flex top-0 left-0  h-[calc(100vh-2rem)] w-full max-w-[20rem] xl:max-w-[15rem] lg:max-w-[10rem] md:max-w-[10rem] sm:max-w-[7rem] xs:max-w-[5rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <List>
          <ListItem className="text-white">
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5 text-white" />
            </ListItemPrefix>
            <p className="sm:opacity-100 xs:opacity-0">Profile</p>
          </ListItem>
          <ListItem className="text-white">
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5 text-white" />
            </ListItemPrefix>
            <p className="sm:opacity-100 xs:opacity-0">Settings</p>
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

import {
    Card,
    List,
    ListItem,
    ListItemPrefix,
  } from "@material-tailwind/react";
  import {
    UserCircleIcon,
    Cog6ToothIcon,
    PowerIcon,
  } from "@heroicons/react/24/solid";
   
  export default function Example() {
    return (
      <div>
      <Card className="bg-slate-800 flex top-0 left-0  h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      
        <List>
     
          <ListItem className="text-white">
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5 text-white" />
            </ListItemPrefix>
            Profile
          </ListItem>
          <ListItem className="text-white">
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5 text-white" />
            </ListItemPrefix>
            Settings
          </ListItem>
          <ListItem className="text-white">
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5 text-white" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>

      </Card>
      </div>
    );
  }
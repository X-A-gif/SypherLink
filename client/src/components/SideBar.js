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
      <Card className="flex top-0 left-0  h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      
        <List>
     
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Profile
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Settings
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>

      </Card>
    );
  }
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Profile from './Profile';
import UpdateProfile from './UpdateProfile';
import UpdatePassword from './UpdatePassword';

const Account = () => {
  const [selectedComponent, setSelectedCompnent] = useState("Profile");
  return (
    <div>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2 ">
        <hr className='py-2' style={{width: "75rem"}}/>
          <h1 className="text-4xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav
            className="grid gap-4 text-sm text-muted-foreground"
          >
            <Link href="#" className={`text-base ${selectedComponent === "Profile" ? "font-bold text-primary" : "text-foreground"}`} onClick={() => setSelectedCompnent("Profile")}>
              Profile
            </Link>
            <Link href="#" className={`text-base ${selectedComponent === "Update Profile" ? "font-bold text-primary" : "text-foreground"}`} onClick={() => setSelectedCompnent("Update Profile")}>
              Update Profile
            </Link>
            <Link href="#" className={`text-base ${selectedComponent === "Update Password" ? "font-bold text-primary" : "text-foreground"}`} onClick={() => setSelectedCompnent("Update Password")}>
              Update Password
            </Link>
          </nav>
          <div className="grid gap-6">
            {(() => {
              switch (selectedComponent) {
                case "Profile":
                  return <Profile />
                  break;
                case "Update Profile":
                  return <UpdateProfile />
                  break;
                case "Update Password":
                  return <UpdatePassword />
                  break;

                default:
                  break;
              }
            })()}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Account
import { clearAllUserErrors, logout } from '../store/Slice/userSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FolderGit2, History, Home, LayoutGrid, LogOut, Mail, Menu, MessageSquareMore, PencilRuler, TreePine, User, UserRound } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Dashboard from './sub-components/Dashboard';
import AddProject from './sub-components/AddProject';
import AddSkills from './sub-components/AddSkills';
import AddApplication from './sub-components/AddApplication';
import AddTimeline from './sub-components/AddTimeline';
import Messages from './sub-components/Messages';
import Account from './sub-components/Account';
import Emails from './sub-components/Emails';

const HomePage = () => {
  const [active, setActive] = useState("");
  const { isAuthenticated, error, user } = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged Out!");
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);
  return (
    <div className='flex min-h-screen w-full flex-col bg-muted/40'>
      <aside className='fixed inset-y-0 left-0 hidden w-20 flex-col border-r bg-gradient-to-b from-teal-400 to-teal-600 sm:flex z-50'>
        <nav className='flex flex-col items-center gap-4 px-2 sm:py-2'>
          <Link className='group flex h-p w-p shrink-0 items-center justify-center gap-2 rounded-full'>
            <TreePine className='h-14 w-6 transition-all group-hover:scale-125 hover:text-rose-700' />
            <span className='sr-only'>Dashboard</span>
          </Link>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link className={`flex h-10 w-9 items-center justify-center ${active === "Dashboard" ? "text-accent-foreground bg-inherit" : "text-foreground"} transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:text-foreground md:h-8 md:w-8`} onClick={() => setActive("Dashboard")}>
                  <Home className='h-5 w-5' />
                  <span className='sr-only'>Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link className={`flex h-14 w-9 items-center justify-center ${active === "Add Project" ? "text-accent-foreground bg-inherit" : "text-foreground"} transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:text-foreground md:h-8 md:w-8`} onClick={() => setActive("Add Project")}>
                  <FolderGit2 className='h-5 w-5' />
                  <span className='sr-only'>Add Project</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Add Project</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link className={`flex h-14 w-9 items-center justify-center ${active === "Add Skills" ? "text-accent-foreground bg-inherit" : "text-foreground"} transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:text-foreground md:h-8 md:w-8`} onClick={() => setActive("Add Skills")}>
                  <PencilRuler className='h-5 w-5' />
                  <span className='sr-only'>Add Skills</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Add Skills</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link className={`flex h-12 w-9 items-center justify-center ${active === "Add Application" ? "text-accent-foreground bg-inherit" : "text-foreground"} transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:text-foreground md:h-8 md:w-8`} onClick={() => setActive("Add Application")}>
                  <LayoutGrid className='h-5 w-5' />
                  <span className='sr-only'>Add Application</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Add Application</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link className={`flex h-12 w-9 items-center justify-center ${active == "Add Timeline" ? "text-accent-foreground bg-inherit" : "text-foreground"} transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:text-foreground md:h-8 md:w-8`} onClick={() => setActive("Add Timeline")}>
                  <History className='h-5 w-5' />
                  <span className='sr-only'>Add Timeline</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Add Timeline</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link className={`flex h-12 w-9 items-center justify-center ${active === "Messages" ? "text-accent-foreground bg-inherit" : "text-foreground"} transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:text-foreground md:h-8 md:w-8`} onClick={() => setActive("Messages")}>
                  <MessageSquareMore className='h-5 w-5' />
                  <span className='sr-only'>Messages</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Messages</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link className={`flex h-12 w-9 items-center justify-center ${active === "Emails" ? "text-accent-foreground bg-inherit" : "text-foreground"} transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:text-foreground md:h-8 md:w-8`} onClick={() => setActive("Emails")}>
                  <Mail className='h-5 w-5' />
                  <span className='sr-only'>Emails</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Emails</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className='mt-auto flex flex-col items-center gap-2 py-6'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link className={`flex h-12 w-9 items-center justify-center ${active === "Account" ? "text-accent-foreground bg-inherit" : "text-foreground"} transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:text-foreground md:h-8 md:w-8`} onClick={() => setActive("Account")}>
                  <UserRound className='h-5 w-5' />
                  <span className='sr-only'>Account</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Account</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link className={`flex h-12 w-9 py-6 items-center justify-center ${active === "Logout" ? "text-accent-foreground bg-inherit" : "text-foreground"} transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:text-red-700 md:h-8 md:w-8`} onClick={handleLogout}>
                  <LogOut className='h-5 w-5' />
                  <span className='sr-only'>Logout</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Logout</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <header className='sticky top-0 z-30 flex h-14 items-center gap-2 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 max-[900px]:h-[100px]'>
        <Sheet>
          <SheetTrigger asChild>
            <div className='pl-2 sm:hidden'>
              <Menu className="h-10 w-10" />
              <span className='sr-only'>Toggle Menu</span>
            </div>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs bg-gradient-to-b from-teal-400 to-teal-600">
            <nav className="grid gap-6 text-lg font-medium px-4 py-3">
              <div className='flex'>
                <Link
                  className={`group flex h-14 w-14 shrink-0 items-center justify-center gap-4 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base`}
                >
                  <img
                    src={user && user.avatar && user.avatar.url}
                    alt="avatar"
                    className="w-14 h-14 rounded-full"
                  />
                  {/* <UserRound className='h-10 w-10' /> */}
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <div className='flex px-4 items-center justify-center'>
                  <SheetTitle>{user.Name}</SheetTitle>
                  <SheetDescription className="px-1 text-foreground">(Portfolio)</SheetDescription>
                </div>
              </div>
              <Link
                href="#"
                className={`flex items-center text-xl gap-4 px-2.5 ${active === "Dashboard"
                  ? "text-foreground hover:scale-110"
                  : "text-foreground"
                  } pt-3`}
                onClick={() => setActive("Dashboard")}
              >
                <Home className="h-5 w-5" />
                Dashboard
              </Link>
              <Link
                href="#"
                className={`flex items-center text-xl gap-4 px-2.5 ${active === "Add Project"
                  ? "text-foreground hover:scale-110"
                  : "text-foreground"
                  }`}
                onClick={() => setActive("Add Project")}
              >
                <FolderGit2 className="h-5 w-5" />
                Add Project
              </Link>
              <Link
                href="#"
                className={`flex items-center text-xl gap-4 px-2.5 ${active === "Add Skills"
                  ? "text-foreground hover:scale-110"
                  : "text-foreground"
                  }`}
                onClick={() => setActive("Add Skills")}
              >
                <PencilRuler className="h-5 w-5" />
                Add Skills
              </Link>
              <Link
                href="#"
                className={`flex items-center text-xl gap-4 px-2.5 ${active === "Add Application"
                  ? "text-foreground hover:scale-110"
                  : "text-foreground"
                  }`}
                onClick={() => setActive("Add Application")}
              >
                <LayoutGrid className="h-5 w-5" />
                Add Application
              </Link>
              <Link
                href="#"
                className={`flex items-center text-xl gap-4 px-2.5 ${active === "Add Timeline"
                  ? "text-foreground hover:scale-110"
                  : "text-foreground"
                  }`}
                onClick={() => setActive("Add Timeline")}
              >
                <History className="h-5 w-5" />
                Add Timeline
              </Link>
              <Link
                href="#"
                className={`flex items-center text-xl gap-4 px-2.5 ${active === "Messages"
                  ? "text-foreground hover:scale-110"
                  : "text-foreground"
                  }`}
                onClick={() => setActive("Messages")}
              >
                <MessageSquareMore className="h-5 w-5" />
                Messages
              </Link>
              <Link
                href="#"
                className={`flex items-center text-xl gap-4 px-2.5 ${active === "Emails"
                  ? "text-foreground hover:scale-110"
                  : "text-foreground"
                  }`}
                onClick={() => setActive("Emails")}
              >
                <Mail className="h-5 w-5" />
                Emails
              </Link>
              <Link
                href="#"
                className={`flex items-center text-xl gap-4 px-2.5 ${active === "Account"
                  ? "text-foreground hover:scale-110"
                  : "text-foreground"
                  }`}
                onClick={() => setActive("Account")}
              >
                <UserRound className="h-5 w-5" />
                Account
              </Link>
              <Link
                href="#"
                className={`mt-auto flex flex-cols items-center text-xl gap-4 px-2.5 text-red-600`}
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                Logout
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-3 px-4 py-2 md:grow-0 sm:ml-16 sm:mt-5">
          <img
            src={user && user.avatar && user.avatar.url}
            alt="avatar"
            className="w-20 h-20 rounded-full max-[900px]:hidden"
          />
          <h1 className="text-4xl max-[900px]:text-2xl">
            Welcome back, {user.Name}
          </h1>
        </div>
      </header>
      {
        (() => {
          switch (active) {
            case "Dashboard":
              return <Dashboard />
              break;
            case "Add Project":
              return <AddProject />
              break;
            case "Add Skills":
              return <AddSkills />
              break;
            case "Add Application":
              return <AddApplication />
              break;
            case "Add Timeline":
              return <AddTimeline />
              break;
            case "Messages":
              return <Messages />
              break;
            case "Emails":
              return <Emails />
              break;
            case "Account":
              return <Account />
              break;

            default:
              return <Dashboard />
              break;
          }
        })()
      }
    </div>
  )
}

export default HomePage

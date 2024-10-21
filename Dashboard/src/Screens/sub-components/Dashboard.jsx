import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "./LoadingSpinner";
import { clearAllSoftwareAppErrors, deleteSoftwareApplication, getAllSoftwareApplications, resetSASlice } from "@/store/Slice/SASlice";
import { clearAllSkillErrors } from "@/store/Slice/skillSlice";
import { clearAllProjectErrors } from "@/store/Slice/projectSlice";
import { clearAllTimelineErrors } from "@/store/Slice/timelineSlice";
import { Pencil } from "lucide-react";
const Dashboard = () => {
  const navigateTo = useNavigate();
  const gotoMangeSkills = () => {
    navigateTo("/manage/skills");
  };
  const gotoMangeTimeline = () => {
    navigateTo("/manage/timeline");
  };
  const gotoMangeProjects = () => {
    navigateTo("/manage/projects");
  };

  const { user } = useSelector((state) => state.user);
  const {
    skills,
    loading: skillLoading,
    error: skillError,
    message: skillMessage,
  } = useSelector((state) => state.skill);
  const {
    softwareApplications,
    loading: appLoading,
    error: appError,
    message: appMessage,
  } = useSelector((state) => state.softwareApplications);
  const {
    timeline,
    loading: timelineLoading,
    error: timelineError,
    message: timelineMessage,
  } = useSelector((state) => state.timeline);
  const { projects, error: projectError } = useSelector(
    (state) => state.project
  );

  const [appId, setAppId] = useState(null);
  const handleDeleteSoftwareApp = (id) => {
    setAppId(id);
    dispatch(deleteSoftwareApplication(id));
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (skillError) {
      toast.error(skillError);
      dispatch(clearAllSkillErrors());
    }
    if (appError) {
      toast.error(appError);
      dispatch(clearAllSoftwareAppErrors());
    }
    if (projectError) {
      toast.error(projectError);
      dispatch(clearAllProjectErrors());
    }
    if (appMessage) {
      toast.success(appMessage);
      setAppId(null);
      dispatch(resetSASlice());
      dispatch(getAllSoftwareApplications());
    }
    if (timelineError) {
      toast.error(timelineError);
      dispatch(clearAllTimelineErrors());
    }
  }, [
    dispatch,
    skillLoading,
    skillError,
    skillMessage,
    appLoading,
    appError,
    appMessage,
    timelineError,
    timelineLoading,
    timelineMessage,
  ]);

  return (
    <>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 pl-4">
              <Card className="sm:col-span-2 bg-gradient-to-r from-slate-900 to-slate-700">
                <CardHeader className="pb-3">
                  <CardDescription className="max-w-lg text-white leading-relaxed">
                    {user.aboutMe}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link to={user.portfolioURL} target="_blank">
                  <Button className="bg-gradient-to-r from-indigo-400 to-cyan-400 text-black hover:font-bold hover:border">Visit Portfolio</Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card className="flex flex-col justify-center bg-gradient-to-r from-slate-900 to-slate-700 text-white">
                <CardHeader className="pb-2">
                  <CardTitle>Projects Completed</CardTitle>
                  <CardTitle className="text-6xl">
                    {projects && projects.length}
                  </CardTitle>
                </CardHeader>
                <CardFooter>
                  <Button onClick={gotoMangeProjects} className="bg-gradient-to-r from-indigo-400 to-cyan-400 text-black hover:font-bold hover:border">Manage Projects</Button>
                </CardFooter>
              </Card>
              <Card className="flex flex-col justify-center bg-gradient-to-r from-slate-900 to-slate-700 text-white">
                <CardHeader className="pb-2">
                  <CardTitle>Skills</CardTitle>
                  <CardTitle className="text-6xl">
                    {skills && skills.length}
                  </CardTitle>
                </CardHeader>
                <CardFooter>
                  <Button onClick={gotoMangeSkills} className="bg-gradient-to-r from-indigo-400 to-cyan-400 text-black hover:font-bold hover:border">Manage Skills</Button>
                </CardFooter>
              </Card>
            </div>
            <Tabs className="pl-4">
              <TabsContent>
                <Card  className="text-white bg-gradient-to-r from-slate-900 to-slate-700">
                  <CardHeader className="px-7">
                    <CardTitle>Projects</CardTitle>
                  </CardHeader>
                  <CardContent className="text-white">
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-inherit">
                          <TableHead className="text-white">Title</TableHead>
                          <TableHead className="hidden md:table-cell text-white">
                            Description
                          </TableHead>
                          <TableHead className="hidden md:table-cell text-white text-center">
                            Stack
                          </TableHead>
                          <TableHead className="hidden md:table-cell text-white text-center">
                            Deployed
                          </TableHead>
                          <TableHead className="text-center text-white">Visit</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {projects && projects.length > 0 ? (
                          projects.map((element) => {
                            return (
                              <TableRow className="bg-gradient-to-r from-slate-900 to-slate-700" key={element._id}>
                                <TableCell>
                                  <div className="font-medium" style={{width: "85px"}}>
                                    {element.title}
                                  </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell" style={{width: "120vh"}}>
                                  {element.description}
                                </TableCell>
                                <TableCell className="hidden md:table-cell text-center">
                                  {element.stack}
                                </TableCell>
                                <TableCell className="hidden md:table-cell text-center">
                                  <Badge
                                    className="text-xs bg-inherit hover:bg-inherit text-white"
                                    variant="secondary"
                                  >
                                    {element.deployed}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-right" style={{width: "181px"}}>
                                  <Link
                                    to={element.projectLink}
                                    target="_blank"
                                  >
                                    <Button className="bg-gradient-to-r from-indigo-400 to-cyan-400 text-black hover:font-bold hover:border w-full">Visit</Button>
                                  </Link>
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell className="text-3xl overflow-y-hidden">
                              You have not added any project.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            <Tabs className="pl-4">
              <TabsContent>
                <Card className="text-white bg-gradient-to-r from-slate-900 to-slate-700">
                  <CardHeader className="px-7 gap-3">
                    <CardTitle>Skills</CardTitle>
                  </CardHeader>
                  <CardContent className="grid sm:grid-cols-2 gap-4">
                    {skills && skills.length > 0 ? (
                      skills.map((element) => {
                        return (
                          <Card key={element._id} className="bg-inherit border text-white">
                            <CardHeader>{element.title}</CardHeader>
                            <CardFooter>
                              <Progress value={element.proficiency} />
                            </CardFooter>
                          </Card>
                        );
                      })
                    ) : (
                      <p className="text-3xl">You have not added any skill.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            <Tabs className="pl-4">
              <TabsContent className="grid min-[1050px]:grid-cols-2 gap-4">
                <Card className="bg-gradient-to-r from-slate-900 to-slate-700 text-white">
                  <CardHeader className="px-7">
                    <CardTitle>Software Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-inherit">
                          <TableHead className="text-white">Name</TableHead>
                          <TableHead className="md:table-cell text-white">Icon</TableHead>
                          <TableHead className="md:table-cell text-center text-white">
                            Action
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {softwareApplications &&
                        softwareApplications.length > 0 ? (
                          softwareApplications.map((element) => {
                            return (
                              <TableRow className="bg-inherit hover:bg-inherit" key={element._id}>
                                <TableCell className="font-medium">
                                  {element.name}
                                </TableCell>
                                <TableCell className="md:table-cell">
                                  <img
                                    className="w-7 h-7"
                                    src={element.svg && element.svg.url}
                                    alt={element.name}
                                  />
                                </TableCell>
                                <TableCell className="md:table-cell  text-center" style={{width: "181px"}}>
                                  {appLoading && appId === element._id ? (
                                    <LoadingSpinner
                                      content={"Deleting"}
                                      width={"w-fit"}
                                    />
                                  ) : (
                                    <Button
                                      onClick={() =>
                                        handleDeleteSoftwareApp(element._id)
                                      }
                                      className="bg-gradient-to-r from-indigo-400 to-cyan-400 text-black hover:font-bold hover:border w-full"
                                    >
                                      Delete
                                    </Button>
                                  )}
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell className="text-3xl overflow-y-hidden">
                              You have not added any Application.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <Card className="text-white bg-gradient-to-r from-slate-900 to-slate-700"> 
                  <CardHeader className="px-7 flex items-center justify-between flex-row">
                    <CardTitle>Timeline</CardTitle>
                    <Button onClick={gotoMangeTimeline} className="w-fit bg-gradient-to-r from-indigo-400 to-cyan-400 text-black hover:font-bold hover:border">
                      Manage Timeline
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-inherit">
                          <TableHead className="text-white">Title</TableHead>
                          <TableHead className="md:table-cell text-white">From</TableHead>
                          <TableHead className="md:table-cell text-right text-white">
                            To
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {timeline && timeline.length > 0 ? (
                          timeline.map((element) => {
                            return (
                              <TableRow className="bg-gradient-to-r from-slate-900 to-slate-700" key={element._id}>
                                <TableCell className="font-medium">
                                  {element.title}
                                </TableCell>
                                <TableCell className="md:table-cell">
                                  {element.timeline.from}
                                </TableCell>
                                <TableCell className="md:table-cell  text-right">
                                  {element.timeline.to}
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell className="text-3xl overflow-y-hidden">
                              You have not added any timeline.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;

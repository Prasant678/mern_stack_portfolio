import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";
import { clearAllTimelineErrors, deleteTimeline, getAllTimelines, resetTimelineSlice } from "@/store/Slice/timelineSlice";


const ManageTimeline = () => {
  const navigateTo = useNavigate();
  const handleReturnToDashboard = () => {
    navigateTo("/");
  };
  const { loading, timeline, error, message } = useSelector(
    (state) => state.timeline
  );
  const dispatch = useDispatch();

  const handleDeleteTimeline = (id) => {
    dispatch(deleteTimeline(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllTimelineErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetTimelineSlice());
      dispatch(getAllTimelines());
    }
  }, [dispatch, loading, error]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 pt-6 px-4">
      <Tabs defaultValue="week">
        <TabsContent value="week">
          <Card className="bg-gradient-to-r from-slate-900 to-slate-700 text-white">
            <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
              <CardTitle>Manage Your Timeline</CardTitle>
              <Button className="bg-gradient-to-r from-indigo-400 to-cyan-400 text-black hover:font-bold hover:border w-fit" onClick={handleReturnToDashboard}>
                Return to Dashboard
              </Button>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-inherit">
                    <TableHead className="text-white">Title</TableHead>
                    <TableHead className="md:table-cell text-white">Description</TableHead>
                    <TableHead className="md:table-cell text-white">From</TableHead>
                    <TableHead className="md:table-cell text-white">To</TableHead>
                    <TableHead className="text-right text-white">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {timeline.length > 0 ? (
                    timeline.map((element) => {
                      return (
                        <TableRow className="bg-inherit hover:bg-inherit" key={element._id}>
                          <TableCell className="font-medium">
                            {element.title}
                          </TableCell>
                          <TableCell className="md:table-cell">
                            {element.description}
                          </TableCell>
                          <TableCell className="md:table-cell">
                            {element.timeline.from}
                          </TableCell>
                          <TableCell className="md:table-cell">
                            {element.timeline.to ? element.timeline.to : "____"}
                          </TableCell>
                          <TableCell className="flex justify-end">
                            <button
                              className="rounded-full h-9 w-9 flex 
                              justify-center items-center text-red-600 text-slate-50 hover:bg-red-600 border-red-600 border-2 hover:bg-inherit"
                              onClick={() => handleDeleteTimeline(element._id)}
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow className="text-2xl">
                      <TableCell>You have not added any timeline.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageTimeline;


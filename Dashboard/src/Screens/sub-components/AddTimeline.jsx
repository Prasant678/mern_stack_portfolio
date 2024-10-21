import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { addNewTimeline, clearAllTimelineErrors, getAllTimelines, resetTimelineSlice } from '@/store/Slice/timelineSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoadingSpinner from './LoadingSpinner'
import { toast } from 'react-toastify'

const AddTimeline = () => {
  const {loading , error, message} = useSelector((state)=>state.timeline);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const dispatch = useDispatch();

  const handleAddNewTimeline = (e) =>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("from", from);
    formData.append("to", to);
    dispatch(addNewTimeline(formData));
  }

  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(clearAllTimelineErrors());
    }
    if(message){
      toast.success(message)
      dispatch(resetTimelineSlice());
      dispatch(getAllTimelines());
    }
  }, [dispatch, error, message, loading])
  return (
    <div>
      <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
        <form
          className="w-[100%] px-5 md:w-[650px]"
        >
          <div className="space-y-12">
              <h2 className="font-semibold leading-7 text-gray-900 text-3xl text-center pt-6">
                ADD A NEW TIMELINE
              </h2>
              <div className="mt-10 flex flex-col gap-5">
                <div className="w-full sm:col-span-4">
                  <Label className="block text-lg font-medium leading-6 text-gray-900">
                    Title
                  </Label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <Input
                        type="text"
                        className="block flex-1 border-black bg-transparent py-2 px-3 text-gray-900 placeholder:text-black focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Enter a Timeline"
                        value={title}
                        onChange={(e)=> setTitle(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full sm:col-span-4">
                  <Label className="block text-lg font-medium leading-6 text-gray-900 text-md">
                    Description
                  </Label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <Textarea
                        className="block flex-1 border-black bg-transparent py-2 px-3 text-gray-900 placeholder:text-black focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Enter Timeline Description"
                        value={description}
                        onChange={(e)=> setDescription(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full sm:col-span-4">
                  <Label className="block text-lg font-medium leading-6 text-gray-900 text-md">
                    Starting Point (From)
                  </Label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <Input
                        type="number"
                        className="block flex-1 border-black bg-transparent py-2 px-3 text-gray-900 placeholder:text-black focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Starting..."
                        value={from}
                        onChange={(e)=> setFrom(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full sm:col-span-4">
                  <Label className="block text-lg font-medium leading-6 text-gray-900 text-md">
                    Ending Point (To)
                  </Label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <Input
                        type="number"
                        className="block flex-1 border-black bg-transparent py-2 px-3 text-gray-900 placeholder:text-black focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Ending..."
                        value={to}
                        onChange={(e)=> setTo(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
              {!loading ? (<Button
                type="submit"
                onClick={handleAddNewTimeline}
                className="w-full"
              >
                Add Timeline
              </Button>) : (<LoadingSpinner content={"Adding New Timeline"} />)}
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddTimeline

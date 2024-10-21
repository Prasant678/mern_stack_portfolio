import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from './LoadingSpinner';
import { clearAllMessageErrors, deleteMessage, getAllMessages, resetMessagesSlice } from '@/store/Slice/messageSlice';
import { toast } from 'react-toastify';
import { Trash } from 'lucide-react';

const Messages = () => {
  const { loading, messages, message, error } = useSelector((state) => state.messages);
  const [messageId, setMessageId] = useState("");

  const handleDeleteMessage = (id) =>{
    setMessageId(id);
    dispatch(deleteMessage(id));
  }

  const dispatch = useDispatch();
  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(clearAllMessageErrors());
    }
    if(message){
      toast.success(message);
      dispatch(resetMessagesSlice());
      dispatch(getAllMessages());
    }
  }, [dispatch, message, error, loading])
  return (
    <>
      <div className="min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-20">
        <Tabs className='px-4'>
          <TabsContent>
            <Card className="bg-gradient-to-r from-slate-900 to-slate-700 text-white">
              <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
                <CardTitle>All Messages</CardTitle>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4">
                {messages && messages.length > 0 ? (
                  messages.map((element) => {
                    return (
                    <Card key={element._id} className="grid gap-2 p-4 bg-inherit">
                      <CardDescription className="text-white">
                        <span className="font-bold mr-2">Sender Name:</span>
                        {element.Name}
                      </CardDescription>
                      <CardDescription className="text-white">
                        <span className="font-bold mr-2">Subject:</span>
                        {element.subject}
                      </CardDescription>
                      <CardDescription className="text-white">
                        <span className="font-bold mr-2">Message:</span>
                        {element.message}
                      </CardDescription>
                      <CardFooter className="justify-end p-0">
                        {loading && (messageId === element._id) ? (
                          <LoadingSpinner content={"Deleting"} width={"w-32"} />
                        ) : (<Trash size={24} strokeWidth={2.5} className='trash text-red-500' onClick={() => handleDeleteMessage(element._id)}/>)}
                      </CardFooter>
                    </Card>
                    )
                  })
                ) : (
                  <CardHeader className="text-2xl">
                    No Messages Found!
                  </CardHeader>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

export default Messages;

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from './LoadingSpinner';
import { toast } from 'react-toastify';
import { Trash } from 'lucide-react';
import { clearAllEmailErrors, deleteEmail, getAllEmails, resetEmailsSlice } from '@/store/Slice/emailSlice';

const Emails = () => {
    const { loading, emails, message, error } = useSelector((state) => state.emails);
    const [emailId, setEmailId] = useState("");

    const handleDeleteEmail = (id) => {
        setEmailId(id);
        dispatch(deleteEmail(id));
    }

    const dispatch = useDispatch();
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearAllEmailErrors());
        }
        if (message) {
            toast.success(message);
            dispatch(resetEmailsSlice());
            dispatch(getAllEmails());
        }
    }, [dispatch, message, error, loading])
    return (
        <>
            <div className="min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-20">
                <Tabs className='px-4'>
                    <TabsContent>
                        <Card className="bg-gradient-to-r from-slate-900 to-slate-700 text-white">
                            <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
                                <CardTitle>Subscribed Emails</CardTitle>
                            </CardHeader>
                            <CardContent className="grid sm:grid-cols-2 gap-4">
                                {emails && emails.length > 0 ? (
                                    emails.map((element) => {
                                        return (
                                            <Card key={element._id} className="flex flex-row justify-between py-3 px-2 bg-inherit">
                                                <CardDescription className="text-white">
                                                    <span className="font-bold mr-2">Subscribed Email:</span>
                                                    {element.email}
                                                </CardDescription>
                                                <CardFooter className="justify-end p-0 px-2">
                                                    {loading && (emailId === element._id) ? (
                                                        <LoadingSpinner content={"Deleting"} width={""} />
                                                    ) : (<Trash size={24} strokeWidth={2.5} className='trash text-red-500 my-0 mx-0' onClick={() => handleDeleteEmail(element._id)} />)}
                                                </CardFooter>
                                            </Card>
                                        )
                                    })
                                ) : (
                                    <CardHeader className="text-2xl">
                                        No Emails Found!
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

export default Emails

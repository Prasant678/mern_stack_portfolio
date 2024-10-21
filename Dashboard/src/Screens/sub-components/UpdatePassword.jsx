import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { clearAllUserErrors, getUser, resetProfile, updatePassword } from '@/store/Slice/userSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import LoadingSpinner from './LoadingSpinner'

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const { loading, error, isUpdated, message } = useSelector((state) => state.user)
  const dispatch = useDispatch();

  const handleUpdatePassword = () => {
    dispatch(updatePassword(currentPassword, newPassword, confirmNewPassword));
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isUpdated) {
      dispatch(resetProfile());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, error,  message, isUpdated])
  return (
    <>
      <div className="w-full h-full">
        <div>
          <div className="grid w-[100%] gap-6">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold">Update Password</h1>
              <p className="text-balance text-foreground">
                Update Your Dashboard Password
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label className="text-md">Current Password</Label>
                <Input
                  type="text"
                  placeholder= "Enter Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-md">New Password</Label>
                <Input
                  type="text"
                  placeholder= "Enter New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-md">Confirm New Password</Label>
                <Input
                  type="text"
                  placeholder= "Enter Confirm New Password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </div>
              {!loading ? (
                <Button
                  onClick={() => handleUpdatePassword()}
                  className="w-full"
                >
                  Update Password
                </Button>
              ) : (
                <LoadingSpinner content={"Updating Password"} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdatePassword

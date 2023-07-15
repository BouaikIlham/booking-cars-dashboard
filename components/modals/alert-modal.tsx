"use client"

import { useState, useEffect } from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/button";
interface AlertModalProps {
  onClose: () => void;
  isOpen: boolean;
  onConfirm: () => void;
  loading: boolean;
}


const AlertModal: React.FC<AlertModalProps> = ({
  onClose,
  isOpen,
  onConfirm,
  loading
}) => {

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

 
  return (
    <Modal 
      title="Are you Sure?"
      description="This action cannot be undone"
      onClose={onClose}
      isOpen={isOpen}
    >
      <div className="pt-6 flex items-center space-x-2 w-full justify-end">
        <Button disabled={loading} variant="outline" onClick={onClose}>
            Cancel
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
            Continue
        </Button>
      </div>
    </Modal>
  )
}

export default AlertModal;
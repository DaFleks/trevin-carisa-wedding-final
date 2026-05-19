"use client";

import Container from "./aetherium/Container";
import Modal from "./Modal";
import { Button } from "./ui/button";

interface DeleteModalProps {
  open: boolean;
  handleIsOpen: () => void;
  handleDeleteGuest: () => void;
}

const DeleteModal = (props: DeleteModalProps) => {
  return (
    <>
      {props.open && (
        <Modal className="space-y-4">
          <h3 className="text-lg font-semibold">Are you sure you want to delete this user?</h3>
          <Container className="grid grid-cols-2 gap-4">
            <Button className="w-full cursor-pointer bg-red-900 hover:bg-red-900/90 font-semibold py-6" onClick={props.handleIsOpen}>
              No
            </Button>
            <Button
              className="w-full cursor-pointer bg-emerald-900 hover:bg-emerald-900/90 font-semibold py-6"
              onClick={props.handleDeleteGuest}>
              Yes
            </Button>
          </Container>
        </Modal>
      )}
    </>
  );
};

export default DeleteModal;

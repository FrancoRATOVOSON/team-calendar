import { EventInputType, EventType } from "@/lib/types";
import { EventForm, useEventForm } from "./event-form";
import { Dialog } from "@headlessui/react";
import { ActionButton } from "@/components/common";
import { useActionData } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { isEqual } from "date-fns";
import { deleteEvent, updateEvent } from "@/services";
import { toast } from "sonner";

interface EventDialogProps {
  open: boolean;
  closeModal: () => void;
  event: EventType;
  reload: () => void;
}

export default function EventDialog({
  open,
  event,
  closeModal,
  reload
}: EventDialogProps) {
  const { title, description, date } = useEventForm(event);
  const { pending: updatePending, handleAction: onUpdate } = useActionData({
    actionFn: () => {
      const inputs: EventInputType = {
        title: title.value === event.title ? undefined : title.value,
        description:
          description.value === event.description
            ? undefined
            : description.value,
        start: isEqual(date.value.start, event.start)
          ? undefined
          : date.value.start,
        end:
          (!event.end && !date.value.end) ||
          (event.end && date.value.end && isEqual(event.end, date.value.end))
            ? undefined
            : date.value.end
      };
      return updateEvent(event.id, inputs);
    },
    onSucceed: () => {
      closeModal();
      toast("Updated!");
      reload();
    },
    onError: () => toast("An error occured when updating this event")
  });
  const { pending: deletePending, handleAction: onDelete } = useActionData({
    actionFn: () => deleteEvent(event.id),
    onSucceed: () => {
      closeModal();
      toast("Deleted!");
      reload();
    },
    onError: () => toast("An error occured when deleting this event")
  });

  return (
    <Dialog open={open} onClose={closeModal}>
      <Dialog.Panel>
        <Dialog.Title>Event</Dialog.Title>
        <EventForm values={{ title, description, date }} />
        <div>
          <ActionButton
            label={(isPending) => (isPending ? "Saving..." : "Save")}
            onClick={onUpdate}
            pending={updatePending}
          />
          <ActionButton
            label={(isPending) => (isPending ? "Deleting..." : "Delete")}
            variant="destructive"
            onClick={onDelete}
            pending={deletePending}
          />
          <Button variant="outline" onClick={closeModal}>
            Close
          </Button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}

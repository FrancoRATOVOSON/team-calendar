import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { PlusIcon } from "@radix-ui/react-icons";
import React from "react";
import { useActionData } from "@/lib/hooks";
import { createUserEvent } from "@/services";
import { toast } from "sonner";
import { ActionButton } from "@/components/common";
import { EventForm, useEventForm } from "./event-form";

interface CreateEventProps {
  onEventCreated?: () => void
}

export default function CreateEvent({ onEventCreated }: CreateEventProps) {
  const [open, setopen] = React.useState(false);
  const eventValues = useEventForm()

  const handleCreateEvent = React.useCallback(() => {
    const { title, description, date } = eventValues;
    return createUserEvent({
      title: title.value,
      description: description.value,
      ...date.value
    });
  }, [eventValues]);

  const { pending, handleAction } = useActionData({
    actionFn: handleCreateEvent,
    onSucceed: () => {
      toast("Event created successfully")
      onEventCreated?.()
    },
    onError: () => toast("An error occured when creating your event"),
    onFinally: () => setopen(false)
  });

  return (
    <Dialog open={open} onOpenChange={setopen} defaultOpen={false}>
      <DialogTrigger asChild>
        <Button variant={"outline"} onClick={() => setopen(true)}>
          <PlusIcon className="size-4 mr-2" />
          Add an event
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new event</DialogTitle>
        </DialogHeader>
        <EventForm values={eventValues} />
        <DialogFooter className="mt-4">
          <ActionButton
            pending={pending}
            onClick={handleAction}
            label={isPending => isPending ? 'Creating...' : 'Create'}
          />
          <DialogClose asChild>
            <Button
              variant={'outline'}
              onClick={() => setopen(false)}
              disabled={pending}
            >
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

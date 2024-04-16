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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon } from "@radix-ui/react-icons";
import React from "react";
import { DateRangePicker } from "./date-range-picker";
import { useActionData } from "@/lib/hooks";
import { createUserEvent } from "@/services";
import { toast } from "sonner";
import { ActionButton } from "@/components/common";

function useCreateEvent() {
  const [titleState, setTitleState] = React.useState('');
  const [descriptionState, setDescriptionState] = React.useState('');
  const [startState, setStartState] = React.useState(new Date());
  const [endState, setEndState] = React.useState<Date | undefined>();

  const title = React.useMemo(
    () => ({
      value: titleState,
      onChange: (value: string) => setTitleState(value),
      id: "create-event-title"
    }),
    [titleState]
  );

  const description = React.useMemo(
    () => ({
      value: descriptionState,
      onChange: (value: string) => setDescriptionState(value),
      id: "create-event-description"
    }),
    [descriptionState]
  );

  const date = React.useMemo(
    () => ({
      value: { start: startState, end: endState },
      onChange: (value: { start: Date; end?: Date }) => {
        setStartState(value.start);
        setEndState(value.end);
      },
      id: "create-event-date"
    }),
    [startState, endState]
  );

  return { title, description, date };
}

interface CreateEventProps {
  onEventCreated?: () => void
}

export default function CreateEvent({ onEventCreated }: CreateEventProps) {
  const [open, setopen] = React.useState(false);
  const { title, description, date } = useCreateEvent();

  const handleCreateEvent = React.useCallback(() => {
    return createUserEvent({
      title: title.value,
      description: description.value,
      ...date.value
    });
  }, [date.value, description.value, title.value]);

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
        <div className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor={title.id}>Title</Label>
            <Input
              id={title.id}
              value={title.value}
              onChange={(e) => title.onChange(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor={description.id}>Description</Label>
            <Input
              id={description.id}
              value={description.value}
              onChange={(e) => description.onChange(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor={date.id}>Title</Label>
            <DateRangePicker
              id={date.id}
              values={date.value}
              onChange={date.onChange}
            />
          </div>
        </div>
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

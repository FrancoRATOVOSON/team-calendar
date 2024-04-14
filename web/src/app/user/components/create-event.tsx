import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EventType } from "@/lib/types";
import { PlusIcon } from "@radix-ui/react-icons";
import React from "react";
import { DateRangePicker } from "./date-range-picker";

function useCreateEvent(event: EventType) {
  const [titleState, setTitleState] = React.useState(event.title);
  const [descriptionState, setDescriptionState] = React.useState(
    event.description
  );
  const [startState, setStartState] = React.useState(event.start);
  const [endState, setEndState] = React.useState(event.end);

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
  event: EventType;
}

export default function CreateEvent({ event }: CreateEventProps) {
  const [open, setopen] = React.useState(false);
  const { title, description, date } = useCreateEvent(event);

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
          <div>
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
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DateRangePicker } from "./date-range-picker";
import { cn } from "@/lib/utils";

type UseEventFormParams = {
  title?: string;
  description?: string;
  start?: Date;
  end?: Date;
};

type EventValuesType = {
  title: {
    value: string;
    onChange: (value: string) => void;
    id: string;
  };
  description: {
    value: string;
    onChange: (value: string) => void;
    id: string;
  };
  date: {
    value: {
      start: Date;
      end: Date | undefined;
    };
    onChange: (value: { start: Date; end?: Date }) => void;
    id: string;
  };
};

// eslint-disable-next-line react-refresh/only-export-components
export function useEventForm(params?: UseEventFormParams) {
  const [titleState, setTitleState] = React.useState(params?.title || "");
  const [descriptionState, setDescriptionState] = React.useState(
    params?.description || ""
  );
  const [startState, setStartState] = React.useState(
    params?.start || new Date()
  );
  const [endState, setEndState] = React.useState<Date | undefined>(params?.end);

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

interface EventFormProps {
  values: EventValuesType;
  className?: string
}

export function EventForm({
  values: { title, description, date },className
}: EventFormProps) {
  return (
    <div className={cn("space-y-4",className)}>
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
  );
}

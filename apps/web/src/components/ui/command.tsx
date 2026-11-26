import * as React from "react";
import {
  Command as CommandPrimitive,
  CommandEmpty as CommandEmptyPrimitive,
  CommandGroup as CommandGroupPrimitive,
  CommandGroupLabel,
  CommandInput as CommandInputPrimitive,
  CommandItem as CommandItemPrimitive,
  CommandList as CommandListPrimitive,
  CommandSeparator as CommandSeparatorPrimitive,
  CommandShortcut as CommandShortcutPrimitive,
} from "@ui-sdk/react/command";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";

/** Marks an item that is listed whatever is typed (see `forceMount` on CommandItem). */
const FORCED = "\u0001";

/** Every typed word has to appear in the item's text; a forced item always passes. */
const matchWords = (
  item: { value: string; label?: string; keywords?: string[] },
  query: string
) => {
  if (item.value.startsWith(FORCED)) return 1;
  const text = `${item.label ?? item.value} ${(item.keywords ?? []).join(" ")}`.toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => text.includes(word))
    ? 1
    : 0;
};

type InputBridge = {
  setQuery: (query: string) => void;
  onValueChange: React.MutableRefObject<((query: string) => void) | undefined>;
};
const BridgeContext = React.createContext<InputBridge | null>(null);

type CommandProps = Omit<
  React.ComponentProps<typeof CommandPrimitive>,
  "query" | "defaultQuery" | "onQueryChange"
> & {
  query?: string;
  onQueryChange?: (query: string) => void;
};

/** A command list that keeps its own search text unless `query` says otherwise. */
function Command({
  className,
  query: controlled,
  onQueryChange,
  filter = matchWords as never,
  ...props
}: CommandProps) {
  const [own, setOwn] = React.useState("");
  const onValueChange = React.useRef<((query: string) => void) | undefined>(
    undefined
  );
  const bridge = React.useMemo(
    () => ({ setQuery: setOwn, onValueChange }),
    []
  );
  const query = controlled ?? own;
  return (
    <BridgeContext.Provider value={bridge}>
      <CommandPrimitive
        className={cn(
          "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
          className
        )}
        query={query}
        filter={filter}
        autoHighlight
        onQueryChange={(next: string) => {
          setOwn(next);
          onValueChange.current?.(next);
          onQueryChange?.(next);
        }}
        {...props}
      />
    </BridgeContext.Provider>
  );
}

type CommandDialogProps = React.ComponentProps<typeof Dialog> &
  Pick<CommandProps, "query" | "onQueryChange" | "filter">;

const CommandDialog = ({
  children,
  query,
  onQueryChange,
  filter,
  ...props
}: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <Command query={query} onQueryChange={onQueryChange} filter={filter}>
          {children as React.ReactNode}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

type CommandInputProps = React.ComponentProps<typeof CommandInputPrimitive> & {
  /** Mirrors the search text of the surrounding Command. */
  value?: string;
  onValueChange?: (value: string) => void;
};

function CommandInput({
  className,
  value,
  onValueChange,
  placeholder,
  ...props
}: CommandInputProps) {
  const bridge = React.useContext(BridgeContext);
  React.useEffect(() => {
    if (!bridge) return;
    bridge.onValueChange.current = onValueChange;
    return () => {
      bridge.onValueChange.current = undefined;
    };
  }, [bridge, onValueChange]);
  React.useEffect(() => {
    if (value !== undefined) bridge?.setQuery(value);
  }, [bridge, value]);
  return (
    <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
      <Search className="me-2 h-4 w-4 shrink-0 opacity-50" />
      <CommandInputPrimitive
        placeholder={placeholder}
        aria-label={props["aria-label"] ?? placeholder ?? "Search"}
        className={cn(
          "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  );
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandListPrimitive>) {
  return (
    <CommandListPrimitive
      className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
      {...props}
    />
  );
}

function CommandEmpty(props: React.ComponentProps<typeof CommandEmptyPrimitive>) {
  return <CommandEmptyPrimitive className="py-6 text-center text-sm" {...props} />;
}

function CommandGroup({
  className,
  heading,
  children,
  ...props
}: React.ComponentProps<typeof CommandGroupPrimitive> & {
  heading?: React.ReactNode;
}) {
  return (
    <CommandGroupPrimitive
      className={cn("overflow-hidden p-1 text-foreground", className)}
      {...props}
    >
      {heading && (
        <CommandGroupLabel className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
          {heading}
        </CommandGroupLabel>
      )}
      {children as React.ReactNode}
    </CommandGroupPrimitive>
  );
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandSeparatorPrimitive>) {
  return (
    <CommandSeparatorPrimitive
      className={cn("-mx-1 h-px bg-border", className)}
      {...props}
    />
  );
}

/**
 * `value` is the text that is searched. `forceMount` lists the item whatever is typed.
 */
function CommandItem({
  className,
  value,
  forceMount,
  ...props
}: Omit<React.ComponentProps<typeof CommandItemPrimitive>, "label"> & {
  forceMount?: boolean;
}) {
  return (
    <CommandItemPrimitive
      value={forceMount ? `${FORCED}${value ?? ""}` : value}
      label={value}
      className={cn(
        "relative flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 gap-2",
        className
      )}
      {...props}
    />
  );
}

const CommandShortcut = ({
  className,
  ...props
}: React.ComponentProps<typeof CommandShortcutPrimitive>) => (
  <CommandShortcutPrimitive
    className={cn("ms-auto text-xs tracking-widest text-muted-foreground", className)}
    {...props}
  />
);

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};

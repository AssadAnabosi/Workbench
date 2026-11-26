import * as React from "react";

/**
 * UI SDK swaps a part's element with `render`; the app's components kept the older
 * `asChild` call sites. This maps one onto the other: the single child element becomes the
 * rendered element and its own children become the part's children.
 */
export function asChildProps(
  asChild: boolean | undefined,
  children: any
): { render?: React.ReactElement<any>; children: any } {
  if (asChild && React.isValidElement<{ children?: React.ReactNode }>(children)) {
    return { render: children, children: children.props.children };
  }
  return { children };
}
